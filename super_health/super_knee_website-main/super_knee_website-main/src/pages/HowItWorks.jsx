import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import ScienceIcon from "@mui/icons-material/Science";
import BoltIcon from "@mui/icons-material/Bolt";
import ShieldIcon from "@mui/icons-material/Shield";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const steps = [
  {
    icon: <LocalPharmacyIcon sx={{ fontSize: 50 }} />,
    title: "Step 1 – Advanced Absorption",
    description:
      "CurQlife® Curcumin (48× bioavailable) combined with Piperine ensures rapid absorption. 80% release in 30 minutes, active for up to 24 hours — unlike ordinary turmeric supplements.",
  },
  {
    icon: <BoltIcon sx={{ fontSize: 50 }} />,
    title: "Step 2 – Multi-Pathway Inflammation Control",
    description:
      "Curcumin blocks NF-κB, Boswellin® Super inhibits 5-LOX, and Ginger reduces CRP & IL-1 — targeting the core inflammatory pathways responsible for knee osteoarthritis pain.",
  },
  {
    icon: <ShieldIcon sx={{ fontSize: 50 }} />,
    title: "Step 3 – Immune-Driven Cartilage Protection",
    description:
      "UC-II (Undenatured Type II Collagen) activates oral tolerance in the gut, stimulating regulatory T-cells to protect and preserve your knee cartilage naturally.",
  },
  {
    icon: <DirectionsWalkIcon sx={{ fontSize: 50 }} />,
    title: "Step 4 – Restore Mobility & Function",
    description:
      "Reduced inflammation + cartilage preservation leads to improved flexibility, reduced stiffness, better walking ability, and enhanced joint comfort over 60–90 days.",
  },
];

export default function HowItWorks() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f4f6f8, #e8f5e9, #fff3e0)",
        py: 12,
      }}
    >
      <Container maxWidth="lg">

        {/* HEADER */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          textAlign="center"
          mb={10}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            color="#1b5e20"
          >
            How Super Knee Works
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            mt={2}
            maxWidth="800px"
            mx="auto"
          >
            A scientifically engineered 5-ingredient synergy designed to reduce
            inflammation, protect cartilage, and restore knee mobility —
            naturally and safely.
          </Typography>
        </MotionBox>

        {/* STEPS GRID */}
        <Grid container spacing={5}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                sx={{
                  borderRadius: 6,
                  background: "white",
                  height: "100%",
                  textAlign: "center",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
                  p: 2,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(45deg,#ff6a00,#ff8f00)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px auto",
                      boxShadow:
                        "0 10px 30px rgba(255,106,0,0.4)",
                      color: "white",
                    }}
                  >
                    {step.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {step.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {step.description}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>

        {/* SCIENCE HIGHLIGHT */}
        <MotionBox
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          textAlign="center"
          mt={12}
        >
          <Box
            sx={{
              background: "white",
              borderRadius: 6,
              p: 6,
              boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
            }}
          >
            <ScienceIcon sx={{ fontSize: 60, color: "#ff6a00" }} />

            <Typography variant="h4" fontWeight="bold" mt={2} mb={2}>
              Backed by Published Clinical Research
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              maxWidth="800px"
              mx="auto"
            >
              Super Knee combines internationally patented ingredients
              supported by randomized controlled trials and peer-reviewed
              publications in leading medical journals.
            </Typography>
          </Box>
        </MotionBox>

        {/* REFERENCES SECTION */}
        <Box mt={12}>
          <Divider sx={{ mb: 4 }} />

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Scientific References
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            1. CurQlife® Bioavailability & Clinical Study — 48-fold higher bioavailability than standard curcuminoids. 60-day RCT showed 94% WOMAC improvement over placebo. (European Patent EP2852379A1).
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            2. Majeed A, et al. Frontiers in Pharmacology (2024); 15:1428440. Multi-center RCT (n=105) showing significant knee OA improvement within 5 days using standardized Boswellia extract.
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            3. Majeed M, et al. Phytotherapy Research (2019); 33(5):1457-68. Randomized, double-blind trial on Boswellia serrata in knee osteoarthritis.
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            4. Indonesian Biomedical Journal (2023); 15(3):257-265. UC-II clinical trial showing significant WOMAC and VAS improvement.
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            5. Lodewyk et al. Biology (2020); 9(4):93. Review on Undenatured Type II Collagen in joint health.
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            6. Altman RD, Marcussen KC. Arthritis & Rheumatism (2001); 44(11):2531-8. Ginger extract in knee OA.
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            7. Bannuru RR, et al. Seminars in Arthritis and Rheumatism (2018); 48(3):416-429. Meta-analysis on Curcumin & Boswellia for knee OA.
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            8. Shoba G, et al. Planta Medica (1998); 64(4):353-6. Piperine enhances curcumin bioavailability.
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            9. Arthritis Foundation Review — Ginger, Black Pepper & Curcumin combination comparable to Naproxen in knee OA.
          </Typography>

          <Typography variant="body2" color="text.secondary">
            10. Indian epidemiological meta-analysis (2025) — Knee OA prevalence: 47% in elderly (60+), 28.7% overall in adults.
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}