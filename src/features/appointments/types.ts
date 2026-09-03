export type AppointmentStatus = 'confirmed' | 'pending' | 'cancelled';

export interface AppointmentDto {
  id: string;
  title: string;
  projectId: string;
  projectName: string;
  scheduledAt: string;
  status: AppointmentStatus;
  location: string;
}

export interface Appointment extends Omit<AppointmentDto, 'scheduledAt'> {
  scheduledAt: Date;
}
