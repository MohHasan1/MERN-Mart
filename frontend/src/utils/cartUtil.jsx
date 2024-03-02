

export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = (state) =>
{
    // items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    // shipping (>90free else)
    state.shippingPrice = addDecimals(state.itemsPrice > 90 ? 0 : 10);

    // tax price (15%)
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

    // total price:
    state.totalPrice = ( Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice) ).toFixed(2);

    // save to local storage:
    localStorage.setItem("cart", JSON.stringify(state));

    return state;
}