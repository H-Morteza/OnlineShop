import { TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductReuquest } from "./catalogSlice";
import { useState } from "react";

export default function ProductSearch() {
  const { productReuquest } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const [productName, setproductName] = useState(productReuquest.productName);
  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductReuquest({ productName: event.target.value }));
  }, 1000);
  return (
    <>
      <TextField
        label="Search product"
        variant="outlined"
        fullWidth
        value={productName || ""}
        onChange={(event) => {
          setproductName(event.target.value);
          debouncedSearch(event);
        }}
      ></TextField>
    </>
  );
}
