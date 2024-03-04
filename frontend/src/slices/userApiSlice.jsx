import { USERS_URL } from "../constant";
import { apiSLice } from "./apiSLice";

// object function object function:
const userApiSlice = apiSLice.injectEndpoints({
    endpoints: (builder) => ({

        registerUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            })  
        }),

        loginUser: builder.mutation({ 
            query: (data) => ({ 
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
            })
           
        }),

        // we have to logout - this slice is to clear the http cookie - and the other one is to remove cookie from teh local storage.
        logoutUser: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),

        profileUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            })
        }),

    })
});

export const { useLoginUserMutation, useLogoutUserMutation, useRegisterUserMutation, useProfileUserMutation } = userApiSlice; 