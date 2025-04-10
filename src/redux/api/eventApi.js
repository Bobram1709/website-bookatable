import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => ({
        url: "/events",
        method: "GET",
      }),
      providesTags: [tagTypes.event],
    }),
    getSingleEvent: builder.query({
      query: (data) => ({
        url: `/events/${data}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetEventsQuery, useGetSingleEventQuery } = eventApi;
