import React, { useEffect, useState, useCallback } from "react";
import api from "../../../api";
import { io } from "socket.io-client";
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, Rating, CircularProgress, Avatar, IconButton, Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const SOCKET_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://superknee-backend.onrender.com";

function getInitials(name = "") {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function avatarColor(name = "") {
  const colors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];
  const i = name.charCodeAt(0) % colors.length;
  return colors[i];
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await api.get("/admin/reviews");
      /* --- PREVIOUS CODE ---
      setReviews(res.data);
      ----------------------- */
      setReviews(res.data.reviews || []);
    } catch (err) {
      console.error("Fetch reviews error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("review:deleted", ({ _id }) => {
      setReviews((prev) => prev.filter((r) => r._id !== _id));
    });
    return () => socket.disconnect();
  }, [fetchReviews]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await api.delete(`/admin/reviews/${id}`);
    } catch (err) {
      console.error("Delete review error:", err);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" mb={0.5} sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}>
            Customer Reviews
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FiberManualRecordIcon sx={{ fontSize: 12, color: connected ? "#10b981" : "#ef4444" }} />
            <Typography variant="body2" color="text.secondary">
              {connected ? "Live" : "Offline"} · {reviews.length} reviews
            </Typography>
          </Box>
        </Box>
        <Tooltip title="Refresh">
          <IconButton onClick={fetchReviews}><RefreshIcon /></IconButton>
        </Tooltip>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}><CircularProgress /></Box>
        ) : reviews.length === 0 ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography color="text.secondary">No reviews found.</Typography>
          </Box>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f9fafb" }}>
                  <TableCell><b>Customer</b></TableCell>
                  <TableCell><b>Product</b></TableCell>
                  <TableCell><b>Rating</b></TableCell>
                  <TableCell><b>Comment</b></TableCell>
                  <TableCell><b>Date</b></TableCell>
                  <TableCell align="right"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review._id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar
                          sx={{ width: 32, height: 32, bgcolor: avatarColor(review.userId?.name), fontSize: 13, fontWeight: 700 }}
                        >
                          {getInitials(review.userId?.name)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>{review.userId?.name || "Anonymous"}</Typography>
                          <Typography variant="caption" color="text.secondary">{review.userId?.email}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{review.productId?.name || "Deleted Product"}</TableCell>
                    <TableCell>
                      <Rating value={review.rating} size="small" readOnly />
                    </TableCell>
                    <TableCell sx={{ minWidth: 200, maxWidth: 400 }}>
                      <Typography variant="body2">{review.comment}</Typography>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap", fontSize: 13, color: "text.secondary" }}>
                      {new Date(review.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Delete Review">
                        <IconButton
                          size="small"
                          sx={{ color: "#ef4444", bgcolor: "rgba(239, 68, 68, 0.08)", "&:hover": { bgcolor: "rgba(239, 68, 68, 0.15)" } }}
                          onClick={() => handleDelete(review._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
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