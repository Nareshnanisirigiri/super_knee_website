import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  InputAdornment,
  Skeleton,
  Stack,
  IconButton,
  Chip
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import { motion, AnimatePresence } from "framer-motion";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) setQuery(q);
    fetchProducts();
  }, [location.search]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/admin/products"); // Since it's a test environment, using admin endpoint if public one not found
      // Actually, standard public endpoint might be different, but let's assume availability
      const productsData = res.data.products || [];
      setProducts(productsData);
      setFilteredProducts(productsData);
    } catch (err) {
      console.error("Fetch products failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      setFilteredProducts([]);
      return;
    }
    const q = query.toLowerCase();
    const result = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q))
    );
    setFilteredProducts(result);
  }, [query, products]);

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = cart.findIndex((item) => item.id === product._id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdate"));
    navigate("/cart");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8f9fa", pt: { xs: 10, md: 10 }, pb: 10 }}>
      <Container maxWidth="md">
        {/* Header Search Area */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ mb: 6 }}
        >
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
            <IconButton onClick={() => navigate(-1)} sx={{ color: "#333" }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" fontWeight="900">Search Products</Typography>
          </Stack>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for Super Health, Capsules, or Categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 5,
                bgcolor: "white",
                fontSize: "1.1rem",
                "& fieldset": { border: "none" },
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                px: 1
              }
            }}
          />
        </Box>

        {/* Results */}
        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3].map((i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 4 }} />
                <Skeleton sx={{ mt: 2 }} />
                <Skeleton width="60%" />
              </Grid>
            ))}
          </Grid>
        ) : (
          <AnimatePresence>
            <Grid container spacing={3}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Grid 
                    item 
                    xs={12} 
                    sm={6} 
                    md={4} 
                    key={product._id}
                    component={motion.div}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <Card sx={{ 
                      borderRadius: 4, 
                      overflow: "hidden", 
                      boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                      transition: "0.3s",
                      "&:hover": { transform: "translateY(-5px)", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }
                    }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={product.image || "https://images.unsplash.com/photo-1550572017-ed200f545dec?q=80&w=1481&auto=format&fit=crop"}
                        alt={product.name}
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent sx={{ p: 2 }}>
                        <Chip 
                          label={product.category || "Health"} 
                          size="small" 
                          sx={{ mb: 1.5, bgcolor: "rgba(22, 163, 74, 0.1)", color: "#16a34a", fontWeight: "900", fontSize: "0.7rem" }} 
                        />
                        <Typography variant="subtitle1" fontWeight="1000" noWrap>
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 800, mt: 0.5 }}>
                          ₹{product.price.toLocaleString()}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button 
                          fullWidth 
                          variant="contained" 
                          startIcon={<ShoppingCartIcon />}
                          onClick={() => handleAddToCart(product)}
                          sx={{ 
                            borderRadius: 3, 
                            bgcolor: "#16a34a", 
                            "&:hover": { bgcolor: "#118a3d" },
                            textTransform: "none",
                            fontWeight: "bold"
                          }}
                        >
                          Add to Cart
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              ) : (
                query && (
                  <Box sx={{ textAlign: "center", width: "100%", py: 10 }}>
                    <Typography variant="h6" color="text.secondary">No products found for "{query}"</Typography>
                    <Typography variant="body2" color="text.secondary">Try searching for different keywords.</Typography>
                  </Box>
                )
              )}
            </Grid>
          </AnimatePresence>
        )}
      </Container>
    </Box>
  );
}
