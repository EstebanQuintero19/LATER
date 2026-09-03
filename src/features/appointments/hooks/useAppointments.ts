import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/services/query/keys';

import { appointmentsApi } from '../api/appointmentsApi';

export function useAppointments() {
  return useQuery({
    queryKey: queryKeys.appointments.all,
    queryFn: ({ signal }) => appointmentsApi.list(signal),
  });
}

export function useCancelAppointment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => appointmentsApi.cancel(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.appointments.all });
    },
  });
}
