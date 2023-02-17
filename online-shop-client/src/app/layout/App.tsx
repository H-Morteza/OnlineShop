import { Container, CssBaseline } from "@mui/material";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <Catalog />
      </Container>
    </>
  );
}

export default App;
