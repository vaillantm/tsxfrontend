import { api } from './api';
import type { OrderStatus, Order } from '../models/order';

const USE_MOCK = import.meta.env?.VITE_USE_MOCK !== 'false';

const mockOrders: Order[] = [];

type BackendOrder = {
  id?: string;
  _id?: string;
  createdAt: string;
  status: OrderStatus;
  totalAmount: number;
  items: Order['items'];
};

function mapBackendOrder(o: BackendOrder): Order {
  const resolvedId = o._id ?? o.id ?? '';
  return {
    id: resolvedId,
    _id: o._id ?? o.id,
    createdAt: o.createdAt,
    status: o.status,
    totalAmount: o.totalAmount,
    items: o.items,
  };
}

export async function list(): Promise<Order[]> {
  if (USE_MOCK) return mockOrders;
  const { data } = await api.get<BackendOrder[]>('/api/orders');
  return data.map(mapBackendOrder);
}

export async function listAdmin(): Promise<Order[]> {
  if (USE_MOCK) return mockOrders;
  const { data } = await api.get<BackendOrder[]>('/api/admin/orders');
  return data.map(mapBackendOrder);
}

export async function getById(id: string): Promise<Order> {
  if (USE_MOCK) {
    const o = mockOrders.find(o => o.id === id);
    if (!o) throw new Error('Order not found');
    return o;
  }
  const { data } = await api.get<BackendOrder>(`/api/orders/${id}`);
  return mapBackendOrder(data);
}

export async function create(): Promise<Order> {
  if (USE_MOCK) {
    const id = String(mockOrders.length + 1);
    const order: Order = { id, createdAt: new Date().toISOString(), status: 'pending', totalAmount: 0, items: [] };
    mockOrders.unshift(order);
    return order;
  }
  const { data } = await api.post<BackendOrder>('/api/orders');
  return mapBackendOrder(data);
}

export async function cancel(id: string): Promise<Order> {
  if (USE_MOCK) {
    const idx = mockOrders.findIndex(o => o.id === id);
    if (idx === -1) throw new Error('Order not found');
    mockOrders[idx] = { ...mockOrders[idx], status: 'cancelled' };
    return mockOrders[idx];
  }
  const { data } = await api.patch<BackendOrder>(`/api/orders/${id}/cancel`);
  return mapBackendOrder(data);
}

export async function updateStatus(id: string, status: OrderStatus): Promise<Order> {
  if (USE_MOCK) {
    const idx = mockOrders.findIndex(o => o.id === id);
    if (idx === -1) throw new Error('Order not found');
    mockOrders[idx] = { ...mockOrders[idx], status };
    return mockOrders[idx];
  }
  const { data } = await api.patch<BackendOrder>(`/api/admin/orders/${id}/status`, { status });
  return mapBackendOrder(data);
}
