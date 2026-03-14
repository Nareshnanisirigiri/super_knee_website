import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";



export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const updateLocalStorage = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
    window.dispatchEvent(new Event("cartUpdate"));
  };

  const increment = (id) => {
    const newItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(newItems);
    updateLocalStorage(newItems);
  };

  const decrement = (id) => {
    const newItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(newItems);
    updateLocalStorage(newItems);
  };

  const removeItem = (id) => {
    const newItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newItems);
    updateLocalStorage(newItems);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#f4f6f8,#e8f5e9,#fff3e0)",
        py: 10,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          fontWeight="bold"
          mb={6}
          textAlign="center"
        >
          Your Cart ({totalCount})
        </Typography>

        <Grid container spacing={4}>
          {/* LEFT SIDE - CART ITEMS */}
          <Grid item xs={12} md={8}>
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      mb: 3,
                      borderRadius: 4,
                      boxShadow:
                        "0 10px 30px rgba(0,0,0,0.08)",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 160,
                        objectFit: "cover",
                      }}
                      image={item.image}
                      alt={item.name}
                    />

                    <CardContent sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                      >
                        {item.name}
                      </Typography>

                      <Typography
                        color="text.secondary"
                        mb={2}
                      >
                        ₹{item.price}
                      </Typography>

                      {/* Quantity Controls */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <IconButton
                          onClick={() =>
                            decrement(item.id)
                          }
                          sx={{
                            background: "#f1f1f1",
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>

                        <Typography
                          variant="h6"
                          fontWeight="bold"
                        >
                          {item.quantity}
                        </Typography>

                        <IconButton
                          onClick={() =>
                            increment(item.id)
                          }
                          sx={{
                            background: "#f1f1f1",
                          }}
                        >
                          <AddIcon />
                        </IconButton>

                        <IconButton
                          onClick={() =>
                            removeItem(item.id)
                          }
                          sx={{ ml: 2 }}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </Grid>

          {/* RIGHT SIDE - SUMMARY */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card
                sx={{
                  borderRadius: 4,
                  p: 3,
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.08)",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  mb={3}
                >
                  Order Summary
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    mb: 2,
                  }}
                >
                  <Typography>Total Items</Typography>
                  <Typography>
                    {totalCount}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    mb: 2,
                  }}
                >
                  <Typography>Total Price</Typography>
                  <Typography fontWeight="bold">
                    ₹{totalPrice}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate("/checkout")}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 3,
                    background:
                      "linear-gradient(45deg,#16a34a,#065f46)",
                  }}
                >
                  Proceed to Checkout
                </Button>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}







// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Typography,
//   Box,
//   Paper,
//   IconButton,
//   Button,
//   Stack,
//   Divider
// } from "@mui/material";

// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import DeleteIcon from "@mui/icons-material/Delete";

// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export default function Cart() {

//   const navigate = useNavigate();

//   const [cart, setCart] = useState([]);

//   /* -------------------------
//      LOAD CART
//   -------------------------- */

//   useEffect(() => {

//     const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCart(storedCart);

//   }, []);

//   /* -------------------------
//      UPDATE CART STORAGE
//   -------------------------- */

//   const updateCart = (updatedCart) => {

//     setCart(updatedCart);

//     localStorage.setItem("cart", JSON.stringify(updatedCart));

//     window.dispatchEvent(new Event("cartUpdate"));

//   };

//   /* -------------------------
//      INCREMENT
//   -------------------------- */

//   const incrementQty = (index) => {

//     const updated = [...cart];

//     updated[index].quantity += 1;

//     updateCart(updated);

//   };

//   /* -------------------------
//      DECREMENT
//   -------------------------- */

//   const decrementQty = (index) => {

//     const updated = [...cart];

//     if (updated[index].quantity > 1) {

//       updated[index].quantity -= 1;

//       updateCart(updated);

//     }

//   };

//   /* -------------------------
//      REMOVE ITEM
//   -------------------------- */

//   const removeItem = (index) => {

//     const updated = cart.filter((_, i) => i !== index);

//     updateCart(updated);

//   };

//   /* -------------------------
//      TOTAL
//   -------------------------- */

//   const total = cart.reduce(

//     (sum, item) => sum + item.price * item.quantity,

//     0

//   );

//   /* -------------------------
//      EMPTY CART
//   -------------------------- */

//   if (cart.length === 0) {

//     return (

//       <Container sx={{ py: 10, textAlign: "center" }}>

//         <Typography variant="h4" fontWeight="bold">
//           Your Cart is Empty
//         </Typography>

//         <Typography sx={{ mt: 2 }}>
//           Looks like you haven't added anything yet.
//         </Typography>

//         <Button
//           variant="contained"
//           sx={{ mt: 4 }}
//           onClick={() => navigate("/product")}
//         >
//           Continue Shopping
//         </Button>

//       </Container>

//     );

//   }

//   /* -------------------------
//      CART UI
//   -------------------------- */

//   return (

//     <Container maxWidth="md" sx={{ py: 8 }}>

//       <Typography variant="h4" fontWeight="bold" mb={4}>
//         Your Cart
//       </Typography>

//       <Stack spacing={3}>

//         {cart.map((item, index) => (

//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//           >

//             <Paper
//               sx={{
//                 p: 3,
//                 borderRadius: 4,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 flexWrap: "wrap"
//               }}
//             >

//               {/* PRODUCT */}

//               <Stack direction="row" spacing={2} alignItems="center">

//                 <Box
//                   component="img"
//                   src={item.image}
//                   sx={{
//                     width: 80,
//                     height: 80,
//                     objectFit: "contain"
//                   }}
//                 />

//                 <Box>

//                   <Typography fontWeight="bold">
//                     {item.name}
//                   </Typography>

//                   <Typography color="text.secondary">
//                     ₹{item.price}
//                   </Typography>

//                 </Box>

//               </Stack>

//               {/* QUANTITY */}

//               <Stack direction="row" spacing={1} alignItems="center">

//                 <IconButton
//                   onClick={() => decrementQty(index)}
//                 >
//                   <RemoveIcon />
//                 </IconButton>

//                 <Typography>
//                   {item.quantity}
//                 </Typography>

//                 <IconButton
//                   onClick={() => incrementQty(index)}
//                 >
//                   <AddIcon />
//                 </IconButton>

//               </Stack>

//               {/* SUBTOTAL */}

//               <Typography fontWeight="bold">

//                 ₹{item.price * item.quantity}

//               </Typography>

//               {/* REMOVE */}

//               <IconButton
//                 color="error"
//                 onClick={() => removeItem(index)}
//               >
//                 <DeleteIcon />
//               </IconButton>

//             </Paper>

//           </motion.div>

//         ))}

//       </Stack>

//       {/* TOTAL SECTION */}

//       <Paper
//         sx={{
//           mt: 5,
//           p: 3,
//           borderRadius: 4
//         }}
//       >

//         <Stack
//           direction="row"
//           justifyContent="space-between"
//         >

//           <Typography variant="h6">
//             Total
//           </Typography>

//           <Typography variant="h6" fontWeight="bold">
//             ₹{total}
//           </Typography>

//         </Stack>

//         <Divider sx={{ my: 3 }} />

//         <Button
//           fullWidth
//           variant="contained"
//           size="large"
//           onClick={() => navigate("/checkout")}
//         >
//           Proceed to Checkout
//         </Button>

//       </Paper>

//     </Container>

//   );

// }
