export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
}

export interface CreateOrderPayload {
  items: OrderItem[];
}
