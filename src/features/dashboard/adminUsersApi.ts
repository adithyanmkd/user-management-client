import { api } from "../../services/api";
import { type User } from "../auth/authTypes";
import { type ApiResponse } from "../../shared/types/apiTypes";

// typescript note:
// ————————————————
// builder.mutation<ResultType, ArgType>
// ResultType: The type of data returned by the mutation (the response).
// ArgType: The type of the argument (input) passed to the mutation.

export const adminUsersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // fetch all users
    getUsers: builder.query<ApiResponse<User[]>, void>({
      query: () => "admin/users",
    }),

    // delete user
    deleteUser: builder.mutation<ApiResponse<User[]>, string>({
      query: (userId) => ({
        url: `admin/users/delete/${userId}`,
        method: "DELETE",
      }),
    }),

    // update user
    updateUser: builder.mutation<ApiResponse<User[]>, Partial<User>>({
      query: (user) => ({
        url: `admin/users/update/${user._id}`,
        method: "PATCH",
        body: user,
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = adminUsersApi;
