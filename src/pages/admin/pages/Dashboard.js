import React, { useEffect, useState, useCallback } from "react";
import api from "../../../api";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Grid, Paper, Table, TableHead,
  TableRow, TableCell, TableBody, Chip, CircularProgress,
  IconButton, Tooltip, Badge
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const SOCKET_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://superknee-backend.onrender.com";

const statusColor = (status) => {
  if (!status) return "default";
  const s = status.toLowerCase();
  if (s === "delivered" || s === "paid" || s === "completed") return "success";
  if (s === "shipped") return "primary";
  if (s === "processing") return "info";
  if (s === "pending") return "warning";
  if (s === "cancelled" || s === "failed") return "error";
  return "default";
};

export default function Dashboard() {
  const [stats, setStats] = useState({ 
    totalOrders: 0, 
    totalProducts: 0, 
    customers: 0, 
    revenue: 0,
    aov: 0,
    topProducts: [],
    statusDistribution: [],
    paymentBreakdown: []
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await api.get("/admin/stats");
      if (res.data.success && res.data.stats) {
        setStats(res.data.stats);
        setOrders(Array.isArray(res.data.recentOrders) ? res.data.recentOrders : []);
      } else {
        // Fallback for old API structure
        setStats({
          totalOrders: res.data.totalOrders || 0,
          totalProducts: res.data.totalProducts || 0,
          customers: res.data.customers || 0,
          revenue: res.data.revenue || 0,
          aov: 0,
          statusDistribution: [],
          topProducts: []
        });
        setOrders(Array.isArray(res.data.recentOrders) ? res.data.recentOrders : []);
      }
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 30000);
    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("order:new", () => fetchDashboard());
    socket.on("order:updated", () => fetchDashboard());
    return () => { clearInterval(interval); socket.disconnect(); };
  }, [fetchDashboard]);

  const navigate = useNavigate();

  const statCards = [
    { title: "Total Revenue", value: `₹${Number(stats?.revenue || 0).toLocaleString("en-IN")}`, icon: <TrendingUpIcon sx={{ fontSize: 36, color: "#f59e0b" }} />, bg: "#fffbeb", border: "#fde68a" },
    { title: "Total Orders", value: stats?.totalOrders || 0, icon: <ShoppingCartIcon sx={{ fontSize: 36, color: "#3b82f6" }} />, bg: "#eff6ff", border: "#bfdbfe", path: "/admin/orders" },
    { title: "Avg. Order Value", value: `₹${Number(stats?.aov || 0).toLocaleString("en-IN")}`, icon: <AnalyticsIcon sx={{ fontSize: 36, color: "#10b981" }} />, bg: "#ecfdf5", border: "#a7f3d0" },
    { title: "Active Customers", value: stats?.customers || 0, icon: <GroupIcon sx={{ fontSize: 36, color: "#8b5cf6" }} />, bg: "#f5f3ff", border: "#ddd6fe", path: "/admin/customers" },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" mb={0.5} sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}>
            Admin Dashboard
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FiberManualRecordIcon sx={{ fontSize: 12, color: connected ? "#10b981" : "#ef4444" }} />
            <Typography variant="body2" color="text.secondary">
              {connected ? "Live" : "Offline"} · Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : "—"}
            </Typography>
          </Box>
        </Box>
        <Tooltip title="Refresh">
          <IconButton onClick={fetchDashboard} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : <RefreshIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={3} mb={4}>
        {statCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Paper
              elevation={0}
              onClick={() => card.path && navigate(card.path)}
              sx={{
                p: 3,
                borderRadius: 3,
                background: card.bg,
                border: `1px solid ${card.border}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: card.path ? "pointer" : "default",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": card.path ? {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)"
                } : {}
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary" mb={0.5}>{card.title}</Typography>
                <Typography variant="h4" fontWeight="bold">{card.value}</Typography>
              </Box>
              {card.icon}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Payment Methods Section */}
      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider", mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" mb={3}>Payment Methods Breakdown</Typography>
        <Grid container spacing={2}>
          {stats?.paymentBreakdown?.map((item) => (
            <Grid item xs={12} sm={6} key={item._id}>
              <Box sx={{ p: 2.5, bgcolor: "#f9fafb", borderRadius: 3, textAlign: "center", border: "1px solid #f3f4f6" }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>{item._id}</Typography>
                <Typography variant="h5" fontWeight="bold">₹{item.total?.toLocaleString("en-IN")}</Typography>
                <Typography variant="caption" sx={{ color: "#10b981", fontWeight: "bold", bgcolor: "#ecfdf5", px: 1, py: 0.5, borderRadius: 1, mt: 1, display: "inline-block" }}>
                  {item.count} Orders
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Recent Orders */}
      <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
        <Box sx={{ p: 2.5, borderBottom: "1px solid", borderColor: "divider", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" fontWeight="bold">Recent Orders</Typography>
          <Badge badgeContent={orders.length} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}><CircularProgress /></Box>
        ) : orders.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography color="text.secondary">No orders yet.</Typography>
          </Box>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "#f9fafb" }}>
                  <TableCell><b>Order ID</b></TableCell>
                  <TableCell><b>Customer</b></TableCell>
                  <TableCell><b>Product</b></TableCell>
                  <TableCell><b>Qty</b></TableCell>
                  <TableCell><b>Amount</b></TableCell>
                  <TableCell><b>Payment</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Date</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => {
                  const customerName = order.userId?.name || order.shippingAddress?.name || "N/A";
                  const customerEmail = order.userId?.email || order.shippingAddress?.email || "";
                  const firstItem = order.items?.[0];
                  const productName = firstItem?.name || "—";
                  const totalQty = order.items?.reduce((s, i) => s + (i.quantity || 0), 0) || 0;
                  return (
                    <TableRow key={order._id} hover>
                      <TableCell sx={{ fontFamily: "monospace", fontSize: 11, color: "#6b7280" }}>
                        #{order._id?.slice(-8).toUpperCase()}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>{customerName}</Typography>
                        <Typography variant="caption" color="text.secondary">{customerEmail}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{productName}</Typography>
                        {order.items?.length > 1 && (
                          <Typography variant="caption" color="text.secondary">+{order.items.length - 1} more</Typography>
                        )}
                      </TableCell>
                      <TableCell>{totalQty}</TableCell>
                      <TableCell><b>₹{Number(order.totalAmount).toLocaleString("en-IN")}</b></TableCell>
                      <TableCell>
                        <Chip label={order.paymentStatus} color={statusColor(order.paymentStatus)} size="small" />
                      </TableCell>
                      <TableCell>
                        <Chip label={order.orderStatus} color={statusColor(order.orderStatus)} size="small" />
                      </TableCell>
                      <TableCell sx={{ fontSize: 12, color: "#6b7280" }}>
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        )}
      </Paper>
    </Box>
  );
}