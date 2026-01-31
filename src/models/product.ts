import { Category } from './category';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  categoryId: string;
  vendorId: string;
  category?: Category;
}
