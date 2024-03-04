import { ORDERS_URL, PAYPAL_URL } from "../constant";
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
        }),

        payOrder: builder.mutation({
            query: ({orderId, details}) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: {...details,}
            }),
        }),

        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5,
        }),

        getMyOrder: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/myorder`
            }),
            keepUnusedDataFor: 5,
        }),

    })
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery, useGetMyOrderQuery } = orderApiSlice;