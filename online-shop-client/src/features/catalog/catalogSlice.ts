import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";
import { ProductReuquest } from "../../app/models/productReuquest";
import { fetchProducts, fetchProduct, fetchFilters } from "./catalogAPI";

interface CatalogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  productReuquest: ProductReuquest;
}

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("catalog/fetchProductsAsync", async (_, thunkAPI) => {
  const productReuquest = thunkAPI.getState().catalog.productReuquest;
  return await fetchProducts(productReuquest);
});

export const fetchProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchProductAsync",
  async (productId) => {
    return await fetchProduct(productId);
  }
);

export const fetchFiltersAsync = createAsyncThunk(
  "catalog/fetchFiltersAsync",
  async () => {
    return await fetchFilters();
  }
);

function initParams() {
  return {
    filter: {
      fiterType: 1,
      maxPrice: 1000,
      minPrice: 20,
      withDiscount: false,
    },
    pageNumber: 1,
    pageSize: 10,
    productBrand: [],
    productName: "",
    productType: [],
  };
}

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: "complete",
    productReuquest: initParams(),
  }),
  reducers: {
    setProductReuquest: (state, action) => {
      state.productsLoaded = false;
      state.productReuquest = { ...state.productReuquest, ...action.payload };
    },
    reseProductReuquest: (state) => {
      state.productReuquest = initParams();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = "pendingFetchProducts";
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        productsAdapter.setAll(state, action.payload);
        state.status = "complete";
        state.productsLoaded = true;
      })
      .addCase(fetchProductsAsync.rejected, (state) => {
        state.status = "complete";
      })

      .addCase(fetchProductAsync.pending, (state) => {
        state.status = "pendingFetchProduct";
      })
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        productsAdapter.upsertOne(state, action.payload);
        state.status = "complete";
        state.productsLoaded = true;
      })
      .addCase(fetchProductAsync.rejected, (state) => {
        state.status = "complete";
      })

      .addCase(fetchFiltersAsync.pending, (state) => {
        state.status = "pendingFetchFilters";
      })
      .addCase(fetchFiltersAsync.fulfilled, (state, action) => {
        state.productReuquest.productType = action.payload.types;
        state.productReuquest.productBrand = action.payload.brands;
        state.productReuquest.filter.minPrice = action.payload.minPrice;
        state.productReuquest.filter.maxPrice = action.payload.maxPrice;
        state.status = "complete";
        state.filtersLoaded = true;
      })
      .addCase(fetchFiltersAsync.rejected, (state) => {
        state.status = "complete";
      });
  },
});

export const productSlectors = productsAdapter.getSelectors(
  (stat: RootState) => stat.catalog
);
export const { setProductReuquest, reseProductReuquest } = catalogSlice.actions;
