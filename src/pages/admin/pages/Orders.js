import React, { useEffect, useState, useCallback } from "react";
import api from "../../../api";
import { io } from "socket.io-client";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Tooltip,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SearchIcon from "@mui/icons-material/Search";

const SOCKET_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://superknee-backend.onrender.com";

const ORDER_STATUSES = ["Processing", "Shipped", "Delivered", "Cancelled"];

const statusColor = (status) => {
  if (!status) return "default";
  const s = status.toLowerCase();
  if (s === "delivered") return "success";
  if (s === "shipped") return "primary";
  if (s === "processing") return "warning";
  if (s === "cancelled" || s === "failed") return "error";
  return "default";
};

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);


  /* ======================
     FETCH ORDERS
  ====================== */

  const fetchOrders = useCallback(async () => {

    try {

      const res = await api.get("/admin/orders");

      /* --- PREVIOUS CODE ---
      setOrders(res.data);
      setFiltered(res.data);
      ----------------------- */
      const ordersData = res.data.orders || [];
      setOrders(ordersData);
      setFiltered(ordersData);

    } catch (err) {

      console.error("Fetch orders error:", err);

    } finally {

      setLoading(false);

    }

  }, []);


  /* ======================
     SOCKET CONNECTION
  ====================== */

  useEffect(() => {

    fetchOrders();

    const socket = io(SOCKET_URL, { transports: ["websocket"] });

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("order:new", (order) => {
      setOrders((prev) => [order, ...prev]);
    });

    socket.on("order:updated", (updated) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === updated._id ? updated : o))
      );
    });

    return () => socket.disconnect();

  }, [fetchOrders]);


  /* ======================
     SEARCH FILTER
  ====================== */

  useEffect(() => {

    if (!search.trim()) {

      setFiltered(orders);

    } else {

      const q = search.toLowerCase();

      setFiltered(
        orders.filter(
          (o) =>
            o._id?.toLowerCase().includes(q) ||
            o.userId?.name?.toLowerCase().includes(q) ||
            o.shippingAddress?.name?.toLowerCase().includes(q) ||
            o.orderStatus?.toLowerCase().includes(q)
        )
      );

    }

  }, [search, orders]);


  /* ======================
     UPDATE ORDER STATUS
  ====================== */

  const handleStatusChange = async (orderId, newStatus) => {

    setUpdatingId(orderId);

    try {

      const res = await api.patch(`/admin/orders/${orderId}`, {
        orderStatus: newStatus
      });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? res.data.order : o
        )
      );

    } catch (err) {

      console.error("Status update error:", err);

    } finally {

      setUpdatingId(null);

    }

  };


  return (
    <Box>

      {/* HEADER */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3
        }}
      >

        <Box>

          <Typography variant="h4" fontWeight="bold" mb={0.5} sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}>
            Order Management
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

            <FiberManualRecordIcon
              sx={{
                fontSize: 12,
                color: connected ? "#10b981" : "#ef4444"
              }}
            />

            <Typography variant="body2" color="text.secondary">
              {connected ? "Live updates active" : "Offline"} · {filtered.length} orders
            </Typography>

          </Box>

        </Box>

        <Tooltip title="Refresh">
          <IconButton onClick={fetchOrders}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>

      </Box>


      {/* SEARCH */}

      <TextField
        size="small"
        placeholder="Search by customer, order ID, status…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          )
        }}
        sx={{ mb: 2, width: { xs: "100%", sm: 350 } }}
      />


      {/* TABLE */}

      <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>

        {loading ? (

          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>

        ) : (

          <Box sx={{ overflowX: "auto" }}>

            <Table>

              <TableHead>

                <TableRow>

                  <TableCell><b>Order ID</b></TableCell>
                  <TableCell><b>Customer</b></TableCell>
                  <TableCell><b>Items</b></TableCell>
                  <TableCell><b>Amount</b></TableCell>
                  <TableCell><b>Payment</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Date</b></TableCell>
                  <TableCell><b>Update Status</b></TableCell>

                </TableRow>

              </TableHead>


              <TableBody>

                {filtered.map((order) => (

                  <TableRow key={order._id} hover>

                    <TableCell sx={{ fontFamily: "monospace", fontSize: 12 }}>
                      {order._id?.slice(-8).toUpperCase()}
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {order.userId?.name || order.shippingAddress?.name || "N/A"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {order.items?.length || 0} item(s)
                    </TableCell>

                    <TableCell fontWeight={600}>
                      ₹{order.totalAmount?.toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell>

                      <Stack direction="column" spacing={0.5}>
                        <Chip
                          label={order.paymentStatus}
                          color={
                            order.paymentStatus === "Completed"
                              ? "success"
                              : order.paymentStatus === "Failed"
                              ? "error"
                              : "warning"
                          }
                          size="small"
                        />
                        <Typography variant="caption" color="text.secondary">
                          {order.paymentMethod || "Online"}
                        </Typography>
                      </Stack>

                    </TableCell>

                    <TableCell>

                      <Chip
                        label={order.orderStatus}
                        color={statusColor(order.orderStatus)}
                        size="small"
                      />

                    </TableCell>

                    <TableCell sx={{ fontSize: 12 }}>
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </TableCell>


                    <TableCell>

                      <FormControl size="small" sx={{ minWidth: 120 }}>

                        <Select
                          value={order.orderStatus || "Processing"}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          disabled={updatingId === order._id}
                        >

                          {ORDER_STATUSES.map((s) => (
                            <MenuItem key={s} value={s}>
                              {s}
                            </MenuItem>
                          ))}

                        </Select>

                      </FormControl>

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