import { Box, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function AdminLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto-close sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <Box sx={{ display: { xs: "block", md: "flex" }, width: "100%" }}>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Box
        sx={{
          flex: 1,
          ml: { xs: 0, sm: 0, md: sidebarOpen ? "240px" : "70px" },
          width: { xs: "100%", sm: "100%", md: `calc(100% - ${sidebarOpen ? 240 : 70}px)` },
          background: "#f5f6fa",
          minHeight: "100vh",
          transition: "margin-left 0.3s ease, width 0.3s ease",
        }}
      >

        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Outlet />
        </Box>

      </Box>

    </Box>
  );
}