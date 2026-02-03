export interface CartItem {
  productId: string;
  name?: string;
  price?: number;
  quantity: number;
  image?: string;
}

export interface Cart {
  items: CartItem[];
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export interface UpdateQuantityPayload {
  productId: string;
  quantity: number;
}

export interface RemoveFromCartPayload {
  productId: string;
}
