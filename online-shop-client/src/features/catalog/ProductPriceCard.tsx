import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
  product: Product;
}

export default function ProductPriceCard({ product }: Props) {
  let discountPercent = product.discountPercent;
  if (discountPercent != undefined && discountPercent > 10) {
    let disPercent = discountPercent + "%";
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" color="blue" fontSize={20}>
              ${product.payablePrice?.toFixed(2)}
            </Typography>
            <del
              style={{
                color: "green",
              }}
            >
              ( ${product.price?.toFixed(2)})
            </del>
          </div>
          <Chip color="error" label={disPercent} size="small" />
        </div>
      </>
    );
  } else {
    return (
      <Typography variant="body2" color="blue" fontSize={20}>
        ${product.price?.toFixed(2)}
      </Typography>
    );
  }
}
