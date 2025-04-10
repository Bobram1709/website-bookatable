import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const topRestaurantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTopRestaurnts: builder.query({
      query: (params) => ({
        url: `/topRestaurants`,
        method: "GET",
        params,
      }),
      transformResponse: (response) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: [tagTypes.topRestaurants],
    }),
    getSingleTopRestaurant: builder.query({
      query: (id) => ({
        url: `/topRestaurants/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.topRestaurants],
    }),
  }),

  //   overrideExisting: true,
});

export const { useGetAllTopRestaurntsQuery, useGetSingleTopRestaurantQuery } =
  topRestaurantApi;
