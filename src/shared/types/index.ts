export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  newPassword?: string;
}

export interface Form {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  newPassword: string;
}

export interface PasswordForm {
  newPassword: string;
  confirmPassword: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar: string;
}

export interface CloudinaryUploadResponse {
  asset_id: string;
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  secure_url: string;
  url: string;
}
