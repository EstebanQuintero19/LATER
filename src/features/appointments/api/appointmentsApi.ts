import { apiRequest } from '@/services/http/client';

import { Appointment, AppointmentDto } from '../types';

const toAppointment = (dto: AppointmentDto): Appointment => ({
  ...dto,
  scheduledAt: new Date(dto.scheduledAt),
});

export const appointmentsApi = {
  async list(signal?: AbortSignal): Promise<Appointment[]> {
    const res = await apiRequest<{ items: AppointmentDto[] }>('/appointments', {
      signal,
    });
    return res.items
      .map(toAppointment)
      .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());
  },

  async cancel(id: string): Promise<Appointment> {
    const dto = await apiRequest<AppointmentDto>(`/appointments/${id}`, {
      method: 'PATCH',
      body: { status: 'cancelled' },
    });
    return toAppointment(dto);
  },
};
