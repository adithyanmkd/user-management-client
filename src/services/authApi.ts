import { api } from "./api";

// import types
import type {
  RegisterResponse,
  RegisterRequest,
} from "../features/auth/authTypes";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (registrationData) => ({
        url: "auth/register",
        method: "POST",
        body: registrationData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation } = authApi;
