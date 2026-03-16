import React, { useEffect, useState, useCallback } from "react";
import api from "../../../api";
import { io } from "socket.io-client";
import {
    Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
    TableBody, Chip, CircularProgress, Avatar, IconButton, Tooltip,
    TextField, InputAdornment,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

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

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [connected, setConnected] = useState(false);
    const [search, setSearch] = useState("");

    const fetchCustomers = useCallback(async () => {
        try {
            const res = await api.get("/admin/users");
            /* --- PREVIOUS CODE ---
            setCustomers(res.data);
            setFiltered(res.data);
            ----------------------- */
            setCustomers(res.data.users || []);
            setFiltered(res.data.users || []);
        } catch (err) {
            console.error("Fetch customers error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCustomers();
        const socket = io(SOCKET_URL, { transports: ["websocket"] });
        socket.on("connect", () => setConnected(true));
        socket.on("disconnect", () => setConnected(false));
        // Refresh customers list on new orders (new users may have signed up)
        socket.on("order:new", () => fetchCustomers());
        return () => socket.disconnect();
    }, [fetchCustomers]);

    useEffect(() => {
        if (!search.trim()) { setFiltered(customers); return; }
        const q = search.toLowerCase();
        setFiltered(customers.filter((c) =>
            c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q)
        ));
    }, [search, customers]);

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold" mb={0.5} sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}>
                        Customers
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <FiberManualRecordIcon sx={{ fontSize: 12, color: connected ? "#10b981" : "#ef4444" }} />
                        <Typography variant="body2" color="text.secondary">
                            {connected ? "Live" : "Offline"} · {filtered.length} customers
                        </Typography>
                    </Box>
                </Box>
                <Tooltip title="Refresh">
                    <IconButton onClick={fetchCustomers}><RefreshIcon /></IconButton>
                </Tooltip>
            </Box>

            {/* Search */}
            <TextField size="small" placeholder="Search by name or email…" value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
                sx={{ mb: 2, width: { xs: "100%", sm: 340 } }}
            />

            <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}><CircularProgress /></Box>
                ) : filtered.length === 0 ? (
                    <Box sx={{ py: 8, textAlign: "center" }}>
                        <PersonIcon sx={{ fontSize: 56, color: "text.disabled" }} />
                        <Typography color="text.secondary" mt={1}>No customers found.</Typography>
                    </Box>
                ) : (
                    <Box sx={{ overflowX: "auto" }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: "#f9fafb" }}>
                                    <TableCell><b>#</b></TableCell>
                                    <TableCell><b>Customer</b></TableCell>
                                    <TableCell><b>Email</b></TableCell>
                                    <TableCell><b>Role</b></TableCell>
                                    <TableCell><b>Joined</b></TableCell>
                                    <TableCell><b>Status</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filtered.map((customer, i) => (
                                    <TableRow key={customer._id} hover>
                                        <TableCell sx={{ color: "#9ca3af", fontSize: 13 }}>{i + 1}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                                <Avatar
                                                    sx={{ width: 36, height: 36, bgcolor: avatarColor(customer.name), fontSize: 14, fontWeight: 700 }}
                                                >
                                                    {getInitials(customer.name)}
                                                </Avatar>
                                                <Typography variant="body2" fontWeight={600}>{customer.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ color: "#4b5563" }}>{customer.email}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={customer.role === "admin" ? "Admin" : "Customer"}
                                                color={customer.role === "admin" ? "primary" : "default"}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell sx={{ fontSize: 13, color: "#6b7280" }}>
                                            {new Date(customer.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                        </TableCell>
                                        <TableCell>
                                            <Chip label="Active" color="success" size="small" />
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
