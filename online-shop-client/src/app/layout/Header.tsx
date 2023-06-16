import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Switch,
  Toolbar,
  Typography,
  ListItem,
  Badge,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { Box, display } from "@mui/system";
import { NavLink } from "react-router-dom";
import { useShopContext } from "../context/ShopContext";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";
interface Props {
  darkMode: boolean;
  handelThemeChange: () => void;
}

const midLink = [
  { title: "Catalog", path: "/catalog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];
const rightLink = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];
const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};
export default function Header({ darkMode, handelThemeChange }: Props) {
  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
            OnlieShop
          </Typography>
          <Switch checked={darkMode} onChange={handelThemeChange} />
        </Box>
        <List sx={{ display: "flex" }}>
          {midLink.map((item) => (
            <ListItem
              component={NavLink}
              to={item.path}
              key={item.path}
              sx={navStyles}
            >
              {item.title}
            </ListItem>
          ))}
        </List>
        <Box display="flex" alignItems="center">
          <IconButton
            component={NavLink}
            to="/basket"
            size="large"
            sx={{ color: "inherit" }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          {user ? (
            <SignedInMenu />
          ) : (
            <List sx={{ display: "flex" }}>
              {rightLink.map((item) => (
                <ListItem
                  component={NavLink}
                  to={item.path}
                  key={item.path}
                  sx={navStyles}
                >
                  {item.title}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
