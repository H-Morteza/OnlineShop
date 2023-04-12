import { Box, Button, Typography } from "@mui/material";
import BasketProductList from "./BasketProductList";
import BasketSummary from "./BasketSummary";
import { useAppSelector } from "../../app/store/configureStore";

export default function BasketPage() {
  const { basket } = useAppSelector((state) => state.basket);
  if (!basket || basket.items.length <= 0)
    return (
      <>
        <Typography variant="h3">Your basket is empty</Typography>
        <Button
          component="a"
          href="/catalog"
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
        >
          Open catalog
        </Button>
      </>
    );
  return (
    <>
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1 }}
      >
        <BasketProductList />
        <div>
          <BasketSummary />
          <Button
            component="a"
            href="/catalog"
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
          >
            Checkout
          </Button>
        </div>
      </Box>
    </>
  );
}
