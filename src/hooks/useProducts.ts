import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as ProductService from '../services/products';

const keys = {
  all: ['products'] as const,
  byId: (id: string) => [...keys.all, id] as const,
  byCategory: (categoryId: string) => [...keys.all, 'category', categoryId] as const,
};

export function useProducts() {
  return useQuery({
    queryKey: keys.all,
    queryFn: ProductService.getAll,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: keys.byId(id),
    queryFn: () => ProductService.getById(id),
    enabled: !!id,
  });
}

export function useProductsByCategory(categoryIdentifier: string) {
  return useQuery({
    queryKey: keys.byCategory(categoryIdentifier),
    queryFn: () => ProductService.getByCategory(categoryIdentifier),
    enabled: !!categoryIdentifier,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: FormData) => ProductService.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => ProductService.update(id, data),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: keys.all });
      qc.invalidateQueries({ queryKey: keys.byId(variables.id) });
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ProductService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
}

