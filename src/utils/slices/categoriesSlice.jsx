import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: [],
};

// export const getCart = createAsyncThunk("getCart", async (_, thunkAPI) => {
//   try {
//     const response = await axiosAPI.get("cart");
//     return response.data.data;
//   } catch (err) {
//     console.log("Error fetching cart:", err.status);
//     console.log("Error message:", err.message);
//     return thunkAPI.rejectWithValue(
//       err.response?.data?.message || "Failed to fetch cart",
//     );
//   }
// });

const categoriesSlice = createSlice({
  name: "categories",

  initialState,

  reducers: {
    setCategories: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer; // this is the root reducer for this slice that combines all the case reducer.
