import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
interface CounterState {
    value: boolean
} 
const initialState:CounterState= { value: false }
const openCartSlice = createSlice({
    name: 'open cart',
    initialState,
    reducers: {
        set_cart_open(state,action: PayloadAction<boolean>){
            state.value=action.payload
        },
    },  
});
export const { set_cart_open } = openCartSlice.actions;
export default openCartSlice.reducer;