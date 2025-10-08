export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "admin";
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface RegisterResponseData {
  user: User;
  token: string;
}

export type RegisterResponse = ApiResponse<RegisterResponseData>;

export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "admin";
}

export interface LoginResponseData {
  user: AuthUser;
  token: string;
}

export type LoginResponse = ApiResponse<LoginResponseData>;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginRequest {
  username: string;
  password: string;
}
