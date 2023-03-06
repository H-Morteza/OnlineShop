import { useEffect, useState } from "react";
import apiHelper from "../../app/api/apiHelper";
import LodingComponent from "../../app/layout/LodingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    apiHelper.Catalog.list()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <LodingComponent message="Loading Products..." />;
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
