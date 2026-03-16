// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Box,
//   Button,
//   Avatar,
//   Divider,
//   useMediaQuery,
//   Menu,
//   MenuItem,
//   Container,
//   Stack,
//   TextField
// } from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import SearchIcon from "@mui/icons-material/Search";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import LogoutIcon from "@mui/icons-material/Logout";

// import { useTheme } from "@mui/material/styles";
// import { Link, useNavigate, useLocation } from "react-router-dom";


// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const openMenu = Boolean(anchorEl);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const baseMenu = [
//     { name: "Home", path: "/" },
//     { name: "Shop", path: "/shop" },
//     { name: "Ingredients", path: "/benefits" },
//     { name: "Uses", path: "/how-it-works" },
//     { name: "Reviews", path: "/reviews" },
//   ];

//   const loadUser = () => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     loadUser();
//     window.addEventListener("userLogin", loadUser);
//     window.addEventListener("storage", loadUser);
//     return () => {
//       window.removeEventListener("userLogin", loadUser);
//       window.removeEventListener("storage", loadUser);
//     };
//   }, []);

//   if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/vendor") || location.pathname === "/checkout") {
//     return null;
//   }

//   const handleLogout = () => {
//     localStorage.clear();
//     setUser(null);
//     navigate("/");
//   };

//   const roleMenu = () => {
//     if (!user) return [];
//     if (user.role === "user") {
//       return [{ name: "Orders", path: "/orders" }];
//     }
//     return [];
//   };

//   const menuItems = [...baseMenu, ...roleMenu()];

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <AppBar
//         position="sticky"
//         elevation={0}
//         sx={{
//           background: "linear-gradient(135deg, #16a34a 0%, #065f46 100%)",
//           backdropFilter: "blur(12px)",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
//         }}
//       >
//         <Toolbar 
//           sx={{ 
//             width: "100%", 
//             maxWidth: "1200px", 
//             mx: "auto", 
//             px: { xs: 1, sm: 2 }, 
//             display: isMobile ? 'grid' : 'flex',
//             gridTemplateColumns: isMobile ? '1fr auto 1fr' : 'none',
//             alignItems: 'center'
//           }}
//         >
//           {/* LEFT: Menu / Logo */}
//           <Box sx={{ display: "flex", alignItems: "center", flex: isMobile ? 0 : 1 }}>
//             {isMobile && (
//               <IconButton onClick={() => setOpen(true)} sx={{ color: "#fff" }}>
//                 <MenuIcon />
//               </IconButton>
//             )}
//             {!isMobile && (
//               <Typography
//                 variant="h5"
//                 component={Link}
//                 to="/"
//                 sx={{
//                   color: "orange",
//                   textDecoration: "none",
//                   fontWeight: 900,
//                   letterSpacing: 1.5,
//                 }}
//               >
//                 SUPER HEALTH
//               </Typography>
//             )}
//           </Box>

//           {/* CENTER: Logo (Mobile) or Nav Links (Desktop) */}
//           <Box 
//             sx={{ 
//               display: "flex", 
//               justifyContent: "center", 
//               alignItems: "center", 
//               flex: isMobile ? 0 : "0 0 auto",
//               mx: isMobile ? 0 : 4
//             }}
//           >
//             {isMobile ? (
//               <Typography
//                 variant="h6"
//                 component={Link}
//                 to="/"
//                 sx={{
//                   color: "#fff",
//                   textDecoration: "none",
//                   fontWeight: 900,
//                   fontSize: "1.05rem",
//                   letterSpacing: 0.5,
//                   whiteSpace: 'nowrap',
//                   textAlign: 'center'
//                 }}
//               >
//                 SUPER HEALTH
//               </Typography>
//             ) : (
//               <Stack direction="row" spacing={1}>
//                 {menuItems.map((item) => (
//                   <Button
//                     key={item.name}
//                     component={Link}
//                     to={item.path}
//                     sx={{
//                       color: "#fff",
//                       px: 2,
//                       fontWeight: 600,
//                       textTransform: "none",
//                       "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
//                     }}
//                   >
//                     {item.name}
//                   </Button>
//                 ))}
//               </Stack>
//             )}
//           </Box>

//           {/* RIGHT: Actions */}
//           <Box 
//             sx={{ 
//               display: "flex", 
//               justifyContent: "flex-end", 
//               alignItems: "center", 
//               gap: { xs: .5, sm: 1 },
//               flex: isMobile ? 0 : 1
//             }}
//           >
//             <IconButton onClick={() => setSearchOpen(true)} sx={{ color: "#fff", p: isMobile ? .5 : 1 }}>
//               <SearchIcon />
//             </IconButton>

//             <IconButton component={Link} to="/cart" sx={{ color: "#fff", p: isMobile ? .5 : 1 }}>
//               <ShoppingCartIcon />
//             </IconButton>

//             {user ? (
//                <>
//                 <IconButton onClick={handleMenuOpen} sx={{ p: isMobile ? .5 : 1 }}>
//                     <Avatar sx={{ bgcolor: "#fff", color: "#16a34a", width: 28, height: 28, fontSize: '0.8rem', fontWeight: 800 }}>
//                       {user.name.charAt(0)}
//                     </Avatar>
//                 </IconButton>
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={openMenu}
//                   onClose={handleMenuClose}
//                   PaperProps={{ sx: { mt: 1.5, minWidth: 180, borderRadius: 3 } }}
//                 >
//                   <Box sx={{ px: 2, py: 1 }}>
//                     <Typography variant="subtitle2" fontWeight="900">{user.name}</Typography>
//                     <Typography variant="caption" color="text.secondary">{user.email}</Typography>
//                   </Box>
//                   <Divider />
//                   <MenuItem onClick={() => { navigate("/orders"); handleMenuClose(); }}>Orders</MenuItem>
//                   <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>
//                     <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
//                   </MenuItem>
//                 </Menu>
//                </>
//             ) : (
//               <IconButton component={Link} to="/auth" sx={{ color: "#fff", p: isMobile ? .5 : 1 }}>
//                 <AccountCircleIcon />
//               </IconButton>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* MOBILE DRAWER */}
//       <Drawer
//         anchor="left"
//         open={open}
//         onClose={() => setOpen(false)}
//         PaperProps={{
//           sx: { width: 280, background: "linear-gradient(180deg,#065f46,#16a34a)", color: "#fff" }
//         }}
//       >
//         <Box sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
//           <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
//             <Typography variant="h6" fontWeight="900" sx={{ color: "orange" }}>SUPER HEALTH</Typography>
//             <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
//               <CloseIcon />
//             </IconButton>
//           </Stack>
          
//           <List>
//             {menuItems.map((item) => (
//               <ListItem key={item.name} disablePadding>
//                 <ListItemButton component={Link} to={item.path} onClick={() => setOpen(false)} sx={{ borderRadius: 2, mb: 1 }}>
//                   <ListItemText primary={item.name} primaryTypographyProps={{ fontWeight: 600 }} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>

//           <Box sx={{ mt: 'auto', p: 2, bgcolor: "rgba(255,255,255,0.1)", borderRadius: 4 }}>
//             {user ? (
//               <Stack spacing={2}>
//                 <Stack direction="row" spacing={2} alignItems="center">
//                   <Avatar sx={{ bgcolor: "#fff", color: "#16a34a" }}>{user.name.charAt(0)}</Avatar>
//                   <Box>
//                     <Typography fontWeight="bold">{user.name}</Typography>
//                     <Typography variant="caption" sx={{ opacity: 0.8 }}>{user.email}</Typography>
//                   </Box>
//                 </Stack>
//                 <Button fullWidth variant="contained" onClick={handleLogout} sx={{ bgcolor: "white", color: "#065f46", fontWeight: "bold", "&:hover": { bgcolor: "#f1f5f9" } }}>
//                   Logout
//                 </Button>
//               </Stack>
//             ) : (
//               <Button fullWidth variant="contained" component={Link} to="/auth" onClick={() => setOpen(false)} sx={{ bgcolor: "white", color: "#065f46", fontWeight: "bold" }}>
//                 Login / Join
//               </Button>
//             )}
//           </Box>
//         </Box>
//       </Drawer>

//       {/* SEARCH OVERLAY */}
//       <Drawer
//         anchor="top"
//         open={searchOpen}
//         onClose={() => setSearchOpen(false)}
//         PaperProps={{ sx: { p: { xs: 2, md: 4 } } }}
//       >
//         <Container maxWidth="md">
//           <Stack direction="row" alignItems="center" spacing={2}>
//             <SearchIcon sx={{ color: "#16a34a", fontSize: 28 }} />
//             <TextField
//               fullWidth
//               variant="standard"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               autoFocus
//               onKeyPress={(e) => {
//                 if (e.key === 'Enter') {
//                   navigate(`/search?q=${searchQuery}`);
//                   setSearchOpen(false);
//                 }
//               }}
//               InputProps={{ disableUnderline: true, sx: { fontSize: "1.2rem", fontWeight: 600 } }}
//             />
//             <IconButton onClick={() => setSearchOpen(false)}>
//               <CloseIcon />
//             </IconButton>
//           </Stack>
//         </Container>
//       </Drawer>
//     </>
//   );
// }






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
  Menu,
  MenuItem,
  Container,
  Stack,
  TextField
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import { useTheme } from "@mui/material/styles";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    window.addEventListener("storage", loadUser);
    return () => {
      window.removeEventListener("userLogin", loadUser);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  if (
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/vendor") ||
    location.pathname === "/checkout"
  ) {
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
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #16a34a 0%, #065f46 100%)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >

        <Toolbar
          sx={{
            width: "100%",
            maxWidth: "1200px",
            mx: "auto",
            px: { xs: 1, sm: 2 },
            display: isMobile ? "grid" : "flex",
            gridTemplateColumns: isMobile ? "auto auto 1fr auto auto auto" : "none",
            alignItems: "center"
          }}
        >

          {/* MOBILE MENU */}
          {isMobile && (
            <IconButton onClick={() => setOpen(true)} sx={{ color: "#fff" }}>
              <MenuIcon />
            </IconButton>
          )}

          {/* MOBILE SEARCH */}
          {isMobile && (
            <IconButton
              onClick={() => setSearchOpen(true)}
              sx={{ color: "#fff" }}
            >
              <SearchIcon />
            </IconButton>
          )}

          {/* LEFT: Logo / Title Desktop */}
          {!isMobile && (
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                color: "orange",
                textDecoration: "none",
                fontWeight: 900,
                letterSpacing: 1.5,
                flex: 1
              }}
            >
              SUPER HEALTH
            </Typography>
          )}

          {/* CENTER MOBILE TITLE */}
          {isMobile && (
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 900,
                textAlign: "center"
              }}
            >
              SUPER HEALTH
            </Typography>
          )}

          {/* DESKTOP MENU */}
          {!isMobile && (
            <Stack direction="row" spacing={1} sx={{ mx: 4 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: "#fff",
                    px: 2,
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Stack>
          )}

          {/* RIGHT ACTIONS */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: .5, sm: 1 },
              flex: isMobile ? 0 : 1,
              justifyContent: "flex-end"
            }}
          >

            {/* SEARCH DESKTOP */}
            {!isMobile && (
              <IconButton
                onClick={() => setSearchOpen(true)}
                sx={{ color: "#fff" }}
              >
                <SearchIcon />
              </IconButton>
            )}

            {/* WISHLIST */}
            <IconButton
              component={Link}
              to="/wishlist"
              sx={{ color: "#fff" }}
            >
              <FavoriteBorderIcon />
            </IconButton>

            {/* CART */}
            <IconButton
              component={Link}
              to="/cart"
              sx={{ color: "#fff" }}
            >
              <ShoppingCartIcon />
            </IconButton>

            {/* USER */}
            {user ? (
              <>
                <IconButton onClick={handleMenuOpen}>
                  <Avatar
                    sx={{
                      bgcolor: "#fff",
                      color: "#16a34a",
                      width: 28,
                      height: 28,
                      fontSize: "0.8rem",
                      fontWeight: 800
                    }}
                  >
                    {user.name.charAt(0)}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
                  PaperProps={{ sx: { mt: 1.5, minWidth: 180, borderRadius: 3 } }}
                >
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle2" fontWeight="900">
                      {user.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>

                  <Divider />

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
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <IconButton component={Link} to="/auth" sx={{ color: "#fff" }}>
                <AccountCircleIcon />
              </IconButton>
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
            width: 280,
            background: "linear-gradient(180deg,#065f46,#16a34a)",
            color: "#fff"
          }
        }}
      >
        <Box sx={{ p: 2 }}>

          <Stack direction="row" justifyContent="space-between" mb={3}>
            <Typography fontWeight="bold">SUPER HEALTH</Typography>

            <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Stack>

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
      </Drawer>

      {/* SEARCH DRAWER */}
      <Drawer
        anchor="top"
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        PaperProps={{ sx: { p: { xs: 2, md: 4 } } }}
      >
        <Container maxWidth="md">
          <Stack direction="row" spacing={2} alignItems="center">

            <SearchIcon sx={{ color: "#16a34a" }} />

            <TextField
              fullWidth
              variant="standard"
              placeholder="Search products..."
              value={searchQuery}
              autoFocus
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: "1.2rem", fontWeight: 600 }
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  navigate(`/search?q=${searchQuery}`);
                  setSearchOpen(false);
                }
              }}
            />

            <IconButton onClick={() => setSearchOpen(false)}>
              <CloseIcon />
            </IconButton>

          </Stack>
        </Container>
      </Drawer>

    </>
  );
}