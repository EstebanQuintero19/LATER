import * as SecureStore from 'expo-secure-store';

/**
 * Persistencia SEGURA de la sesión del usuario.
 *
 * --------------------------------------------------------------------------
 * CORRECCIÓN DE VULNERABILIDAD
 * --------------------------------------------------------------------------
 * Antes, los datos de sesión (token de acceso, refresh token y perfil) se
 * guardaban en `AsyncStorage`, que almacena texto plano sin cifrar en el
 * sandbox de la app. En un dispositivo con root/jailbreak o mediante una
 * copia de seguridad sin cifrar, esos credenciales quedaban expuestos.
 *
 * Este módulo es ahora el ÚNICO punto autorizado para leer/escribir la
 * sesión y usa `expo-secure-store`, que delega en:
 *   - iOS: Keychain Services (kSecAttrAccessibleWhenUnlockedThisDeviceOnly)
 *   - Android: Keystore + almacenamiento cifrado (EncryptedSharedPreferences)
 *
 * Regla de arquitectura: ningún otro módulo debe importar `expo-secure-store`
 * ni `@react-native-async-storage/async-storage` para datos de sesión.
 * --------------------------------------------------------------------------
 */

export interface PersistedSession {
  accessToken: string;
  refreshToken: string;
  /** epoch ms en el que expira `accessToken`. */
  expiresAt: number;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const SESSION_KEY = 'later.session.v1';

const SECURE_OPTIONS: SecureStore.SecureStoreOptions = {
  // La sesión sólo debe ser accesible con el dispositivo desbloqueado y nunca
  // debe migrar a otro dispositivo mediante backups de iCloud/Google.
  keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
};

export const secureSessionStorage = {
  async load(): Promise<PersistedSession | null> {
    const raw = await SecureStore.getItemAsync(SESSION_KEY, SECURE_OPTIONS);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as PersistedSession;
    } catch {
      // Contenido corrupto: lo descartamos para forzar un login limpio.
      await SecureStore.deleteItemAsync(SESSION_KEY, SECURE_OPTIONS);
      return null;
    }
  },

  async save(session: PersistedSession): Promise<void> {
    await SecureStore.setItemAsync(
      SESSION_KEY,
      JSON.stringify(session),
      SECURE_OPTIONS,
    );
  },

  async clear(): Promise<void> {
    await SecureStore.deleteItemAsync(SESSION_KEY, SECURE_OPTIONS);
  },
};

export type SecureSessionStorage = typeof secureSessionStorage;
