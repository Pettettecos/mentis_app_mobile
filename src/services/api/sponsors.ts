import { api } from './client';
import type { SponsorCreate, SponsorRead } from './types';

export async function createSponsor(
  sponsorData: SponsorCreate
): Promise<SponsorRead> {
  const { data } = await api.post<SponsorRead>('/api/v1/sponsors', sponsorData);
  return data;
}
