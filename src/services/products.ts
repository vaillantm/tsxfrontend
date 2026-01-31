import { api } from './api';
import type { Product } from '../models/product';

type BackendProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  categoryId: string;
  vendorId: string;
};

function mapBackendProduct(p: BackendProduct): Product {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    quantity: p.quantity,
    images: p.images,
    categoryId: p.categoryId,
    vendorId: p.vendorId,
  };
}

export async function getAll(): Promise<Product[]> {
  const { data } = await api.get<BackendProduct[]>('/api/products');
  return data.map(mapBackendProduct);
}

export async function getById(id: string): Promise<Product> {
  const { data } = await api.get<BackendProduct>(`/api/products/${id}`);
  return mapBackendProduct(data);
}

export async function getByCategory(categoryIdentifier: string): Promise<Product[]> {
  // If the provided value looks like a Mongo ObjectId, use categoryId; otherwise use slug 'category'
  const isObjectId = /^[a-f0-9]{24}$/i.test(categoryIdentifier);
  const params = isObjectId ? { categoryId: categoryIdentifier } : { category: categoryIdentifier };
  
  const { data } = await api.get<BackendProduct[]>('/api/products', { params });
  return data.map(mapBackendProduct);
}

export async function create(payload: FormData): Promise<Product> {
  const { data } = await api.post<Product>('/api/products', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function update(id: string, payload: FormData): Promise<Product> {
  const { data } = await api.patch<Product>(`/api/products/${id}`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function remove(id: string): Promise<void> {
  await api.delete(`/api/products/${id}`);
}

