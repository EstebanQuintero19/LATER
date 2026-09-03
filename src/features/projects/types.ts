export type ProjectStatus =
  'measuring' | 'in_progress' | 'quote_sent' | 'closed';

export interface ProjectDto {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  memberCount: number;
  updatedAt: string;
  coverColor: string;
}

export interface Project extends Omit<ProjectDto, 'updatedAt'> {
  updatedAt: Date;
}

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  measuring: 'En medición',
  in_progress: 'En ejecución',
  quote_sent: 'Presupuesto enviado',
  closed: 'Cerrado',
};
