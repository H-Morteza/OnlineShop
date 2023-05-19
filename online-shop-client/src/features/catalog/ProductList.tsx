import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}
export default function ProductList({ products }: Props) {
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  if (products.length == 0)
    return (
      <Grid container spacing={1}>
        <Container component={Paper} sx={{ padding: 10, margin: 1 }}>
          <Typography gutterBottom variant="h3" sx={{ textAlign: "center" }}>
            Oops - There is no product fount
          </Typography>
        </Container>
      </Grid>
    );
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={4} key={product.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard product={product} />
          )}
        </Grid>
      ))}
    </Grid>
  );
}
