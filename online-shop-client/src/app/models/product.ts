export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  payablePrice?: number;
  discountPercent?: number;
  imageUrl?: string;
  type?: string;
  brand?: string;
  quantityInStock?: number;
  rate?: number;
  imageAlt?: string;
}
