# Project Setup Guide

## Overview
This is a React e‑commerce frontend using **React Query** for server state, **Axios** for HTTP, and a layered architecture: **Models → Services → Hooks → Components**.

---

## 1️⃣ Prerequisites

- Node.js (>=18)
- A package manager (`npm` or `yarn` or `pnpm`)
- Backend API running (see `.env` for `VITE_API_URL`)

---

## 2️⃣ Install Dependencies

```bash
# Core
npm install react react-dom

# Router
npm install react-router-dom

# HTTP client
npm install axios

# Server state & caching
npm install @tanstack/react-query

# Icons (used in UI)
npm install @fortawesome/react-fontawesome
npm install @fortawesome/free-solid-svg-icons
npm install @fortawesome/free-regular-svg-icons
npm install @fortawesome/fontawesome-svg-core

# Toasts (optional, we provide a minimal ToastProvider)
# No extra packages needed; see src/context/ToastContext.tsx
```

---

## 3️⃣ Environment Variables

Create `.env` at the root:

```env
VITE_API_URL=http://localhost:3000
VITE_USE_MOCK=false
```

- `VITE_API_URL`: Base URL for your backend API.
- `VITE_USE_MOCK`: Set to `true` to use mock responses (useful for development without a backend).

---

## 4️⃣ Axios Configuration

**File:** `src/services/api.ts`

```ts
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
});

// Auto‑inject Bearer token from localStorage
api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('auth');
    if (raw) {
      const parsed = JSON.parse(raw) as { token: string | null };
      if (parsed?.token) {
        (config.headers ||= {} as any);
        (config.headers as any).Authorization = `Bearer ${parsed.token}`;
      }
    }
  } catch (_e) { void 0; }
  return config;
});
```

- All API calls go through this instance.
- JWT is automatically added to `Authorization: Bearer <token>`.

---

## 5️⃣ Models (Typings)

**Folder:** `src/models/`

- Define TypeScript interfaces for request/response payloads.
- Example: `src/models/auth.ts`

```ts
export type UserRole = 'admin' | 'vendor' | 'customer';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar?: string;
    role: UserRole;
  };
}
```

---

## 6️⃣ Services (API Functions)

**Folder:** `src/services/`

- One file per domain (e.g., `auth.ts`, `products.ts`).
- Export async functions that use the `api` instance.
- Example: `src/services/auth.ts`

```ts
import { api } from './api';
import type { LoginPayload, RegisterPayload, AuthResponse } from '../models/auth';

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/api/auth/login', payload);
  return data;
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/api/auth/register', payload);
  return data;
}

export async function meCurrent(): Promise<AuthResponse['user']> {
  const { data } = await api.get<AuthResponse['user']>('/api/auth/me');
  return data;
}

export async function logout(): Promise<void> {
  await api.post('/api/auth/logout');
}

export async function uploadProfile(file: File): Promise<void> {
  const form = new FormData();
  form.append('file', file);
  await api.post('/api/uploads/profile', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
```

---

## 7️⃣ React Query Hooks

**Folder:** `src/hooks/`

- Wrap service calls with `useMutation` or `useQuery`.
- Provide onSuccess/onError callbacks (e.g., to show toasts).
- Example: `src/hooks/useAuth.ts`

```ts
import { useMutation } from '@tanstack/react-query';
import * as AuthService from '../services/auth';
import type { LoginPayload, RegisterPayload, AuthResponse } from '../models/auth';
import { useAuthContext } from '../context/AuthContext';

export function useLogin() {
  const { login } = useAuthContext();
  return useMutation<{ data: AuthResponse }, Error, LoginPayload>({
    mutationFn: async (payload) => {
      const res = await AuthService.login(payload);
      login(res);
      return { data: res };
    },
  });
}

export function useRegister() {
  const { login } = useAuthContext();
  return useMutation<{ data: AuthResponse }, Error, RegisterPayload>({
    mutationFn: async (payload) => {
      const res = await AuthService.register(payload);
      login(res);
      return { data: res };
    },
  });
}

export function useForgotPassword() {
  return useMutation<void, Error, { email: string }>({
    mutationFn: async ({ email }) => {
      await AuthService.forgotPassword(email);
    },
  });
}
```

---

## 8️⃣ Context Providers

**Folder:** `src/context/`

- **AuthContext:** Global auth state (token + user) + login/logout/refreshUser.
- **ToastContext:** Minimal toast system (no external library needed).

**Example:** `src/context/AuthContext.tsx`

```ts
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

  // On mount, if token exists but user missing, fetch from backend
  React.useEffect(() => {
    if (state.token && !state.user) {
      (async () => {
        try {
          const user = await meCurrent();
          const next = { token: state.token, user } as AuthState;
          setState(next);
          localStorage.setItem('auth', JSON.stringify(next));
        } catch (_e) { /* ignore */ }
      })();
    }
  }, [state.token, state.user]);

  const value = useMemo<AuthContextValue>(() => ({
    token: state.token,
    user: state.user,
    login: (auth: AuthResponse) => {
      const next = { token: auth.token, user: auth.user } as AuthState;
      setState(next);
      localStorage.setItem('auth', JSON.stringify(next));
    },
    logout: () => {
      try { void logoutService(); } catch (_e) { void 0; }
      setState({ token: null, user: null });
      localStorage.removeItem('auth');
    },
    refreshUser: async () => {
      try {
        const user = await meCurrent();
        const next = { token: state.token, user } as AuthState;
        setState(next);
        localStorage.setItem('auth', JSON.stringify(next));
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
```

---

## 9️⃣ App Root with Providers

**File:** `src/main.tsx`

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
```

---

## 🔟 Routing

**File:** `src/App.tsx`

- Use `react-router-dom` to map paths to page components.
- Example:

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          {/* Add more routes as needed */}
        </Routes>
        <CartSidebar />
      </Router>
    </CartProvider>
  );
}

export default App;
```

---

## 1️⃣1️⃣ Components & Pages

- **Components:** Reusable UI (Header, Footer, Navbar, ProductCard, etc.).
- **Pages:** Route-level components that compose components and hooks.
- **Example:** `src/pages/SignIn.tsx` uses `useLogin`, `useRegister`, `useForgotPassword` and `useToast`.

---

## 1️⃣2️⃣ Toasts (Optional)

- We provide a minimal `ToastProvider` in `src/context/ToastContext.tsx`.
- Usage:

```tsx
import { useToast } from '../context/ToastContext';

const { showToast } = useToast();
showToast('Success!', 'success');
showToast('Error!', 'error');
```

---

## 1️⃣3️⃣ How Data Flows

```
Component/Page
   ↓ (calls)
Hook (useMutation/useQuery)
   ↓ (calls)
Service (axios)
   ↓ (HTTP)
Backend API
   ↓ (response)
Service → Hook → Component (React Query caches result)
```

- **Models** define TypeScript contracts.
- **Services** are pure API callers.
- **Hooks** wrap services with React Query logic and callbacks.
- **Components** use hooks; they never call services directly.

---

## 1️⃣4️⃣ Mock Mode (Development)

If `VITE_USE_MOCK=true`, services return mock data without hitting the backend. See `src/services/auth.ts` for examples.

---

## 1️⃣5️⃣ Running the Project

```bash
npm install
npm run dev
```

Open `http://localhost:5173` (Vite default).

---

## 1️⃣6️⃣ Common Patterns

### Fetching Data (Query)

```tsx
import { useQuery } from '@tanstack/react-query';
import { meCurrent } from '../services/auth';

function Profile() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: meCurrent,
    enabled: !!localStorage.getItem('auth'), // optional guard
  });
  // render UI
}
```

### Mutating Data (Mutation)

```tsx
import { useMutation } from '@tanstack/react-query';
import { uploadProfile } from '../services/auth';
import { useToast } from '../context/ToastContext';

function AvatarUpload() {
  const { showToast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: uploadProfile,
    onSuccess: () => showToast('Avatar uploaded', 'success'),
    onError: (err) => showToast(err.message, 'error'),
  });
  // UI to trigger mutate(file)
}
```

---

## 1️⃣7️⃣ Summary

- **Axios** is configured once with token injection.
- **React Query** handles caching, retries, and loading/error states.
- **Models** keep typings in sync with your Swagger/backend.
- **Services** are thin, pure API callers.
- **Hooks** encapsulate React Query logic and UI callbacks.
- **Context** provides global auth and toast utilities.
- **Components** consume hooks; they never touch Axios directly.

This architecture scales cleanly: add new models → services → hooks → components, and everything stays type‑safe and testable.
