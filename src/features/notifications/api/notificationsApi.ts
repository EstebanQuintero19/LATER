import { apiRequest } from '@/services/http/client';

import { AppNotification, NotificationDto } from '../types';

const toNotification = (dto: NotificationDto): AppNotification => ({
  ...dto,
  createdAt: new Date(dto.createdAt),
});

const sortNewestFirst = (a: AppNotification, b: AppNotification) =>
  b.createdAt.getTime() - a.createdAt.getTime();

export const notificationsApi = {
  async list(signal?: AbortSignal): Promise<AppNotification[]> {
    const res = await apiRequest<{ items: NotificationDto[] }>(
      '/notifications',
      {
        signal,
      },
    );
    return res.items.map(toNotification).sort(sortNewestFirst);
  },

  async markAsRead(id: string): Promise<AppNotification[]> {
    const res = await apiRequest<{ items: NotificationDto[] }>(
      `/notifications/${id}/read`,
      { method: 'POST' },
    );
    return res.items.map(toNotification).sort(sortNewestFirst);
  },

  async markAllAsRead(): Promise<AppNotification[]> {
    const res = await apiRequest<{ items: NotificationDto[] }>(
      '/notifications/mark-all-read',
      { method: 'POST' },
    );
    return res.items.map(toNotification).sort(sortNewestFirst);
  },
};
