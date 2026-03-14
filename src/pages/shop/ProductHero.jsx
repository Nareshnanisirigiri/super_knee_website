import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Chip,
  Stack,
  Button,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";

import { motion } from "framer-motion";
import { io } from "socket.io-client";
import api from "../../api";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import product1 from "../../assets/product-box.jpeg";
import product2 from "../../assets/product-front.png";
import product3 from "../../assets/product-back.jpeg";
import product5 from "../../assets/superKnee_product.png";

/* =============================
   SOCKET URL
============================= */

const SOCKET_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://superknee-backend.onrender.com";

/* ------------------------
   IMAGE GALLERY
------------------------- */

const gallery = [product1, product2, product3, product5];

const format = (n) =>
  `₹${new Intl.NumberFormat("en-IN").format(n)}`;

export default function ProductHero() {

  const [image, setImage] = useState(gallery[0]);
  const [pack, setPack] = useState(null);
  const [qty, setQty] = useState(1);
  const [openSnack, setOpenSnack] = useState(false);
  
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [packs, setPacks] = useState([]);

  /* ------------------------
     FETCH LIVE PRODUCT
  ------------------------- */

  const fetchProduct = useCallback(async () => {
    try {
      const res = await api.get("/admin/products");
      const allProducts = res.data.products || [];
      
      // Find the main product
      const mainProduct = allProducts.find(p => p.name.toLowerCase().includes("knee") || p.name.toLowerCase().includes("health")) || allProducts[0];
      
      if (mainProduct) {
        setProductData(mainProduct);
        
        const basePrice = mainProduct.price || 2849;
        const livePacks = [
          { id: 1, label: "Pack of 1", capsules: 30, price: basePrice, old: Math.round(basePrice * 1.3) },
          { id: 2, label: "Pack of 2", capsules: 60, price: Math.round(basePrice * 1.9), old: Math.round(basePrice * 2.6) },
          { id: 3, label: "Pack of 3", capsules: 90, price: Math.round(basePrice * 2.7), old: Math.round(basePrice * 3.9) }
        ];
        
        setPacks(livePacks);
        setPack(livePacks[0]);
      }
    } catch (err) {
      console.error("Error fetching live product:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ------------------------
     WEBSOCKET REALTIME
  ------------------------- */

  useEffect(() => {
    fetchProduct();

    const socket = io(SOCKET_URL, { transports: ["websocket"] });

    socket.on("product:updated", (updatedProduct) => {
      // Check if it's the product we are displaying
      setProductData(prev => {
        if (prev && updatedProduct._id === prev._id) {
          console.log("[SOCKET] Price/Stock updated in real-time:", updatedProduct);
          
          const basePrice = updatedProduct.price;
          const livePacks = [
            { id: 1, label: "Pack of 1", capsules: 30, price: basePrice, old: Math.round(basePrice * 1.3) },
            { id: 2, label: "Pack of 2", capsules: 60, price: Math.round(basePrice * 1.9), old: Math.round(basePrice * 2.6) },
            { id: 3, label: "Pack of 3", capsules: 90, price: Math.round(basePrice * 2.7), old: Math.round(basePrice * 3.9) }
          ];
          setPacks(livePacks);
          setPack(currentPack => livePacks.find(p => p.id === currentPack?.id) || livePacks[0]);
          
          return updatedProduct;
        }
        return prev;
      });
    });

    return () => socket.disconnect();
  }, [fetchProduct]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!productData) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5">Product not found. Please check back later.</Typography>
      </Container>
    );
  }

  const handleAddToCart = () => {
    // Use backend product image URL if available.
    // JS-imported images (webpack modules) cannot be stored in localStorage.
    // We use a static public path as fallback so it always works after serialization.
    const cartImageUrl =
      (productData.image && productData.image.startsWith("http"))
        ? productData.image
        : "/product-box.jpeg";  // fallback to public folder image

    const cartItem = {
      id: productData._id + "-" + pack.id,
      productId: productData._id,
      name: `Super Health ${pack.label}`,
      pack: pack.label,
      capsules: pack.capsules,
      price: pack.price,
      quantity: qty,
      image: cartImageUrl
    };

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = cart.findIndex((item) => item.id === cartItem.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdate"));
    setOpenSnack(true);
  };

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 } }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "420px 1fr" }, gap: { xs: 3, md: 5 } }}>
        <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 5, textAlign: "center", border: "1px solid #e6efe7" }}>
            <motion.img
              key={image} src={image} alt="product"
              initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }} transition={{ duration: .5 }}
              style={{ width: "100%", maxWidth: 320, height: 320, objectFit: "contain", margin: "0 auto" }}
            />
            <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
              {gallery.map((img) => (
                <Box
                  component={motion.img} whileHover={{ scale: 1.1 }}
                  key={img} src={img} onClick={() => setImage(img)}
                  sx={{ width: 70, height: 70, objectFit: "contain", borderRadius: 2, cursor: "pointer", border: image === img ? "2px solid #2e7d32" : "1px solid #ddd", p: .5 }}
                />
              ))}
            </Stack>
          </Paper>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7 }}>
          <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 5, border: "1px solid #e6efe7" }}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
              <Box sx={{ display: "flex", gap: 1 }}>
                <Chip label="Joint Support" size="small" />
                <Chip label="Daily Sachet" size="small" />
              </Box>
              {productData.stock > 0 ? (
                <Chip label={`${productData.stock} units left`} color="success" variant="outlined" size="small" />
              ) : (
                <Chip label="Out of Stock" color="error" size="small" />
              )}
            </Stack>

            <Typography variant="h3" fontWeight={700} mt={2} sx={{ color: "#1b3b2c", fontSize: { xs: "2rem", md: "3rem" } }}>
              Super Health Sachets
            </Typography>

            <Typography mt={1.5} color="text.secondary">
              Super Health Sachets support knee comfort, flexibility, and daily mobility with a simple once-daily mix.
            </Typography>

            <Stack direction="row" alignItems="center" mt={2}>
              <StarRoundedIcon sx={{ color: "#f59e0b" }} />
              <Typography ml={1} fontWeight={600}>4.8</Typography>
              <Typography ml={1} color="text.secondary">144 Reviews</Typography>
            </Stack>

            {pack && (
              <Stack direction="row" spacing={2} mt={3} alignItems="center">
                <Typography variant="h4" fontWeight={700} color="green">{format(pack.price)}</Typography>
                <Typography sx={{ textDecoration: "line-through", color: "#8b8b8b" }}>{format(pack.old)}</Typography>
              </Stack>
            )}

            <Typography mt={3} fontWeight={700}>Select Pack</Typography>
            <Stack direction="row" spacing={2} mt={1.5} flexWrap="wrap">
              {packs.map((p) => (
                <Paper
                  component={motion.div} whileHover={{ scale: 1.05 }}
                  key={p.id} onClick={() => setPack(p)}
                  sx={{ p: 2, mb: 1, cursor: "pointer", textAlign: "center", borderRadius: 3, minWidth: 100, border: pack?.id === p.id ? "2px solid #2e7d32" : "1px solid #ddd" }}
                >
                  <Typography fontWeight={700}>{p.label}</Typography>
                  <Typography variant="body2">{p.capsules} Capsules</Typography>
                </Paper>
              ))}
            </Stack>

            <Stack direction="row" spacing={2} mt={4} alignItems="center">
              <Typography fontWeight={700}>Quantity</Typography>
              <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: 2 }}>
                <IconButton onClick={() => setQty((q) => Math.max(1, q - 1))}><RemoveIcon /></IconButton>
                <Typography sx={{ px: 2 }}>{qty}</Typography>
                <IconButton onClick={() => setQty((q) => q + 1)}><AddIcon /></IconButton>
              </Box>
            </Stack>

            <Button
              component={motion.button} whileHover={{ scale: 1.02 }} whileTap={{ scale: .98 }}
              variant="contained" onClick={handleAddToCart} disabled={productData.stock === 0}
              sx={{ mt: 4, bgcolor: productData.stock > 0 ? "#23412a" : "#ccc", "&:hover": { bgcolor: "#1b3b2c" }, py: 1.8, borderRadius: 4, fontWeight: 700, width: "100%", textTransform: "none", fontSize: "1.1rem" }}
            >
              {productData.stock > 0 ? "Add To Cart" : "Out of Stock"}
            </Button>

            <Stack spacing={1.2} mt={4}>
              {["Supports knee comfort and flexibility", "Easy once-daily sachet routine", "Quick mix formula", "Travel-friendly single serve packs"].map((item) => (
                <Stack key={item} direction="row" spacing={1} alignItems="center">
                  <CheckCircleRoundedIcon sx={{ color: "#2e7d32", fontSize: 20 }} />
                  <Typography variant="body2">{item}</Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </motion.div>
      </Box>

      <Snackbar open={openSnack} autoHideDuration={2000} onClose={() => setOpenSnack(false)}>
        <Alert severity="success" variant="filled">Super Health added to cart</Alert>
      </Snackbar>
    </Container>
  );
}
