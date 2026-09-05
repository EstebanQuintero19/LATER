import type { PersistedSession } from './secureSession';

/**
 * Implementación SOLO para la preview web (Expo Web).
 *
 * Metro resuelve este archivo (`.web.ts`) en lugar de `secureSession.ts` cuando
 * la plataforma es web. `expo-secure-store` no existe en web, así que aquí se usa
 * `localStorage`.
 *
 * ⚠️ Web NO es una plataforma objetivo del proyecto: se ofrece únicamente para
 * revisar la UI en el navegador. En iOS/Android la sesión sigue guardándose
 * cifrada mediante Keychain / Keystore (ver `secureSession.ts`).
 */

const SESSION_KEY = 'later.session.v1';

export const secureSessionStorage = {
  async load(): Promise<PersistedSession | null> {
    const raw = globalThis.localStorage?.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as PersistedSession;
    } catch {
      globalThis.localStorage?.removeItem(SESSION_KEY);
      return null;
    }
  },

  async save(session: PersistedSession): Promise<void> {
    globalThis.localStorage?.setItem(SESSION_KEY, JSON.stringify(session));
  },

  async clear(): Promise<void> {
    globalThis.localStorage?.removeItem(SESSION_KEY);
  },
};

export type { PersistedSession };
export type SecureSessionStorage = typeof secureSessionStorage;
