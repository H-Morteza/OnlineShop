import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import apiHelper from "../../app/api/apiHelper";
import { useShopContext } from "../../app/context/ShopContext";
import LodingComponent from "../../app/layout/LodingComponent";
import { Basket } from "../../app/models/basket";
import { currencyFormat } from "../../app/utility/utility";

export default function BasketPage() {
  const { basket, setBasket, removeItem } = useShopContext();
  const [loading, setLoading] = useState(false);

  function AddItem(productId: number) {
    setLoading(true);
    apiHelper.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }
  function RemoveItem(productId: number, quantity: number = 1) {
    setLoading(true);
    apiHelper.Basket.removeItem(productId, quantity)
      .then((basket) => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.imageAlt}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.product.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(
                    item.product.payablePrice != undefined &&
                      item.product.payablePrice > 0
                      ? item.product.payablePrice
                      : item.product.price
                  )}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={loading}
                    onClick={() => RemoveItem(item.productId)}
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={loading}
                    onClick={() => AddItem(item.productId)}
                    color="success"
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(
                    (item.product.payablePrice != undefined &&
                    item.product.payablePrice > 0
                      ? item.product.payablePrice
                      : item.product.price) * item.quantity
                  )}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={loading}
                    onClick={() => RemoveItem(item.productId, item.quantity)}
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
