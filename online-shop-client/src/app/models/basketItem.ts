import { Product } from "./product";

export interface BasketItem {
  id: number;
  quantity: number;
  productId: number;
  product: Product;
  basketId: number;
}
