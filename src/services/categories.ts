import { api } from './api';
import type { Category } from '../models/category';
import { mockCategories as dataCategories } from '../data/categories';

const USE_MOCK = import.meta.env?.VITE_USE_MOCK !== 'false';

let mockCategories: Category[] = dataCategories;

type BackendCategory = {
  id?: string;
  _id?: string;
  name: string;
  path: string;
  description?: string;
  image?: string;
};

function mapBackendCategory(c: BackendCategory): Category {
  const resolvedId = c._id ?? c.id ?? '';
  return {
    id: resolvedId,
    _id: c._id ?? c.id,
    name: c.name,
    path: c.path,
    description: c.description,
    image: c.image,
  };
}

export async function getAll(): Promise<Category[]> {
  if (USE_MOCK) return mockCategories;
  const { data } = await api.get<BackendCategory[]>('/api/categories');
  return data.map(mapBackendCategory);
}

export async function getById(id: string): Promise<Category> {
  if (USE_MOCK) {
    const c = mockCategories.find(c => c.id === id);
    if (!c) throw new Error('Category not found');
    return c;
  }
  const { data } = await api.get<BackendCategory>(`/api/categories/${id}`);
  return mapBackendCategory(data);
}

export async function create(payload: FormData): Promise<Category> {
  if (USE_MOCK) {
    const name = payload.get('name') as string;
    const path = payload.get('path') as string;
    const description = payload.get('description') as string;
    const newC: Category = { id: path, name, path, description };
    mockCategories.push(newC);
    return newC;
  }
  const { data } = await api.post<Category>('/api/categories', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function update(id: string, payload: FormData): Promise<Category> {
  if (USE_MOCK) {
    const idx = mockCategories.findIndex(c => c.id === id);
    if (idx === -1) throw new Error('Category not found');
    const name = payload.get('name') as string;
    const path = payload.get('path') as string;
    const description = payload.get('description') as string;
    mockCategories[idx] = { ...mockCategories[idx], name, path, description };
    return mockCategories[idx];
  }
  const { data } = await api.patch<Category>(`/api/categories/${id}`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function remove(id: string): Promise<void> {
  if (USE_MOCK) {
    mockCategories = mockCategories.filter(c => c.id !== id);
    return;
  }
  await api.delete(`/api/categories/${id}`);
}
