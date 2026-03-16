import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";
import promoVideo from "../assets/videos/promo.mp4";

export default function VideoSection() {
  return (
    <Box
      sx={{
        py: 10,
        background: "linear-gradient(to right, #ffff, #90ec86)"
      }}
    >
      <Container>
        <Grid container spacing={6} alignItems="center">
          
          {/* LEFT TEXT */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  fontSize: { xs: "1.8rem", md: "2.5rem" }
                }}
              >
                See How Super Knee  Works
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#0f0f0f",
                  fontSize: { xs: "1rem", md: "1.1rem" }
                }}
              >
                Super Knee is a nutraceutical product and is not intended to diagnose, 
                treat, cure, or prevent any disease or disorder in human beings. 
                This product is not to be used as a substitute for a varied diet. 
                The information provided on this website is for educational purposes 
                only and is not a substitute for professional medical advice. 
                Always consult your physician or qualified healthcare professional before
                 using any dietary supplement. Individual results may vary. 
                 Claims regarding the ingredients are based on published clinical studies and scientific
                  literature. This product is not for medicinal use..
              </Typography>
            </motion.div>
          </Grid>

          {/* RIGHT VIDEO */}
          <Grid item xs={12} md={6}>
            <motion.video
              src={promoVideo}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                borderRadius: "20px",
                boxShadow: "0 0 25px rgba(34,197,94,0.4)"
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}