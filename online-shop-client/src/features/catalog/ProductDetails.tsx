import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiHelper from "../../app/api/apiHelper";
import { Product } from "../../app/models/product";
import ProductPriceCard from "./ProductPriceCard";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    debugger;
    apiHelper.Catalog.details(parseInt(id!))
      .then((product) => setProduct(product))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);
  if (loading) return <h3>Loading....</h3>;
  if (!product) return <h3>Product not found</h3>;
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.imageUrl}
          alt={product.imageAlt}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Price</TableCell>
                <TableCell>
                  <ProductPriceCard product={product} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
