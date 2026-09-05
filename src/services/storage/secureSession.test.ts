import * as SecureStore from 'expo-secure-store';

import { PersistedSession, secureSessionStorage } from './secureSession';

const session: PersistedSession = {
  accessToken: 'access-123',
  refreshToken: 'refresh-123',
  expiresAt: Date.now() + 3_600_000,
  user: { id: 'usr_1', name: 'Alba', email: 'alba@later.example' },
};

describe('secureSessionStorage (corrección de vulnerabilidad)', () => {
  beforeEach(() => jest.clearAllMocks());

  it('persiste la sesión únicamente a través de expo-secure-store (cifrado)', async () => {
    await secureSessionStorage.save(session);

    expect(SecureStore.setItemAsync).toHaveBeenCalledTimes(1);
    const [key, value, options] = (SecureStore.setItemAsync as jest.Mock).mock
      .calls[0];
    expect(key).toBe('later.session.v1');
    expect(JSON.parse(value)).toEqual(session);
    // Debe fijar accesibilidad restringida al dispositivo.
    expect(options).toMatchObject({
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  });

  it('hace roundtrip de guardar y cargar', async () => {
    await secureSessionStorage.save(session);
    await expect(secureSessionStorage.load()).resolves.toEqual(session);
  });

  it('devuelve null y limpia cuando el contenido almacenado está corrupto', async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce('{no-json');

    await expect(secureSessionStorage.load()).resolves.toBeNull();
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(
      'later.session.v1',
      expect.any(Object),
    );
  });

  it('clear elimina la entrada segura', async () => {
    await secureSessionStorage.clear();
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(
      'later.session.v1',
      expect.any(Object),
    );
  });
});
