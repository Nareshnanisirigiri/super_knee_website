import React from "react";
import { Box, Container, Typography, Button, Paper, Stack, Avatar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import { motion } from "framer-motion";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function PaymentFail() {
  const navigate = useNavigate();
  const location = useLocation();
  const errorMsg = location.state?.error || "Your transaction could not be processed at this moment.";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 10,
        background: "linear-gradient(135deg, #fff5f5 0%, #ffffff 100%)",
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 6,
              borderRadius: 6,
              textAlign: "center",
              border: "1px solid #ffebee",
              boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#fff5f5",
                color: "#ff4d4d",
                width: 100,
                height: 100,
                mx: "auto",
                mb: 3,
                border: "4px solid #fff",
                boxShadow: "0 10px 20px rgba(255, 77, 77, 0.15)"
              }}
            >
              <CancelIcon sx={{ fontSize: 60 }} />
            </Avatar>

            <Typography variant="h4" fontWeight="900" gutterBottom color="#d32f2f">
              Payment Failed
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              {errorMsg}
            </Typography>

            <Box sx={{ bgcolor: "#fdfdfd", p: 3, borderRadius: 4, border: "1px dashed #eee", mb: 4, textAlign: "left" }}>
               <Typography variant="subtitle2" fontWeight="800" mb={1} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                 <HelpOutlineIcon sx={{ fontSize: 18, color: "#999" }} /> What happened?
               </Typography>
               <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                 • Insufficient funds in your account.
               </Typography>
               <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                 • Incorrect card details or expired card.
               </Typography>
               <Typography variant="caption" color="text.secondary" display="block">
                 • Connection issues with the payment gateway.
               </Typography>
            </Box>

            <Stack spacing={2}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<RefreshIcon />}
                onClick={() => navigate("/checkout")}
                sx={{
                  py: 2,
                  borderRadius: "16px",
                  bgcolor: "#333",
                  "&:hover": { bgcolor: "#000" },
                  fontWeight: "800",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Try Paying Again
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/shop")}
                sx={{
                  py: 1.5,
                  borderRadius: "16px",
                  borderColor: "#eee",
                  color: "#666",
                  textTransform: "none",
                  fontWeight: "600",
                  "&:hover": { borderColor: "#ddd", bgcolor: "#f9f9f9" }
                }}
              >
                Go to Shop
              </Button>
            </Stack>

            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 4 }}>
              If your money was debited, it will be refunded within 3-5 business days. 
              Need help? <Typography variant="caption" color="#d32f2f" fontWeight="bold" sx={{ cursor: 'pointer' }}>Chat with us</Typography>
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
