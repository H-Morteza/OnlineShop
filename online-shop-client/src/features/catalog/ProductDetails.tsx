import { Add, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiHelper from "../../app/api/apiHelper";
import { useShopContext } from "../../app/context/ShopContext";
import NotFound from "../../app/errors/NotFound";
import LodingComponent from "../../app/layout/LodingComponent";
import { Product } from "../../app/models/product";
import ProductPriceCard from "./ProductPriceCard";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
  setBasket,
} from "../basket/basketSlice";
import { fetchProductAsync, productSlectors } from "./catalogSlice";

export default function ProductDetails() {
  const { basket } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    productSlectors.selectById(state, id!)
  );
  const { status } = useAppSelector((state) => state.catalog);
  const item = basket?.items.find((i) => i.productId === product?.id);
  let quantity = item != null && item != undefined ? item.quantity : 0;

  useEffect(() => {
    if (!product) dispatch(fetchProductAsync(parseInt(id!)));
  }, [id, , dispatch, product]);

  function AddItem(productId: number) {
    dispatch(addBasketItemAsync({ productId: productId, quntity: quantity }));
  }

  function RemoveItem(productId: number, quantity: number = 1) {
    dispatch(
      removeBasketItemAsync({ productId: product?.id!, quntity: quantity })
    );
  }

  const commonStyles = {
    borderColor: "secondary.main",
    m: 1,
    border: 1,
    borderRadius: "10px",
    marginBottom: 0,
  };

  if (status.includes("pending"))
    return <LodingComponent message="Loading Product..." />;
  if (!product) return <NotFound />;
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.imageUrl}
          alt={product.imageAlt}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Price</TableCell>
                <TableCell>
                  <ProductPriceCard product={product} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box hidden={quantity != 0}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                marginTop: 1,
                boxShadow: 3,
                ":hover": {
                  boxShadow: 10,
                },
              }}
              onClick={() => AddItem(product?.id!)}
            >
              add to basket
            </Button>
          </Box>
          <div hidden={quantity === 0}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1,
              }}
            >
              <Box sx={{ ...commonStyles, gridColumn: "span 1" }}>
                <LoadingButton
                  onClick={() => RemoveItem(product?.id!, 1)}
                  color="error"
                >
                  <Remove />
                </LoadingButton>
                {quantity}
                <LoadingButton
                  onClick={() => AddItem(product?.id!)}
                  color="success"
                >
                  <Add />
                </LoadingButton>
              </Box>
              <Button
                component="a"
                href="/basket"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  marginTop: 1,
                  gridColumn: "span 2",
                  boxShadow: 3,
                  ":hover": {
                    boxShadow: 10,
                  },
                }}
              >
                Go to basket
              </Button>
            </Box>
          </div>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
