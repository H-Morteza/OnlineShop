import { useEffect, useState } from "react";
import LodingComponent from "../../app/layout/LodingComponent";
import ProductList from "../catalog/ProductList";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  fetchProductsAsync,
  fetchFiltersAsync,
  productSlectors,
  setProductReuquest,
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
import {
  ExpandLess,
  ExpandMore,
  RadioButtonChecked,
  StarBorder,
} from "@mui/icons-material";
import React from "react";
import CustomSlider from "../catalog/CustomSlider";
import CustomFilterList from "../../app/components/CustomFilterList";
import ProductSearch from "./ProductSearch";
import CustomRadioButonGroup from "../../app/components/CustomRadioButonGroup";
import CustomPagination from "../../app/components/CustomPagination";
const sortOptions = [
  { value: 1, lable: "Alphabetical" },
  { value: 2, lable: "Price Low to high" },
  { value: 3, lable: "Price High to low" },
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
  const {
    productsLoaded,
    status,
    filtersLoaded,
    productReuquest,
    productFilterResponse,
    metaData,
  } = useAppSelector((state) => state.catalog);

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
  /*   if (!filtersLoaded) return <LodingComponent message="Loading Products..." />; */
  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CustomRadioButonGroup
            selectedValue={productReuquest.filter.filterType?.toString()!}
            options={sortOptions}
            onChange={(e) => {
              dispatch(
                setProductReuquest({
                  filter: { filterType: parseInt(e.target.value) },
                })
              );
            }}
          />
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
            <CustomFilterList
              customLists={productFilterResponse.productTypes!}
              checked={productReuquest.productTypes}
              onChange={(items: string[]) => {
                dispatch(
                  setProductReuquest({
                    productTypes: items,
                  })
                );
              }}
            />
          </FilterSection>

          <FilterSection
            title="Brand"
            open={openBrand}
            handleClick={handleClick(setOpenBrand, setOpenType)}
          >
            <CustomFilterList
              customLists={productFilterResponse.productBrands!}
              checked={productReuquest.productBrands}
              onChange={(items: string[]) => {
                dispatch(
                  setProductReuquest({
                    productBrands: items,
                  })
                );
              }}
            />
          </FilterSection>

          <FilterSection
            title="Price range"
            open={openPrice}
            handleClick={handleClick(setOpenPrice, null)}
          >
            <CustomSlider
              minPrice={productFilterResponse.filter.minPrice!}
              maxPrice={productFilterResponse.filter.maxPrice!}
              selectMin={productReuquest.filter.minPrice!}
              selectMax={productReuquest.filter.maxPrice!}
              onChange={(min: number, max: number) => {
                dispatch(
                  setProductReuquest({
                    filter: { minPrice: min, maxPrice: max },
                  })
                );
              }}
            />
          </FilterSection>
        </List>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} sx={{ padding: "15px 0 15px 5px" }}>
        {metaData && (
          <CustomPagination
            curentPage={metaData?.currentPage}
            count={metaData.totalPages}
            pageSize={metaData.pageSize}
            totalItem={metaData.totalCount}
            onPageChange={(pageNumber: number) =>
              dispatch(
                setProductReuquest({
                  pageNumber: pageNumber,
                })
              )
            }
          />
        )}
      </Grid>
    </Grid>
  );
}
