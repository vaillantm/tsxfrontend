import React, { createContext, useContext, useMemo, useState } from 'react';
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
    } catch (_e) { void 0; }
    return { token: null, user: null };
  });

  // On mount, if we have a token, always refresh user from backend to get latest avatar
  React.useEffect(() => {
    if (state.token) {
      (async () => {
        try {
          const user = await meCurrent();
          const next = { token: state.token, user } as AuthState;
          setState(next);
          try { localStorage.setItem('auth', JSON.stringify(next)); } catch (_e) { void 0; }
        } catch (_e) { /* ignore */ }
      })();
    }
  }, [state.token]);

  const value = useMemo<AuthContextValue>(() => ({
    token: state.token,
    user: state.user,
    login: (auth: AuthResponse) => {
      const next = { token: auth.token, user: auth.user } as AuthState;
      setState(next);
      try { localStorage.setItem('auth', JSON.stringify(next)); } catch (_e) { void 0; }
    },
    logout: () => {
      // best-effort server logout (non-blocking)
      try { void logoutService(); } catch (_e) { void 0; }
      setState({ token: null, user: null });
      try { localStorage.removeItem('auth'); } catch (_e) { void 0; }
    },
    refreshUser: async () => {
      try {
        const user = await meCurrent();
        const next = { token: state.token, user } as AuthState;
        setState(next);
        try { localStorage.setItem('auth', JSON.stringify(next)); } catch (_e) { void 0; }
      } catch (_e) { /* ignore */ }
    },
  }), [state.token, state.user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
