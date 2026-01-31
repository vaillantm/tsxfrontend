import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as UserService from '../services/users';
import type { AuthResponse } from '../models/auth';

const keys = {
  all: ['users'] as const,
  byId: (id: string) => [...keys.all, id] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: keys.all,
    queryFn: UserService.list,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: keys.byId(id),
    queryFn: () => UserService.getById(id),
    enabled: !!id,
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AuthResponse['user']> }) => 
      UserService.update(id, data),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: keys.all });
      qc.invalidateQueries({ queryKey: keys.byId(variables.id) });
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => UserService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
}

