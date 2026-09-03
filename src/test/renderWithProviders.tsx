import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react-native';
import { ReactElement, ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { cartReducer } from '@/features/cart/model/cartSlice';
import { sessionReducer } from '@/features/auth/model/sessionSlice';

const SAFE_AREA_METRICS = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

export function makeTestStore() {
  return configureStore({
    reducer: { session: sessionReducer, cart: cartReducer },
  });
}

/**
 * Renderiza un componente con todos los providers de la app (store aislado por test).
 *
 * `render` es asíncrono en Testing Library RN v14 → hay que hacer `await`.
 */
export async function renderWithProviders(
  ui: ReactElement,
  {
    store = makeTestStore(),
  }: { store?: ReturnType<typeof makeTestStore> } = {},
) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );

  const view = await render(ui, { wrapper: Wrapper });
  return { store, ...view };
}
