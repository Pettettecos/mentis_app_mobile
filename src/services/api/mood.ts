import { api } from './client';
import type { MoodCreate, MoodRead } from './types';

export async function registerMood(payload: MoodCreate): Promise<void> {
  await api.post<void>('/api/v1/users/me/moods', payload);
}

export async function getUserMood(userId: string): Promise<MoodRead> {
  const { data } = await api.get<MoodRead>(`/api/v1/users/user/${userId}/mood`);
  return data;
}
