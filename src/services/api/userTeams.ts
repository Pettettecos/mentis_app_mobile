import { api } from './client';
import type { UserTeamCreate, UserTeamRead } from './types';

export async function createUserTeam(
  userTeamData: UserTeamCreate
): Promise<UserTeamRead> {
  const { data } = await api.post<UserTeamRead>(
    '/api/v1/user-teams',
    userTeamData
  );
  return data;
}
