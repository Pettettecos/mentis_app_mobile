import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from './config';
import type { TokenResponse } from './types';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export async function getStoredAccessToken(): Promise<string | null> {
  if (typeof SecureStore.getItemAsync === 'function') {
    return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  }
  // fallback for web where expo-secure-store may not implement async methods
  if (typeof window !== 'undefined' && window.localStorage) {
    return Promise.resolve(window.localStorage.getItem(ACCESS_TOKEN_KEY));
  }
  return null;
}

export async function getStoredRefreshToken(): Promise<string | null> {
  if (typeof SecureStore.getItemAsync === 'function') {
    return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  }
  if (typeof window !== 'undefined' && window.localStorage) {
    return Promise.resolve(window.localStorage.getItem(REFRESH_TOKEN_KEY));
  }
  return null;
}

export async function storeTokens(tokens: TokenResponse): Promise<void> {
  if (typeof SecureStore.setItemAsync === 'function') {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.access_token);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refresh_token);
    return;
  }
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
    window.localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
  }
}

export async function clearTokens(): Promise<void> {
  if (typeof SecureStore.deleteItemAsync === 'function') {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    return;
  }
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
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
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export { api };
