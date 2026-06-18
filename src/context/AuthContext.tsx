import React, { createContext, useContext, useEffect, useState } from 'react';

import { authService } from '@/services/api';
import { subscribeToSessionExpired } from '@/services/api/client';
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
    let isMounted = true;

    const unsubscribe = subscribeToSessionExpired(() => {
      if (isMounted) {
        setUser(null);
      }
    });

    void (async () => {
      const auth = await authService.isAuthenticated();

      if (!isMounted) {
        return;
      }

      if (auth) {
        try {
          const me = await authService.getMe();
          if (isMounted) {
            setUser(me);
          }
        } catch {
          if (isMounted) {
            setUser(null);
          }
        }
      }

      if (isMounted) {
        setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
      unsubscribe();
    };
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
