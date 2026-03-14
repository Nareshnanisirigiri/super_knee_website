import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { motion } from "framer-motion";

import HeroSection from "../components/HeroSection";
import BenefitsSection from "../components/BenefitsSection";
import VideoSection from "../components/VideoSection";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import PricingSection from "../components/PricingSection";
import PainVideosSection from "../components/PainVideosSection";

export default function Home() {

  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {

    if (location.state?.user) {
      setUser(location.state.user);
      setOpen(true);
    }

  }, [location]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>

      {/* ================= WELCOME NOTIFICATION ================= */}

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Alert
            severity="success"
            sx={{
              fontWeight: "bold",
              borderRadius: 3,
              fontSize: "15px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)"
            }}
          >
            {/* --- PREVIOUS CODE ---
            Welcome to Super Knee 👋 
            ----------------------- */}
            Welcome to Super Health 👋 <br />
            {user?.name} ({user?.role}) <br />
            Your Health — Our Support 💚
          </Alert>
        </motion.div>
      </Snackbar>

      {/* ================= WEBSITE SECTIONS ================= */}

      <HeroSection />
      <BenefitsSection />
      <VideoSection />
      <PainVideosSection />
      <Testimonials />
      <PricingSection />
      <Footer />

    </>
  );
}