

import React, { useState } from "react";
import {
  Box,
  TextField,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Divider,
  IconButton
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function Topbar({ toggleSidebar }) {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  // OPEN MENU
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // CLOSE MENU
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setAnchorEl(null);

    // refresh navbar
    window.dispatchEvent(new Event("userLogin"));

    // redirect to homepage
    navigate("/");
  };

  return (
    <Box
      sx={{
        height: 70,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, md: 4 },
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >

      {/* LEFT COMPONENT & SEARCH */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton onClick={toggleSidebar} sx={{ color: "#000" }}>
          <MenuIcon />
        </IconButton>

        <TextField
          placeholder="Search..."
          size="small"
          sx={{ 
            width: { xs: 120, sm: 250, md: 400 }, 
            flex: { xs: "none", sm: "none" } 
          }}
        />
      </Box>

      {/* USER PROFILE */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          cursor: "pointer"
        }}
        onClick={handleMenuOpen}
      >

        <Avatar sx={{ bgcolor: "green" }}>
          {user?.name?.charAt(0)}
        </Avatar>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Typography fontWeight="bold">
            {user?.name}
          </Typography>

          <Typography fontSize={12}>
            {user?.role}
          </Typography>
        </Box>

      </Box>

      {/* DROPDOWN */}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >

        <MenuItem>
          <Typography fontWeight="bold">
            {user?.name}
          </Typography>
        </MenuItem>

        <MenuItem>
          {user?.email}
        </MenuItem>

        <MenuItem>
          Role : {user?.role}
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} />
          Logout
        </MenuItem>

      </Menu>

    </Box>
  );
}
