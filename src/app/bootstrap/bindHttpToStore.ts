import {
  setAccessTokenProvider,
  setUnauthorizedHandler,
} from '@/services/http/client';
import { sessionExpired } from '@/features/auth/model/sessionSlice';
import { store } from '@/store';

let bound = false;

/**
 * Conecta la capa HTTP (sin dependencias de React/Redux) con el store:
 *  - provee el token de acceso vigente a cada petición;
 *  - ante un 401, marca la sesión como expirada para que la UI redirija al login.
 *
 * Se invoca una sola vez al arrancar la app.
 */
export function bindHttpToStore() {
  if (bound) return;
  bound = true;

  setAccessTokenProvider(() => store.getState().session.accessToken);
  setUnauthorizedHandler(() => {
    if (store.getState().session.status === 'authenticated') {
      store.dispatch(sessionExpired());
    }
  });
}
