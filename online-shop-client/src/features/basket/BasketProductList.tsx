import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import { currencyFormat } from "../../app/utility/utility";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, TableHead } from "@mui/material";
import { useState } from "react";
import apiHelper from "../../app/api/apiHelper";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { removeItem, setBasket } from "./basketSlice";

export default function BasketProductList() {
  const { basket } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });

  function AddItem(productId: number, name: string) {
    setStatus({ loading: true, name });
    apiHelper.Basket.addItem(productId)
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  }
  function RemoveItem(productId: number, quantity: number = 1, name: string) {
    setStatus({ loading: true, name });
    apiHelper.Basket.removeItem(productId, quantity)
      .then((basket) => dispatch(removeItem({ productId, quantity })))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          gridColumn: "span 3",
          borderRadius: "10px",
          borderColor: "primary.main",
        }}
      >
        <Table>
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
                    loading={
                      status.loading &&
                      status.name === "rem" + item.product.name
                    }
                    onClick={() =>
                      RemoveItem(item.productId, 1, "rem" + item.productId)
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={
                      status.loading &&
                      status.name === "add" + item.product.name
                    }
                    onClick={() =>
                      AddItem(item.productId, "add" + item.productId)
                    }
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
                    loading={
                      status.loading &&
                      status.name === "del" + item.product.name
                    }
                    onClick={() =>
                      RemoveItem(
                        item.productId,
                        item.quantity,
                        "del" + item.productId
                      )
                    }
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
