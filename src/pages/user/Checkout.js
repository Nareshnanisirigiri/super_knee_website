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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api";

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
    if (!address.name || !address.email || !address.phone || !address.address) {
      alert("Please fill all shipping details");
      return;
    }

    setLoading(true);
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    try {
      // 1. Create order on backend
      const orderRes = await api.post("/payment/create-order", {
        items: cartItems.map(item => {
          const itemObj = {
            name: item.name,
            quantity: item.quantity,
            price: item.price
          };
          // Only add productId if it's a real MongoDB ID
          if (!item.id.includes("super-health")) {
            itemObj.productId = item.id;
          }
          return itemObj;
        }),
        totalAmount: totalPrice,
        shippingAddress: address
      });

      const orderData = orderRes.data;
      const isTest = orderData.isTest;
      const orderId = orderData.orderId;
      const amount = orderData.amount;
      const currency = orderData.currency;
      const internalOrderId = orderData.internalOrderId;

      // 2. Handle Test Mode (Bypass Razorpay if keys are missing)
      if (isTest) {
        console.log("DIAGNOSTIC: Test Mode detected, bypassing Razorpay modal");
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdate"));
        
        // Mock order object for the success page
        const mockOrder = {
          _id: internalOrderId,
          items: cartItems.map(item => ({ productName: item.name, quantity: item.quantity, price: item.price })),
          totalAmount: totalPrice,
          paymentStatus: "Completed (Test Mode)",
          createdAt: new Date()
        };
        
        navigate("/order-success", { state: { order: mockOrder } });
        return;
      }

      // 3. Open Razorpay Modal (Standard Flow)
      const options = {
        key: "rzp_test_placeholder", // Will be replaced by user's key later
        amount: amount,
        currency: currency,
        name: "Super Health",
        description: "Payment for your order",
        order_id: orderId,
        handler: async function (response) {
          try {
            const verifyRes = await api.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.message === "Payment verified successfully") {
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
          color: "#f27c06",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error detail:", error.response?.data);
      alert("Error: " + JSON.stringify(error.response?.data));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 10, background: "#f8f9fa" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
          Checkout
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4, borderRadius: 4 }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Shipping Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Full Name" name="name" value={address.name} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email" name="email" value={address.email} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Phone Number" name="phone" value={address.phone} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={3} label="Address" name="address" value={address.address} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="City" name="city" value={address.city} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Pincode" name="pincode" value={address.pincode} onChange={handleChange} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 4, borderRadius: 4 }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Order Summary
              </Typography>
              {cartItems.map((item, idx) => (
                <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography>{item.name} x {item.quantity}</Typography>
                  <Typography>₹{item.price * item.quantity}</Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">Total Amount</Typography>
                <Typography variant="h6" fontWeight="bold" color="#f27c06">₹{totalPrice}</Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                onClick={handlePayment}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  background: "linear-gradient(45deg,#f27c06,#e0bb6a)",
                  fontWeight: "bold",
                }}
              >
                {loading ? "Processing..." : "Pay Now with Razorpay"}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
