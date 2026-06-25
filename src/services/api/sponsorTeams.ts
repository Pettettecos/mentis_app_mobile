import { api } from './client';
import type { SponsorTeamCreate, SponsorTeamRead } from './types';

export async function listSponsorTeams(
  sponsorId: string
): Promise<SponsorTeamRead[]> {
  const { data } = await api.get<SponsorTeamRead[]>('/api/v1/sponsor-teams', {
    params: { sponsor_id: sponsorId },
  });
  return data;
}

export async function createSponsorTeam(
  teamData: SponsorTeamCreate
): Promise<SponsorTeamRead> {
  const { data } = await api.post<SponsorTeamRead>(
    '/api/v1/sponsor-teams',
    teamData
  );
  return data;
}
