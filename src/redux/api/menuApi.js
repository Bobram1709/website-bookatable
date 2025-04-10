import { tagTypes } from "../tagTypes.js";
import { baseApi } from "./baseApi";

const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMenu: builder.query({
      query: (query) => ({
        url: `/menu`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.menu, tagTypes.favoriteList],
    }),
    getSingleMenu: builder.query({
      query: (id) => ({
        url: `/menu/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.menu, tagTypes.favoriteList],
    }),
  }),

  // overrideExisting: true,
});

export const { useGetAllMenuQuery, useGetSingleMenuQuery } = menuApi;
