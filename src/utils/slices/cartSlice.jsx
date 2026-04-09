import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/Constants";

// Axios instance helper to keep code clean
const axiosAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Important for cookies/JWT
});

// --- 1. ASYNC THUNKS (The Communicators) ---
export const getCart = createAsyncThunk("getCart", async (_, thunkAPI) => {
  try {
    const response = await axiosAPI.get("cart");
    return response.data.data;
  } catch (err) {
    console.log("Error fetching cart:", err.status);
    console.log("Error message:", err.message);
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Failed to fetch cart",
    );
  }
});

export const addOneItemToCart = createAsyncThunk(
  "cart/add",
  async (productId, thunkAPI) => {
    try {
      const response = await axiosAPI.post("cart/add", { productId });
      return response.data.data; // Backend returns the updated cart
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add item",
      );
    }
  },
);

export const removeOneItemFromCart = createAsyncThunk(
  "cart/remove",
  async (productId, thunkAPI) => {
    try {
      const response = await axiosAPI.post("cart/remove", {
        productId,
      });
      return response.data.data; // Backend returns the updated cart
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to remove item",
      );
    }
  },
);

export const deleteProductFromCart = createAsyncThunk(
  "cart/removeProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await axiosAPI.delete(`cart/${productId}`);
      return response.data.data; // Backend returns the updated cart
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete product",
      );
    }
  },
);

export const deleteCart = createAsyncThunk(
  "deleteCart",
  async (_, thunkAPI) => {
    try {
      await axiosAPI.delete("cart");
      return null; // Cart is deleted, so we return null to clear the state
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to clear cart",
      );
    }
  },
);

const initialState = {
  data: { items: [], totalPrice: 0, totalItems: 0 }, // Matches the schema in backend
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // these are case reducers that will be controlled by the root reducer. Each case reducer is responsible for handling a specific action type and updating the state accordingly.

    // keep a synchronous clearer for when the user logs out
    clearLocalCart: (state) => {
      state.data = { items: [], totalPrice: 0, totalItems: 0 };
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    // A helper function to handle all the "pending" and "rejected" states cleanly
    const setPending = (state) => {
      state.status = "loading";
      state.error = null;
    };
    const setRejected = (state, action) => {
      state.status = "failed";
      state.error = action.payload; // Contains the error message from rejectWithValue
    };
    const setFulfilled = (state, action) => {
      state.status = "succeeded";
      // This is the magic: We just overwrite the frontend cart with the backend's exact calculation!
      state.data = action.payload || {
        items: [],
        totalPrice: 0,
        totalItems: 0,
      }; // In case payload is null (e.g., after deleting cart), reset to empty cart
    };

    builder
      // Fetch Cart
      .addCase(getCart.pending, setPending)
      .addCase(getCart.fulfilled, setFulfilled)
      .addCase(getCart.rejected, setRejected)
      // Add Item
      .addCase(addOneItemToCart.pending, setPending)
      .addCase(addOneItemToCart.fulfilled, setFulfilled)
      .addCase(addOneItemToCart.rejected, setRejected)
      // Remove Item
      .addCase(removeOneItemFromCart.pending, setPending)
      .addCase(removeOneItemFromCart.fulfilled, setFulfilled)
      .addCase(removeOneItemFromCart.rejected, setRejected)
      // Delete Prroduct from Cart
      .addCase(deleteProductFromCart.pending, setPending)
      .addCase(deleteProductFromCart.fulfilled, setFulfilled)
      .addCase(deleteProductFromCart.rejected, setRejected)
      // Delete Cart
      .addCase(deleteCart.pending, setPending)
      .addCase(deleteCart.fulfilled, setFulfilled)
      .addCase(deleteCart.rejected, setRejected);
    // Set Cart
    // .addCase(setCart.pending, setPending)
    // .addCase(setCart.fulfilled, setFulfilled)
    // .addCase(setCart.rejected, setRejected);

    // // 1. ADD OR INCREMENT ITEM
    // addOneItemToCart: (state, action) => {
    //   // Assuming action.payload is the product name/id (e.g., "iphone")
    //   const productId = action.payload;
    //   if (state.items[productId]) {
    //     // If it already exists, increase the count
    //     state.items[productId] += 1;
    //   } else {
    //     // If it is added for the first time, set its value to 1
    //     state.items[productId] = 1;
    //   }
    // },
    // // 2. DECREMENT OR REMOVE ITEM
    // removeOneItemFromCart: (state, action) => {
    //   const productId = action.payload;
    //   // Only do something if the item actually exists in the cart
    //   if (state.items[productId]) {
    //     state.items[productId] -= 1;
    //     // If the count reaches 0, delete the property from the object completely
    //     if (state.items[productId] <= 0) {
    //       delete state.items[productId];
    //     }
    //   }
    // },
    // // 3. DELETE ENTIRE PRODUCT REGARDLESS OF QUANTITY
    // deleteProductFromCart: (state, action) => {
    //   const productId = action.payload;
    //   // The 'delete' keyword instantly removes the key-value pair from the object
    //   delete state.items[productId];
    // },
    // // 4. EMPTY THE WHOLE CART
    // deleteCart: (state) => {
    //   // Just reset items back to an empty object
    //   state.items = {};
    // },
    // // 5. OVERWRITE THE CART COMPLETELY
    // setCart: (state, action) => {
    //   // Expects action.payload to be a full object like {pants: 4, earphone: 3}
    //   state.items = action.payload;
    // },
  },
});
export const {
  // remember action creators are different from case reducers and all case reducers are controlled by the root reducer.
  // addOneItemToCart,
  // removeOneItemFromCart,
  // deleteProductFromCart,
  // deleteCart,
  // setCart,
  clearLocalCart,
} = cartSlice.actions; // these are action creators
export default cartSlice.reducer; // this is the root reducer for this slice that combines all the case reducer.

// |---Not related to the file, just a useful code snippet to remember---|

// Always remember this trick to remove an item from an array in Redux Toolkit. We find the index of the item we want to remove, and if it exists, we use splice to remove it from the array. This way, we are mutating the state directly, which is allowed in Redux Toolkit due to its use of Immer under the hood.
const state1 = [];
const action1 = { payload: { id: 1 } };
const index = state1.findIndex((item) => {
  return item.id === action1.payload.id;
});
if (index != -1) {
  state1.splice(index, 1); // Spliece mutates the original array by removing the item at the specified index. In this case, it removes one item starting from the found index.
}
