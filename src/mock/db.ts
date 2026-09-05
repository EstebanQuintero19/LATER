import { AppointmentDto } from '@/features/appointments/types';
import { NotificationDto } from '@/features/notifications/types';
import { MessageDto } from '@/features/projects/types';

import {
  MockUser,
  mockAppointments,
  mockMessages,
  mockNotifications,
  mockProducts,
  mockProjects,
  mockUsers,
} from './fixtures';

/**
 * Estado mutable en memoria del servidor simulado.
 *
 * Se reinicia con cada arranque de la app (no hay persistencia); suficiente
 * para demostrar flujos de lectura/escritura sin backend.
 */
export const mockDb = {
  users: [...mockUsers] as MockUser[],
  projects: [...mockProjects],
  products: [...mockProducts],
  appointments: [...mockAppointments] as AppointmentDto[],
  notifications: [...mockNotifications] as NotificationDto[],
  messages: [...mockMessages] as MessageDto[],
};

export function resetMockDb() {
  mockDb.users = [...mockUsers];
  mockDb.projects = [...mockProjects];
  mockDb.products = [...mockProducts];
  mockDb.appointments = [...mockAppointments];
  mockDb.notifications = [...mockNotifications];
  mockDb.messages = [...mockMessages];
}
