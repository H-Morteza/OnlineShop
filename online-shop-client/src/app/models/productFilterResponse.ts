import { Filter } from "./filter";

export interface ProductFilterResponse {
  productTypes?: string[];
  productBrands?: string[];
  filter: Filter;
}
