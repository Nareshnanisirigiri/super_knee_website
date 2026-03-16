import React from "react";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { motion } from "framer-motion";

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 10,
        background: "linear-gradient(135deg, #e8f5e9 0%, #ffffff 100%)",
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 6,
              borderRadius: 5,
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
            }}
          >
            <CheckCircleOutlineIcon
              sx={{ fontSize: 100, color: "#4caf50", mb: 3 }}
            />
            <Typography variant="h3" fontWeight="bold" gutterBottom color="#2e7d32">
              Order Placed!
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={4}>
              Thank you for your purchase. Your order has been successfully placed and is being processed.
            </Typography>

            {order && (
              <Box sx={{ mb: 4, p: 2, bgcolor: "#f1f8e9", borderRadius: 3 }}>
                <Typography fontWeight="bold">Order ID: {order.razorpayOrderId}</Typography>
                <Typography>Amount Paid: ₹{order.totalAmount}</Typography>
              </Box>
            )}

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => navigate("/shop")}
              sx={{
                py: 1.5,
                borderRadius: "30px",
                background: "linear-gradient(135deg, #66bb6a, #43a047)",
                boxShadow: "0 10px 20px rgba(76,175,80,0.3)",
                fontSize: "1.1rem",
              }}
            >
              Continue Shopping
            </Button>

            <Button
              variant="text"
              sx={{ mt: 2, color: "#66bb6a" }}
              onClick={() => navigate("/orders")}
            >
              View My Orders
            </Button>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
