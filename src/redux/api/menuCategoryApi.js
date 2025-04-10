import { tagTypes } from "../tagTypes.js";
import { baseApi } from "./baseApi";

const menuCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMenuCategory: builder.query({
      query: (query) => ({
        url: `/menu-categories`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.menu],
    }),
  }),

  // overrideExisting: true,
});

export const { useGetAllMenuCategoryQuery } = menuCategoryApi;
