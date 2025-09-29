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
