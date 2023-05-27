import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";
import { ProductReuquest } from "../../app/models/productReuquest";
import { fetchProducts, fetchProduct, fetchFilters } from "./catalogAPI";
import { ProductFilterResponse } from "../../app/models/productFilterResponse";
import { MetaData } from "../../app/models/pagination";

interface CatalogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  productReuquest: ProductReuquest;
  productFilterResponse: ProductFilterResponse;
  metaData: MetaData | null;
}

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("catalog/fetchProductsAsync", async (_, thunkAPI) => {
  const productReuquest = thunkAPI.getState().catalog.productReuquest;
  const response = await fetchProducts(productReuquest);
  thunkAPI.dispatch(setMetaData(response.metaData));
  return response.items;
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
      withDiscount: false as boolean,
    },
    pageNumber: 1 as number,
    pageSize: 6 as number,
    productBrands: [] as string[],
    productName: "",
    productTypes: [] as string[],
  };
}

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: "complete",
    productReuquest: initParams(),
    productFilterResponse: {
      filter: {},
      productBrands: [],
      productTypes: [],
    },
    metaData: null,
  }),
  reducers: {
    setProductReuquest: (state, action) => {
      const { filter, ...rest } = action.payload;
      state.productsLoaded = false;
      state.filtersLoaded = false;
      state.productReuquest = {
        ...state.productReuquest,
        filter: {
          ...state.productReuquest.filter,
          ...filter,
        },
        ...rest,
      };
    },
    resetProductReuquest: (state) => {
      state.productReuquest = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
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
        state.productFilterResponse.productTypes = action.payload.productTypes;
        state.productFilterResponse.productBrands =
          action.payload.productBrands;
        state.productFilterResponse.filter.minPrice =
          action.payload.filter.minPrice;
        state.productFilterResponse.filter.maxPrice =
          action.payload.filter.maxPrice;
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
export const { setProductReuquest, resetProductReuquest, setMetaData } =
  catalogSlice.actions;
