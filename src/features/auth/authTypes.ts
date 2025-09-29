export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: "user" | "admin";
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

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

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      password: string;
      avatar: string;
      role: "user" | "admin";
    };
    token: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}
