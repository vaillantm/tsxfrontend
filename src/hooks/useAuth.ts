import { useMutation } from '@tanstack/react-query';
import * as AuthService from '../services/auth';
import type { LoginPayload, RegisterPayload, AuthResponse } from '../models/auth';
import { useAuthContext } from '../context/AuthContext';

export function useLogin() {
  const { login, refreshUser } = useAuthContext();
  return useMutation<{ data: AuthResponse }, Error, LoginPayload>({
    mutationFn: async (payload) => {
      const res = await AuthService.login(payload);
      login(res);
      // Refetch to ensure we have the latest avatar from the backend
      await refreshUser();
      return { data: res };
    },
  });
}

export function useRegister() {
  const { login, refreshUser } = useAuthContext();
  return useMutation<{ data: AuthResponse }, Error, RegisterPayload>({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await AuthService.register(payload);
      login(res);
      // Refetch to ensure we have the latest avatar from the backend
      await refreshUser();
      return { data: res };
    },
  });
}

export function useForgotPassword() {
  return useMutation<void, Error, { email: string }>({
    mutationFn: async ({ email }) => {
      await AuthService.forgotPassword(email);
    },
  });
}

export function useResetPassword() {
  return useMutation<void, Error, { token: string; newPassword: string }>({
    mutationFn: async ({ token, newPassword }) => {
      await AuthService.resetPassword({ token, newPassword });
    },
  });
}
