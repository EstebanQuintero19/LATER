export type ProjectStatus =
  'measuring' | 'in_progress' | 'quote_sent' | 'closed';

export type RemodelType =
  | 'kitchen'
  | 'bathroom'
  | 'living_room'
  | 'bedroom'
  | 'full_home'
  | 'commercial'
  | 'facade'
  | 'other';

export type BudgetRange =
  'under_10m' | '10m_30m' | '30m_60m' | 'over_60m' | 'unsure';

export type PreferredTiming =
  'this_week' | 'next_week' | 'this_month' | 'flexible';

export interface ProjectDto {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  memberCount: number;
  updatedAt: string;
  coverColor: string;
  // Detalle de la solicitud original (sólo presente en proyectos creados
  // desde "Solicitar remodelación"; los proyectos semilla no lo tienen).
  remodelType?: RemodelType;
  location?: string;
  sizeM2?: number;
  budgetRange?: BudgetRange;
  description?: string;
}

export interface Project extends Omit<ProjectDto, 'updatedAt'> {
  updatedAt: Date;
}

/** Payload para registrar una nueva solicitud de remodelación. */
export interface CreateRemodelRequest {
  client: string;
  remodelType: RemodelType;
  location: string;
  sizeM2?: number;
  budgetRange?: BudgetRange;
  description?: string;
  preferredTiming: PreferredTiming;
}

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  measuring: 'En medición',
  in_progress: 'En ejecución',
  quote_sent: 'Presupuesto enviado',
  closed: 'Cerrado',
};

export const REMODEL_TYPE_LABEL: Record<RemodelType, string> = {
  kitchen: 'Cocina',
  bathroom: 'Baño',
  living_room: 'Sala / comedor',
  bedroom: 'Habitación',
  full_home: 'Vivienda completa',
  commercial: 'Local comercial',
  facade: 'Fachada / exterior',
  other: 'Otro',
};

export const BUDGET_RANGE_LABEL: Record<BudgetRange, string> = {
  under_10m: 'Menos de $10M',
  '10m_30m': '$10M – $30M',
  '30m_60m': '$30M – $60M',
  over_60m: 'Más de $60M',
  unsure: 'Aún no lo sé',
};

export const PREFERRED_TIMING_LABEL: Record<PreferredTiming, string> = {
  this_week: 'Esta semana',
  next_week: 'La próxima semana',
  this_month: 'En el próximo mes',
  flexible: 'Sin prisa',
};
