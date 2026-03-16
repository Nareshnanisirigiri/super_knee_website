// import React, { useEffect, useState, useCallback } from "react";
// import api from "../../../api";
// import { io } from "socket.io-client";
// import {
//   Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
//   TableBody, Chip, CircularProgress, LinearProgress, Tooltip,
//   IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
//   Button, TextField,
// } from "@mui/material";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import EditIcon from "@mui/icons-material/Edit";
// import BlockIcon from "@mui/icons-material/Block";

// const SOCKET_URL = window.location.hostname === "localhost"
//   ? "http://localhost:5000"
//   : "https://superknee-backend.onrender.com";

// const getStockStatus = (stock) => {
//   if (stock === 0) return { label: "Out of Stock", color: "error" };
//   if (stock <= 10) return { label: "Low Stock", color: "warning" };
//   return { label: "In Stock", color: "success" };
// };

// const getBarColor = (stock) => {
//   if (stock === 0) return "#ef4444";
//   if (stock <= 10) return "#f59e0b";
//   return "#10b981";
// };

// export default function Inventory() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [connected, setConnected] = useState(false);

//   const [editStockItem, setEditStockItem] = useState(null);
//   const [newStockValue, setNewStockValue] = useState("");
//   const [saving, setSaving] = useState(false);

//   const fetchProducts = useCallback(async () => {
//     try {
//       const res = await api.get("/admin/products");
//       setProducts(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProducts();

//     const socket = io(SOCKET_URL, { transports: ["websocket"] });
//     socket.on("connect", () => setConnected(true));
//     socket.on("disconnect", () => setConnected(false));
//     socket.on("product:created", (p) => setProducts((prev) => [p, ...prev]));
//     socket.on("product:updated", (p) => setProducts((prev) => prev.map((x) => x._id === p._id ? p : x)));
//     socket.on("product:deleted", ({ _id }) => setProducts((prev) => prev.filter((x) => x._id !== _id)));

//     return () => socket.disconnect();
//   }, [fetchProducts]);

//   const maxStock = Math.max(...products.map((p) => p.stock || 0), 1);
//   const outOfStock = products.filter((p) => p.stock === 0).length;
//   const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10).length;

//   const handleOpenEdit = (product) => {
//     setEditStockItem(product);
//     setNewStockValue(product.stock);
//   };

//   const handleUpdateStock = async () => {
//     setSaving(true);
//     try {
//       await api.put(`/admin/products/${editStockItem._id}`, { stock: Number(newStockValue) });
//       setEditStockItem(null);
//     } catch (err) {
//       console.error("Error updating stock", err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const markOutOfStock = async (product) => {
//     try {
//       await api.put(`/admin/products/${product._id}`, { stock: 0 });
//     } catch (err) {
//       console.error("Error marking out of stock", err);
//     }
//   };

//   return (
//     <Box>
//       {/* Header */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
//         <Box>
//           <Typography variant="h4" fontWeight="bold" mb={0.5}>Inventory Management</Typography>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <FiberManualRecordIcon sx={{ fontSize: 12, color: connected ? "#10b981" : "#ef4444" }} />
//             <Typography variant="body2" color="text.secondary">
//               {connected ? "Live" : "Offline"} · {products.length} products · {outOfStock} out of stock · {lowStock} low stock
//             </Typography>
//           </Box>
//         </Box>
//         <Tooltip title="Refresh">
//           <IconButton onClick={fetchProducts}><RefreshIcon /></IconButton>
//         </Tooltip>
//       </Box>

//       <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}><CircularProgress /></Box>
//         ) : products.length === 0 ? (
//           <Box sx={{ py: 6, textAlign: "center" }}>
//             <Typography color="text.secondary">No products found. Add products first.</Typography>
//           </Box>
//         ) : (
//           <Box sx={{ overflowX: "auto" }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell><b>Product</b></TableCell>
//                   <TableCell><b>Category</b></TableCell>
//                   <TableCell><b>Stock Level</b></TableCell>
//                   <TableCell><b>Units</b></TableCell>
//                   <TableCell><b>Status</b></TableCell>
//                   <TableCell align="right"><b>Quick Actions</b></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {products.map((p) => {
//                   const { label, color } = getStockStatus(p.stock);
//                   const pct = Math.min((p.stock / maxStock) * 100, 100);
//                   return (
//                     <TableRow key={p._id} hover>
//                       <TableCell fontWeight={600}>{p.name}</TableCell>
//                       <TableCell>{p.category || "—"}</TableCell>
//                       <TableCell sx={{ width: 200 }}>
//                         <LinearProgress
//                           variant="determinate"
//                           value={pct}
//                           sx={{
//                             height: 8, borderRadius: 4,
//                             bgcolor: "#e5e7eb",
//                             "& .MuiLinearProgress-bar": { bgcolor: getBarColor(p.stock), borderRadius: 4 },
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell>{p.stock}</TableCell>
//                       <TableCell>
//                         <Chip label={label} color={color} size="small" />
//                       </TableCell>
//                       <TableCell align="right">
//                         <Tooltip title="Update Stock">
//                           <IconButton
//                             sx={{ color: "#3b82f6", bgcolor: "rgba(59, 130, 246, 0.08)", mr: 1, "&:hover": { bgcolor: "rgba(59, 130, 246, 0.15)" } }}
//                             onClick={() => handleOpenEdit(p)}
//                             size="small"
//                           >
//                             <EditIcon fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Mark Out of Stock">
//                           <IconButton
//                             sx={{ color: "#ef4444", bgcolor: "rgba(239, 68, 68, 0.08)", "&:hover": { bgcolor: "rgba(239, 68, 68, 0.15)" } }}
//                             onClick={() => markOutOfStock(p)}
//                             size="small"
//                             disabled={p.stock === 0}
//                           >
//                             <BlockIcon fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </Box>
//         )}
//       </Paper>

//       {/* Edit Stock Dialog */}
//       <Dialog open={Boolean(editStockItem)} onClose={() => setEditStockItem(null)} maxWidth="xs" fullWidth>
//         <DialogTitle>Update Inventory</DialogTitle>
//         <DialogContent>
//           <Typography variant="body2" color="text.secondary" mb={2}>
//             Set the new stock level for <b>{editStockItem?.name}</b>.
//           </Typography>
//           <TextField
//             fullWidth
//             type="number"
//             label="Stock Quantity"
//             value={newStockValue}
//             onChange={(e) => setNewStockValue(e.target.value)}
//             InputProps={{ inputProps: { min: 0 } }}
//             autoFocus
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={() => setEditStockItem(null)}>Cancel</Button>
//           <Button variant="contained" onClick={handleUpdateStock} disabled={saving || newStockValue === ""}>
//             {saving ? "Saving..." : "Update Stock"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }









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
  LinearProgress,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";


/* =============================
   SOCKET URL
============================= */

const SOCKET_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://superknee-backend.onrender.com";


/* =============================
   STOCK STATUS
============================= */

const getStockStatus = (stock) => {

  if (stock === 0) return { label: "Out of Stock", color: "error" };

  if (stock <= 10) return { label: "Low Stock", color: "warning" };

  return { label: "In Stock", color: "success" };

};


const getBarColor = (stock) => {

  if (stock === 0) return "#ef4444";

  if (stock <= 10) return "#f59e0b";

  return "#10b981";

};


export default function Inventory() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  const [editStockItem, setEditStockItem] = useState(null);
  const [newStockValue, setNewStockValue] = useState("");
  const [saving, setSaving] = useState(false);


  /* =============================
     FETCH PRODUCTS
  ============================= */

  const fetchProducts = useCallback(async () => {

    try {

      const res = await api.get("/admin/products");

      /* --- PREVIOUS CODE ---
      setProducts(res.data);
      ----------------------- */
      setProducts(res.data.products || []);

    } catch (err) {

      console.error("Fetch products error:", err);

    } finally {

      setLoading(false);

    }

  }, []);



  /* =============================
     SOCKET REALTIME
  ============================= */

  useEffect(() => {

    fetchProducts();

    const socket = io(SOCKET_URL, {
      transports: ["websocket"]
    });


    socket.on("connect", () => {

      console.log("Socket connected");

      setConnected(true);

    });


    socket.on("disconnect", () => {

      setConnected(false);

    });


    /* --- UPDATED SOCKET EVENTS --- */
    socket.on("product:new", (product) => {
      setProducts(prev => [product, ...prev]);
    });

    socket.on("product:updated", (product) => {
      setProducts(prev =>
        prev.map(p => p._id === product._id ? product : p)
      );
    });

    socket.on("product:deleted", (id) => {
      setProducts(prev => prev.filter(p => p._id !== id));
    });
    /* ------------------------------ */


    return () => socket.disconnect();

  }, [fetchProducts]);


  /* =============================
     AUTO REFRESH FALLBACK
  ============================= */

  useEffect(() => {

    const interval = setInterval(fetchProducts, 15000);

    return () => clearInterval(interval);

  }, [fetchProducts]);



  /* =============================
     STATS
  ============================= */

  const maxStock = Math.max(...products.map(p => p.stock || 0), 1);

  const outOfStock = products.filter(p => p.stock === 0).length;

  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 10).length;



  /* =============================
     EDIT STOCK
  ============================= */

  const handleOpenEdit = (product) => {

    setEditStockItem(product);

    setNewStockValue(product.stock);

  };


  const handleUpdateStock = async () => {

    setSaving(true);

    try {

      await api.put(`/admin/products/${editStockItem._id}`, {
        stock: Number(newStockValue)
      });

      setEditStockItem(null);

      fetchProducts();

    } catch (err) {

      console.error("Stock update error:", err);

    } finally {

      setSaving(false);

    }

  };


  const markOutOfStock = async (product) => {

    try {

      await api.put(`/admin/products/${product._id}`, {
        stock: 0
      });

      fetchProducts();

    } catch (err) {

      console.error(err);

    }

  };



  /* =============================
     UI
  ============================= */

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

          <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}>
            Inventory Management
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

            <FiberManualRecordIcon
              sx={{
                fontSize: 12,
                color: connected ? "#10b981" : "#ef4444"
              }}
            />

            <Typography variant="body2" color="text.secondary">

              {connected ? "Live" : "Offline"} · {products.length} products
              · {outOfStock} out of stock · {lowStock} low stock

            </Typography>

          </Box>

        </Box>


        <Tooltip title="Refresh">

          <IconButton onClick={fetchProducts}>
            <RefreshIcon />
          </IconButton>

        </Tooltip>

      </Box>



      {/* TABLE */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider"
        }}
      >

        {loading ? (

          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>

        ) : (

          <Box sx={{ overflowX: "auto" }}>

            <Table>

              <TableHead>

                <TableRow>

                  <TableCell><b>Product</b></TableCell>
                  <TableCell><b>Category</b></TableCell>
                  <TableCell><b>Stock Level</b></TableCell>
                  <TableCell><b>Units</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell align="right"><b>Actions</b></TableCell>

                </TableRow>

              </TableHead>



              <TableBody>

                {products.map(p => {

                  const { label, color } = getStockStatus(p.stock);

                  const pct = Math.min((p.stock / maxStock) * 100, 100);

                  return (

                    <TableRow key={p._id} hover>

                      <TableCell sx={{ fontWeight: 600 }}>
                        {p.name}
                      </TableCell>

                      <TableCell>
                        {p.category || "—"}
                      </TableCell>


                      <TableCell sx={{ minWidth: 120 }}>

                        <LinearProgress
                          variant="determinate"
                          value={pct}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: "#e5e7eb",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: getBarColor(p.stock),
                              borderRadius: 4
                            }
                          }}
                        />

                      </TableCell>


                      <TableCell>
                        {p.stock}
                      </TableCell>


                      <TableCell>

                        <Chip
                          label={label}
                          color={color}
                          size="small"
                        />

                      </TableCell>


                      <TableCell align="right">

                        <Tooltip title="Update Stock">

                          <IconButton
                            size="small"
                            sx={{ color: "#3b82f6" }}
                            onClick={() => handleOpenEdit(p)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>

                        </Tooltip>


                        <Tooltip title="Mark Out of Stock">

                          <IconButton
                            size="small"
                            sx={{ color: "#ef4444" }}
                            onClick={() => markOutOfStock(p)}
                            disabled={p.stock === 0}
                          >
                            <BlockIcon fontSize="small" />
                          </IconButton>

                        </Tooltip>

                      </TableCell>

                    </TableRow>

                  );

                })}

              </TableBody>

            </Table>

          </Box>

        )}

      </Paper>



      {/* EDIT STOCK DIALOG */}

      <Dialog
        open={Boolean(editStockItem)}
        onClose={() => setEditStockItem(null)}
        maxWidth="xs"
        fullWidth
      >

        <DialogTitle>
          Update Inventory
        </DialogTitle>

        <DialogContent>

          <Typography variant="body2" mb={2}>
            Update stock for <b>{editStockItem?.name}</b>
          </Typography>

          <TextField
            fullWidth
            type="number"
            label="Stock Quantity"
            value={newStockValue}
            onChange={(e) => setNewStockValue(e.target.value)}
            inputProps={{ min: 0 }}
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={() => setEditStockItem(null)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleUpdateStock}
            disabled={saving}
          >
            {saving ? "Saving..." : "Update"}
          </Button>

        </DialogActions>

      </Dialog>

    </Box>

  );

}