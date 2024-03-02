import { ORDERS_URL } from "../constant";
import { apiSLice } from "./apiSLice";


const orderApiSlice = apiSLice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method:'POST',
                body: {...order},
            })
        }),

        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
            }),
            keepUnusedDataFor: 6,
        })

    })
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } = orderApiSlice;