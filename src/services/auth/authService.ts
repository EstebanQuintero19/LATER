import { apiRequest } from '@/services/http/client';
import {
  PersistedSession,
  secureSessionStorage,
} from '@/services/storage/secureSession';

export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
}

export interface AuthResult {
  session: PersistedSession;
}

/**
 * Contrato de autenticación.
 *
 * La app depende sólo de esta interfaz. Hoy la implementa `RestAuthService`
 * (contra la API / mock). Migrar a AWS Amplify es sustituir la implementación
 * por una `AmplifyAuthService` que envuelva `signIn` / `signOut` / `fetchAuthSession`
 * sin tocar features ni el store.
 */
export interface AuthService {
  signIn(credentials: Credentials): Promise<AuthResult>;
  /** Crea la cuenta y deja la sesión iniciada (sin pasar por Login). */
  register(input: RegisterInput): Promise<AuthResult>;
  signOut(): Promise<void>;
  /** Restaura la sesión persistida de forma segura (o `null`). */
  restore(): Promise<PersistedSession | null>;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    name: string;
    email: string;
    address?: string;
    phone?: string;
  };
}

export class RestAuthService implements AuthService {
  async signIn({ email, password }: Credentials): Promise<AuthResult> {
    const res = await apiRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: { email: email.trim().toLowerCase(), password },
    });
    return this.persist(res);
  }

  async register(input: RegisterInput): Promise<AuthResult> {
    const res = await apiRequest<LoginResponse>('/auth/register', {
      method: 'POST',
      body: {
        ...input,
        email: input.email.trim().toLowerCase(),
      },
    });
    return this.persist(res);
  }

  private async persist(res: LoginResponse): Promise<AuthResult> {
    const session: PersistedSession = {
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      expiresAt: Date.now() + res.expiresIn * 1000,
      user: res.user,
    };

    // La escritura pasa SIEMPRE por el almacenamiento cifrado.
    await secureSessionStorage.save(session);
    return { session };
  }

  async signOut(): Promise<void> {
    try {
      await apiRequest<void>('/auth/logout', { method: 'POST' });
    } catch {
      // El cierre de sesión local no debe depender de que el servidor responda.
    } finally {
      await secureSessionStorage.clear();
    }
  }

  async restore(): Promise<PersistedSession | null> {
    const session = await secureSessionStorage.load();
    if (!session) return null;
    if (session.expiresAt <= Date.now()) {
      await secureSessionStorage.clear();
      return null;
    }
    return session;
  }
}

export const authService: AuthService = new RestAuthService();
