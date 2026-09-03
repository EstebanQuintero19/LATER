import { AppointmentDto } from '@/features/appointments/types';
import { NotificationDto } from '@/features/notifications/types';

import {
  mockAppointments,
  mockNotifications,
  mockProducts,
  mockProjects,
} from './fixtures';

/**
 * Estado mutable en memoria del servidor simulado.
 *
 * Se reinicia con cada arranque de la app (no hay persistencia); suficiente
 * para demostrar flujos de lectura/escritura sin backend.
 */
export const mockDb = {
  projects: [...mockProjects],
  products: [...mockProducts],
  appointments: [...mockAppointments] as AppointmentDto[],
  notifications: [...mockNotifications] as NotificationDto[],
};

export function resetMockDb() {
  mockDb.projects = [...mockProjects];
  mockDb.products = [...mockProducts];
  mockDb.appointments = [...mockAppointments];
  mockDb.notifications = [...mockNotifications];
}
