import { useEffect, useState } from "react";
import LodingComponent from "../../app/layout/LodingComponent";
import ProductList from "../catalog/ProductList";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  fetchProductsAsync,
  fetchFiltersAsync,
  productSlectors,
} from "../catalog/catalogSlice";
import {
  Box,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import React from "react";
import CustomSlider from "../catalog/CustomSlider";
import CustomFilterList from "../catalog/CustomFilterList";
const sortOptions = [
  { value: "name", lable: "Alphabetical" },
  { value: "priceDesc", lable: "Price High to low" },
  { value: "price", lable: "Price Low to high" },
];
const FilterSection = ({ title, open, handleClick, children }: any) => (
  <>
    <ListItemButton onClick={handleClick}>
      <ListItemText primary={title} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={!open} timeout="auto" unmountOnExit>
      {children}
    </Collapse>
  </>
);
export default function Catalog() {
  const products = useAppSelector(productSlectors.selectAll);
  const { productsLoaded, status, filtersLoaded, productReuquest } =
    useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);
  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [filtersLoaded, dispatch]);
  const [openType, setOpenType] = React.useState(true);
  const [openBrand, setOpenBrand] = React.useState(true);
  const [openPrice, setOpenPrice] = React.useState(true);
  const handleClick = (setter: any, otherSetter: any) => () => {
    if (otherSetter) otherSetter(true);
    setter((prev: any) => !prev);
  };
  if (status.includes("pending"))
    return <LodingComponent message="Loading Products..." />;
  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <TextField
            label="Search product"
            variant="outlined"
            fullWidth
          ></TextField>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Sort by</FormLabel>
            <RadioGroup>
              {sortOptions.map(({ value, lable }) => (
                <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label={lable}
                  key={value}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>

        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <FilterSection
            title="Type"
            open={openType}
            handleClick={handleClick(setOpenType, setOpenBrand)}
          >
            <CustomFilterList customLists={productReuquest.productType!} />
          </FilterSection>

          <FilterSection
            title="Brand"
            open={openBrand}
            handleClick={handleClick(setOpenBrand, setOpenType)}
          >
            <CustomFilterList customLists={productReuquest.productBrand!} />
          </FilterSection>

          <FilterSection
            title="Price range"
            open={openPrice}
            handleClick={handleClick(setOpenPrice, null)}
          >
            <CustomSlider
              minPrice={productReuquest.filter.minPrice!}
              maxPrice={productReuquest.filter.maxPrice!}
            />
          </FilterSection>
        </List>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Displaying 1-6 of 20 Items</Typography>
          <Pagination
            count={10}
            variant="outlined"
            color="primary"
            size="large"
          />
        </Box>
      </Grid>
    </Grid>
  );
}
