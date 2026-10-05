import { USERS_URL } from "../constant";
import { apiSLice } from "./apiSLice";

const userApiSlice = apiSLice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
      //   invalidatesTags: ["User"],
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
      //   invalidatesTags: ["User"],
    }),

    // we have to logout -
    // this slice is to clear the http cookie -
    // and the other one is to remove cookie from the local storage.
    logoutUser: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
      //   invalidatesTags: ["User"],
    }),

    profileUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    invalidatesTags: ["User"],
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useProfileUserMutation,
} = userApiSlice;
