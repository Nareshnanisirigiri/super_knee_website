import React, { useEffect, useState, useCallback } from "react";
import api from "../../../api";
import { io } from "socket.io-client";
import {
  Box, Typography, Paper, List, ListItem, ListItemText,
  ListItemIcon, Divider, Chip, IconButton, Tooltip,
  Button, CircularProgress,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import StarIcon from "@mui/icons-material/Star";
import RefreshIcon from "@mui/icons-material/Refresh";

const SOCKET_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://superknee-backend.onrender.com";

const getIcon = (type = "") => {
  const t = type.toLowerCase();
  if (t === "order") return <ShoppingCartIcon sx={{ color: "#3b82f6" }} />;
  if (t === "product" || t === "inventory") return <InventoryIcon sx={{ color: "#8b5cf6" }} />;
  if (t === "review") return <StarIcon sx={{ color: "#f59e0b" }} />;
  return <NotificationsIcon sx={{ color: "#6b7280" }} />;
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  const fetchNotes = useCallback(async () => {
    try {
      const res = await api.get("/admin/notifications");
      /* --- PREVIOUS CODE ---
      setNotifications(res.data);
      ----------------------- */
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error("Fetch notes error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("notification", (data) => {
      setNotifications((prev) => [data, ...prev].slice(0, 100));
    });
    return () => socket.disconnect();
  }, [fetchNotes]);

  const markAsRead = async (id) => {
    try {
      const res = await api.patch(`/admin/notifications/${id}/read`);
      setNotifications((prev) => prev.map((n) => n._id === id ? res.data : n));
    } catch (err) {
      console.error(err);
    }
  };

  const markAllRead = async () => {
    try {
      await api.patch("/admin/notifications/read-all");
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/admin/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" mb={0.5} sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}>
            System Notifications
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FiberManualRecordIcon
              sx={{ fontSize: 12, color: connected ? "#10b981" : "#ef4444", animation: connected ? "pulse 2s infinite" : "none" }}
            />
            <Typography variant="body2" color="text.secondary">
              {connected ? "Live System Sync Active" : "Disconnected"} · {notifications.length} total
            </Typography>
            {unreadCount > 0 && (
              <Chip label={`${unreadCount} unread`} color="error" size="small" />
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<DoneAllIcon />}
            disabled={unreadCount === 0}
            onClick={markAllRead}
          >
            Mark all read
          </Button>
          <Tooltip title="Refresh">
            <IconButton onClick={fetchNotes} size="small"><RefreshIcon /></IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress /></Box>
        ) : notifications.length === 0 ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <NotificationsIcon sx={{ fontSize: 48, color: "text.disabled", opacity: 0.5 }} />
            <Typography color="text.secondary" mt={2}>Inbox is empty. Real-time alerts will appear here.</Typography>
          </Box>
        ) : (
          <List disablePadding>
            {notifications.map((note, i) => (
              <Box key={note._id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    py: 2, px: 3,
                    bgcolor: note.isRead ? "transparent" : "rgba(59, 130, 246, 0.04)",
                    transition: "background 0.3s",
                    cursor: "pointer",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.02)" }
                  }}
                  onClick={() => !note.isRead && markAsRead(note._id)}
                >
                  <ListItemIcon sx={{ mt: 0.5, minWidth: 45 }}>{getIcon(note.type)}</ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography fontWeight={note.isRead ? 600 : 800} variant="body1">
                          {note.title}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                          {new Date(note.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body2" color={note.isRead ? "text.secondary" : "text.primary"}>
                          {note.message}
                        </Typography>
                        <Typography variant="caption" sx={{ mt: 0.5, display: "block", color: "text.disabled" }}>
                          {new Date(note.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                        </Typography>
                      </Box>
                    }
                  />
                  <Box sx={{ ml: 2, display: "flex", gap: 0.5 }}>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={(e) => { e.stopPropagation(); deleteNote(note._id); }}
                        sx={{ color: "text.disabled", "&:hover": { color: "#ef4444" } }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListItem>
                {i < notifications.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        )}
      </Paper>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </Box>
  );
}