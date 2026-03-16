import { Box, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import { useLocation } from "react-router-dom";

const MotionBox = motion(Box);

export default function FloatingContact() {
  const phoneNumber = "8919529712";
  const location = useLocation();

  if (
    location.pathname.startsWith("/admin") || 
    location.pathname.startsWith("/vendor") || 
    location.pathname === "/checkout" ||
    location.pathname === "/cart" ||
    location.pathname === "/order-success" ||
    location.pathname === "/payment-fail"
  ) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 25,
        right: 25,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* 📞 CALL BUTTON */}
      <MotionBox
        animate={{ scale: [1, 1.15, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <IconButton
          component="a"
          href={`tel:${phoneNumber}`}
          sx={{
            backgroundColor: "#16a34a",
            color: "white",
            width: 60,
            height: 60,
            boxShadow: "0 0 20px rgba(22,163,74,0.7)",
            "&:hover": {
              backgroundColor: "#15803d",
            },
          }}
        >
          <CallIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </MotionBox>

      {/* 💬 WHATSAPP BUTTON */}
      <MotionBox
        animate={{ scale: [1, 1.15, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <IconButton
          component="a"
          href={`https://wa.me/91${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: "#25D366",
            color: "white",
            width: 60,
            height: 60,
            boxShadow: "0 0 20px rgba(37,211,102,0.7)",
            "&:hover": {
              backgroundColor: "#1ebe5d",
            },
          }}
        >
          <WhatsAppIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </MotionBox>
    </Box>
  );
}