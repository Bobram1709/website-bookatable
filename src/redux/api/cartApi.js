import { tagTypes } from "../tagTypes.js";
import { baseApi } from "./baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMenuByReservationId: builder.query({
      query: (bookingId) => ({
        url: `/cart/${bookingId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.cart, tagTypes.booking],
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: `/cart/${data?.id}`,
        method: "POST",
        body: data?.body,
      }),
      invalidatesTags: [tagTypes.cart, tagTypes.booking],
    }),
  }),

  // overrideExisting: true,
});

export const { useGetMenuByReservationIdQuery, useAddToCartMutation } = cartApi;
