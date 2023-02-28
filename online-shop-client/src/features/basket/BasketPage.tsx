import { Delete } from "@mui/icons-material";
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
import LodingComponent from "../../app/layout/LodingComponent";
import { Basket } from "../../app/models/basket";

export default function BasketPage() {
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState<Basket | null>(null);
  useEffect(() => {
    apiHelper.Basket.get()
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <LodingComponent message="loading basket..." />;
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
              <TableCell align="right">Quantity</TableCell>
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
                  $
                  {(item.product.payablePrice != undefined &&
                  item.product.payablePrice > 0
                    ? item.product.payablePrice
                    : item.product.price
                  ).toFixed(2)}
                </TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">
                  $
                  {(
                    (item.product.payablePrice != undefined &&
                    item.product.payablePrice > 0
                      ? item.product.payablePrice
                      : item.product.price) * item.quantity
                  ).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
