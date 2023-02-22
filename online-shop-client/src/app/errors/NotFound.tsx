import { Button, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { link } from "fs";

export default function NotFound() {
  return (
    <Container component={Paper} sx={{ height: 500 }}>
      <Typography gutterBottom variant="h3">
        Oops - we could not find what you are looking for
      </Typography>
      <Button fullWidth color="primary" component="a" href="/catalog">
        Open in new tab
      </Button>
    </Container>
  );
}
