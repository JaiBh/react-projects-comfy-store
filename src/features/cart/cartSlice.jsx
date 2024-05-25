import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart")) || defaultState,
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find(
        (item) => item.cartID === product.cartID
      );
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Item added to cart");
    },
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action) => {
      const { cartID, amount, price } = action.payload;
      const newCartItems = state.cartItems.filter(
        (item) => item.cartID !== cartID
      );
      state.cartItems = newCartItems;
      state.numItemsInCart -= amount;
      state.cartTotal -= amount * price;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Item removed");
    },
    editItem: (state, action) => {
      const { cartID, amount, price } = action.payload;
      const cartItem = state.cartItems.find((item) => item.cartID === cartID);
      const amountDiff = amount - cartItem.amount;
      cartItem.amount += amountDiff;
      state.numItemsInCart += amountDiff;
      state.cartTotal += amountDiff * price;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Cart updated");
    },
    calculateTotals: (state) => {
      state.tax = state.cartTotal * 0.1;
      state.orderTotal = state.tax + state.shipping + state.cartTotal;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
