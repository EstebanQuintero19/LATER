import Constants from 'expo-constants';

/**
 * Configuración de entorno.
 *
 * Los valores se leen de `expo.extra` en app.json (o de variables EXPO_PUBLIC_*),
 * de modo que el mismo binario apunta a distintos backends según el perfil de build.
 * Mientras no exista un backend real, `useMockApi` deja activa la capa simulada.
 */
export interface AppEnv {
  /** URL base de la API REST del backend. */
  apiBaseUrl: string;
  /** Si es `true`, las peticiones se resuelven contra el servidor mock en memoria. */
  useMockApi: boolean;
  /** Latencia artificial (ms) que añade el mock para simular red real. */
  mockLatencyMs: number;
}

type Extra = Partial<AppEnv> & Record<string, unknown>;

const extra = (Constants.expoConfig?.extra ?? {}) as Extra;

export const env: AppEnv = {
  apiBaseUrl:
    process.env.EXPO_PUBLIC_API_BASE_URL ??
    (typeof extra.apiBaseUrl === 'string'
      ? extra.apiBaseUrl
      : 'https://api.later.example'),
  useMockApi:
    process.env.EXPO_PUBLIC_USE_MOCK_API === 'false'
      ? false
      : extra.useMockApi === false
        ? false
        : true,
  mockLatencyMs:
    typeof extra.mockLatencyMs === 'number' ? extra.mockLatencyMs : 350,
};
