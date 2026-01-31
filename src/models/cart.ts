export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  img?: string;
}

export interface Cart {
  items: CartItem[];
}

export interface AddToCartPayload {
  productId: number;
  quantity: number;
}

export interface UpdateQuantityPayload {
  productId: number;
  quantity: number;
}

export interface RemoveFromCartPayload {
  productId: number;
}
