import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface CounterState {
  username: string;
}
const initialState: CounterState = { username: "" };
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    user_logged_in(state, action: PayloadAction<string>) {
      localStorage.setItem("user", action.payload);
      state.username = action.payload;
    },
    user_logged_out(state) {
      localStorage.setItem("user", "");
      state.username = "";
    },
  },
});
export const { user_logged_in, user_logged_out } = loginSlice.actions;
export default loginSlice.reducer;
