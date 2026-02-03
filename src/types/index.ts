// frontend/types/index.ts

// ------------------------------
// Product
// ------------------------------
export interface Product {
  _id: string;              // MongoDB ObjectId as string
  name: string;
  description?: string;
  price: number;
  quantity: number;
  images: string[];
  categoryId: string;       // reference to Category _id
  vendorId?: string;        // reference to User _id
  createdAt?: string;
  updatedAt?: string;
}

// ------------------------------
// Category
// ------------------------------
export interface Category {
  _id: string;              // MongoDB ObjectId as string
  name: string;
  description?: string;
  path: string;
  image?: string;
  createdBy?: string;       // reference to User _id
  createdAt?: string;
  updatedAt?: string;
}

// ------------------------------
// Cart Item
// ------------------------------
export interface CartItem {
  productId: string;        // reference to Product _id
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// ------------------------------
// Order Item
// ------------------------------
export interface OrderItem {
  productId: string;        // reference to Product _id
  name: string;
  price: number;
  quantity: number;
}

// ------------------------------
// User
// ------------------------------
export type UserRole = 'admin' | 'user';

export interface User {
  _id: string;              // MongoDB ObjectId as string
  name: string;
  username: string;
  email: string;
  role: UserRole;
  avatar?: string;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// ------------------------------
// Optional utility type for frontend mapping
// ------------------------------
export type CategoryDataMap = Record<
  string,
  {
    title: string;
    breadcrumb: string;
    products: Product[];
  }
>;
