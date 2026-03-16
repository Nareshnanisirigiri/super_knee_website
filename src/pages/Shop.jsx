
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Paper,
//   Stack,
//   Button,
//   Chip,
//   Divider,
//   IconButton,
//   Snackbar,
//   Alert,
// } from "@mui/material";

// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import StarRoundedIcon from "@mui/icons-material/StarRounded";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
// import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
// import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
// import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";

// import product1 from "../assets/product-box.jpeg";
// import product2 from "../assets/product-front.jpeg";
// import product3 from "../assets/product-back.jpeg";

// const gallery = [product1, product2, product3];

// const packs = [
//   {
//     id: 1,
//     label: "Pack of 1",
//     capsules: 30,
//     list: 3749,
//     sale: 2849,
//   },
//   {
//     id: 2,
//     label: "Pack of 2",
//     capsules: 60,
//     list: 7498,
//     sale: 5559,
//   },
//   {
//     id: 3,
//     label: "Pack of 3",
//     capsules: 90,
//     list: 11247,
//     sale: 7899,
//   },
// ];

// const features = [
//   {
//     title: "Mobility Support",
//     icon: FavoriteBorderOutlinedIcon,
//     desc: "Helps maintain knee flexibility and comfort.",
//   },
//   {
//     title: "Science Based",
//     icon: VerifiedOutlinedIcon,
//     desc: "Structured formula backed by modern nutrition research.",
//   },
//   {
//     title: "Easy Routine",
//     icon: BoltOutlinedIcon,
//     desc: "Once daily sachet routine that fits busy lifestyles.",
//   },
//   {
//     title: "Simple Mix",
//     icon: WaterDropOutlinedIcon,
//     desc: "Mix with water after meals for daily support.",
//   },
// ];

// const format = (n) => `Rs. ${new Intl.NumberFormat("en-IN").format(n)}`;

// export default function Shop() {
//   const navigate = useNavigate();

//   const [qty, setQty] = useState(1);
//   const [pack, setPack] = useState(packs[0]);
//   const [image, setImage] = useState(gallery[0]);
//   const [snack, setSnack] = useState(false);

//   const savings = pack.list - pack.sale;

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const addToCart = () => {
//     const item = {
//       id: "super-knee",
//       name: "Super Knee",
//       price: pack.sale,
//       qty,
//       image,
//     };

//     const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//     cart.push(item);

//     localStorage.setItem("cart", JSON.stringify(cart));
//     setSnack(true);
//   };

//   const buyNow = () => {
//     addToCart();
//     navigate("/cart");
//   };

//   return (
//     <Box
//       sx={{
//         background:
//           "linear-gradient(180deg,#f3f8f2 0%,#ffffff 45%,#eef4ed 100%)",
//         minHeight: "100vh",
//         pt: { xs: 4, md: 8 },
//         pb: { xs: 12, md: 20 },
//       }}
//     >
//       <Container maxWidth="lg">
//         {/* TOP GRID */}
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: { xs: "1fr", md: "380px 1fr" },
//             gap: 4,
//           }}
//         >
//           {/* PRODUCT IMAGE */}
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <Paper
//               sx={{
//                 p: 3,
//                 borderRadius: 5,
//                 textAlign: "center",
//               }}
//             >
//               <motion.img
//                 key={image}
//                 src={image}
//                 style={{
//                   width: "100%",
//                   maxWidth: 260,
//                 }}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//               />

//               <Stack
//                 direction="row"
//                 justifyContent="center"
//                 spacing={1}
//                 mt={2}
//               >
//                 {gallery.map((g) => (
//                   <Box
//                     key={g}
//                     onClick={() => setImage(g)}
//                     sx={{
//                       width: 12,
//                       height: 12,
//                       borderRadius: "50%",
//                       bgcolor: image === g ? "#2e7d32" : "#ccc",
//                       cursor: "pointer",
//                     }}
//                   />
//                 ))}
//               </Stack>
//             </Paper>
//           </motion.div>

//           {/* PRODUCT INFO */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <Paper sx={{ p: 4, borderRadius: 5 }}>
//               <Stack direction="row" spacing={1}>
//                 <Chip label="Joint Support" />
//                 <Chip label="Daily Sachet" />
//               </Stack>

//               <Typography variant="h3" mt={2} fontWeight={700}>
//                 Super Knee Sachets
//               </Typography>

//               <Typography mt={1} color="text.secondary">
//                 A simple once daily sachet routine designed for
//                 comfortable knee support and mobility.
//               </Typography>

//               {/* RATING */}
//               <Stack direction="row" alignItems="center" mt={2}>
//                 <StarRoundedIcon sx={{ color: "#f59e0b" }} />
//                 <Typography ml={1}>4.8</Typography>
//                 <Typography ml={1} color="text.secondary">
//                   (144 reviews)
//                 </Typography>
//               </Stack>

//               <Divider sx={{ my: 3 }} />

//               {/* PRICE */}
//               <Stack direction="row" spacing={2} alignItems="center">
//                 <Typography variant="h4" fontWeight={700}>
//                   {format(pack.sale)}
//                 </Typography>

//                 <Typography
//                   sx={{
//                     textDecoration: "line-through",
//                     color: "#999",
//                   }}
//                 >
//                   {format(pack.list)}
//                 </Typography>

//                 <Chip
//                   label={`${Math.round(
//                     (savings / pack.list) * 100
//                   )}% OFF`}
//                   color="success"
//                 />
//               </Stack>

//               <Typography mt={1} color="text.secondary">
//                 You save {format(savings)}
//               </Typography>

//               {/* PACK SELECTOR */}
//               <Typography mt={3} fontWeight={700}>
//                 Select Pack
//               </Typography>

//               <Stack direction="row" spacing={2} mt={1}>
//                 {packs.map((p) => (
//                   <Paper
//                     key={p.id}
//                     onClick={() => setPack(p)}
//                     sx={{
//                       p: 2,
//                       cursor: "pointer",
//                       border:
//                         pack.id === p.id
//                           ? "2px solid #2e7d32"
//                           : "1px solid #eee",
//                     }}
//                   >
//                     <Typography fontWeight={700}>
//                       {p.label}
//                     </Typography>

//                     <Typography variant="body2">
//                       {p.capsules} Capsules
//                     </Typography>

//                     <Typography mt={1}>
//                       {format(p.sale)}
//                     </Typography>
//                   </Paper>
//                 ))}
//               </Stack>

//               {/* QUANTITY */}
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 spacing={2}
//                 mt={3}
//               >
//                 <Typography fontWeight={700}>Quantity</Typography>

//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     border: "1px solid #ddd",
//                     borderRadius: 2,
//                   }}
//                 >
//                   <IconButton
//                     onClick={() =>
//                       setQty((q) => Math.max(1, q - 1))
//                     }
//                   >
//                     <RemoveIcon />
//                   </IconButton>

//                   <Typography>{qty}</Typography>

//                   <IconButton
//                     onClick={() => setQty((q) => q + 1)}
//                   >
//                     <AddIcon />
//                   </IconButton>
//                 </Box>
//               </Stack>

//               {/* BUTTONS */}
//               <Stack direction="row" spacing={2} mt={4}>
//                 <Button
//                   variant="contained"
//                   onClick={addToCart}
//                   sx={{
//                     bgcolor: "#23412a",
//                     flex: 1,
//                   }}
//                 >
//                   Add to Cart
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   onClick={buyNow}
//                   sx={{ flex: 1 }}
//                 >
//                   Buy Now
//                 </Button>
//               </Stack>

//               {/* TRUST BADGES */}
//               <Stack direction="row" spacing={3} mt={4}>
//                 <Stack alignItems="center">
//                   <LocalShippingOutlinedIcon />
//                   <Typography variant="caption">
//                     Fast Shipping
//                   </Typography>
//                 </Stack>

//                 <Stack alignItems="center">
//                   <VerifiedOutlinedIcon />
//                   <Typography variant="caption">
//                     Verified Product
//                   </Typography>
//                 </Stack>
//               </Stack>
//             </Paper>
//           </motion.div>
//         </Box>

//         {/* FEATURES */}
//         <Box
//           sx={{
//             mt: 8,
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr 1fr",
//               md: "repeat(4,1fr)",
//             },
//             gap: 3,
//           }}
//         >
//           {features.map((f) => {
//             const Icon = f.icon;

//             return (
//               <Paper
//                 key={f.title}
//                 sx={{
//                   p: 3,
//                   textAlign: "center",
//                 }}
//               >
//                 <Icon sx={{ fontSize: 30 }} />

//                 <Typography fontWeight={700} mt={1}>
//                   {f.title}
//                 </Typography>

//                 <Typography variant="body2" mt={1}>
//                   {f.desc}
//                 </Typography>
//               </Paper>
//             );
//           })}
//         </Box>

//         {/* FOOTER SPACE */}
//       </Container>

//       {/* MOBILE STICKY CART */}
//       <Paper
//         sx={{
//           position: "fixed",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           p: 2,
//           display: { xs: "flex", md: "none" },
//           justifyContent: "space-between",
//           alignItems: "center",
//           borderTop: "1px solid #eee",
//         }}
//       >
//         <Box>
//           <Typography fontWeight={700}>
//             {format(pack.sale)}
//           </Typography>
//           <Typography variant="caption">
//             {pack.label}
//           </Typography>
//         </Box>

//         <Button
//           variant="contained"
//           onClick={addToCart}
//           sx={{ bgcolor: "#23412a" }}
//         >
//           Add to Cart
//         </Button>
//       </Paper>

//       {/* SNACKBAR */}
//       <Snackbar
//         open={snack}
//         autoHideDuration={3000}
//         onClose={() => setSnack(false)}
//       >
//         <Alert severity="success">
//           Product added to cart
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }






// import React, { useState } from "react";
// import { Box, Snackbar, Alert } from "@mui/material";

// import ProductHero from "../pages/shop/ProductHero";
// import ProductSections from "../pages/shop/ProductSections";
// import MeasureResults from "../pages/shop/MeasureResults";
// import SupplementComparison from "../pages/shop/SupplementComparison";
// import FaqSection from '../pages/shop/FaqSection';


// export default function Shop() {

//   const [cartSnack, setCartSnack] = useState(false)

//   const handleAddToCart = () => {
//     setCartSnack(true)
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background:
//           "linear-gradient(180deg,#f3f8f2 0%,#ffffff 40%,#eef4ed 100%)",
//         pb: 15
//       }}
//     >

//       <ProductHero onAddToCart={handleAddToCart} />

//       <ProductSections />

//       <Snackbar
//         open={cartSnack}
//         autoHideDuration={3000}
//         onClose={() => setCartSnack(false)}
//       >
//         <Alert severity="success" variant="filled">
//           Super Knee added to cart
//         </Alert>
//       </Snackbar>
// <MeasureResults />
// <SupplementComparison />
// <FaqSection />
//     </Box>
//   )
// }

import React, { useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";

import ProductHero from "../pages/shop/ProductHero";
import ProductSections from "../pages/shop/ProductSections";
import MeasureResults from "../pages/shop/MeasureResults";
import SupplementComparison from "../pages/shop/SupplementComparison";
import FaqSection from "../pages/shop/FaqSection";

export default function Shop() {

  const [cartSnack, setCartSnack] = useState(false);

  /* -------------------------
     ADD TO CART
  -------------------------- */

  const handleAddToCart = (product) => {

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingIndex > -1) {

      cart[existingIndex].quantity += product.quantity;

    } else {

      cart.push(product);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    /* update navbar cart icon */

    window.dispatchEvent(new Event("cartUpdate"));

    setCartSnack(true);

  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#f3f8f2 0%,#ffffff 40%,#eef4ed 100%)",
        pb: 15
      }}
    >

      {/* PRODUCT HERO */}

      <ProductHero onAddToCart={handleAddToCart} />

      {/* PRODUCT CONTENT */}

      <ProductSections />

      <MeasureResults />

      <SupplementComparison />

      <FaqSection />

      {/* SUCCESS MESSAGE */}

      <Snackbar
        open={cartSnack}
        autoHideDuration={3000}
        onClose={() => setCartSnack(false)}
      >
        <Alert severity="success" variant="filled">
          Super Knee added to cart
        </Alert>
      </Snackbar>

    </Box>

  );
}
