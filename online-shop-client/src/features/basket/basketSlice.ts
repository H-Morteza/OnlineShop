import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import apiHelper from "../../app/api/apiHelper";
import { getCookie } from "../../app/utility/utility";

interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: "complete",
};

export const fetchBasketAsync = createAsyncThunk<Basket>(
  "basket/fetchBasketAsync",
  async (_, thunAPI) => {
    try {
      return await apiHelper.Basket.get();
    } catch (error: any) {
      return thunAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!getCookie("buyerId")) return false;
    },
  }
);

export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number; quntity?: number }
>("basket/addBasketItemAsync", async ({ productId, quntity }, thunkAPI) => {
  try {
    return await apiHelper.Basket.addItem(productId, (quntity = 1));
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const removeBasketItemAsync = createAsyncThunk<
  void,
  { productId: number; quntity: number; name?: string }
>("basket/removeBasketItemAsync", async ({ productId, quntity }, thunkAPI) => {
  try {
    await apiHelper.Basket.removeItem(productId, quntity);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
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

    builder.addMatcher(
      isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled),
      (state, action) => {
        state.basket = action.payload;
        state.status = "complete";
      }
    );
    builder.addMatcher(
      isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected),
      (state) => {
        state.status = "complete";
      }
    );
  },
});
export const { setBasket } = basketSlice.actions;
