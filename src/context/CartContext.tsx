import React, { createContext, useContext, useMemo, useState } from 'react';
import type { CartItem } from '../types';
import {
  useCartQuery,
  useAddToCart,
  useUpdateCartQuantity,
  useRemoveFromCart,
  useClearCart,
} from '../hooks/useCartApi';
import { useProducts } from '../hooks/useProducts';

type CartContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: cart } = useCartQuery();
  const { data: products } = useProducts();

  const addMutation = useAddToCart();
  const updateMutation = useUpdateCartQuantity();
  const removeMutation = useRemoveFromCart();
  const clearMutation = useClearCart();

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const items = useMemo<CartItem[]>(() => {
    const byId = new Map((products ?? []).map((p) => [String(p._id), p]));

    return (cart?.items ?? []).map((item) => {
      const pid = String(item.productId);
      const product = byId.get(pid);

      return {
        productId: pid,
        name: item.name || product?.name || 'Product',
        price: item.price ?? product?.price ?? 0,
        image:
          item.image ||
          product?.images?.[0] ||
          'https://via.placeholder.com/400x400?text=No+Image',
        quantity: item.quantity,
      };
    });
  }, [cart?.items, products]);

  const addItem = (item: Omit<CartItem, 'quantity'>, qty: number = 1) => {
    addMutation.mutate({ productId: item.productId, quantity: qty });
    setIsOpen(true);
  };

  const removeItem = (productId: string) => {
    removeMutation.mutate({ productId });
  };

  const updateQty = (productId: string, qty: number) => {
    const safeQty = Math.max(1, qty);
    updateMutation.mutate({ productId, quantity: safeQty });
  };

  const clear = () => {
    clearMutation.mutate();
  };

  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.quantity, 0),
    [items]
  );

  const value: CartContextType = {
    isOpen,
    open,
    close,
    items,
    addItem,
    removeItem,
    updateQty,
    clear,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
