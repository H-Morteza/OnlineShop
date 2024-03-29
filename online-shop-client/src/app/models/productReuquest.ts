import { Filter } from "./filter";

export interface ProductReuquest {
  pageNumber: number;
  pageSize: number;
  productName?: string;
  productTypes?: string[];
  productBrands?: string[];
  filter: Filter;
}
