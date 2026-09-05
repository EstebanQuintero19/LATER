import { apiRequest } from '@/services/http/client';

import { Message, MessageDto } from '../types';

const toMessage = (dto: MessageDto): Message => ({
  ...dto,
  createdAt: new Date(dto.createdAt),
});

const sortOldestFirst = (a: Message, b: Message) =>
  a.createdAt.getTime() - b.createdAt.getTime();

export const messagesApi = {
  async list(projectId: string, signal?: AbortSignal): Promise<Message[]> {
    const res = await apiRequest<{ items: MessageDto[] }>(
      `/projects/${projectId}/messages`,
      { signal },
    );
    return res.items.map(toMessage).sort(sortOldestFirst);
  },

  async send(projectId: string, body: string): Promise<Message[]> {
    const res = await apiRequest<{ items: MessageDto[] }>(
      `/projects/${projectId}/messages`,
      { method: 'POST', body: { body } },
    );
    return res.items.map(toMessage).sort(sortOldestFirst);
  },
};
