import { DEMO_PASSWORD } from '@/mock/fixtures';
import { secureSessionStorage } from '@/services/storage/secureSession';

import { RestAuthService } from './authService';

const auth = new RestAuthService();

describe('RestAuthService (contra el mock server)', () => {
  it('inicia sesión con credenciales demo y guarda la sesión de forma segura', async () => {
    const saveSpy = jest.spyOn(secureSessionStorage, 'save');

    const { session } = await auth.signIn({
      email: 'alba@later.example',
      password: DEMO_PASSWORD,
    });

    expect(session.accessToken).toMatch(/^mock\./);
    expect(session.user.email).toBe('alba@later.example');
    expect(session.expiresAt).toBeGreaterThan(Date.now());
    expect(saveSpy).toHaveBeenCalledWith(session);
  });

  it('rechaza credenciales inválidas', async () => {
    await expect(
      auth.signIn({ email: 'alba@later.example', password: 'incorrecta' }),
    ).rejects.toThrow(/Credenciales/);
  });

  it('restore descarta una sesión expirada', async () => {
    await secureSessionStorage.save({
      accessToken: 'a',
      refreshToken: 'r',
      expiresAt: Date.now() - 1000,
      user: { id: 'usr_1', name: 'Alba', email: 'alba@later.example' },
    });

    await expect(auth.restore()).resolves.toBeNull();
  });

  it('signOut limpia la sesión persistida', async () => {
    await auth.signIn({ email: 'alba@later.example', password: DEMO_PASSWORD });
    await auth.signOut();
    await expect(secureSessionStorage.load()).resolves.toBeNull();
  });
});
