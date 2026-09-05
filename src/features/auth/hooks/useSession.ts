import { useAppDispatch, useAppSelector } from '@/store/hooks';

import {
  clearAuthError,
  register,
  signIn,
  signOut,
} from '../model/sessionSlice';
import type { Credentials, RegisterInput } from '@/services/auth/authService';

export function useSession() {
  const dispatch = useAppDispatch();
  const session = useAppSelector((s) => s.session);

  return {
    status: session.status,
    user: session.user,
    error: session.error,
    isAuthenticated: session.status === 'authenticated',
    isBusy: session.status === 'authenticating',
    signIn: (credentials: Credentials) => dispatch(signIn(credentials)),
    register: (input: RegisterInput) => dispatch(register(input)),
    signOut: () => dispatch(signOut()),
    clearError: () => dispatch(clearAuthError()),
  };
}
