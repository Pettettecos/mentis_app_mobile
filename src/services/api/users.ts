import { api } from './client';
import type {
  ManagerUserCreate,
  ManagerUserCreateResponse,
  ManagerUserTeamUpdate,
  UserCreate,
  UserRead,
  UserUpdate,
} from './types';

export async function listUsers(): Promise<UserRead[]> {
  const { data } = await api.get<UserRead[]>('/api/v1/users');
  return data;
}

export async function createUser(userData: UserCreate): Promise<UserRead> {
  const { data } = await api.post<UserRead>('/api/v1/users', userData);
  return data;
}

export async function createManagerUser(
  userData: ManagerUserCreate
): Promise<ManagerUserCreateResponse> {
  const { data } = await api.post<ManagerUserCreateResponse>(
    '/api/v1/users/manager-created',
    userData
  );
  return data;
}

export async function getUser(userId: string): Promise<UserRead> {
  const { data } = await api.get<UserRead>(`/api/v1/users/${userId}`);
  return data;
}

export async function updateUser(
  userId: string,
  userData: UserUpdate
): Promise<UserRead> {
  const { data } = await api.patch<UserRead>(
    `/api/v1/users/${userId}`,
    userData
  );
  return data;
}

export async function updateManagerUserTeam(
  userId: string,
  userData: ManagerUserTeamUpdate
): Promise<UserRead> {
  const { data } = await api.patch<UserRead>(
    `/api/v1/users/${userId}/sponsor-team`,
    userData
  );
  return data;
}

export async function deleteUser(userId: string): Promise<void> {
  await api.delete(`/api/v1/users/${userId}`);
}
