import { configureStore } from '@reduxjs/toolkit';

import { cartReducer } from '@/features/cart/model/cartSlice';
import { sessionReducer } from '@/features/auth/model/sessionSlice';

/**
 * Store de Redux Toolkit.
 *
 * Redux guarda el estado *de cliente* que se comparte entre pantallas:
 *   - `session`: usuario autenticado y token en memoria.
 *   - `cart`: carrito (efímero, no viaja al servidor hasta el checkout).
 *
 * El estado *de servidor* (proyectos, catálogo, citas, notificaciones) lo
 * gestiona React Query, no Redux.
 */
export const store = configureStore({
  reducer: {
    session: sessionReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
