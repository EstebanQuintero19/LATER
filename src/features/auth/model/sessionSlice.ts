import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authService, Credentials } from '@/services/auth/authService';
import { ApiError } from '@/services/http/errors';
import { PersistedSession } from '@/services/storage/secureSession';

export type SessionStatus =
  | 'bootstrapping' // restaurando sesión persistida al abrir la app
  | 'anonymous'
  | 'authenticating'
  | 'authenticated';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
}

export interface SessionState {
  status: SessionStatus;
  user: SessionUser | null;
  accessToken: string | null;
  error: string | null;
}

const initialState: SessionState = {
  status: 'bootstrapping',
  user: null,
  accessToken: null,
  error: null,
};

const toSessionFields = (session: PersistedSession) => ({
  user: session.user,
  accessToken: session.accessToken,
});

/** Restaura la sesión desde el almacenamiento cifrado al arrancar la app. */
export const bootstrapSession = createAsyncThunk(
  'session/bootstrap',
  async () => {
    const session = await authService.restore();
    return session ? toSessionFields(session) : null;
  },
);

export const signIn = createAsyncThunk<
  ReturnType<typeof toSessionFields>,
  Credentials,
  { rejectValue: string }
>('session/signIn', async (credentials, { rejectWithValue }) => {
  try {
    const { session } = await authService.signIn(credentials);
    return toSessionFields(session);
  } catch (error) {
    if (error instanceof ApiError) return rejectWithValue(error.message);
    return rejectWithValue('No se pudo iniciar sesión');
  }
});

export const signOut = createAsyncThunk('session/signOut', async () => {
  await authService.signOut();
});

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    /** Forzar cierre de sesión ante un 401 detectado por la capa HTTP. */
    sessionExpired(state) {
      state.status = 'anonymous';
      state.user = null;
      state.accessToken = null;
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bootstrapSession.pending, (state) => {
        state.status = 'bootstrapping';
      })
      .addCase(
        bootstrapSession.fulfilled,
        (
          state,
          action: PayloadAction<ReturnType<typeof toSessionFields> | null>,
        ) => {
          if (action.payload) {
            state.status = 'authenticated';
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
          } else {
            state.status = 'anonymous';
          }
        },
      )
      .addCase(bootstrapSession.rejected, (state) => {
        state.status = 'anonymous';
      })
      .addCase(signIn.pending, (state) => {
        state.status = 'authenticating';
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'authenticated';
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'anonymous';
        state.error = action.payload ?? 'No se pudo iniciar sesión';
      })
      .addCase(signOut.fulfilled, (state) => {
        state.status = 'anonymous';
        state.user = null;
        state.accessToken = null;
        state.error = null;
      });
  },
});

export const { sessionExpired, clearAuthError } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
