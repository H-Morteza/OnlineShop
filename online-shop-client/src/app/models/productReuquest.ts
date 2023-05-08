export interface ProductReuquest {
  pageNumber: number;
  pageSize: number;
  productName?: string;
  productType?: string[];
  productBrand?: string[];
  filter: Filter;
}
export interface Filter {
  maxPrice?: number;
  minPrice?: number;
  withDiscount?: boolean;
  fiterType?: number;
}
