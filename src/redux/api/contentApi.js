import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContent: builder.query({
      query: (data) => ({
        url: "/content",
        method: "GET",
        params: { select: data },
      }),

      providesTags: [tagTypes.content],
    }),
  }),
});

export const { useGetContentQuery } = contentApi;
