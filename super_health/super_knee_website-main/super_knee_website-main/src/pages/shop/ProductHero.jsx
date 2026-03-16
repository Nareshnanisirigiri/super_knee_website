// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   Chip,
//   Stack,
//   Button,
//   IconButton,
//   Snackbar,
//   CircularProgress
// } from "@mui/material";

// import { motion } from "framer-motion";
// import { io } from "socket.io-client";
// import api from "../../api";

// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import StarRoundedIcon from "@mui/icons-material/StarRounded";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

// import AddedToCartToast from "../../components/AddedToCartToast";

// /* IMAGES */
// import product1 from "../../assets/product-box.jpeg";
// import product2 from "../../assets/product-front.png";
// import product3 from "../../assets/product-back.jpeg";
// import product5 from "../../assets/superKnee_product.png";

// /* VIDEO */
// import video1 from "../../assets/videos/h1.mp4";

// /* SOCKET URL */

// const SOCKET_URL =
//   window.location.hostname === "localhost"
//     ? "http://localhost:5000"
//     : "https://superknee-backend.onrender.com";

// /* GALLERY */

// const gallery = [
//   { type: "image", src: product5 },
//   { type: "video", src: video1 },
//   { type: "image", src: product2 },
//   { type: "image", src: product3 },
//   { type: "image", src: product1 }
// ];

// const format = (n) =>
//   `₹${new Intl.NumberFormat("en-IN").format(n)}`;

// export default function ProductHero() {

//   const [selected, setSelected] = useState(gallery[0]);
//   const [pack, setPack] = useState(null);
//   const [qty, setQty] = useState(1);
//   const [openSnack, setOpenSnack] = useState(false);

//   const [productData, setProductData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [packs, setPacks] = useState([]);

//   const fetchProduct = useCallback(async () => {
//     try {
//       const res = await api.get("/admin/products");
//       const allProducts = res.data.products || [];

//       const mainProduct =
//         allProducts.find((p) =>
//           p.name.toLowerCase().includes("knee")
//         ) || allProducts[0];

//       if (mainProduct) {

//         setProductData(mainProduct);

//         const basePrice = mainProduct.price || 2849;

//         const livePacks = [
//           { id: 1, label: "Pack of 1", Sachets: 15, price: basePrice, old: Math.round(basePrice * 1.3) },
//           { id: 2, label: "Pack of 2", Sachets: 30, price: Math.round(basePrice * 1.9), old: Math.round(basePrice * 2.6) },
//           { id: 3, label: "Pack of 3", Sachets: 45, price: Math.round(basePrice * 2.7), old: Math.round(basePrice * 3.9) }
//         ];

//         setPacks(livePacks);
//         setPack(livePacks[0]);
//       }

//     } catch (err) {

//       console.error("Product fetch error", err);

//     } finally {

//       setLoading(false);

//     }
//   }, []);

//   useEffect(() => {

//     fetchProduct();

//     const socket = io(SOCKET_URL, {
//       transports: ["websocket"]
//     });

//     socket.on("product:updated", (updatedProduct) => {

//       setProductData((prev) => {

//         if (prev && updatedProduct._id === prev._id) {

//           const basePrice = updatedProduct.price;

//           const livePacks = [
//             { id: 1, label: "Pack of 1", Sachets: 15, price: basePrice, old: Math.round(basePrice * 1.3) },
//             { id: 2, label: "Pack of 2", Sachets: 30, price: Math.round(basePrice * 1.9), old: Math.round(basePrice * 2.6) },
//             { id: 3, label: "Pack of 3", Sachets: 45, price: Math.round(basePrice * 2.7), old: Math.round(basePrice * 3.9) }
//           ];

//           setPacks(livePacks);

//           setPack((current) =>
//             livePacks.find((p) => p.id === current?.id) || livePacks[0]
//           );

//           return updatedProduct;
//         }

//         return prev;

//       });

//     });

//     return () => socket.disconnect();

//   }, [fetchProduct]);

//   if (loading) {

//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", minHeight: "60vh", alignItems: "center" }}>
//         <CircularProgress />
//       </Box>
//     );

//   }

//   const handleAddToCart = () => {

//     const cartItem = {
//       id: productData._id + "-" + pack.id,
//       productId: productData._id,
//       name: `Super Knee ${pack.label}`,
//       pack: pack.label,
//       Sachets: pack.Sachets,
//       price: pack.price,
//       quantity: qty,
//       image: "/product-box.jpeg"
//     };

//     let cart = JSON.parse(localStorage.getItem("cart") || "[]");

//     const index = cart.findIndex((item) => item.id === cartItem.id);

//     if (index > -1) {
//       cart[index].quantity += qty;
//     } else {
//       cart.push(cartItem);
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));

//     window.dispatchEvent(new Event("cartUpdate"));

//     setOpenSnack(true);
//   };

//   return (

//     <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 } }}>

//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: { xs: "1fr", md: "450px 1fr" },
//           gap: { xs: 3, md: 5 }
//         }}
//       >

//         {/* LEFT GALLERY */}

//         <motion.div
//           initial={{ opacity: 0, x: -60 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: .7 }}
//         >

//           <Paper elevation={0} sx={{ p: 3, borderRadius: 5, textAlign: "center" }}>

//             {selected.type === "video" ? (

//               <video
//                 src={selected.src}
//                 controls
//                 autoPlay
//                 loop
//                 muted
//                 style={{
//                   width: "100%",
//                   maxWidth: 420,
//                   height: 420,
//                   objectFit: "cover",
//                   borderRadius: 16
//                 }}
//               />

//             ) : (

//               <motion.img
//                 key={selected.src}
//                 src={selected.src}
//                 alt="product"
//                 style={{
//                   width: "100%",
//                   maxWidth: 420,
//                   height: 420,
//                   objectFit: "contain"
//                 }}
//               />

//             )}

//             <Stack direction="row" spacing={2} justifyContent="center" mt={3}>

//               {gallery.map((item, i) => (

//                 item.type === "video" ? (

//                   <Box
//                     key={i}
//                     component="video"
//                     src={item.src}
//                     onClick={() => setSelected(item)}
//                     sx={{
//                       width: 80,
//                       height: 80,
//                       borderRadius: 2,
//                       cursor: "pointer",
//                       border: selected.src === item.src ? "2px solid green" : "1px solid #ddd"
//                     }}
//                   />

//                 ) : (

//                   <Box
//                     key={i}
//                     component="img"
//                     src={item.src}
//                     onClick={() => setSelected(item)}
//                     sx={{
//                       width: 80,
//                       height: 80,
//                       borderRadius: 2,
//                       cursor: "pointer",
//                       border: selected.src === item.src ? "2px solid green" : "1px solid #ddd"
//                     }}
//                   />

//                 )

//               ))}

//             </Stack>

//           </Paper>

//         </motion.div>

//         {/* RIGHT SIDE */}

//         <Paper elevation={0} sx={{ p: 4, borderRadius: 5 }}>

//           <Typography variant="h3" fontWeight={700}>
//             Super Knee Sachets
//           </Typography>

//           {pack && (
//             <Stack direction="row" spacing={2} mt={2}>
//               <Typography variant="h4" color="green">
//                 {format(pack.price)}
//               </Typography>
//               <Typography sx={{ textDecoration: "line-through" }}>
//                 {format(pack.old)}
//               </Typography>
//             </Stack>
//           )}

//           {/* PACK SELECT */}

//           <Stack direction="row" spacing={2} mt={3}>
//             {packs.map((p) => (
//               <Paper
//                 key={p.id}
//                 onClick={() => setPack(p)}
//                 sx={{
//                   p: 2,
//                   cursor: "pointer",
//                   border: pack?.id === p.id ? "2px solid green" : "1px solid #ddd"
//                 }}
//               >
//                 <Typography>{p.label}</Typography>
//                 <Typography variant="body2">
//                   {p.Sachets} Sachets
//                 </Typography>
//               </Paper>
//             ))}
//           </Stack>

//           {/* QUANTITY */}

//           <Stack direction="row" spacing={2} mt={4} alignItems="center">

//             <Typography fontWeight={600}>Quantity</Typography>

//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 border: "1px solid #ddd",
//                 borderRadius: 2
//               }}
//             >
//               <IconButton
//                 onClick={() => setQty((q) => Math.max(1, q - 1))}
//                 sx={{
//                   color: "#000",
//                   "&:hover": { background: "#f2f2f2" }
//                 }}
//               >
//                 <RemoveIcon />
//               </IconButton>

//               <Typography sx={{ px: 2 }}>{qty}</Typography>

//               <IconButton
//                 onClick={() => setQty((q) => q + 1)}
//                 sx={{
//                   color: "#000",
//                   "&:hover": { background: "#f2f2f2" }
//                 }}
//               >
//                 <AddIcon />
//               </IconButton>
//             </Box>

//           </Stack>

//           {/* ADD CART */}

//           <Button
//             variant="contained"
//             sx={{
//               mt: 4,
//               bgcolor: "#23412a",
//               "&:hover": { bgcolor: "#1b3b2c" },
//               py: 1.5,
//               borderRadius: 3
//             }}
//             onClick={handleAddToCart}
//           >
//             Add To Cart
//           </Button>

//           {/* DESCRIPTION */}

//           <Stack spacing={1.5} mt={4}>
//             {[
//               "Supports knee comfort and flexibility",
//               "Easy once-daily sachet routine",
//               "Fast absorbing nutrients",
//               "Travel-friendly sachet format"
//             ].map((item) => (
//               <Stack key={item} direction="row" spacing={1} alignItems="center">
//                 <CheckCircleRoundedIcon sx={{ color: "#2e7d32", fontSize: 20 }} />
//                 <Typography variant="body2">{item}</Typography>
//               </Stack>
//             ))}
//           </Stack>

//         </Paper>

//       </Box>

//       <Snackbar
//         open={openSnack}
//         autoHideDuration={2500}
//         onClose={() => setOpenSnack(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Box>
//           {openSnack && (
//             <AddedToCartToast
//               image={selected.src}
//               message="Added to bag"
//             />
//           )}
//         </Box>
//       </Snackbar>

//     </Container>

//   );
// }










import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Stack,
  Button,
  IconButton,
  Snackbar,
  CircularProgress
} from "@mui/material";

import { motion } from "framer-motion";
import { io } from "socket.io-client";
import api from "../../api";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import AddedToCartToast from "../../components/AddedToCartToast";

/* IMAGES */
import product1 from "../../assets/product-box.jpeg";
import product2 from "../../assets/product-front.png";
import product3 from "../../assets/product-back.jpeg";
import product5 from "../../assets/superKnee_product.png";

/* VIDEO */
import video1 from "../../assets/videos/h1.mp4";

const SOCKET_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://superknee-backend.onrender.com";

const gallery = [
  { type: "image", src: product5 },
  { type: "video", src: video1 },
  { type: "image", src: product2 },
  { type: "image", src: product3 },
  { type: "image", src: product1 }
];

const format = (n) =>
  `₹${new Intl.NumberFormat("en-IN").format(n)}`;

export default function ProductHero() {

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = gallery[selectedIndex];

  /* AUTO THUMBNAIL WINDOW */

  const getVisibleThumbs = () => {

    const total = gallery.length;

    if (selectedIndex === 0) return gallery.slice(0, 3);

    if (selectedIndex === total - 1)
      return gallery.slice(total - 3, total);

    return gallery.slice(selectedIndex - 1, selectedIndex + 2);

  };

  const visibleThumbs = getVisibleThumbs();

  const getRealIndex = (item) =>
    gallery.findIndex((g) => g.src === item.src);

  const [pack, setPack] = useState(null);
  const [qty, setQty] = useState(1);
  const [openSnack, setOpenSnack] = useState(false);

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [packs, setPacks] = useState([]);

  const fetchProduct = useCallback(async () => {
    try {

      const res = await api.get("/admin/products");
      const allProducts = res.data.products || [];

      const mainProduct =
        allProducts.find((p) =>
          p.name.toLowerCase().includes("knee")
        ) || allProducts[0];

      if (mainProduct) {

        setProductData(mainProduct);

        const basePrice = mainProduct.price || 2849;

        const livePacks = [
          { id: 1, label: "Pack of 1", Sachets: 15, price: basePrice, old: Math.round(basePrice * 1.3) },
          { id: 2, label: "Pack of 2", Sachets: 30, price: Math.round(basePrice * 1.9), old: Math.round(basePrice * 2.6) },
          { id: 3, label: "Pack of 3", Sachets: 45, price: Math.round(basePrice * 2.7), old: Math.round(basePrice * 3.9) }
        ];

        setPacks(livePacks);
        setPack(livePacks[0]);

      }

    } catch (err) {

      console.error("Product fetch error", err);

    } finally {

      setLoading(false);

    }
  }, []);

  useEffect(() => {

    fetchProduct();

    const socket = io(SOCKET_URL, { transports: ["websocket"] });

    socket.on("product:updated", (updatedProduct) => {

      setProductData((prev) => {

        if (prev && updatedProduct._id === prev._id) {

          const basePrice = updatedProduct.price;

          const livePacks = [
            { id: 1, label: "Pack of 1", Sachets: 15, price: basePrice, old: Math.round(basePrice * 1.3) },
            { id: 2, label: "Pack of 2", Sachets: 30, price: Math.round(basePrice * 1.9), old: Math.round(basePrice * 2.6) },
            { id: 3, label: "Pack of 3", Sachets: 45, price: Math.round(basePrice * 2.7), old: Math.round(basePrice * 3.9) }
          ];

          setPacks(livePacks);

          setPack((current) =>
            livePacks.find((p) => p.id === current?.id) || livePacks[0]
          );

          return updatedProduct;
        }

        return prev;

      });

    });

    return () => socket.disconnect();

  }, [fetchProduct]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", minHeight: "60vh", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleAddToCart = () => {

    const cartItem = {
      id: productData._id + "-" + pack.id,
      productId: productData._id,
      name: `Super Knee ${pack.label}`,
      pack: pack.label,
      Sachets: pack.Sachets,
      price: pack.price,
      quantity: qty,
      image: "/product-box.jpeg"
    };

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const index = cart.findIndex((item) => item.id === cartItem.id);

    if (index > -1) cart[index].quantity += qty;
    else cart.push(cartItem);

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdate"));

    setOpenSnack(true);
  };

  return (

    <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 } }}>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "450px 1fr" },
          gap: { xs: 4, md: 5 }
        }}
      >

        {/* LEFT */}

        <Paper elevation={0} sx={{ p: 3, borderRadius: 5 }}>

          {/* MAIN IMAGE */}

          <Box sx={{ display: "flex", justifyContent: "center" }}>

            {selected.type === "video" ? (
              <video
                src={selected.src}
                controls
                autoPlay
                muted
                loop
                style={{
                  width: "100%",
                  maxWidth: 420,
                  height: 420,
                  objectFit: "cover",
                  borderRadius: 16
                }}
              />
            ) : (
              <motion.img
                src={selected.src}
                alt="product"
                style={{
                  width: "100%",
                  maxWidth: 420,
                  height: 420,
                  objectFit: "contain"
                }}
              />
            )}

          </Box>

          {/* THUMBNAILS */}

          <Stack direction="row" spacing={2} justifyContent="center" mt={3}>

            {visibleThumbs.map((item, i) => {

              const realIndex = getRealIndex(item);

              return item.type === "video" ? (

                <Box
                  key={realIndex}
                  component="video"
                  src={item.src}
                  onClick={() => setSelectedIndex(realIndex)}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    cursor: "pointer",
                    border: selectedIndex === realIndex ? "2px solid green" : "1px solid #ddd"
                  }}
                />

              ) : (

                <Box
                  key={realIndex}
                  component="img"
                  src={item.src}
                  onClick={() => setSelectedIndex(realIndex)}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    cursor: "pointer",
                    border: selectedIndex === realIndex ? "2px solid green" : "1px solid #ddd"
                  }}
                />

              );

            })}

          </Stack>

          {/* DOTS */}

          <Stack direction="row" spacing={1} justifyContent="center" mt={2}>

            {gallery.map((_, i) => (
              <Box
                key={i}
                onClick={() => setSelectedIndex(i)}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  cursor: "pointer",
                  background: selectedIndex === i ? "#2e7d32" : "#ccc"
                }}
              />
            ))}

          </Stack>

        </Paper>

        {/* RIGHT SIDE */}

        <Paper elevation={0} sx={{ p: 4, borderRadius: 5 }}>

          <Typography variant="h3" fontWeight={700}>
            Super Knee Sachets
          </Typography>

          {pack && (
            <Stack direction="row" spacing={2} mt={2}>
              <Typography variant="h4" color="green">
                {format(pack.price)}
              </Typography>
              <Typography sx={{ textDecoration: "line-through" }}>
                {format(pack.old)}
              </Typography>
            </Stack>
          )}

          <Stack direction="row" spacing={2} mt={3}>
            {packs.map((p) => (
              <Paper
                key={p.id}
                onClick={() => setPack(p)}
                sx={{
                  p: 2,
                  cursor: "pointer",
                  border: pack?.id === p.id ? "2px solid green" : "1px solid #ddd"
                }}
              >
                <Typography>{p.label}</Typography>
                <Typography variant="body2">
                  {p.Sachets} Sachets
                </Typography>
              </Paper>
            ))}
          </Stack>

          <Stack direction="row" spacing={2} mt={4} alignItems="center">

            <Typography fontWeight={600}>Quantity</Typography>

            <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #0a0909", borderRadius: 2 }}>

              <IconButton onClick={() => setQty((q) => Math.max(1, q - 1))} sx={{color:"#090909"}}  >
                <RemoveIcon />
              </IconButton>

              <Typography sx={{ px: 2 }}>{qty}</Typography>

              <IconButton onClick={() => setQty((q) => q + 1)}   sx={{color:"#090909"}} >
                <AddIcon />
              </IconButton>

            </Box>

          </Stack>

          <Button
            variant="contained"
            sx={{
              mt: 4,
              bgcolor: "#2e7d32",
              "&:hover": { bgcolor: "#1b5e20" },
              py: 1.5,
              borderRadius: 3
            }}
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>

          <Stack spacing={1.5} mt={4}>
            {[
              "Supports knee comfort and flexibility",
              "Easy once-daily sachet routine",
              "Fast absorbing nutrients",
              "Travel-friendly sachet format",
              "Sugar-Free"
            ].map((item) => (
              <Stack key={item} direction="row" spacing={1} alignItems="center">
                <CheckCircleRoundedIcon sx={{ color: "#2e7d32", fontSize: 20 }} />
                <Typography variant="body2">{item}</Typography>
              </Stack>
            ))}
          </Stack>

        </Paper>

      </Box>

      <Snackbar
        open={openSnack}
        autoHideDuration={2500}
        onClose={() => setOpenSnack(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ background: "#2e7d32", borderRadius: 2 }}>
          <AddedToCartToast image={product5} message="Added to bag" />
        </Box>
      </Snackbar>

    </Container>
  );
}