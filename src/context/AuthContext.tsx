import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import type { AuthResponse } from '../models/auth';
import { logout as logoutService, meCurrent } from '../services/auth';

interface AuthState {
  token: string | null;
  user: AuthResponse['user'] | null;
}

interface AuthContextValue extends AuthState {
  login: (auth: AuthResponse) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    try {
      const raw = localStorage.getItem('auth');
      if (raw) return JSON.parse(raw) as AuthState;
    } catch (_e) {}
    return { token: null, user: null };
  });

  // Refresh user on mount if token exists
  useEffect(() => {
    if (state.token) {
      (async () => {
        try {
          const user = await meCurrent();
          const next = { token: state.token, user } as AuthState;
          setState(next);
          localStorage.setItem('auth', JSON.stringify(next));
        } catch (_e) { /* ignore errors */ }
      })();
    }
  }, [state.token]);

  const value = useMemo<AuthContextValue>(() => ({
    token: state.token,
    user: state.user,
    login: (auth: AuthResponse) => {
      const next = { token: auth.token, user: auth.user } as AuthState;
      setState(next);
      localStorage.setItem('auth', JSON.stringify(next));
    },
    logout: () => {
      try { void logoutService(); } catch (_e) {}
      setState({ token: null, user: null });
      localStorage.removeItem('auth');
    },
    refreshUser: async () => {
      try {
        const user = await meCurrent();
        const next = { token: state.token, user } as AuthState;
        setState(next);
        localStorage.setItem('auth', JSON.stringify(next));
      } catch (_e) {}
    }
  }), [state.token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
