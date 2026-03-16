// import React, { useState } from "react";
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   Chip,
//   Stack,
//   Button,
//   IconButton
// } from "@mui/material";

// import { motion } from "framer-motion";

// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import StarRoundedIcon from "@mui/icons-material/StarRounded";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

// import product1 from "../../assets/product-box.jpeg";
// import product2 from "../../assets/product-front.jpeg";
// import product3 from "../../assets/product-back.jpeg";
// import product5 from "../../assets/superKnee_product.png";




// /* ------------------------
//    IMAGE GALLERY
// ------------------------- */

// const gallery = [product1, product2, product3, product5];

// /* ------------------------
//    PACK OPTIONS
// ------------------------- */

// const packs = [
//   { id: 1, label: "Pack of 1", capsules: 30, price: 2849, old: 3749 },
//   { id: 2, label: "Pack of 2", capsules: 60, price: 5559, old: 7498 },
//   { id: 3, label: "Pack of 3", capsules: 90, price: 7899, old: 11247 }
// ];

// const format = (n) =>
//   `Rs. ${new Intl.NumberFormat("en-IN").format(n)}`;

// /* ------------------------
//    COMPONENT
// ------------------------- */

// export default function ProductHero({ onAddToCart }) {

//   const [image, setImage] = useState(gallery[0])
//   const [pack, setPack] = useState(packs[0])
//   const [qty, setQty] = useState(1)

//   return (

//     <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 } }}>

//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: { xs: "1fr", md: "420px 1fr" },
//           gap: { xs: 3, md: 5 }
//         }}
//       >

//         {/* ======================
//            PRODUCT IMAGE SECTION
//         ======================= */}

//         <motion.div
//           initial={{ opacity: 0, x: -60 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: .7 }}
//         >

//           <Paper
//             elevation={0}
//             sx={{
//               p: 3,
//               borderRadius: 5,
//               textAlign: "center",
//               border: "1px solid #e6efe7"
//             }}
//           >

//             {/* MAIN IMAGE */}

//             <motion.img
//               key={image}
//               src={image}
//               alt="product"
//               initial={{ opacity: 0, scale: .9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: .5 }}
//               style={{
//                 width: 320,
//                 height: 320,
//                 objectFit: "contain",
//                 margin: "0 auto"
//               }}
//             />

//             {/* THUMBNAILS */}

//             <Stack
//               direction="row"
//               spacing={2}
//               justifyContent="center"
//               mt={3}
//             >

//               {gallery.map((img) => (

//                 <Box
//                   component={motion.img}
//                   whileHover={{ scale: 1.1 }}
//                   key={img}
//                   src={img}
//                   onClick={() => setImage(img)}
//                   sx={{
//                     width: 70,
//                     height: 70,
//                     objectFit: "contain",
//                     borderRadius: 2,
//                     cursor: "pointer",
//                     border:
//                       image === img
//                         ? "2px solid #2e7d32"
//                         : "1px solid #ddd",
//                     p: .5
//                   }}
//                 />

//               ))}

//             </Stack>

//           </Paper>

//         </motion.div>

//         {/* ======================
//            PRODUCT INFO
//         ======================= */}

//         <motion.div
//           initial={{ opacity: 0, x: 60 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: .7 }}
//         >

//           <Paper
//             elevation={0}
//             sx={{
//               p: { xs: 3, md: 4 },
//               borderRadius: 5,
//               border: "1px solid #e6efe7"
//             }}
//           >

//             {/* TAGS */}

//             <Stack direction="row" spacing={1}>
//               <Chip label="Joint Support" />
//               <Chip label="Daily Sachet" />
//             </Stack>

//             {/* TITLE */}

//             <Typography
//               variant="h3"
//               fontWeight={700}
//               mt={2}
//               sx={{ color: "#1b3b2c" }}
//             >
//               Super Knee Sachets
//             </Typography>

//             {/* PRODUCT OVERVIEW */}

//             <Typography mt={1.5} color="text.secondary">
//               Super Knee Sachets are designed for a simple,
//               once-daily routine that helps support knee
//               comfort, flexibility, and everyday mobility.
//               The easy sachet format mixes quickly with water
//               so you can maintain a consistent wellness habit
//               without complicated supplement routines.
//             </Typography>

//             {/* RATING */}

//             <Stack direction="row" alignItems="center" mt={2}>
//               <StarRoundedIcon sx={{ color: "#f59e0b" }} />
//               <Typography ml={1} fontWeight={600}>
//                 4.8
//               </Typography>
//               <Typography ml={1} color="text.secondary">
//                 144 Reviews
//               </Typography>
//             </Stack>

//             {/* PRICE */}

//             <Stack direction="row" spacing={2} mt={3} alignItems="center">

//               <Typography variant="h4" fontWeight={700}>
//                 {format(pack.price)}
//               </Typography>

//               <Typography
//                 sx={{
//                   textDecoration: "line-through",
//                   color: "#8b8b8b"
//                 }}
//               >
//                 {format(pack.old)}
//               </Typography>

//             </Stack>

//             {/* PACK SELECTOR */}

//             <Typography mt={3} fontWeight={700}>
//               Select Pack
//             </Typography>

//             <Stack direction="row" spacing={2} mt={1.5}>

//               {packs.map((p) => (

//                 <Paper
//                   component={motion.div}
//                   whileHover={{ scale: 1.05 }}
//                   key={p.id}
//                   onClick={() => setPack(p)}
//                   sx={{
//                     p: 2,
//                     cursor: "pointer",
//                     textAlign: "center",
//                     borderRadius: 3,
//                     border:
//                       pack.id === p.id
//                         ? "2px solid #2e7d32"
//                         : "1px solid #ddd"
//                   }}
//                 >

//                   <Typography fontWeight={700}>
//                     {p.label}
//                   </Typography>

//                   <Typography variant="body2">
//                     {p.capsules} Capsules
//                   </Typography>

//                 </Paper>

//               ))}

//             </Stack>

//             {/* QUANTITY */}

//             <Stack
//               direction="row"
//               spacing={2}
//               mt={4}
//               alignItems="center"
//             >

//               <Typography fontWeight={700}>
//                 Quantity
//               </Typography>

//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   border: "1px solid #ddd",
//                   borderRadius: 2
//                 }}
//               >

//                 <IconButton
//                   onClick={() =>
//                     setQty((q) => Math.max(1, q - 1))
//                   }
//                 >
//                   <RemoveIcon />
//                 </IconButton>

//                 <Typography sx={{ px: 2 }}>
//                   {qty}
//                 </Typography>

//                 <IconButton
//                   onClick={() => setQty((q) => q + 1)}
//                 >
//                   <AddIcon />
//                 </IconButton>

//               </Box>

//             </Stack>

//             {/* ADD TO CART */}

//             <Button
//               component={motion.button}
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: .95 }}
//               variant="contained"
//               onClick={onAddToCart}
//               sx={{
//                 mt: 4,
//                 bgcolor: "#23412a",
//                 py: 1.4,
//                 fontWeight: 700,
//                 width: "100%"
//               }}
//             >
//               Add To Cart
//             </Button>

//             {/* PRODUCT HIGHLIGHTS */}

//             <Stack spacing={1.2} mt={4}>

//               {[
//                 "Supports knee comfort and flexibility",
//                 "Easy once-daily sachet routine",
//                 "Quick mix formula",
//                 "Travel-friendly single serve packs"
//               ].map((item) => (

//                 <Stack
//                   key={item}
//                   direction="row"
//                   spacing={1}
//                   alignItems="center"
//                 >

//                   <CheckCircleRoundedIcon
//                     sx={{ color: "#2e7d32", fontSize: 20 }}
//                   />

//                   <Typography variant="body2">
//                     {item}
//                   </Typography>

//                 </Stack>

//               ))}

//             </Stack>

//           </Paper>

//         </motion.div>

//       </Box>

//     </Container>

//   )
// }









import React, { useState } from "react";
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
  Alert
} from "@mui/material";

import { motion } from "framer-motion";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import product1 from "../../assets/product-box.jpeg";
import product2 from "../../assets/product-front.png";
import product3 from "../../assets/product-back.jpeg";
import product5 from "../../assets/superKnee_product.png";

/* ------------------------
   IMAGE GALLERY
------------------------- */

const gallery = [product1, product2, product3, product5];

/* ------------------------
   PACK OPTIONS
------------------------- */

const packs = [
  { id: 1, label: "Pack of 1", capsules: 30, price: 2849, old: 3749 },
  { id: 2, label: "Pack of 2", capsules: 60, price: 5559, old: 7498 },
  { id: 3, label: "Pack of 3", capsules: 90, price: 7899, old: 11247 }
];

const format = (n) =>
  `Rs. ${new Intl.NumberFormat("en-IN").format(n)}`;

export default function ProductHero() {

  const [image, setImage] = useState(gallery[0]);
  const [pack, setPack] = useState(packs[0]);
  const [qty, setQty] = useState(1);
  const [openSnack, setOpenSnack] = useState(false);

  /* ------------------------
     ADD TO CART FUNCTION
  ------------------------- */

  const handleAddToCart = () => {

    const cartItem = {
      id: `super-health-${pack.id}`,
      name: `Super Health ${pack.label}`,
      pack: pack.label,
      capsules: pack.capsules,
      price: pack.price,
      quantity: qty,
      image: image
    };

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingIndex = cart.findIndex(
      (item) => item.id === cartItem.id
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    /* update navbar cart icon */

    window.dispatchEvent(new Event("cartUpdate"));

    setOpenSnack(true);
  };

  return (

    <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 } }}>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "420px 1fr" },
          gap: { xs: 3, md: 5 }
        }}
      >

        {/* ======================
           PRODUCT IMAGE
        ======================= */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
        >

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 5,
              textAlign: "center",
              border: "1px solid #e6efe7"
            }}
          >

            <motion.img
              key={image}
              src={image}
              alt="product"
              initial={{ opacity: 0, scale: .9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: .5 }}
              style={{
                width: 320,
                height: 320,
                objectFit: "contain",
                margin: "0 auto"
              }}
            />

            {/* THUMBNAILS */}

            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              mt={3}
            >

              {gallery.map((img) => (

                <Box
                  component={motion.img}
                  whileHover={{ scale: 1.1 }}
                  key={img}
                  src={img}
                  onClick={() => setImage(img)}
                  sx={{
                    width: 70,
                    height: 70,
                    objectFit: "contain",
                    borderRadius: 2,
                    cursor: "pointer",
                    border:
                      image === img
                        ? "2px solid #2e7d32"
                        : "1px solid #ddd",
                    p: .5
                  }}
                />

              ))}

            </Stack>

          </Paper>

        </motion.div>

        {/* ======================
           PRODUCT INFO
        ======================= */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
        >

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 5,
              border: "1px solid #e6efe7"
            }}
          >

            <Stack direction="row" spacing={1}>
              <Chip label="Joint Support" />
              <Chip label="Daily Sachet" />
            </Stack>

            <Typography
              variant="h3"
              fontWeight={700}
              mt={2}
              sx={{ color: "#1b3b2c" }}
            >
              Super Health Sachets
            </Typography>

            <Typography mt={1.5} color="text.secondary">
              Super Health Sachets support knee comfort, flexibility,
              and daily mobility with a simple once-daily mix.
            </Typography>

            {/* RATING */}

            <Stack direction="row" alignItems="center" mt={2}>
              <StarRoundedIcon sx={{ color: "#f59e0b" }} />
              <Typography ml={1} fontWeight={600}>
                4.8
              </Typography>
              <Typography ml={1} color="text.secondary">
                144 Reviews
              </Typography>
            </Stack>

            {/* PRICE */}

            <Stack direction="row" spacing={2} mt={3} alignItems="center">

              <Typography variant="h4" fontWeight={700}>
                {format(pack.price)}
              </Typography>

              <Typography
                sx={{
                  textDecoration: "line-through",
                  color: "#8b8b8b"
                }}
              >
                {format(pack.old)}
              </Typography>

            </Stack>

            {/* PACK SELECTOR */}

            <Typography mt={3} fontWeight={700}>
              Select Pack
            </Typography>

            <Stack direction="row" spacing={2} mt={1.5}>

              {packs.map((p) => (

                <Paper
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  key={p.id}
                  onClick={() => setPack(p)}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    textAlign: "center",
                    borderRadius: 3,
                    border:
                      pack.id === p.id
                        ? "2px solid #2e7d32"
                        : "1px solid #ddd"
                  }}
                >

                  <Typography fontWeight={700}>
                    {p.label}
                  </Typography>

                  <Typography variant="body2">
                    {p.capsules} Capsules
                  </Typography>

                </Paper>

              ))}

            </Stack>

            {/* QUANTITY */}

            <Stack direction="row" spacing={2} mt={4} alignItems="center">

              <Typography fontWeight={700}>
                Quantity
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  borderRadius: 2
                }}
              >

                <IconButton
                  onClick={() =>
                    setQty((q) => Math.max(1, q - 1))
                  }
                >
                  <RemoveIcon />
                </IconButton>

                <Typography sx={{ px: 2 }}>
                  {qty}
                </Typography>

                <IconButton
                  onClick={() => setQty((q) => q + 1)}
                >
                  <AddIcon />
                </IconButton>

              </Box>

            </Stack>

            {/* ADD TO CART */}

            <Button
              component={motion.button}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: .95 }}
              variant="contained"
              onClick={handleAddToCart}
              sx={{
                mt: 4,
                bgcolor: "#23412a",
                py: 1.4,
                fontWeight: 700,
                width: "100%"
              }}
            >
              Add To Cart
            </Button>

            {/* HIGHLIGHTS */}

            <Stack spacing={1.2} mt={4}>

              {[
                "Supports knee comfort and flexibility",
                "Easy once-daily sachet routine",
                "Quick mix formula",
                "Travel-friendly single serve packs"
              ].map((item) => (

                <Stack
                  key={item}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >

                  <CheckCircleRoundedIcon
                    sx={{ color: "#2e7d32", fontSize: 20 }}
                  />

                  <Typography variant="body2">
                    {item}
                  </Typography>

                </Stack>

              ))}

            </Stack>

          </Paper>

        </motion.div>

      </Box>

      {/* SUCCESS MESSAGE */}

      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={() => setOpenSnack(false)}
      >
        <Alert severity="success">
          Product added to cart
        </Alert>
      </Snackbar>

    </Container>
  );
}
