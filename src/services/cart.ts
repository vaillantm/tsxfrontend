import { api } from './api';
import type { Cart, AddToCartPayload, UpdateQuantityPayload, RemoveFromCartPayload } from '../models/cart';

const USE_MOCK = import.meta.env?.VITE_USE_MOCK !== 'false';

let mockCart: Cart = { items: [] };

export async function getMyCart(): Promise<Cart> {
  if (USE_MOCK) return mockCart;
  const { data } = await api.get<Cart>('/api/cart');
  return data;
}

export async function addItem(payload: AddToCartPayload): Promise<Cart> {
  if (USE_MOCK) {
    const idx = mockCart.items.findIndex(i => i.productId === payload.productId);
    if (idx === -1) {
      mockCart.items.push({ productId: payload.productId, name: `Product ${payload.productId}` , price: 0, quantity: payload.quantity });
    } else {
      mockCart.items[idx].quantity += payload.quantity;
    }
    return mockCart;
  }
  const { data } = await api.post<Cart>('/api/cart/add', payload);
  return data;
}

export async function updateQuantity(payload: UpdateQuantityPayload): Promise<Cart> {
  if (USE_MOCK) {
    const idx = mockCart.items.findIndex(i => i.productId === payload.productId);
    if (idx !== -1) mockCart.items[idx].quantity = payload.quantity;
    return mockCart;
  }
  const { data } = await api.post<Cart>('/api/cart/quantity', payload);
  return data;
}

export async function removeItem(payload: RemoveFromCartPayload): Promise<Cart> {
  if (USE_MOCK) {
    mockCart.items = mockCart.items.filter(i => i.productId !== payload.productId);
    return mockCart;
  }
  const { data } = await api.post<Cart>('/api/cart/remove', payload);
  return data;
}

export async function clearCart(): Promise<Cart> {
  if (USE_MOCK) {
    mockCart = { items: [] };
    return mockCart;
  }
  const { data } = await api.post<Cart>('/api/cart/clear');
  return data;
}
