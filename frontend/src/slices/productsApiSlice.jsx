import { PRODUCTS_URL } from "../constant";
import { apiSLice } from "./apiSLice";

export const productApiSlice = apiSLice.injectEndpoints({
  endpoints: (builder) => (
    {
      getProducts: builder.query({ 
        query: () => ({ url: PRODUCTS_URL }), 
        keepUnusedDataFor: 5, 
      }),

      getSingleProduct: builder.query({ 
        query: (productId) => ({ url: `${PRODUCTS_URL}/${productId}`}),
        wkeepUnusedDataFor: 5,
      }),
    }
  ) 
});

export const { useGetProductsQuery, useGetSingleProductQuery } = productApiSlice;
