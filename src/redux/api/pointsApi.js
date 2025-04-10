import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const pointsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPoints: builder.query({
      query: () => ({
        url: "/coins",
        method: "GET",
      }),
      providesTags: [tagTypes.points],
    }),
    withDawPoints: builder.mutation({
      query: (data) => ({
        url: "/coin/withdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.points],
    }),
    getPointsRedeemRequest: builder.query({
      query: () => ({
        url: "/coin/withdraw",
        method: "GET",
      }),
      providesTags: [tagTypes.points],
    }),
  }),
});

export const {
  useGetPointsQuery,
  useWithDawPointsMutation,
  useGetPointsRedeemRequestQuery,
} = pointsApi;
