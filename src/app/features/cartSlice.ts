import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces";
import {
  addItemToShoppingCart,
  removeItemFromShoppingCart,
} from "../../utils/functions";
import { RootState } from "../store";

export interface CartState {
  cartProducts: IProduct[];
}
const initialState: CartState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.cartProducts = addItemToShoppingCart(
        state.cartProducts,
        action.payload
      );
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.cartProducts = removeItemFromShoppingCart(
        state.cartProducts,
        action.payload
      );
    },
    clearCart: (state) => {
      state.cartProducts = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
