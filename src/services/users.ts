import { api } from './api';
import type { AuthResponse } from '../models/auth';

const USE_MOCK = import.meta.env?.VITE_USE_MOCK !== 'false';

const mockUsers: AuthResponse['user'][] = [];

export async function list(): Promise<AuthResponse['user'][]> {
  if (USE_MOCK) return mockUsers;
  const { data } = await api.get<AuthResponse['user'][]>('/api/users');
  return data;
}

export async function getById(id: string): Promise<AuthResponse['user']> {
  if (USE_MOCK) {
    const user = mockUsers.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  }
  const { data } = await api.get<AuthResponse['user']>(`/api/users/${id}`);
  return data;
}

export async function update(id: string, payload: Partial<AuthResponse['user']>): Promise<AuthResponse['user']> {
  if (USE_MOCK) {
    const idx = mockUsers.findIndex(u => u.id === id);
    if (idx === -1) throw new Error('User not found');
    mockUsers[idx] = { ...mockUsers[idx], ...payload };
    return mockUsers[idx];
  }
  const { data } = await api.patch<AuthResponse['user']>(`/api/users/${id}`, payload);
  return data;
}

export async function remove(id: string): Promise<void> {
  if (USE_MOCK) {
    const idx = mockUsers.findIndex(u => u.id === id);
    if (idx === -1) throw new Error('User not found');
    mockUsers.splice(idx, 1);
    return;
  }
  await api.delete(`/api/users/${id}`);
}

