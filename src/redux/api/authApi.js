import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const AUTH_URL = "/users";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/create-user`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.auth],
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/verify-otp",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.otp],
    }),

    forgotPass: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "PATCH",
        body: data,
      }),
    }),

    resetPass: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: data,
      }),
    }),
    deleteAccount: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "DELETE",
        body: data,
      }),
    }),
  }),

  // overrideExisting: true,
});

export const {
  useSignUpMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useDeleteAccountMutation,
  useForgotPassMutation,
  useResetPassMutation,
} = authApi;
