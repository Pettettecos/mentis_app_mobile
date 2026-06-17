import { api } from './client';
import type { UserStreakDto } from './types';

export async function getUserStreak(): Promise<UserStreakDto> {
  const { data } = await api.get<UserStreakDto>('/api/v1/users/me/streak');
  return data;
}
