import { config } from "@/utils/config";
import { Initialstate } from "@/types/homePage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: Initialstate = {
  items: [],
  isloading: false,
  error: null,
};

export const getProduct = createAsyncThunk(
  "home/getProdcut",
  async (_, thunkAPI) => {
    const response = await fetch(`${config.apiBaseUrl}/api/product`);
    const data = await response.json();
    thunkAPI.dispatch(addProduct(data));
  }
);

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items = action.payload;
    },
    quantityUpdate: (state, action) => {
      const currentItem = state.items;
      const addedItem = action.payload;
      const foundedItem = currentItem.find(
        (product) => product.id === addedItem.id
      );
      if (foundedItem) {
        state.items = currentItem.map((product) =>
          product.id !== addedItem ? product : { ...addedItem, quantity: +1 }
        );
      } else {
        state.items.push({ ...addedItem, id: 1 });
      }
    },
  },
});

export const { addProduct } = homeSlice.actions;
export default homeSlice.reducer;
