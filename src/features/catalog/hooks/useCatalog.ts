import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { queryKeys } from '@/services/query/keys';

import { catalogApi } from '../api/catalogApi';

export function useCatalog(search: string) {
  const trimmed = search.trim();
  return useQuery({
    queryKey: queryKeys.products.all(trimmed),
    queryFn: ({ signal }) => catalogApi.list(trimmed, signal),
    placeholderData: keepPreviousData,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: ({ signal }) => catalogApi.getById(id, signal),
    enabled: !!id,
  });
}
