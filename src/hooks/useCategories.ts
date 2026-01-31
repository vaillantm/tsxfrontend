import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as CategoryService from '../services/categories';
import type { Category } from '../models/category';

const keys = {
  all: ['categories'] as const,
  byId: (id: string) => [...keys.all, id] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: keys.all,
    queryFn: CategoryService.getAll,
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: keys.byId(id),
    queryFn: () => CategoryService.getById(id),
    enabled: !!id,
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: FormData) => CategoryService.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => CategoryService.update(id, data),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: keys.all });
      qc.invalidateQueries({ queryKey: keys.byId(variables.id) });
    },
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => CategoryService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
}
