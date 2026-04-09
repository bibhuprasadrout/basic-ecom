import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import categoriesReducer from "../slices/categoriesSlice";
const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoriesReducer,
  },
});
export default appStore;
