import { env } from '@/config/env';

import { ApiError } from './errors';
import { handleMockRequest } from './mockServer';

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export interface RequestOptions {
  method?: HttpMethod;
  /** Cuerpo JSON. Se serializa automáticamente. */
  body?: unknown;
  /** Query params. Los `undefined` se omiten. */
  query?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
}

/** Proveedor del token de acceso. Lo inyecta la capa de auth para evitar un ciclo de imports. */
type TokenProvider = () => string | null;
let getAccessToken: TokenProvider = () => null;
export function setAccessTokenProvider(provider: TokenProvider) {
  getAccessToken = provider;
}

/** Callback que se dispara ante un 401 para que la sesión se cierre. */
type UnauthorizedHandler = () => void;
let onUnauthorized: UnauthorizedHandler = () => {};
export function setUnauthorizedHandler(handler: UnauthorizedHandler) {
  onUnauthorized = handler;
}

function buildUrl(path: string, query?: RequestOptions['query']): string {
  const base = env.apiBaseUrl.replace(/\/$/, '');
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
  if (!query) return url;
  const params = Object.entries(query)
    .filter(([, v]) => v !== undefined)
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
    )
    .join('&');
  return params ? `${url}?${params}` : url;
}

/**
 * Cliente HTTP único de la app.
 *
 * - Inyecta `Authorization: Bearer <token>` cuando hay sesión.
 * - Normaliza cualquier fallo a `ApiError`.
 * - Deriva a la capa mock cuando `env.useMockApi` está activo.
 */
export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = 'GET', body, query, signal } = options;
  const token = getAccessToken();

  if (env.useMockApi) {
    return handleMockRequest<T>({ path, method, body, query, token });
  }

  const headers: Record<string, string> = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(buildUrl(path, query), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (cause) {
    throw new ApiError({
      status: 0,
      code: 'network',
      message: 'No hay conexión con el servidor',
      details: cause,
    });
  }

  if (response.status === 401) onUnauthorized();

  const text = await response.text();
  const payload = text ? safeJsonParse(text) : undefined;

  if (!response.ok) {
    throw new ApiError({
      status: response.status,
      code: (payload as { code?: string })?.code ?? 'http_error',
      message:
        (payload as { message?: string })?.message ??
        `Error ${response.status}`,
      details: payload,
    });
  }

  return payload as T;
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
