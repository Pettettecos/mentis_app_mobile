import { api } from './client';
import type { AdminDashboardMetrics } from './types';

export async function getAdminDashboard(): Promise<AdminDashboardMetrics> {
  const { data } = await api.get<AdminDashboardMetrics>('/api/v1/admin/dashboard');
  return data;
}
