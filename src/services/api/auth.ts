import { api, storeTokens, clearTokens, getStoredAccessToken } from './client';
import type { LoginRequest, TokenResponse, UserRead } from './types';

export async function login(credentials: LoginRequest): Promise<TokenResponse> {
  const { data } = await api.post<TokenResponse>(
    '/api/v1/auth/login',
    credentials
  );
  await storeTokens(data);
  return data;
}

export async function refresh(refreshToken: string): Promise<TokenResponse> {
  const { data } = await api.post<TokenResponse>('/api/v1/auth/refresh', {
    refresh_token: refreshToken,
  });
  await storeTokens(data);
  return data;
}

export async function logout(): Promise<void> {
  try {
    await api.post('/api/v1/auth/logout');
  } finally {
    await clearTokens();
  }
}

export async function getMe(): Promise<UserRead> {
  const { data } = await api.get<UserRead>('/api/v1/users/me');
  return data;
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getStoredAccessToken();
  return !!token;
}
