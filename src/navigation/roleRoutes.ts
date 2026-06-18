import type { UserRole } from '@/services/api';

const DASHBOARD_ROUTES: Partial<Record<UserRole, string>> = {
  ADMIN: '/(protected)/(admin)/dashboard',
  ENTERPRISE: '/(protected)/(enterprise)/dashboard',
  MANAGER: '/(protected)/(manager)/dashboard',
  PSYCHOLOGIST: '/(protected)/(psychologist)/dashboard',
};

export function getDashboardRoute(role?: UserRole | null): string | null {
  if (!role) {
    return null;
  }

  return DASHBOARD_ROUTES[role] ?? null;
}
