export interface CartItem {
  id: string; // Product ID
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Product {
  id: number | string;
  name: string;
  category?: string;
  price: number;
  rating?: number;
  reviews?: number;
  image?: string;
  img?: string;
  tags?: string;
}

export type CategoryDataMap = Record<
  string,
  {
    title: string;
    breadcrumb: string;
    products: Product[];
  }
>;
