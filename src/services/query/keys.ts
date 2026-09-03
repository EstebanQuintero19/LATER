/** Claves de React Query centralizadas para evitar invalidaciones inconsistentes. */
export const queryKeys = {
  projects: {
    all: ['projects'] as const,
    detail: (id: string) => ['projects', id] as const,
  },
  products: {
    all: (search?: string) => ['products', { search: search ?? '' }] as const,
    detail: (id: string) => ['products', id] as const,
  },
  appointments: {
    all: ['appointments'] as const,
  },
  notifications: {
    all: ['notifications'] as const,
  },
} as const;
