import { useEffect, useState } from "react";
import apiHelper from "../../app/api/apiHelper";
import LodingComponent from "../../app/layout/LodingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSlectors } from "./catalogSlice";

export default function Catalog() {
  const products = useAppSelector(productSlectors.selectAll);
  const { productsLoaded, status } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);
  if (status.includes("pending"))
    return <LodingComponent message="Loading Products..." />;
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
