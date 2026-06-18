import { api } from './client';

export type MoodCheckInMood = 'great' | 'good' | 'neutral' | 'low';

export interface MoodCheckInCreate {
  mood: MoodCheckInMood;
  note?: string | null;
}

export interface MoodCheckIn {
  id: string;
  user_id: string;
  user_name: string;
  mood: MoodCheckInMood;
  note: string | null;
  checked_in_for: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export async function createMyMoodCheckIn(
  payload: MoodCheckInCreate
): Promise<MoodCheckIn> {
  const { data } = await api.post<MoodCheckIn>('/api/v1/mood-checkins/me', payload);
  return data;
}

export async function listMyMoodCheckIns(): Promise<MoodCheckIn[]> {
  const { data } = await api.get<MoodCheckIn[]>('/api/v1/mood-checkins/me');
  return data;
}

export async function listSponsorMoodCheckIns(
  userId?: string
): Promise<MoodCheckIn[]> {
  const { data } = await api.get<MoodCheckIn[]>('/api/v1/mood-checkins', {
    params: userId ? { user_id: userId } : undefined,
  });
  return data;
}
