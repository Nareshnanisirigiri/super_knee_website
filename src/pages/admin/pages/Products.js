import React, { useEffect, useState, useCallback } from "react";
import api from "../../../api";
import { io } from "socket.io-client";
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, Chip, CircularProgress, Button, IconButton, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Grid, InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const SOCKET_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://superknee-backend.onrender.com";

const EMPTY_FORM = { name: "", price: "", description: "", category: "", stock: "", image: "" };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await api.get("/admin/products");
      /* --- PREVIOUS CODE ---
      setProducts(res.data);
      setFiltered(res.data);
      ----------------------- */
      const productsData = res.data.products || [];
      setProducts(productsData);
      setFiltered(productsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    
    /* --- UPDATED SOCKET EVENTS --- */
    socket.on("product:new", (p) => setProducts((prev) => [p, ...prev]));
    socket.on("product:updated", (p) => setProducts((prev) => prev.map((x) => x._id === p._id ? p : x)));
    socket.on("product:deleted", (id) => setProducts((prev) => prev.filter((x) => x._id !== id)));
    /* ----------------------------- */

    return () => socket.disconnect();
  }, [fetchProducts]);

  useEffect(() => {
    if (!search.trim()) { setFiltered(products); return; }
    const q = search.toLowerCase();
    setFiltered(products.filter((p) =>
      p.name?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q)
    ));
  }, [search, products]);

  const openAddDialog = () => { setEditingProduct(null); setForm(EMPTY_FORM); setDialogOpen(true); };
  const openEditDialog = (p) => { setEditingProduct(p); setForm({ name: p.name, price: p.price, description: p.description || "", category: p.category || "", stock: p.stock, image: p.image || "" }); setDialogOpen(true); };
  const openDeleteDialog = (p) => { setDeletingProduct(p); setDeleteDialogOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      if (editingProduct) {
        await api.put(`/admin/products/${editingProduct._id}`, payload);
      } else {
        await api.post("/admin/products", payload);
        await fetchProducts();
      }
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/products/${deletingProduct._id}`);
      setDeleteDialogOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const stockChip = (stock) => {
    if (stock === 0) return <Chip label="Out of Stock" color="error" size="small" />;
    if (stock <= 10) return <Chip label="Low Stock" color="warning" size="small" />;
    return <Chip label="In Stock" color="success" size="small" />;
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" mb={0.5} sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}>
            Product Management
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FiberManualRecordIcon sx={{ fontSize: 12, color: connected ? "#10b981" : "#ef4444" }} />
            <Typography variant="body2" color="text.secondary">
              {connected ? "Live" : "Offline"} · {filtered.length} products
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Refresh"><IconButton onClick={fetchProducts}><RefreshIcon /></IconButton></Tooltip>
          <Button variant="contained" startIcon={<AddIcon />} onClick={openAddDialog}
            sx={{ borderRadius: 2, background: "#16a34a", "&:hover": { background: "#15803d" } }}>
            Add Product
          </Button>
        </Box>
      </Box>

      {/* Search */}
      <TextField size="small" placeholder="Search products…" value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
        sx={{ mb: 2, width: { xs: "100%", sm: 320 } }}
      />

      <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}><CircularProgress /></Box>
        ) : filtered.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography color="text.secondary">No products found. Add your first product!</Typography>
          </Box>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Category</b></TableCell>
                  <TableCell><b>Price</b></TableCell>
                  <TableCell><b>Stock</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell align="right"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow key={p._id} hover>
                    <TableCell fontWeight={600}>{p.name}</TableCell>
                    <TableCell>{p.category || "—"}</TableCell>
                    <TableCell>₹{Number(p.price).toLocaleString("en-IN")}</TableCell>
                    <TableCell>{p.stock}</TableCell>
                    <TableCell>{stockChip(p.stock)}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton
                          sx={{ color: "#3b82f6", bgcolor: "rgba(59, 130, 246, 0.08)", mr: 1, "&:hover": { bgcolor: "rgba(59, 130, 246, 0.15)" } }}
                          onClick={() => openEditDialog(p)}
                          size="small"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          sx={{ color: "#ef4444", bgcolor: "rgba(239, 68, 68, 0.08)", "&:hover": { bgcolor: "rgba(239, 68, 68, 0.15)" } }}
                          onClick={() => openDeleteDialog(p)}
                          size="small"
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

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            {[
              { label: "Product Name", key: "name" },
              { label: "Category", key: "category" },
              { label: "Price (₹)", key: "price", type: "number" },
              { label: "Stock Quantity", key: "stock", type: "number" },
              { label: "Image URL", key: "image" },
            ].map(({ label, key, type }) => (
              <Grid item xs={12} sm={key === "name" || key === "image" ? 12 : 6} key={key}>
                <TextField fullWidth label={label} type={type || "text"} size="small"
                  value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <TextField fullWidth label="Description" multiline rows={3} size="small"
                value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving || !form.name || !form.price}>
            {saving ? "Saving…" : editingProduct ? "Save Changes" : "Add Product"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete <b>{deletingProduct?.name}</b>? This cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}