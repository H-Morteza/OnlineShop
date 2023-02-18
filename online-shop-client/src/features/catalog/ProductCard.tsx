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
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import ProductDetails from "./ProductDetails";
import ProductPriceCard from "./ProductPriceCard";

interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
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
        <Button size="small">Add to cart</Button>
        <Button size="small" component={Link} to={`/catalogs/${product.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
