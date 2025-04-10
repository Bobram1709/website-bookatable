import { tagTypes } from "../tagTypes.js";
import { baseApi } from "./baseApi";

const favouriteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    insertItemIntoFavoriteList: builder.mutation({
      query: (data) => ({
        url: `/favoriteLists/menu`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.favoriteList, tagTypes.menu],
    }),
    getAllItemsFromFavouriteList: builder.query({
      query: () => ({
        url: `/favoriteLists/?fields=menu`,
        method: "GET",
      }),
      providesTags: [tagTypes.favoriteList, tagTypes.menu],
    }),
  }),

  // overrideExisting: true,
});

export const {
  useInsertItemIntoFavoriteListMutation,
  useGetAllItemsFromFavouriteListQuery,
} = favouriteApi;
