import { PRODUCTS_URL } from "../constant";
import { apiSLice } from "./apiSLice";

export const productApiSlice = apiSLice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: PRODUCTS_URL }),
      keepUnusedDataFor: 60,
      providesTags: [{ type: "Product", id: "LIST" }],
    }),

    getSingleProduct: builder.query({
      query: (productId) => ({ url: `${PRODUCTS_URL}/${productId}` }),
      keepUnusedDataFor: 60,
      providesTags: (_result, _error, { id }) => [{ type: "Product", id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductQuery } =
  productApiSlice;
