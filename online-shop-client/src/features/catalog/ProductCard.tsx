import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import apiHelper from "../../app/api/apiHelper";
import { useShopContext } from "../../app/context/ShopContext";
import { Product } from "../../app/models/product";
import ProductPriceCard from "./ProductPriceCard";

interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const { setBasket } = useShopContext();
  function handleAddItem(productId: number) {
    setLoading(true);
    apiHelper.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }
  return (
    <Card
      sx={{
        ":hover": {
          boxShadow: 10,
        },
      }}
    >
      <CardMedia
        sx={{ height: 230, backgroundSize: "contain" }}
        component="img"
        alt={product.imageAlt}
        image={product.imageUrl}
      />
      <CardContent>
        <Typography
          gutterBottom
          color="black"
          fontSize="1rem"
          variant="h1"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Rating
            name="read-only"
            precision={0.1}
            value={product.rate}
            readOnly
          />
        </Typography>
        <ProductPriceCard product={product} />
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={loading}
          onClick={() => handleAddItem(product.id!)}
          size="small"
        >
          Add to cart
        </LoadingButton>
        <Button size="small" component={Link} to={`/catalogs/${product.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
