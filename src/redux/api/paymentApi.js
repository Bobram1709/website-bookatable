import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    eventBookingPayment: builder.mutation({
      query: (data) => ({
        url: "/events/load-payment-zone",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.event],
    }),
  }),
});

export const { useEventBookingPaymentMutation } = paymentApi;
