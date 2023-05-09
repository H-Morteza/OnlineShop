import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import apiHelper from "../../app/api/apiHelper";
import { stat } from "fs";
import { RootState } from "../../app/store/configureStore";
import { ProductReuquest } from "../../app/models/productReuquest";

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
  try {
    const pReuquest = thunkAPI.getState().catalog.productReuquest;
    return await apiHelper.Catalog.list(pReuquest);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchProductAsync",
  async (productId, thunkAPI) => {
    try {
      return await apiHelper.Catalog.details(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchFiltersAsync = createAsyncThunk(
  "catalog/fetchFiltersAsync",
  async (_, thunkAPI) => {
    try {
      return await apiHelper.Catalog.filters();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
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

    builder.addCase(fetchFiltersAsync.pending, (state) => {
      state.status = "pendingFetchFilters";
    });
    builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
      state.productReuquest.productType = action.payload.types;
      state.productReuquest.productBrand = action.payload.brands;
      state.productReuquest.filter.minPrice = action.payload.minPrice;
      state.productReuquest.filter.maxPrice = action.payload.maxPrice;
      state.status = "complete";
      state.filtersLoaded = true;
    });
    builder.addCase(fetchFiltersAsync.rejected, (state) => {
      state.status = "complete";
    });
  },
});
export const productSlectors = productsAdapter.getSelectors(
  (stat: RootState) => stat.catalog
);
export const { setProductReuquest, reseProductReuquest } = catalogSlice.actions;
