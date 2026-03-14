import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";

import bgVideo from "../assets/videos/v3.mp4";
import productImage from "../assets/images/product.png";
import h1Video from "../assets/videos/h1.mp4";

// ✅ Move outside component
const mediaList = [
  { type: "image", src: productImage },
  { type: "video", src: h1Video },
  ];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaList.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "66vh", md: "100vh" },
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.65)",
          zIndex: -1,
        }}
      />

      <Container>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  color: "orange",
                  fontSize: { xs: "2rem", md: "3.2rem" },
                }}
              >
                {/* --- PREVIOUS CODE ---
                SUPER KNEE SACHETS
                ----------------------- */}
                SUPER HEALTH SACHETS
              </Typography>

              <Typography variant="h6" sx={{ mb: 4, color: "#e2e8f0" }}>
                {/* --- PREVIOUS CODE ---
                By Super Knee | Formulated by Pain Management Specialists
                ----------------------- */}
                By Super Health | Formulated by Pain Management Specialists
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "50px",
                  px: 6,
                  backgroundColor: "#22c55e",
                  color: "#000",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#16a34a",
                  },
                }}
              >
                Get Relief Now
              </Button>
            </motion.div>
          </Grid>

          {/* Floating media */}
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  width: { xs: "280px", md: "420px" },
                  height: { xs: "280px", md: "420px" },

                  ml: { xs: "54px", md: 0 }, // ✅ MOBILE LEFT MARGIN

                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 0 35px rgba(34,197,94,0.4)",
                 }}
              >
                {mediaList[currentIndex].type === "image" ? (
                  <Box
                    component="img"
                    src={mediaList[currentIndex].src}
                    alt="Relivex Product"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    component="video"
                    src={mediaList[currentIndex].src}
                    autoPlay
                    muted
                    playsInline
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}