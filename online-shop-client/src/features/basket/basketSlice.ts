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
  { productId: number; quntity?: number }
>("basket/addBasketItemAsync", async ({ productId, quntity }) => {
  try {
    return await apiHelper.Basket.addItem(productId, (quntity = 1));
  } catch (error) {
    console.log(error);
  }
});

export const removeBasketItemAsync = createAsyncThunk<
  void,
  { productId: number; quntity: number; name?: string }
>("basket/removeBasketItemAsync", async ({ productId, quntity }) => {
  try {
    await apiHelper.Basket.removeItem(productId, quntity);
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
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = "complete";
    });
    builder.addCase(addBasketItemAsync.rejected, (state) => {
      state.status = "complete";
    });

    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      state.status =
        "pendingRemoveItem" + action.meta.arg.productId + action.meta.arg.name;
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quntity } = action.meta.arg;
      const itemIndex = state.basket?.items.findIndex(
        (i) => i.productId === productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket!.items[itemIndex].quantity -= quntity;
      if (state.basket?.items[itemIndex].quantity === 0)
        state.basket.items.splice(itemIndex, 1);
      state.status = "complete";
    });
    builder.addCase(removeBasketItemAsync.rejected, (state) => {
      state.status = "complete";
    });
  },
});
export const { setBasket } = basketSlice.actions;
