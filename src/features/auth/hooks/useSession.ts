import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { clearAuthError, signIn, signOut } from '../model/sessionSlice';
import type { Credentials } from '@/services/auth/authService';

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
    signOut: () => dispatch(signOut()),
    clearError: () => dispatch(clearAuthError()),
  };
}
