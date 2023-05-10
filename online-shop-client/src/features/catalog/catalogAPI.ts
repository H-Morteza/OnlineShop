import apiHelper from "../../app/api/apiHelper";
import { ProductReuquest } from "../../app/models/productReuquest";

export async function fetchProducts(productReuquest: ProductReuquest) {
  try {
    return await apiHelper.Catalog.list(productReuquest);
  } catch (error: any) {
    throw error.data;
  }
}

export async function fetchProduct(productId: number) {
  try {
    return await apiHelper.Catalog.details(productId);
  } catch (error: any) {
    throw error.data;
  }
}

export async function fetchFilters() {
  try {
    return await apiHelper.Catalog.filters();
  } catch (error: any) {
    throw error.data;
  }
}
