import { apiRequest } from '@/services/http/client';

import { CreateRemodelRequest, Project, ProjectDto } from '../types';

const toProject = (dto: ProjectDto): Project => ({
  ...dto,
  updatedAt: new Date(dto.updatedAt),
});

export const projectsApi = {
  async list(signal?: AbortSignal): Promise<Project[]> {
    const res = await apiRequest<{ items: ProjectDto[] }>('/projects', {
      signal,
    });
    return res.items.map(toProject);
  },

  async getById(id: string, signal?: AbortSignal): Promise<Project> {
    const dto = await apiRequest<ProjectDto>(`/projects/${id}`, { signal });
    return toProject(dto);
  },

  async create(payload: CreateRemodelRequest): Promise<Project> {
    const dto = await apiRequest<ProjectDto>('/projects', {
      method: 'POST',
      body: payload,
    });
    return toProject(dto);
  },
};
