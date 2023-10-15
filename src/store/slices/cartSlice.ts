import { CartInitialState, CartItem } from "@/types/cartSlicePage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hook";
import { store } from "..";
import { config } from "@/utils/config";

const initialState: CartInitialState = {
  items: [],
  isloading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "cartSlice/createOrder",
  async (payload: CartItem[], thunkAPI) => {
    const response = await fetch(`${config.apiBaseUrl}/api/order`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = response.json();
  }
);

const cartSlice = createSlice({
  initialState,
  name: "cartSlice",
  reducers: {
    addCart: (state, action) => {
      const currentItem = state.items;
      const addedItem = action.payload;
      const foundedItem = currentItem.find(
        (product) => product.id === addedItem.id
      );
      if (foundedItem) {
        state.items = currentItem.map((product) =>
          product.id !== foundedItem.id
            ? product
            : { ...foundedItem, quantity: (foundedItem.quantity += 1) }
        );
      } else {
        state.items.push({ ...addedItem, quantity: 1 });
      }
    },
  },
});

export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
