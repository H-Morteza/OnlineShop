import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import apiHelper from "../../app/api/apiHelper";

interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: "complete",
};

export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number; quntity: number }
>("", async ({ productId, quntity }) => {
  try {
    return await apiHelper.Basket.addItem(productId, quntity);
  } catch (error) {
    console.log(error);
  }
});
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    removeItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.basket?.items.findIndex(
        (i) => i.productId === productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket!.items[itemIndex].quantity -= quantity;
      if (state.basket?.items[itemIndex].quantity === 0)
        state.basket.items.splice(itemIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = "complete";
    });
    builder.addCase(addBasketItemAsync.pending, (state) => {
      state.status = "complete";
    });
  },
});
export const { setBasket, removeItem } = basketSlice.actions;
