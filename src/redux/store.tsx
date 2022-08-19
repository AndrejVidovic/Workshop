import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Slices/login";
import cartSlice from "./Slices/cart";
import openCartSlice from "./Slices/openCart";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    cart: cartSlice,
    open: openCartSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
