import { AppointmentDto } from '@/features/appointments/types';
import { ProductDto } from '@/features/catalog/types';
import { NotificationDto } from '@/features/notifications/types';
import { MessageDto, ProjectDto } from '@/features/projects/types';

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
}

export const DEMO_PASSWORD = 'later1234';

export const mockUsers: MockUser[] = [
  {
    id: 'usr_1',
    name: 'Alba Restrepo',
    email: 'alba@later.example',
    password: DEMO_PASSWORD,
    address: 'Cl. 90 #11-25, Bogotá',
    phone: '+57 300 555 0142',
  },
];

/** Paleta de acento para portadas de proyectos creados dinámicamente. */
export const projectCoverColors = [
  '#5C7F6B',
  '#3F5E58',
  '#C4882F',
  '#8C7A67',
  '#A9552F',
] as const;

export const mockProjects: ProjectDto[] = [
  {
    id: 'prj_1',
    name: 'Reforma cocina — Chapinero',
    client: 'Familia Gómez',
    status: 'in_progress',
    memberCount: 4,
    updatedAt: '2026-08-28T14:10:00.000Z',
    coverColor: '#5C7F6B',
  },
  {
    id: 'prj_2',
    name: 'Local comercial — Zona T',
    client: 'Café Norte',
    status: 'measuring',
    memberCount: 3,
    updatedAt: '2026-08-30T09:00:00.000Z',
    coverColor: '#3F5E58',
  },
  {
    id: 'prj_3',
    name: 'Apartamento modelo — Cedritos',
    client: 'Constructora Aria',
    status: 'quote_sent',
    memberCount: 6,
    updatedAt: '2026-09-01T18:45:00.000Z',
    coverColor: '#C4882F',
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
    accentColor: '#8C7A67',
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
    accentColor: '#3F5E58',
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
    accentColor: '#A9552F',
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
    accentColor: '#5C7F6B',
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

export const mockMessages: MessageDto[] = [
  {
    id: 'msg_1',
    projectId: 'prj_2',
    author: 'client',
    body: '¿Podríamos adelantar la visita de medición una semana?',
    createdAt: '2026-09-02T09:00:00.000Z',
  },
  {
    id: 'msg_2',
    projectId: 'prj_2',
    author: 'staff',
    body: 'Claro, la reagendamos. Te confirmamos fecha y hora en Citas.',
    createdAt: '2026-09-02T10:15:00.000Z',
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
