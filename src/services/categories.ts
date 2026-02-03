import { api } from './api';
import type { Category } from '../models/category';

type BackendCategory = {
  id?: string;
  _id?: string;
  name: string;
  path: string;
  description?: string;
  image?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
};

function mapBackendCategory(c: BackendCategory): Category {
  const resolvedId = c._id ?? c.id ?? '';
  return {
    // keep both if your Category model includes them
    id: resolvedId,
    _id: resolvedId,
    name: c.name,
    path: c.path,
    description: c.description,
    image: c.image,
    createdBy: c.createdBy,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
  } as unknown as Category;
}

export async function getAll(): Promise<Category[]> {
  const { data } = await api.get<BackendCategory[]>('/api/categories');
  return data.map(mapBackendCategory);
}

export async function getById(id: string): Promise<Category> {
  const { data } = await api.get<BackendCategory>(`/api/categories/${id}`);
  return mapBackendCategory(data);
}

export async function create(payload: FormData): Promise<Category> {
  const { data } = await api.post<BackendCategory>('/api/categories', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return mapBackendCategory(data);
}

export async function update(id: string, payload: FormData): Promise<Category> {
  const { data } = await api.patch<BackendCategory>(`/api/categories/${id}`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return mapBackendCategory(data);
}

export async function remove(id: string): Promise<void> {
  await api.delete(`/api/categories/${id}`);
}
