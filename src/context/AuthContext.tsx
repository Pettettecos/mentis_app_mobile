import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '@/services/api';
import type { LoginRequest, UserRead } from '@/services/api';

interface AuthContextData {
  user: UserRead | null;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserRead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.isAuthenticated().then(async (auth) => {
      if (auth) {
        try {
          const me = await authService.getMe();
          setUser(me);
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
    });
  }, []);

  const refreshUser = async () => {
    try {
      const me = await authService.getMe();
      setUser(me);
    } catch {
      setUser(null);
    }
  };

  const login = async (credentials: LoginRequest) => {
    await authService.login(credentials);
    const me = await authService.getMe();
    setUser(me);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
