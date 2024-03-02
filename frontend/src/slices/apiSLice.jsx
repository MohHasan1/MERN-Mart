// Parent APi slice
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constant";

export const apiSLice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Product", "User", "Order"],
  endpoints: (builder) => ({}),
});
