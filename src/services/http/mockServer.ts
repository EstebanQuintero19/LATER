import { env } from '@/config/env';
import { mockDb } from '@/mock/db';
import { DEMO_PASSWORD, projectCoverColors } from '@/mock/fixtures';
import type { MockUser } from '@/mock/fixtures';
import { AppointmentDto } from '@/features/appointments/types';
import { NotificationDto } from '@/features/notifications/types';
import {
  CreateRemodelRequest,
  MessageDto,
  PreferredTiming,
  ProjectDto,
  REMODEL_TYPE_LABEL,
} from '@/features/projects/types';

import { ApiError } from './errors';
import type { HttpMethod } from './client';

interface MockRequest {
  path: string;
  method: HttpMethod;
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
  token: string | null;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Fecha sugerida para la visita de medición según la urgencia elegida. */
function scheduledAtFor(timing: PreferredTiming | undefined): string {
  const daysFromNow: Record<PreferredTiming, number> = {
    this_week: 3,
    next_week: 9,
    this_month: 21,
    flexible: 30,
  };
  const days = timing ? daysFromNow[timing] : daysFromNow.flexible;
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

/** `Bearer` sintético: `mock.<userId>`. Válido si el usuario existe. */
function userIdFromToken(token: string | null): string | null {
  if (!token?.startsWith('mock.')) return null;
  const id = token.slice('mock.'.length);
  return mockDb.users.some((u) => u.id === id) ? id : null;
}

/** Forma pública del usuario (sin `password`) que sale en login/registro. */
function toPublicUser(user: MockUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    address: user.address,
    phone: user.phone,
  };
}

function sessionFor(user: MockUser) {
  return {
    accessToken: `mock.${user.id}`,
    refreshToken: `mockrefresh.${user.id}`,
    expiresIn: 3600,
    user: toPublicUser(user),
  };
}

function requireAuth(token: string | null): string {
  const userId = userIdFromToken(token);
  if (!userId) {
    throw new ApiError({
      status: 401,
      code: 'unauthorized',
      message: 'Sesión no válida',
    });
  }
  return userId;
}

/**
 * Enrutador del backend simulado. Devuelve la misma forma que devolvería la
 * API REST real, de modo que la capa de features es agnóstica al origen.
 */
export async function handleMockRequest<T>(req: MockRequest): Promise<T> {
  await delay(env.mockLatencyMs);
  const route = `${req.method} ${req.path.replace(/\?.*$/, '')}`;

  switch (true) {
    // ---- Auth --------------------------------------------------------------
    case route === 'POST /auth/login': {
      const { email, password } = (req.body ?? {}) as {
        email?: string;
        password?: string;
      };
      const user = mockDb.users.find(
        (u) => u.email.toLowerCase() === String(email).toLowerCase(),
      );
      // Cuentas registradas de verdad: su propia contraseña. Además, se
      // conserva el atajo de demo (cualquier correo válido + la contraseña
      // demo) para que el revisor del portafolio no necesite credenciales
      // exactas.
      const emailLooksValid = /.+@.+\..+/.test(String(email));
      const validDemo = !user && emailLooksValid && password === DEMO_PASSWORD;
      const validOwn = !!user && password === user.password;
      if (!validDemo && !validOwn) {
        throw new ApiError({
          status: 401,
          code: 'invalid_credentials',
          message: 'Credenciales incorrectas',
        });
      }
      const resolved = user ?? mockDb.users[0];
      return sessionFor(resolved) as T;
    }

    case route === 'POST /auth/register': {
      const body = (req.body ?? {}) as Partial<{
        name: string;
        email: string;
        password: string;
        address: string;
        phone: string;
      }>;
      if (!body.name || !body.email || !body.password) {
        throw new ApiError({
          status: 422,
          code: 'validation_error',
          message: 'Faltan campos obligatorios del registro',
        });
      }
      const email = body.email.toLowerCase();
      if (mockDb.users.some((u) => u.email.toLowerCase() === email)) {
        throw new ApiError({
          status: 409,
          code: 'email_taken',
          message: 'Ya existe una cuenta con ese correo',
        });
      }
      const user: MockUser = {
        id: `usr_${mockDb.users.length + 1}`,
        name: body.name,
        email: body.email,
        password: body.password,
        address: body.address,
        phone: body.phone,
      };
      mockDb.users = [...mockDb.users, user];
      // Registrarse deja la sesión iniciada de una vez, sin pasar por Login.
      return sessionFor(user) as T;
    }

    case route === 'POST /auth/logout': {
      requireAuth(req.token);
      return undefined as T;
    }

    // ---- Projects --------------------------------------------------------
    case route === 'GET /projects': {
      requireAuth(req.token);
      return { items: mockDb.projects } as T;
    }

    case req.method === 'GET' && /^\/projects\/[^/]+$/.test(req.path): {
      requireAuth(req.token);
      const id = req.path.split('/')[2];
      const project = mockDb.projects.find((p) => p.id === id);
      if (!project) {
        throw new ApiError({
          status: 404,
          code: 'not_found',
          message: 'Proyecto no encontrado',
        });
      }
      return project as T;
    }

    // "Solicitar remodelación": registra el proyecto y, como haría un backend
    // real orquestando el caso de uso completo, agenda de una vez la visita
    // de medición y notifica la recepción de la solicitud.
    case route === 'POST /projects': {
      requireAuth(req.token);
      const body = (req.body ?? {}) as Partial<CreateRemodelRequest>;
      if (!body.client || !body.location || !body.remodelType) {
        throw new ApiError({
          status: 422,
          code: 'validation_error',
          message: 'Faltan campos obligatorios de la solicitud',
        });
      }

      const now = new Date().toISOString();
      const seq = mockDb.projects.length + 1;
      const id = `prj_req_${seq}`;
      const name = `${REMODEL_TYPE_LABEL[body.remodelType]} — ${body.location}`;

      const project: ProjectDto = {
        id,
        name,
        client: body.client,
        status: 'measuring',
        memberCount: 1,
        updatedAt: now,
        coverColor: projectCoverColors[seq % projectCoverColors.length],
        remodelType: body.remodelType,
        location: body.location,
        sizeM2: body.sizeM2,
        budgetRange: body.budgetRange,
        description: body.description,
      };
      mockDb.projects = [project, ...mockDb.projects];

      const appointment: AppointmentDto = {
        id: `apt_req_${seq}`,
        title: 'Visita de medición',
        projectId: id,
        projectName: name,
        scheduledAt: scheduledAtFor(body.preferredTiming),
        status: 'pending',
        location: body.location,
      };
      mockDb.appointments = [appointment, ...mockDb.appointments];

      const notification: NotificationDto = {
        id: `ntf_req_${seq}`,
        type: 'project',
        title: 'Solicitud recibida',
        body: `Registramos "${name}" para ${body.client} y agendamos la visita de medición.`,
        createdAt: now,
        read: false,
      };
      mockDb.notifications = [notification, ...mockDb.notifications];

      return project as T;
    }

    // ---- Consultas ("consultar con el remodelador") ----------------------
    case req.method === 'GET' &&
      /^\/projects\/[^/]+\/messages$/.test(req.path): {
      requireAuth(req.token);
      const projectId = req.path.split('/')[2];
      const items = mockDb.messages.filter((m) => m.projectId === projectId);
      return { items } as T;
    }

    case req.method === 'POST' &&
      /^\/projects\/[^/]+\/messages$/.test(req.path): {
      requireAuth(req.token);
      const projectId = req.path.split('/')[2];
      const project = mockDb.projects.find((p) => p.id === projectId);
      if (!project) {
        throw new ApiError({
          status: 404,
          code: 'not_found',
          message: 'Proyecto no encontrado',
        });
      }
      const { body: text } = (req.body ?? {}) as { body?: string };
      if (!text?.trim()) {
        throw new ApiError({
          status: 422,
          code: 'validation_error',
          message: 'El mensaje no puede estar vacío',
        });
      }

      const now = Date.now();
      const seq = mockDb.messages.length + 1;
      const clientMessage: MessageDto = {
        id: `msg_${seq}`,
        projectId,
        author: 'client',
        body: text.trim(),
        createdAt: new Date(now).toISOString(),
      };
      // Respuesta automática simulada: en esta demo no hay una persona real
      // al otro lado, pero el hilo debe sentirse vivo.
      const staffReply: MessageDto = {
        id: `msg_${seq + 1}`,
        projectId,
        author: 'staff',
        body: 'Gracias por escribir. El equipo de LATER revisará tu mensaje y te responderá pronto.',
        createdAt: new Date(now + 1000).toISOString(),
      };
      mockDb.messages = [...mockDb.messages, clientMessage, staffReply];

      const notification: NotificationDto = {
        id: `ntf_msg_${mockDb.notifications.length + 1}`,
        type: 'project',
        title: 'Consulta enviada',
        body: `Tu mensaje sobre "${project.name}" fue enviado al equipo.`,
        createdAt: new Date(now).toISOString(),
        read: false,
      };
      mockDb.notifications = [notification, ...mockDb.notifications];

      return {
        items: mockDb.messages.filter((m) => m.projectId === projectId),
      } as T;
    }

    // ---- Catalog --------------------------------------------------------
    case route === 'GET /products': {
      requireAuth(req.token);
      const search = String(req.query?.search ?? '').toLowerCase();
      const items = search
        ? mockDb.products.filter(
            (p) =>
              p.name.toLowerCase().includes(search) ||
              p.category.toLowerCase().includes(search),
          )
        : mockDb.products;
      return { items } as T;
    }

    case req.method === 'GET' && /^\/products\/[^/]+$/.test(req.path): {
      requireAuth(req.token);
      const id = req.path.split('/')[2];
      const product = mockDb.products.find((p) => p.id === id);
      if (!product) {
        throw new ApiError({
          status: 404,
          code: 'not_found',
          message: 'Producto no encontrado',
        });
      }
      return product as T;
    }

    // ---- Appointments -------------------------------------------------
    case route === 'GET /appointments': {
      requireAuth(req.token);
      return { items: mockDb.appointments } as T;
    }

    case req.method === 'PATCH' && /^\/appointments\/[^/]+$/.test(req.path): {
      requireAuth(req.token);
      const id = req.path.split('/')[2];
      const patch = (req.body ?? {}) as { status?: string };
      const appointment = mockDb.appointments.find((a) => a.id === id);
      if (!appointment) {
        throw new ApiError({
          status: 404,
          code: 'not_found',
          message: 'Cita no encontrada',
        });
      }
      if (patch.status === 'cancelled') appointment.status = 'cancelled';
      return appointment as T;
    }

    // ---- Notifications ----------------------------------------------
    case route === 'GET /notifications': {
      requireAuth(req.token);
      return { items: mockDb.notifications } as T;
    }

    case route === 'POST /notifications/mark-all-read': {
      requireAuth(req.token);
      mockDb.notifications = mockDb.notifications.map((n) => ({
        ...n,
        read: true,
      }));
      return { items: mockDb.notifications } as T;
    }

    case req.method === 'POST' &&
      /^\/notifications\/[^/]+\/read$/.test(req.path): {
      requireAuth(req.token);
      const id = req.path.split('/')[2];
      mockDb.notifications = mockDb.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      );
      return { items: mockDb.notifications } as T;
    }

    default:
      throw new ApiError({
        status: 404,
        code: 'route_not_found',
        message: `Ruta no simulada: ${route}`,
      });
  }
}
