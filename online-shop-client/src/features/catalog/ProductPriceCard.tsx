import { Chip, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { currencyFormat } from "../../app/utility/utility";

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
              {currencyFormat(product.payablePrice!)}
            </Typography>
            <del
              style={{
                color: "green",
              }}
            >
              ({currencyFormat(product.price!)})
            </del>
          </div>
          <Chip color="error" label={disPercent} size="small" />
        </div>
      </>
    );
  } else {
    return (
      <Typography variant="body2" color="blue" fontSize={20}>
        {currencyFormat(product.price!)}
      </Typography>
    );
  }
}
