export interface LoginPayload {
  email: string;
  password: string;
}

export type UserRole = 'admin' | 'vendor' | 'customer';

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar?: string;
    role: UserRole;
  };
}
