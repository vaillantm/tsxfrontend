export type Role = 'admin' | 'customer';

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
}
