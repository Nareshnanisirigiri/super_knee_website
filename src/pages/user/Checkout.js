import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import PaymentIcon from "@mui/icons-material/Payment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SmartphoneIcon from "@mui/icons-material/Smartphone";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [address, setAddress] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (savedCart.length === 0) {
      navigate("/cart");
    }
    setCartItems(savedCart);
    
    // Auto-fill user info if logged in
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.name) {
      setAddress(prev => ({ ...prev, name: user.name, email: user.email }));
    }
  }, [navigate]);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("🔐 Please login to place an order.");
      navigate("/login/user");
      return;
    }

    if (!address.name || !address.email || !address.phone || !address.address) {
      alert("Please fill all shipping details");
      return;
    }

    setLoading(true);

    try {
      // 1. Create order on backend
      const orderRes = await api.post("/payment/create-order", {
        items: cartItems.map(item => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: totalPrice,
        shippingAddress: address,
        paymentMethod: paymentMethod === "Online" ? "Online" : "COD"
      });

      const orderData = orderRes.data;

      // 2. Handle COD
      if (orderData.isCOD) {
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdate"));
        navigate("/order-success", { state: { order: orderData.order } });
        return;
      }

      // 3. Handle Online Payment (Razorpay)
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        setLoading(false);
        return;
      }

      const isTest = orderData.isTest;
      const orderId = orderData.orderId;

      if (isTest) {
        // Mock verification for local testing
        try {
          const verifyRes = await api.post("/payment/verify-payment", {
            razorpay_order_id: orderId,
            razorpay_payment_id: "test_pay_" + Date.now(),
            razorpay_signature: "test_sig"
          });

          if (verifyRes.data && verifyRes.data.order) {
            localStorage.removeItem("cart");
            window.dispatchEvent(new Event("cartUpdate"));
            navigate("/order-success", { state: { order: verifyRes.data.order } });
          }
        } catch (err) {
          console.error("Test mode error:", err);
          alert("Error processing test order.");
        }
        return;
      }

      // Live Razorpay Options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Super Health",
        description: "Order Payment",
        order_id: orderId,
        handler: async function (response) {
          try {
            const verifyRes = await api.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data && verifyRes.data.order) {
              localStorage.removeItem("cart");
              window.dispatchEvent(new Event("cartUpdate"));
              navigate("/order-success", { state: { order: verifyRes.data.order } });
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: address.name,
          email: address.email,
          contact: address.phone,
        },
        theme: {
          color: "#23412a",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Order creation error:", error);
      const errorMsg = error.response?.data?.message || "Server Error. Please try again.";
      alert(`⚠️ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 10, background: "linear-gradient(135deg, #f8fdf9 0%, #f1f8f3 100%)" }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight="bold" mb={4} textAlign="center" color="#1b3b2c">
          Secure Checkout
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Stack spacing={4}>
              {/* Shipping Box */}
              <Paper elevation={0} sx={{ p: 4, borderRadius: 5, border: "1px solid #e6efe7" }}>
                <Typography variant="h5" fontWeight="bold" mb={3} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <LocalShippingIcon color="primary" /> Shipping Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Full Name" name="name" value={address.name} onChange={handleChange} variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Email Address" name="email" value={address.email} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Phone Number" name="phone" value={address.phone} onChange={handleChange} placeholder="+91 XXXX XXX XXX" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth multiline rows={3} label="Complete Address" name="address" value={address.address} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="City" name="city" value={address.city} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Pincode" name="pincode" value={address.pincode} onChange={handleChange} />
                  </Grid>
                </Grid>
              </Paper>

              {/* Payment Box */}
              <Paper elevation={0} sx={{ p: 4, borderRadius: 5, border: "1px solid #e6efe7" }}>
                <Typography variant="h5" fontWeight="bold" mb={3} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <PaymentIcon color="primary" /> Payment Method
                </Typography>

                <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <Stack spacing={2}>
                    {/* Online Payment Option */}
                    <Box
                      component={motion.div}
                      whileHover={{ scale: 1.01 }}
                      sx={{
                        p: 2.5,
                        borderRadius: 3,
                        border: "2px solid",
                        borderColor: paymentMethod === "Online" ? "#2e7d32" : "#f0f0f0",
                        bgcolor: paymentMethod === "Online" ? "#fbfdfb" : "transparent",
                        cursor: "pointer",
                        transition: "all 0.3s"
                      }}
                      onClick={() => setPaymentMethod("Online")}
                    >
                      <FormControlLabel
                        value="Online"
                        control={<Radio color="success" />}
                        label={
                          <Box>
                            <Typography variant="h6" fontWeight="bold">Online Payment</Typography>
                            <Typography variant="body2" color="text.secondary">UPI, Cards, Netbanking, Wallets</Typography>
                          </Box>
                        }
                      />
                      <AnimatePresence>
                        {paymentMethod === "Online" && (
                          <Box component={motion.div} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} sx={{ mt: 2, pt: 2, borderTop: "1px solid #eee" }}>
                            <Stack direction="row" spacing={3} sx={{ opacity: 0.7 }}>
                              <Stack alignItems="center">
                                <SmartphoneIcon sx={{ fontSize: 30 }} color="action" />
                                <Typography variant="caption">UPI</Typography>
                              </Stack>
                              <Stack alignItems="center">
                                <CreditCardIcon sx={{ fontSize: 30 }} color="action" />
                                <Typography variant="caption">Cards</Typography>
                              </Stack>
                              <Stack alignItems="center">
                                <AccountBalanceWalletIcon sx={{ fontSize: 30 }} color="action" />
                                <Typography variant="caption">Wallets</Typography>
                              </Stack>
                            </Stack>
                          </Box>
                        )}
                      </AnimatePresence>
                    </Box>

                    {/* COD Option */}
                    <Box
                      component={motion.div}
                      whileHover={{ scale: 1.01 }}
                      sx={{
                        p: 2.5,
                        borderRadius: 3,
                        border: "2px solid",
                        borderColor: paymentMethod === "COD" ? "#2e7d32" : "#f0f0f0",
                        bgcolor: paymentMethod === "COD" ? "#fbfdfb" : "transparent",
                        cursor: "pointer",
                        transition: "all 0.3s"
                      }}
                      onClick={() => setPaymentMethod("COD")}
                    >
                      <FormControlLabel
                        value="COD"
                        control={<Radio color="success" />}
                        label={
                          <Box>
                            <Typography variant="h6" fontWeight="bold">Cash On Delivery (COD)</Typography>
                            <Typography variant="body2" color="text.secondary">Pay with cash when your package arrives</Typography>
                          </Box>
                        }
                      />
                    </Box>
                  </Stack>
                </RadioGroup>
              </Paper>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 5, position: 'sticky', top: 100, border: "1px solid #e6efe7", bgcolor: "#fff" }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>Order Summary</Typography>
              <Stack spacing={2} mb={3}>
                {cartItems.map((item, idx) => (
                  <Box key={idx} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">{item.name} x {item.quantity}</Typography>
                    <Typography variant="body2" fontWeight="bold">₹{item.price * item.quantity}</Typography>
                  </Box>
                ))}
              </Stack>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
                <Typography variant="h5" fontWeight="900">Total</Typography>
                <Typography variant="h5" fontWeight="900" color="#2e7d32">₹{totalPrice}</Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                onClick={handlePayment}
                sx={{
                  py: 2,
                  borderRadius: 4,
                  bgcolor: "#23412a",
                  "&:hover": { bgcolor: "#1b3b2c" },
                  fontWeight: "900",
                  fontSize: "1.1rem",
                  textTransform: "none",
                  boxShadow: "0 10px 20px rgba(35, 65, 42, 0.2)"
                }}
              >
                {loading ? "Processing..." : paymentMethod === "Online" ? "Proceed to Pay" : "Place COD Order"}
              </Button>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  🔒 Secure SSL Encryption · 100% Tax Invoice
                </Typography>
              </Box>

              {paymentMethod === "COD" && (
                <Alert severity="info" sx={{ mt: 3, borderRadius: 3 }}>
                  Additional ₹50 convenience fee might apply for COD.
                </Alert>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
