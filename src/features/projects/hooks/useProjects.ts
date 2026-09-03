import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/services/query/keys';

import { projectsApi } from '../api/projectsApi';

export function useProjects() {
  return useQuery({
    queryKey: queryKeys.projects.all,
    queryFn: ({ signal }) => projectsApi.list(signal),
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: queryKeys.projects.detail(id),
    queryFn: ({ signal }) => projectsApi.getById(id, signal),
    enabled: !!id,
  });
}
