import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as OrderService from '../services/orders';
import type { OrderStatus } from '../models/order';

const keys = {
  all: ['orders'] as const,
  admin: ['orders', 'admin'] as const,
  byId: (id: string) => [...keys.all, id] as const,
};

export function useOrders(enabled = true) {
  return useQuery({
    queryKey: keys.all,
    queryFn: OrderService.list,
    enabled,
  });
}

export function useAdminOrders(enabled = true) {
  return useQuery({
    queryKey: keys.admin,
    queryFn: OrderService.listAdmin,
    enabled,
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: keys.byId(id),
    queryFn: () => OrderService.getById(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => OrderService.create(),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
}

export function useCancelOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: OrderService.cancel,
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: keys.all });
      if (typeof id === 'string') qc.invalidateQueries({ queryKey: keys.byId(id) });
    },
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) => OrderService.updateStatus(id, status),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: keys.all });
      qc.invalidateQueries({ queryKey: keys.admin });
      qc.invalidateQueries({ queryKey: keys.byId(variables.id) });
    },
  });
}
