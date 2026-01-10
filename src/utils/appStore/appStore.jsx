import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../slices/categoriesSlice";
const appStore = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});
export default appStore;
