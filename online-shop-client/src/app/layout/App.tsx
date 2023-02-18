import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eeeaea" : "#121212",
      },
    },
  });
  function handelThemeChange() {
    setDarkMode(!darkMode);
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header darkMode={darkMode} handelThemeChange={handelThemeChange} />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalogs/:id" element={<ProductDetails />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
