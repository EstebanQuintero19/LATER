import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/services/query/keys';

import { messagesApi } from '../api/messagesApi';

export function useMessages(projectId: string) {
  return useQuery({
    queryKey: queryKeys.projects.messages(projectId),
    queryFn: ({ signal }) => messagesApi.list(projectId, signal),
    enabled: !!projectId,
  });
}

export function useSendMessage(projectId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: string) => messagesApi.send(projectId, body),
    onSuccess: (items) => {
      qc.setQueryData(queryKeys.projects.messages(projectId), items);
      // La respuesta automática del "equipo" también genera un aviso.
      qc.invalidateQueries({ queryKey: queryKeys.notifications.all });
    },
  });
}
