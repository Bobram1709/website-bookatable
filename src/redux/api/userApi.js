import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUser: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),

      providesTags: [tagTypes.users],
    }),

    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: [tagTypes.users],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
} = userApi;
