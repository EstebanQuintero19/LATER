import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';

import { bindHttpToStore } from '@/app/bootstrap/bindHttpToStore';
import { queryClient } from '@/services/query/queryClient';
import { store } from '@/store';

bindHttpToStore();

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
}
