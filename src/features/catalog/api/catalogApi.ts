import { apiRequest } from '@/services/http/client';

import { Product } from '../types';

export const catalogApi = {
  async list(search?: string, signal?: AbortSignal): Promise<Product[]> {
    const res = await apiRequest<{ items: Product[] }>('/products', {
      query: { search: search || undefined },
      signal,
    });
    return res.items;
  },

  async getById(id: string, signal?: AbortSignal): Promise<Product> {
    return apiRequest<Product>(`/products/${id}`, { signal });
  },
};
