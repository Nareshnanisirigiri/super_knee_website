import { Drawer, Box, Typography, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import RateReviewIcon from "@mui/icons-material/RateReview";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menu = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
    { name: "Orders", icon: <ShoppingCartIcon />, path: "/admin/orders" },
    { name: "Products", icon: <StoreIcon />, path: "/admin/products" },
    { name: "Categories", icon: <CategoryIcon />, path: "/admin/categories" },
    { name: "Inventory", icon: <InventoryIcon />, path: "/admin/inventory" },
    { name: "Customers", icon: <PeopleIcon />, path: "/admin/customers" },
    { name: "Reviews", icon: <RateReviewIcon />, path: "/admin/reviews" },
    { name: "Notifications", icon: <NotificationsIcon />, path: "/admin/notifications" },
  ];

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin" || location.pathname === "/admin/";
    return location.pathname.startsWith(path);
  };

  const drawerContent = (
    <Box
      sx={{
        width: isMobile ? 240 : (open ? 240 : 70),
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        background: "linear-gradient(180deg, #0f5132 0%, #1a7a49 100%)",
        color: "#fff",
        py: 2,
        px: isMobile ? 2 : (open ? 2 : 1),
        transition: "width 0.3s ease",
        "&::-webkit-scrollbar": { width: "4px" },
        "&::-webkit-scrollbar-thumb": { background: "rgba(255,255,255,0.2)", borderRadius: "2px" },
      }}
    >
      <Box sx={{ mb: 4, mt: 1, px: isMobile || open ? 1 : 0, textAlign: isMobile || open ? "left" : "center" }}>
        {isMobile || open ? (
          <>
            <Typography variant="h5" fontWeight="bold" letterSpacing={1}>SUPERHEALTH</Typography>
            <Typography variant="caption" sx={{ opacity: 0.65 }}>Admin Panel</Typography>
          </>
        ) : (
          <Typography variant="h6" fontWeight="bold" letterSpacing={1}>SH</Typography>
        )}
      </Box>

      <List disablePadding>
        {menu.map((item) => {
          const active = isActive(item.path);
          const showText = isMobile || open;

          const buttonContent = (
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={isMobile ? onClose : undefined}
              sx={{
                color: active ? "#fff" : "rgba(255,255,255,0.75)",
                background: active ? "rgba(255,255,255,0.18)" : "transparent",
                borderRadius: 2,
                mb: 0.5,
                "&:hover": { background: "rgba(255,255,255,0.12)", color: "#fff" },
                fontWeight: active ? 700 : 400,
                transition: "all 0.2s",
                justifyContent: showText ? "initial" : "center",
                px: showText ? 2 : 0,
              }}
            >
              <ListItemIcon
                sx={{
                  color: active ? "#fff" : "rgba(255,255,255,0.7)",
                  minWidth: showText ? 40 : "auto",
                  justifyContent: "center"
                }}
              >
                {item.icon}
              </ListItemIcon>
              {showText && (
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 700 : 400 }}
                />
              )}
              {active && showText && (
                <Box sx={{ width: 4, height: 24, bgcolor: "#fff", borderRadius: 2, ml: 1 }} />
              )}
            </ListItemButton>
          );

          return (
            <Box key={item.name}>
              {showText ? buttonContent : (
                <Tooltip title={item.name} placement="right">
                  {buttonContent}
                </Tooltip>
              )}
            </Box>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: isMobile ? 240 : (open ? 240 : 70),
          borderRight: "none",
          transition: "width 0.3s ease",
          background: "transparent",
          overflow: "hidden"
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}