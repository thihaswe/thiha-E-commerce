import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./slices/homeSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
// ...

export const store = configureStore({
  reducer: {
    homeSlice: homeReducer,
    cartSlice: cartReducer,
    orderSlice: orderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
