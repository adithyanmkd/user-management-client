import api from "../../services/api";

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // change name
    changeName: builder.mutation({
      query: (body) => ({
        url: "profile/change-name",
        method: "PATCH",
        body,
      }),
    }),

    // change password
    changePassword: builder.mutation({
      query: (body) => ({
        url: "profile/change-password",
        method: "PATCH",
        body, // body contains current password old password
      }),
    }),

    // upload profile
    uploadProfile: builder.mutation({
      query: (imageUrl) => ({
        url: "profile/upload-profile",
        method: "PATCH",
        body: imageUrl,
      }),
    }),
  }),

  // upload profile
  overrideExisting: false,
});

export const {
  useChangeNameMutation,
  useChangePasswordMutation,
  useUploadProfileMutation,
} = profileApi;
