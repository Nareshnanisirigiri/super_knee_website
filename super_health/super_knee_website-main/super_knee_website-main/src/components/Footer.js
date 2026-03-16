import {
  Box,
  Container,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import VerifiedIcon from "@mui/icons-material/Verified";
import GavelIcon from "@mui/icons-material/Gavel";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const MotionBox = motion(Box);

export default function Footer() {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg,#065f46,#064e3b)",
        color: "white",
        pt: 10,
        pb: 6,
        mt: 12,
      }}
    >
      <Container maxWidth="lg">

        {/* TOP SECTION */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Grid container spacing={6}>

            {/* BRAND */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ letterSpacing: 1 }}
              >
                Super Knee
              </Typography>

              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                Advanced nutraceutical formulations developed with
                clinically studied, patented ingredients for joint health
                and mobility support.
              </Typography>
            </Grid>

            {/* COMPLIANCE INFO */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
              >
                Regulatory Information
              </Typography>

              <Box display="flex" alignItems="center" mb={1}>
                <VerifiedIcon sx={{ mr: 1 }} />
                <Typography variant="body2">
                  FSSAI License No.: 23625032000117
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" mb={1}>
                <LocalHospitalIcon sx={{ mr: 1 }} />
                <Typography variant="body2">
                  Marketed by: KP Pharma, Hyderabad
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ mt: 1 }}>
                Manufactured by: Makin Laboratories Pvt. Ltd.,
                Pithampur, M.P.
              </Typography>
            </Grid>

            {/* TRADEMARKS */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
              >
                Trademark Acknowledgements
              </Typography>

              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                CurQlife® is a registered trademark of Laila
                Nutraceuticals Pvt. Ltd.
              </Typography>

              <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                Boswellin® Super is a registered trademark of
                Sami-Sabinsa Group Limited.
              </Typography>
            </Grid>

          </Grid>
        </MotionBox>

        {/* DIVIDER */}
        <Divider sx={{ my: 6, backgroundColor: "rgba(255,255,255,0.2)" }} />

        {/* DISCLAIMER SECTION */}
        <MotionBox
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: 4,
              p: 4,
              backdropFilter: "blur(8px)",
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <GavelIcon sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Compliance Disclaimer
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{ opacity: 0.9, lineHeight: 1.8 }}
            >
              Super Knee is a nutraceutical product and is not intended
              to diagnose, treat, cure, or prevent any disease or
              disorder in human beings. This product is not to be used
              as a substitute for a varied diet. The information provided
              on this website is for educational purposes only and is not
              a substitute for professional medical advice. Always consult
              your physician or qualified healthcare professional before
              using any dietary supplement. Individual results may vary.
              Claims regarding the ingredients are based on published
              clinical studies and scientific literature. This product is
              not for medicinal use.
            </Typography>
          </Box>
        </MotionBox>

        {/* COPYRIGHT */}
        <MotionBox
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          textAlign="center"
          mt={6}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © 2026 Super Health. All Rights Reserved.
          </Typography>
        </MotionBox>

      </Container>
    </Box>
  );
}