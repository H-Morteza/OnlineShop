import { Typography } from "@mui/material";
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
  });
  if (loading) return <LodingComponent message="loading basket..." />;
  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;
  return (
    <>
      <h1>Byer Id = {basket.buyerId}</h1>
    </>
  );
}
