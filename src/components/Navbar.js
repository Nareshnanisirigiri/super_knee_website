import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Button,
  Avatar,
  Divider,
  useMediaQuery,
  Paper,
  Menu,
  MenuItem
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import { useTheme } from "@mui/material/styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  const baseMenu = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Ingredients", path: "/benefits" },
    { name: "Uses", path: "/how-it-works" },
    { name: "Reviews", path: "/reviews" },
  ];

  const loadUser = () => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }

  };

  useEffect(() => {

    loadUser();

    window.addEventListener("userLogin", loadUser);

    return () => {
      window.removeEventListener("userLogin", loadUser);
    };

  }, []);

  if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/vendor")) {
    return null;
  }

  const handleLogout = () => {

    localStorage.clear();
    setUser(null);
    navigate("/");

  };

  const roleMenu = () => {

    if (!user) return [];

    if (user.role === "user") {
      return [{ name: "Orders", path: "/orders" }];
    }

    return [];

  };

  const menuItems = [...baseMenu, ...roleMenu()];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* NAVBAR */}

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg,#ffffff,#16a34a,#065f46)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >

        <Toolbar sx={{ width: "100%", maxWidth: "100%", overflow: "hidden", px: { xs: 0.5, sm: 2 } }}>

          {/* LEFT */}

          <Box sx={{ flex: "0 0 auto", display: "flex", alignItems: "center" }}>

            {isMobile ? (
              <>
                <IconButton onClick={() => setOpen(true)} sx={{ color: "#000" }}>
                  <MenuIcon />
                </IconButton>

                <IconButton component={Link} to="/search" sx={{ color: "#000" }}>
                  <SearchIcon />
                </IconButton>
              </>
            ) : (
              /* --- PREVIOUS CODE: SUPER KNEE --- */
              
              <Typography
                variant="h5"
                component={Link}
                to="/"
                sx={{
                  color: "orange",
                  textDecoration: "none",
                  fontWeight: 700,
                  letterSpacing: 1.5,
                }}
              >
                SUPER HEALTH
              </Typography>
            )}

          </Box>

          {/* CENTER */}

          <Box sx={{ flex: 1, display: "flex", justifyContent: "center", overflow: "hidden", minWidth: 0 }}>

            {isMobile ? (
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  letterSpacing: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                SUPER HEALTH
              </Typography>
            ) : (
              menuItems.map((item) => (
                <motion.div key={item.name} whileHover={{ scale: 1.08 }}>
                  <Button
                    component={Link}
                    to={item.path}
                    sx={{
                      color: "#000",
                      mx: 2,
                      fontWeight: 600,
                    }}
                  >
                    {item.name}
                  </Button>
                </motion.div>
              ))
            )}

          </Box>

          {/* RIGHT */}

          <Box sx={{ flex: "0 0 auto", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>

            {!isMobile && (
              <IconButton component={Link} to="/search" sx={{ color: "#fff" }}>
                <SearchIcon />
              </IconButton>
            )}

            <IconButton component={Link} to="/cart" sx={{ color: "#fff" }}>
              <ShoppingCartIcon />
            </IconButton>

            {user ? (
              !isMobile && (
                <>
                  <IconButton onClick={handleMenuOpen}>
                    <Avatar sx={{ bgcolor: "#16a34a" }}>
                      {user.name.charAt(0)}
                    </Avatar>
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleMenuClose}
                  >
                    <MenuItem disabled>{user.name}</MenuItem>

                    <MenuItem
                      onClick={() => {
                        navigate("/orders");
                        handleMenuClose();
                      }}
                    >
                      Orders
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        handleLogout();
                        handleMenuClose();
                      }}
                    >
                      <LogoutIcon sx={{ mr: 1 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              )
            ) : (
              !isMobile && (
                <IconButton component={Link} to="/auth" sx={{ color: "#fff" }}>
                  <AccountCircleIcon />
                </IconButton>
              )
            )}

          </Box>

        </Toolbar>

      </AppBar>

      {/* MOBILE DRAWER */}

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: "linear-gradient(180deg,#065f46,#16a34a)",
            color: "#fff",
          },
        }}
      >

        <Box
          sx={{
            p: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >

          <Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

              {/* TITLE */}
              {/* --- PREVIOUS CODE: SUPER KNEE --- */}

              <Typography
                variant="h6"
                sx={{
                  color: "orange",
                  fontWeight: "bold",
                  letterSpacing: 1
                }}
              >
                <i>SUPER HEALTH</i>
              </Typography>

              <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
                <CloseIcon />
              </IconButton>

            </Box>

            <Divider sx={{ my: 2, bgcolor: "#ffffff55" }} />

            <List>

              {menuItems.map((item) => (
                <ListItem key={item.name} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    onClick={() => setOpen(false)}
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}

            </List>

          </Box>

          {user ? (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  textAlign: "center",
                  color: "#fff"
                }}
              >
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    margin: "auto",
                    mb: 1,
                    bgcolor: "#fff",
                    color: "#065f46",
                    fontWeight: "bold"
                  }}
                >
                  {user.name.charAt(0)}
                </Avatar>

                <Typography fontWeight="bold">{user.name}</Typography>
                <Typography variant="body2">{user.email}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>Role: {user.role}</Typography>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{
                    mt: 1,
                    bgcolor: "#fff",
                    color: "#065f46",
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "#f1f5f9" }
                  }}
                >
                  Logout
                </Button>
              </Paper>
            </motion.div>
          ) : (
            <Button
              fullWidth
              variant="contained"
              startIcon={<AccountCircleIcon />}
              component={Link}
              to="/auth"
              onClick={() => setOpen(false)}
              sx={{
                py: 1.5,
                bgcolor: "#fff",
                color: "#065f46",
                fontWeight: "bold",
                borderRadius: 3,
                "&:hover": { bgcolor: "#f1f5f9" }
              }}
            >
              Login / Join
            </Button>
          )}

        </Box>

      </Drawer>

    </>
  );
}