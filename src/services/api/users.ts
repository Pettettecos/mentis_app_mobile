import { api } from './client';
import type { UserCreate, UserRead, UserUpdate } from './types';

export async function createUser(userData: UserCreate): Promise<UserRead> {
  const { data } = await api.post<UserRead>('/api/v1/users', userData);
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

export async function deleteUser(userId: string): Promise<void> {
  await api.delete(`/api/v1/users/${userId}`);
}
