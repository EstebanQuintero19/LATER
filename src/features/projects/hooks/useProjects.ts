import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/services/query/keys';

import { projectsApi } from '../api/projectsApi';
import { CreateRemodelRequest } from '../types';

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

/**
 * "Solicitar remodelación": crea el proyecto y, del lado del mock server,
 * agenda la visita de medición y dispara el aviso de confirmación en el
 * mismo request — por eso invalida las tres queries relacionadas.
 */
export function useCreateRemodelRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateRemodelRequest) => projectsApi.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.projects.all });
      qc.invalidateQueries({ queryKey: queryKeys.appointments.all });
      qc.invalidateQueries({ queryKey: queryKeys.notifications.all });
    },
  });
}
