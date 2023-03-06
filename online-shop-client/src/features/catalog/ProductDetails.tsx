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

export default function ProductDetails() {
  const { basket, setBasket, removeItem } = useShopContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    apiHelper.Catalog.details(parseInt(id!))
      .then((product) => setProduct(product))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id, item]);

  function AddItem(productId: number) {
    apiHelper.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() =>
        setQuantity(
          item != null && item != undefined ? item.quantity : quantity
        )
      );
  }
  function RemoveItem(productId: number, quantity: number = 1) {
    apiHelper.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() =>
        setQuantity(
          item != null && item != undefined ? item.quantity : quantity
        )
      );
  }

  const commonStyles = {
    borderColor: "secondary.main",
    m: 1,
    border: 1,
    borderRadius: "10px",
    style: { height: "5rem" },
  };

  if (loading) return <LodingComponent message="Loading Product..." />;
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
