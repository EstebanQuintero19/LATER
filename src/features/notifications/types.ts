export type NotificationType = 'appointment' | 'quote' | 'project' | 'order';

export interface NotificationDto {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export interface AppNotification extends Omit<NotificationDto, 'createdAt'> {
  createdAt: Date;
}
