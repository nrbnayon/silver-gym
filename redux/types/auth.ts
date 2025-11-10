// redux/types/auth.ts
export interface User {
  id: string;
  role: string;
  email: string;
  name?: string;
  profileImage?: string;
  avatar?: string;
  rememberMe?: boolean;
  loginTime: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  role?: string;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
