import { api } from './api';
import type { LoginPayload, RegisterPayload, AuthResponse, UserRole } from '../models/auth';

// Default to mock mode unless explicitly disabled with VITE_USE_MOCK="false"
const USE_MOCK = import.meta.env?.VITE_USE_MOCK !== 'false';

const mockUserDb: Array<{ id: string; name: string; username: string; email: string; password: string; role: UserRole; avatar?: string }>
  = [{ id: '1', name: 'Demo User', username: 'demo', email: 'demo@example.com', password: 'password', role: 'customer', avatar: undefined }];

function mockToken(userId: string) {
  return `mock-token-${userId}-${Date.now()}`;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  if (USE_MOCK) {
    const user = mockUserDb.find(u => u.email === payload.email);
    if (!user || user.password !== payload.password) {
      throw new Error('Invalid credentials');
    }
    return {
      token: mockToken(user.id),
      user: { id: user.id, name: user.name, username: user.username, email: user.email, role: user.role },
    };
  }
  const { data } = await api.post<AuthResponse>('/api/auth/login', payload);
  return data;
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  if (USE_MOCK) {
    const exists = mockUserDb.some(u => u.email === payload.email || u.username === payload.username);
    if (exists) throw new Error('User already exists');
    const newUser = {
      id: String(mockUserDb.length + 1),
      name: payload.name,
      username: payload.username,
      email: payload.email,
      password: payload.password,
      role: payload.role,
    };
    mockUserDb.push(newUser);
    return {
      token: mockToken(newUser.id),
      user: { id: newUser.id, name: newUser.name, username: newUser.username, email: newUser.email, role: newUser.role },
    };
  }
  const { data } = await api.post<AuthResponse>('/api/auth/register', payload);
  return data;
}

export async function me(token: string): Promise<AuthResponse['user']> {
  if (USE_MOCK) {
    const userId = token.split('mock-token-')[1]?.split('-')[0];
    const user = mockUserDb.find(u => u.id === userId);
    if (!user) throw new Error('Unauthorized');
    return { id: user.id, name: user.name, username: user.username, email: user.email, role: user.role };
  }
  const { data } = await api.get<AuthResponse['user']>('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function logout(): Promise<void> {
  if (USE_MOCK) {
    // In mock mode, just return (token is cleared in context)
    return;
  }
  // The token will be automatically included via the axios interceptor
  try {
    await api.post('/api/auth/logout');
  } catch (error) {
    // Even if logout fails on server, we still clear local state
    console.error('Logout error:', error);
  }
}

export async function forgotPassword(email: string): Promise<void> {
  if (USE_MOCK) return;
  await api.post('/api/auth/forgot-password', { email });
}

export async function resetPassword(payload: { token: string; newPassword: string }): Promise<void> {
  if (USE_MOCK) return;
  await api.post('/api/auth/reset-password', payload);
}

// Helpers that rely on interceptor for auth
export async function meCurrent(): Promise<AuthResponse['user']> {
  if (USE_MOCK) {
    // If mock, derive from localStorage token similar to me()
    const raw = localStorage.getItem('auth');
    if (!raw) throw new Error('Unauthorized');
    const parsed = JSON.parse(raw) as { token: string };
    return me(parsed.token);
  }
  const { data } = await api.get<AuthResponse['user']>('/api/auth/me');
  return data;
}

export async function updateMe(payload: { name?: string; avatar?: string }): Promise<AuthResponse['user']> {
  if (USE_MOCK) {
    // Minimal mock: update first user
    const raw = localStorage.getItem('auth');
    if (!raw) throw new Error('Unauthorized');
    const { token } = JSON.parse(raw) as { token: string };
    const userId = token.split('mock-token-')[1]?.split('-')[0];
    const user = mockUserDb.find(u => u.id === userId);
    if (!user) throw new Error('Unauthorized');
    if (payload.name) user.name = payload.name;
    if (payload.avatar) user.avatar = payload.avatar;
    return { id: user.id, name: user.name, username: user.username, email: user.email, role: user.role, avatar: user.avatar };
  }
  const { data } = await api.patch<AuthResponse['user']>('/api/auth/me', payload);
  return data;
}

export async function uploadProfile(file: File): Promise<void> {
  if (USE_MOCK) return;
  const form = new FormData();
  form.append('file', file);
  await api.post('/api/uploads/profile', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
