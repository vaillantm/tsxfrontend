import { api } from './api';
import type { OrderStatus, Order, CreateOrderPayload } from '../models/order';

const USE_MOCK = import.meta.env?.VITE_USE_MOCK !== 'false';

const mockOrders: Order[] = [];

export async function list(): Promise<Order[]> {
  if (USE_MOCK) return mockOrders;
  const { data } = await api.get<Order[]>('/api/orders');
  return data;
}

export async function listAdmin(): Promise<Order[]> {
  if (USE_MOCK) return mockOrders;
  const { data } = await api.get<Order[]>('/api/orders/admin/all');
  return data;
}

export async function getById(id: string): Promise<Order> {
  if (USE_MOCK) {
    const o = mockOrders.find(o => o.id === id);
    if (!o) throw new Error('Order not found');
    return o;
  }
  const { data } = await api.get<Order>(`/api/orders/${id}`);
  return data;
}

export async function create(payload: CreateOrderPayload): Promise<Order> {
  if (USE_MOCK) {
    const id = String(mockOrders.length + 1);
    const total = payload.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const order: Order = { id, createdAt: new Date().toISOString(), status: 'pending', total, items: payload.items };
    mockOrders.unshift(order);
    return order;
  }
  const { data } = await api.post<Order>('/api/orders', payload);
  return data;
}

export async function cancel(id: string): Promise<Order> {
  if (USE_MOCK) {
    const idx = mockOrders.findIndex(o => o.id === id);
    if (idx === -1) throw new Error('Order not found');
    mockOrders[idx] = { ...mockOrders[idx], status: 'cancelled' };
    return mockOrders[idx];
  }
  const { data } = await api.patch<Order>(`/api/orders/${id}/cancel`);
  return data;
}

export async function updateStatus(id: string, status: OrderStatus): Promise<Order> {
  if (USE_MOCK) {
    const idx = mockOrders.findIndex(o => o.id === id);
    if (idx === -1) throw new Error('Order not found');
    mockOrders[idx] = { ...mockOrders[idx], status };
    return mockOrders[idx];
  }
  const { data } = await api.patch<Order>(`/api/orders/admin/${id}/status`, { status });
  return data;
}
