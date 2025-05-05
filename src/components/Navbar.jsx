import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Switch,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { useContext, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const Navbar = () => {
  const { mode, toggleMode } = useContext(GlobalContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Exchange Rates (LIVE)", path: "/exchange_rates_live" },
    { label: "About", path: "/about" },
    { label: "Error Page", path: "*" },
  ];

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Loan Calculator
          </Typography>

          {/* Mobile View */}
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <List sx={{ width: 250 }}>
                  {navLinks.map((item) => (
                    <ListItem key={item.label} disablePadding>
                      <ListItemButton
                        component={Link}
                        to={item.path}
                        onClick={toggleDrawer(false)}
                      >
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <ListItem disablePadding>
                    <ListItemButton>
                      <Switch checked={mode === "dark"} onChange={toggleMode} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Drawer>
            </>
          ) : (
            // Desktop View
            <div>
              {navLinks.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  color="inherit"
                >
                  {item.label}
                </Button>
              ))}
              <Switch checked={mode === "dark"} onChange={toggleMode} />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
