export type UserRole =
  | 'ADMIN'
  | 'ENTERPRISE'
  | 'MANAGER'
  | 'PSYCHOLOGIST'
  | 'EMPLOYEE';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type?: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface UserCreate {
  username: string;
  email: string;
  phone_number: string;
  password: string;
  sponsor_id?: string | null;
  document?: string | null;
  role?: UserRole;
  tasks?: Record<string, unknown>;
}

export interface UserRead {
  id: string;
  sponsor_id: string | null;
  username: string;
  email: string;
  phone_number: string;
  document: string | null;
  role: UserRole;
  tasks: Record<string, unknown>;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface UserUpdate {
  username?: string | null;
  email?: string | null;
  phone_number?: string | null;
  document?: string | null;
  role?: UserRole | null;
  tasks?: Record<string, unknown> | null;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
}
