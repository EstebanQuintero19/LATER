import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/services/query/keys';

import { notificationsApi } from '../api/notificationsApi';
import { AppNotification } from '../types';

export function useNotifications() {
  const query = useQuery({
    queryKey: queryKeys.notifications.all,
    queryFn: ({ signal }) => notificationsApi.list(signal),
  });

  const unreadCount = (query.data ?? []).filter((n) => !n.read).length;
  return { ...query, unreadCount };
}

export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationsApi.markAsRead(id),
    onSuccess: (items: AppNotification[]) => {
      qc.setQueryData(queryKeys.notifications.all, items);
    },
  });
}

export function useMarkAllNotificationsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onSuccess: (items: AppNotification[]) => {
      qc.setQueryData(queryKeys.notifications.all, items);
    },
  });
}
