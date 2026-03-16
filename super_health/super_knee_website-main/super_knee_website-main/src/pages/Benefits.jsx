// import {
//   Container,
//   Typography,
//   Grid,
//   Card,
//   Box,
//   Button,
//   Divider,
//   Stack,
//   useMediaQuery
// } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";

// const MotionBox = motion(Box);
// const MotionCard = motion(Card);

// const fadeUp = {
//   hidden: { opacity: 0, y: 60 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
// };

// const contentAnimation = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: -20 },
// };

// const ingredients = [
//   {
//     title: "CurQlife® Curcumin — 250 mg",
//     image:
//       "https://thumbs.dreamstime.com/b/fresh-turmeric-rhizome-curcumin-powder-wooden-table-plant-background-404347197.jpg",
//   description: (
//   <>
//     Patented by Laila Nutraceuticals | <br />
//     48× More Bioavailable Than Standard Curcumin
//   </>
// ),
//     mechanism: `
// • Blocks NF-κB inflammatory pathway  
// • Reduces IL-1β, TNF-α, COX-2  
// • Targets inflammation at source  
// • Delivers highest FREE curcumin in blood
//     `,
//     clinical: `
// 60-Day Randomized Trial (Age 40–75):

// • 94% improvement in WOMAC score  
// • 94.8% pain reduction  
// • 17× improvement in knee flexion  
// • 90% VAS pain reduction  
// • Zero adverse effects
//     `,
//   },
//   {
//     title: "Boswellin® Super — 250 mg",
//     image:
//       "https://media.istockphoto.com/id/2070759272/photo/boswellia-serrata.jpg?s=612x612&w=0&k=20&c=-EBg4mCtwapZf4tj9xH3ePw9WSlyy4dB91ceQ62RzBg=",
//     description:
//       "75% Boswellic Acids + 30% AKBA | Sami-Sabinsa Group",
//     mechanism: `
// • Inhibits 5-LOX enzyme  
// • Blocks TNF-α and IL-6  
// • Preserves cartilage matrix  
// • Lowers hs-CRP  
// • Stops inflammatory cascades
//     `,
//     clinical: `
// 2024 Double-Blind Trial:

// • Pain relief begins in 5 days  
// • 61.9% VAS reduction  
// • 73.6% WOMAC improvement  
// • 44% X-ray joint space improvement  
// • No serious adverse events
//     `,
//   },
//   {
//     title: "Ginger Extract — 250 mg",
//     image:
//       "https://media.istockphoto.com/id/647402644/photo/ginger-root-and-ginger-powder-in-the-bowl.jpg?s=612x612&w=0&k=20&c=cMu11RTfDuNT4C8DAgzYnEaxuX8O612sFtsNQvCfS9I=",
//     description: "Clinically Proven Anti-Inflammatory & Analgesic",
//     mechanism: `
// • Reduces CRP & IL-1  
// • Natural analgesic action  
// • Improves blood circulation  
// • Works synergistically with curcumin
//     `,
//     clinical: `
// • 261-patient trial showed significant pain reduction  
// • Comparable to Naproxen in 4 weeks  
// • Improved VAS & WOMAC scores  
// • Zero safety concerns
//     `,
//   },
//   {
//     title: (
//   <>
//     Undenatured Type II Collagen <br />
//     (UC-II)— 40mg
//   </>
// ),
//     image:
//       "https://www.lizearle.com/dw/image/v2/BGJR_PRD/on/demandware.static/-/Library-Sites-le-content-global/default/dw1c1c7a03/images/articles/what-is-collagen/Blog-Header-Collagen-Desktop.jpg?sw=720&q=85",
//     description: "Immune-Modulating Cartilage Protection",
//     mechanism: `
// • Activates Regulatory T-cells  
// • Suppresses cartilage-attacking immune cells  
// • Reduces TNF-α, IL-1β, IL-6  
// • Inhibits cartilage-destroying enzymes (MMPs)
//     `,
//     clinical: `
// 90-Day Trial (102 Patients):

// • 81.6% WOMAC reduction  
// • 67.9% VAS pain reduction  
// • 75.8% functional improvement  
// • No adverse events
//     `,
//   },
//   {
//     title: "Piper Nigrum Extract — 5 mg",
//     image:
//       "https://starhiherbs.com/images/products/black-pepper-extract-1.jpg",
//     description: "Bioavailability Multiplier",
//     mechanism: `
// • Inhibits metabolic breakdown  
// • Blocks P-glycoprotein efflux  
// • Enhances GI blood flow  
// • Increases absorption up to 2000%
//     `,
//     clinical: `
// Widely studied bio-enhancer:

// • Enhances curcumin absorption significantly  
// • Improves nutrient transport  
// • Supports full formula potency
//     `,
//   },
// ];

// export default function Benefits() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const [activeTabs, setActiveTabs] = useState(
//     ingredients.map(() => "mechanism")
//   );

//   const handleTabChange = (index, tab) => {
//     const updatedTabs = [...activeTabs];
//     updatedTabs[index] = tab;
//     setActiveTabs(updatedTabs);
//   };

//   return (
//     <Box sx={{ background: "#fff8f3", overflow: "hidden" }}>
//       <Container maxWidth="lg" sx={{ py: 14 }}>
//         <MotionBox
//           initial="hidden"
//           whileInView="visible"
//           variants={fadeUp}
//           viewport={{ once: true }}
//           sx={{ textAlign: "center", mb: 12 }}
//         >
//           <Typography
//             variant={isMobile ? "h4" : "h3"}
//             fontWeight="bold"
//             sx={{
//               background: "linear-gradient(45deg,#ff6a00,#ff3d00)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontSize: { xs: '1.7rem', sm: '2.5rem', md: '3rem' }
//             }}
//           >
//             Super Health™ Advanced Multi-Pathway Formula
//           </Typography>
//         </MotionBox>

//         {ingredients.map((item, index) => (
//           <MotionBox
//             key={index}
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             sx={{ mb: 14 }}
//           >
//             <Grid container spacing={6} alignItems="center">
//               <Grid item xs={12} md={6}>
//                 <MotionCard
//                   whileHover={{ scale: 1.05 }}
//                   transition={{ type: "spring", stiffness: 200 }}
//                   sx={{
//                     borderRadius: 5,
//                     overflow: "hidden",
//                     boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
//                     width: "100%",
//                     maxWidth: 600,
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: "100%",
//                       height: { xs: 300, md: 420 },
//                       overflow: "hidden"
//                     }}
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover"
//                       }}
//                     />
//                   </Box>
//                 </MotionCard>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" gutterBottom>
//                   {item.title}
//                 </Typography>

//                 <Typography
//                   variant="subtitle2"
//                   sx={{ mb: 3, color: "#ff3d00", fontWeight: 700, fontSize: { xs: '0.85rem', md: '1rem' } }}
//                 >
//                   {item.description}
//                 </Typography>

//                 <Stack direction="row" spacing={2} mb={3}>
//                   <Button
//                     variant={
//                       activeTabs[index] === "mechanism"
//                         ? "contained"
//                         : "outlined"
//                     }
//                     onClick={() => handleTabChange(index, "mechanism")}
//                     sx={{
//                       background: activeTabs[index] === "mechanism" ? "#ff6a00" : "transparent",
//                       color: activeTabs[index] === "mechanism" ? "#fff" : "#ff6a00",
//                       borderColor: "#ff6a00",
//                       "&:hover": {
//                         background: activeTabs[index] === "mechanism" ? "#e65100" : "rgba(255, 106, 0, 0.1)",
//                         borderColor: "#e65100"
//                       }
//                     }}
//                   >
//                     Mechanism
//                   </Button>

//                   <Button
//                     variant={
//                       activeTabs[index] === "clinical"
//                         ? "contained"
//                         : "outlined"
//                     }
//                     onClick={() => handleTabChange(index, "clinical")}
//                     sx={{
//                       background: activeTabs[index] === "clinical" ? "#ff3d00" : "transparent",
//                       color: activeTabs[index] === "clinical" ? "#fff" : "#ff3d00",
//                       borderColor: "#ff3d00",
//                       "&:hover": {
//                         background: activeTabs[index] === "clinical" ? "#d50000" : "rgba(255, 61, 0, 0.1)",
//                         borderColor: "#d50000"
//                       }
//                     }}
//                   >
//                     Clinical Trial
//                   </Button>
//                 </Stack>

//                 <AnimatePresence mode="wait">
//                   <MotionBox
//                     key={activeTabs[index]}
//                     variants={contentAnimation}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     transition={{ duration: 0.4 }}
//                     sx={{
//                       p: 3,
//                       borderRadius: 3,
//                       background: "#ffffff",
//                       boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//                       whiteSpace: "pre-line",
//                     }}
//                   >
//                     {activeTabs[index] === "mechanism"
//                       ? item.mechanism
//                       : item.clinical}
//                   </MotionBox>
//                 </AnimatePresence>
//               </Grid>
//             </Grid>
//             <Divider sx={{ mt: 10 }} />
//           </MotionBox>
//         ))}
//       </Container>
//     </Box>
//   );
// }



import {
  Container,
  Typography,
  Grid,
  Card,
  Box,
  Button,
  Divider,
  Stack,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* IMAGE IMPORTS */
import ingredient1 from "../assets/ingredient-1.webp";
import ingredient2 from "../assets/ingredient-2.jpg";
import ingredient3 from "../assets/ingredient-3.jpg";
import ingredient4 from "../assets/ingredient-4.webp";
import ingredient5 from "../assets/ingredient-5.jpg";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const contentAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const ingredients = [
  {
    title: "CurQlife® Curcumin — 250 mg",
    image: ingredient1,
    description: (
      <>
        Patented by Laila Nutraceuticals | <br />
        48× More Bioavailable Than Standard Curcumin
      </>
    ),
    mechanism: `
• Blocks NF-κB inflammatory pathway  
• Reduces IL-1β, TNF-α, COX-2  
• Targets inflammation at source  
• Delivers highest FREE curcumin in blood
    `,
    clinical: `
60-Day Randomized Trial (Age 40–75):

• 94% improvement in WOMAC score  
• 94.8% pain reduction  
• 17× improvement in knee flexion  
• 90% VAS pain reduction  
• Zero adverse effects
    `,
  },
  {
    title: "Boswellin® Super — 250 mg",
    image: ingredient2,
    description: "75% Boswellic Acids + 30% AKBA | Sami-Sabinsa Group",
    mechanism: `
• Inhibits 5-LOX enzyme  
• Blocks TNF-α and IL-6  
• Preserves cartilage matrix  
• Lowers hs-CRP  
• Stops inflammatory cascades
    `,
    clinical: `
2024 Double-Blind Trial:

• Pain relief begins in 5 days  
• 61.9% VAS reduction  
• 73.6% WOMAC improvement  
• 44% X-ray joint space improvement  
• No serious adverse events
    `,
  },
  {
    title: "Ginger Extract — 250 mg",
    image: ingredient3,
    description: "Clinically Proven Anti-Inflammatory & Analgesic",
    mechanism: `
• Reduces CRP & IL-1  
• Natural analgesic action  
• Improves blood circulation  
• Works synergistically with curcumin
    `,
    clinical: `
• 261-patient trial showed significant pain reduction  
• Comparable to Naproxen in 4 weeks  
• Improved VAS & WOMAC scores  
• Zero safety concerns
    `,
  },
  {
    title: (
      <>
        Undenatured Type II Collagen <br />
        (UC-II)— 40mg
      </>
    ),
    image: ingredient4,
    description: "Immune-Modulating Cartilage Protection",
    mechanism: `
• Activates Regulatory T-cells  
• Suppresses cartilage-attacking immune cells  
• Reduces TNF-α, IL-1β, IL-6  
• Inhibits cartilage-destroying enzymes (MMPs)
    `,
    clinical: `
90-Day Trial (102 Patients):

• 81.6% WOMAC reduction  
• 67.9% VAS pain reduction  
• 75.8% functional improvement  
• No adverse events
    `,
  },
  {
    title: "Piper Nigrum Extract — 5 mg",
    image: ingredient5,
    description: "Bioavailability Multiplier",
    mechanism: `
• Inhibits metabolic breakdown  
• Blocks P-glycoprotein efflux  
• Enhances GI blood flow  
• Increases absorption up to 2000%
    `,
    clinical: `
Widely studied bio-enhancer:

• Enhances curcumin absorption significantly  
• Improves nutrient transport  
• Supports full formula potency
    `,
  },
];

export default function Benefits() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [activeTabs, setActiveTabs] = useState(
    ingredients.map(() => "mechanism")
  );

  const handleTabChange = (index, tab) => {
    const updatedTabs = [...activeTabs];
    updatedTabs[index] = tab;
    setActiveTabs(updatedTabs);
  };

  return (
    <Box sx={{ background: "#fff8f3", overflow: "hidden" }}>
      <Container maxWidth="lg" sx={{ py: 14 }}>
        <MotionBox
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
          sx={{ textAlign: "center", mb: 12 }}
        >
          <Typography
            variant={isMobile ? "h4" : "h3"}
            fontWeight="bold"
            sx={{
              background: "linear-gradient(45deg,#ff6a00,#ff3d00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "1.7rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Super Health™ Advanced Multi-Pathway Formula
          </Typography>
        </MotionBox>

        {ingredients.map((item, index) => (
          <MotionBox
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            sx={{ mb: 14 }}
          >
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <MotionCard
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  sx={{
                    borderRadius: 5,
                    overflow: "hidden",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                    width: "100%",
                    maxWidth: 600,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: 300, md: 420 },
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </MotionCard>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  fontWeight="bold"
                  gutterBottom
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 3,
                    color: "#ff3d00",
                    fontWeight: 700,
                    fontSize: { xs: "0.85rem", md: "1rem" },
                  }}
                >
                  {item.description}
                </Typography>

                <Stack direction="row" spacing={2} mb={3}>
                  <Button
                    variant={
                      activeTabs[index] === "mechanism"
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => handleTabChange(index, "mechanism")}
                    sx={{
                      background:
                        activeTabs[index] === "mechanism"
                          ? "#ff6a00"
                          : "transparent",
                      color:
                        activeTabs[index] === "mechanism"
                          ? "#fff"
                          : "#ff6a00",
                      borderColor: "#ff6a00",
                    }}
                  >
                    Mechanism
                  </Button>

                  <Button
                    variant={
                      activeTabs[index] === "clinical"
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => handleTabChange(index, "clinical")}
                    sx={{
                      background:
                        activeTabs[index] === "clinical"
                          ? "#ff3d00"
                          : "transparent",
                      color:
                        activeTabs[index] === "clinical"
                          ? "#fff"
                          : "#ff3d00",
                      borderColor: "#ff3d00",
                    }}
                  >
                    Clinical Trial
                  </Button>
                </Stack>

                <AnimatePresence mode="wait">
                  <MotionBox
                    key={activeTabs[index]}
                    variants={contentAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: "#ffffff",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {activeTabs[index] === "mechanism"
                      ? item.mechanism
                      : item.clinical}
                  </MotionBox>
                </AnimatePresence>
              </Grid>
            </Grid>

            <Divider sx={{ mt: 10 }} />
          </MotionBox>
        ))}
      </Container>
    </Box>
  );
}