import { api } from "../../services/api";

// import types
import type {
  RegisterResponse,
  RegisterRequest,
  LoginResponse,
  LoginRequest,
} from "./authTypes";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (registrationData) => ({
        url: "auth/register",
        method: "POST",
        body: registrationData,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),

  overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation } = authApi;
