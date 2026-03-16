import React, { useEffect, useState, useCallback } from "react";
import api from "../../../api";
import { io } from "socket.io-client";
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, Chip, CircularProgress, IconButton, Tooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const SOCKET_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://superknee-backend.onrender.com";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  const buildCategories = (products) => {
    const map = {};
    products.forEach((p) => {
      const cat = p.category || "Uncategorized";
      if (!map[cat]) map[cat] = { name: cat, count: 0, totalStock: 0 };
      map[cat].count += 1;
      map[cat].totalStock += p.stock || 0;
    });
    return Object.values(map).sort((a, b) => b.count - a.count);
  };

  const fetchCategories = useCallback(async () => {
    try {
      const res = await api.get("/admin/products");
      /* --- PREVIOUS CODE ---
      setCategories(buildCategories(res.data));
      ----------------------- */
      setCategories(buildCategories(res.data.products || []));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();

    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    // Refresh whenever products change
    socket.on("product:created", () => fetchCategories());
    socket.on("product:updated", () => fetchCategories());
    socket.on("product:deleted", () => fetchCategories());

    return () => socket.disconnect();
  }, [fetchCategories]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" mb={0.5} sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}>
            Categories
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FiberManualRecordIcon sx={{ fontSize: 12, color: connected ? "#10b981" : "#ef4444" }} />
            <Typography variant="body2" color="text.secondary">
              {connected ? "Live" : "Offline"} · {categories.length} categories
            </Typography>
          </Box>
        </Box>
        <Tooltip title="Refresh">
          <IconButton onClick={fetchCategories}><RefreshIcon /></IconButton>
        </Tooltip>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}><CircularProgress /></Box>
        ) : categories.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography color="text.secondary">No categories yet. Add products with categories.</Typography>
          </Box>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>#</b></TableCell>
                  <TableCell><b>Category Name</b></TableCell>
                  <TableCell><b>Total Products</b></TableCell>
                  <TableCell><b>Total Stock Units</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((cat, i) => (
                  <TableRow key={cat.name} hover>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell fontWeight={600}>{cat.name}</TableCell>
                    <TableCell>{cat.count}</TableCell>
                    <TableCell>{cat.totalStock}</TableCell>
                    <TableCell>
                      <Chip
                        label={cat.totalStock === 0 ? "No Stock" : cat.totalStock <= 10 ? "Low Stock" : "Stocked"}
                        color={cat.totalStock === 0 ? "error" : cat.totalStock <= 10 ? "warning" : "success"}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Paper>
    </Box>
  );
}