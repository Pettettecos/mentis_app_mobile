import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { API_URL } from './config';
import type { TokenResponse } from './types';

/* global window */

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const sessionExpiredListeners = new Set<() => void>();
const isWeb = Platform.OS === 'web';

export function subscribeToSessionExpired(listener: () => void): () => void {
  sessionExpiredListeners.add(listener);
  return () => sessionExpiredListeners.delete(listener);
}

function notifySessionExpired(): void {
  sessionExpiredListeners.forEach((listener) => listener());
}

function readWebStorage(key: string): string | null {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }

  return window.localStorage.getItem(key);
}

function writeWebStorage(key: string, value: string): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  window.localStorage.setItem(key, value);
}

function removeWebStorage(key: string): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  window.localStorage.removeItem(key);
}

async function readSecureStorage(key: string): Promise<string | null> {
  if (typeof SecureStore.getItemAsync !== 'function') {
    return null;
  }

  return SecureStore.getItemAsync(key);
}

async function writeSecureStorage(key: string, value: string): Promise<void> {
  if (typeof SecureStore.setItemAsync !== 'function') {
    return;
  }

  await SecureStore.setItemAsync(key, value);
}

async function removeSecureStorage(key: string): Promise<void> {
  if (typeof SecureStore.deleteItemAsync !== 'function') {
    return;
  }

  await SecureStore.deleteItemAsync(key);
}

export async function getStoredAccessToken(): Promise<string | null> {
  if (isWeb) {
    return readWebStorage(ACCESS_TOKEN_KEY);
  }

  try {
    return await readSecureStorage(ACCESS_TOKEN_KEY);
  } catch {
    return readWebStorage(ACCESS_TOKEN_KEY);
  }
}

export async function getStoredRefreshToken(): Promise<string | null> {
  if (isWeb) {
    return readWebStorage(REFRESH_TOKEN_KEY);
  }

  try {
    return await readSecureStorage(REFRESH_TOKEN_KEY);
  } catch {
    return readWebStorage(REFRESH_TOKEN_KEY);
  }
}

export async function storeTokens(tokens: TokenResponse): Promise<void> {
  if (isWeb) {
    writeWebStorage(ACCESS_TOKEN_KEY, tokens.access_token);
    writeWebStorage(REFRESH_TOKEN_KEY, tokens.refresh_token);
    return;
  }

  try {
    await writeSecureStorage(ACCESS_TOKEN_KEY, tokens.access_token);
    await writeSecureStorage(REFRESH_TOKEN_KEY, tokens.refresh_token);
    return;
  } catch {
    writeWebStorage(ACCESS_TOKEN_KEY, tokens.access_token);
    writeWebStorage(REFRESH_TOKEN_KEY, tokens.refresh_token);
  }
}

export async function clearTokens(): Promise<void> {
  if (isWeb) {
    removeWebStorage(ACCESS_TOKEN_KEY);
    removeWebStorage(REFRESH_TOKEN_KEY);
    return;
  }

  try {
    await removeSecureStorage(ACCESS_TOKEN_KEY);
    await removeSecureStorage(REFRESH_TOKEN_KEY);
    return;
  } catch {
    removeWebStorage(ACCESS_TOKEN_KEY);
    removeWebStorage(REFRESH_TOKEN_KEY);
  }
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await getStoredAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getStoredRefreshToken();
        if (!refreshToken) {
          await clearTokens();
          return Promise.reject(error);
        }

        const { data } = await axios.post<TokenResponse>(
          `${API_URL}/api/v1/auth/refresh`,
          {
            refresh_token: refreshToken,
          }
        );

        await storeTokens(data);
        api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
        processQueue(null, data.access_token);
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        await clearTokens();
        notifySessionExpired();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export { api };
