import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    added_to_cart(state, action) {
      state.cart = [...state.cart, action.payload];
    },
    deleted_from_cart(state, action) {
      let temp = state.cart;
      let i = temp.indexOf(temp.find((item) => item.id === action.payload.id));
      let final = [...temp.slice(0, i), ...temp.slice(i + 1, temp.length + 1)];
      state.cart = final;
    },
    edited_in_cart(state, action) {
      let temp = state.cart;
      let i = temp.indexOf(temp.find((item) => item.id === action.payload.id));
      let final = [...temp.slice(0, i), action.payload, ...temp.slice(i + 1, temp.length + 1)];
      state.cart = final;
    },
  },
});
export const { added_to_cart, deleted_from_cart, edited_in_cart } = cartSlice.actions;
export default cartSlice.reducer;
