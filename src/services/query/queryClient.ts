import { QueryClient } from '@tanstack/react-query';

import { ApiError } from '@/services/http/errors';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      retry: (failureCount, error) => {
        // No reintentar errores de autenticación ni "no encontrado".
        if (
          error instanceof ApiError &&
          [401, 403, 404].includes(error.status)
        ) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});
