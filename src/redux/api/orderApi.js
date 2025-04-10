import { tagTypes } from "../tagTypes.js";
import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loadPaymentZone: builder.mutation({
      query: (data) => ({
        url: `/orders/load-payment-zone`,
        method: "POST",
        body: data,
      }),
      providesTags: [tagTypes.cart, tagTypes.booking, tagTypes.order],
    }),
  }),

  // overrideExisting: true,
});

export const { useLoadPaymentZoneMutation } = orderApi;
