import { tagTypes } from "../tagTypes.js";
import { baseApi } from "./baseApi";

const reservationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitReservation: builder.mutation({
      query: (data) => ({
        url: `/booking`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.cart, tagTypes.booking],
    }),
    getAllReservations: builder.query({
      query: (query) => ({
        url: `/booking`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.booking],
    }),
    getSingleReservation: builder.query({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
    submitEventReservation: builder.mutation({
      query: (data) => ({
        url: `/booking/event`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.cart, tagTypes.booking, tagTypes.event],
    }),
    getSingleReservationForEvent: builder.query({
      query: (id) => ({
        url: `/booking/event/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking, tagTypes.event],
    }),
  }),

  // overrideExisting: true,
});

export const {
  useGetAllReservationsQuery,
  useGetSingleReservationQuery,
  useSubmitReservationMutation,
  useSubmitEventReservationMutation,
  useGetSingleReservationForEventQuery,
} = reservationApi;
