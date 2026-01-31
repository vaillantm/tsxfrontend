import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as CartService from '../services/cart';

const keys = {
  cart: ['cart'] as const,
};

export function useCartQuery() {
  return useQuery({
    queryKey: keys.cart,
    queryFn: CartService.getMyCart,
  });
}

export function useAddToCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: CartService.addItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.cart }),
  });
}

export function useUpdateCartQuantity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: CartService.updateQuantity,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.cart }),
  });
}

export function useRemoveFromCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: CartService.removeItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.cart }),
  });
}

export function useClearCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: CartService.clearCart,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.cart }),
  });
}
