import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtil";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems : [], shippingAddress:{}, paymentMethod: 'PayPal'};

const cartSLice = createSlice(
    {
        name: "cart",
        initialState: initialState,
        reducers: {
            addToCart: (state, action) => {
                const item = action.payload;

                const existItem = state.cartItems.find((p) => p._id === item._id);

                // To avoid adding duplicate items:
                if (existItem) 
                {
                    state.cartItems = state.cartItems.map((p) => p._id === existItem._id ? item : p);
                } else{
                    state.cartItems = [...state.cartItems, item];
                }

                return updateCart(state);
            },

            removeFromCart: (state, action) => {
                state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

                return updateCart(state);
            },

            saveShippingAddress: (state, action) => {
                state.shippingAddress = action.payload;

                return updateCart(state);
            },

            savePaymentMethod: (state, action) => {
                state.paymentMethod = action.payload;

                return updateCart(state);
            },

            clearCart: (state, action) => {
                state.cartItems = [];
                // To change the values to $0.0
                return updateCart(state);
            },
        },
    }
);

// to connect with store:
export default cartSLice.reducer;

// export function:
export const { addToCart, clearCart, removeFromCart, saveShippingAddress, savePaymentMethod }  = cartSLice.actions;