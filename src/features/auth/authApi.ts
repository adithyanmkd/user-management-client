import { api } from "../../services/api";

// import types
import type {
  RegisterResponse,
  RegisterRequest,
  LoginResponse,
  LoginRequest,
  AdminLoginRequest,
} from "./authTypes";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // user register
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (registrationData) => ({
        url: "auth/register",
        method: "POST",
        body: registrationData,
      }),
    }),

    // user login
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // admin login
    adminLogin: builder.mutation<LoginResponse, AdminLoginRequest>({
      query: (credentials) => ({
        url: "admin/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),

  overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation, useAdminLoginMutation } =
  authApi;
