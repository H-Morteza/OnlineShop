import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import apiHelper from "../../app/api/apiHelper";
import { stat } from "fs";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();
export const fetchProductsAsync = createAsyncThunk<Product[]>(
  "catalog/fetchProductsAsync",
  async () => {
    try {
      return await apiHelper.Catalog.list();
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchProductAsync",
  async (productId) => {
    try {
      return await apiHelper.Catalog.details(productId);
    } catch (error) {
      console.log(error);
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState({
    productsLoaded: false,
    status: "complete",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = "complete";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state) => {
      state.status = "complete";
    });

    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "complete";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductAsync.rejected, (state) => {
      state.status = "complete";
    });
  },
});
export const productSlectors = productsAdapter.getSelectors(
  (stat: RootState) => stat.catalog
);
