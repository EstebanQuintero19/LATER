import { AppointmentDto } from '@/features/appointments/types';
import { ProductDto } from '@/features/catalog/types';
import { NotificationDto } from '@/features/notifications/types';
import { ProjectDto } from '@/features/projects/types';

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const DEMO_PASSWORD = 'river1234';

export const mockUsers: MockUser[] = [
  {
    id: 'usr_1',
    name: 'Alba Restrepo',
    email: 'alba@river.example',
    password: DEMO_PASSWORD,
  },
];

export const mockProjects: ProjectDto[] = [
  {
    id: 'prj_1',
    name: 'Reforma cocina — Chapinero',
    client: 'Familia Gómez',
    status: 'in_progress',
    memberCount: 4,
    updatedAt: '2026-08-28T14:10:00.000Z',
    coverColor: '#2A9D8F',
  },
  {
    id: 'prj_2',
    name: 'Local comercial — Zona T',
    client: 'Café Norte',
    status: 'measuring',
    memberCount: 3,
    updatedAt: '2026-08-30T09:00:00.000Z',
    coverColor: '#134074',
  },
  {
    id: 'prj_3',
    name: 'Apartamento modelo — Cedritos',
    client: 'Constructora Aria',
    status: 'quote_sent',
    memberCount: 6,
    updatedAt: '2026-09-01T18:45:00.000Z',
    coverColor: '#E9A23B',
  },
];

export const mockProducts: ProductDto[] = [
  {
    id: 'prd_1',
    name: 'Encimera de cuarzo Blanco Ártico',
    category: 'Superficies',
    price: 1250000,
    currency: 'COP',
    stock: 8,
    supports3dScan: true,
    supportsAr: true,
    accentColor: '#8DA9C4',
  },
  {
    id: 'prd_2',
    name: 'Grifería monomando acero cepillado',
    category: 'Grifería',
    price: 420000,
    currency: 'COP',
    stock: 23,
    supports3dScan: false,
    supportsAr: true,
    accentColor: '#616E7C',
  },
  {
    id: 'prd_3',
    name: 'Módulo alto 60cm roble natural',
    category: 'Mobiliario',
    price: 680000,
    currency: 'COP',
    stock: 0,
    supports3dScan: true,
    supportsAr: true,
    accentColor: '#E9A23B',
  },
  {
    id: 'prd_4',
    name: 'Panel LED empotrable 30x30',
    category: 'Iluminación',
    price: 155000,
    currency: 'COP',
    stock: 40,
    supports3dScan: false,
    supportsAr: false,
    accentColor: '#2A9D8F',
  },
];

export const mockAppointments: AppointmentDto[] = [
  {
    id: 'apt_1',
    title: 'Visita de medición',
    projectId: 'prj_2',
    projectName: 'Local comercial — Zona T',
    scheduledAt: '2026-09-05T15:00:00.000Z',
    status: 'confirmed',
    location: 'Cra. 13 #82-45, Bogotá',
  },
  {
    id: 'apt_2',
    title: 'Revisión de instalación',
    projectId: 'prj_1',
    projectName: 'Reforma cocina — Chapinero',
    scheduledAt: '2026-09-09T10:30:00.000Z',
    status: 'pending',
    location: 'Cl. 57 #9-20, Bogotá',
  },
];

export const mockNotifications: NotificationDto[] = [
  {
    id: 'ntf_1',
    type: 'appointment',
    title: 'Cita confirmada',
    body: 'La visita de medición del Local comercial — Zona T quedó confirmada para el 5 de septiembre.',
    createdAt: '2026-09-02T12:00:00.000Z',
    read: false,
  },
  {
    id: 'ntf_2',
    type: 'quote',
    title: 'Presupuesto enviado',
    body: 'Se envió el presupuesto del Apartamento modelo — Cedritos al cliente.',
    createdAt: '2026-09-01T18:50:00.000Z',
    read: false,
  },
  {
    id: 'ntf_3',
    type: 'project',
    title: 'Nuevo integrante',
    body: 'Diego Marín se unió al proyecto Reforma cocina — Chapinero.',
    createdAt: '2026-08-29T08:15:00.000Z',
    read: true,
  },
];
