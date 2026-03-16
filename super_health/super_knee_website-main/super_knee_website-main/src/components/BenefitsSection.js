
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  Modal,
  IconButton,
  Paper
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import ScienceIcon from "@mui/icons-material/Science";
import SpaIcon from "@mui/icons-material/Spa";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import MedicationIcon from "@mui/icons-material/Medication";
import HealingIcon from "@mui/icons-material/Healing";
import BiotechIcon from "@mui/icons-material/Biotech";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { motion, AnimatePresence } from "framer-motion";

/* IMPORT PRODUCT IMAGE */

import productImage from "../assets/superKnee_product.png";


const benefits = [
{
title: "Knee Joint Supplement India",
icon: <AccessibilityNewIcon sx={{ fontSize: 40 }} />,
content:
"Premium knee joint supplement specially formulated for Indian adults suffering from joint stiffness and osteoarthritis."
},
{
title: "Best Supplement for Knee Pain",
icon: <HealingIcon sx={{ fontSize: 40 }} />,
content:
"Clinically designed formulation targeting inflammation, cartilage damage and mobility issues."
},
{
title: "Curcumin Supplement for Knee OA",
icon: <ScienceIcon sx={{ fontSize: 40 }} />,
content:
"Advanced curcumin technology supports reduction of inflammation in knee osteoarthritis patients."
},
{
title: "Boswellia Supplement Knee Osteoarthritis",
icon: <SpaIcon sx={{ fontSize: 40 }} />,
content:
"Boswellia extract helps reduce joint swelling and improves flexibility naturally."
},
{
title: "CurQlife Curcumin Supplement",
icon: <BiotechIcon sx={{ fontSize: 40 }} />,
content:
"High bioavailability CurQlife® technology delivers superior curcumin absorption for joint protection."
},
{
title: "Boswellin Super Supplement",
icon: <LocalPharmacyIcon sx={{ fontSize: 40 }} />,
content:
"Boswellin® Super enhances anti-inflammatory action for better mobility and reduced stiffness."
},
{
title: "UC-II Collagen Knee Supplement",
icon: <MedicationIcon sx={{ fontSize: 40 }} />,
content:
"Undenatured Type II Collagen works via immune modulation to protect and repair joint cartilage."
}
];


export default function PremiumBenefitsSection() {

const [activeIndex, setActiveIndex] = useState(0);
const [open, setOpen] = useState(false);

useEffect(() => {
const interval = setInterval(() => {
setActiveIndex((prev) => (prev + 1) % benefits.length);
}, 3000);

return () => clearInterval(interval);
}, []);

const handleOpen = (index) => {
setActiveIndex(index);
setOpen(true);
};

return (
<>

{/* BENEFITS SECTION */}

<Box
sx={{
py: 8,
background: "linear-gradient(135deg,#f3f5f9)"
}}
>

<Container>

<Typography
variant="h4"
align="center"
sx={{
mb: { xs: 4, md: 6 },
fontWeight: "bold",
fontSize: { xs: "1.5rem", md: "2.125rem" },
px: 2
}}
>
Advanced Knee & Joint Health Benefits
</Typography>

<Grid container spacing={3} justifyContent="center">

{benefits.map((item, index) => (

<Grid item xs={6} sm={4} md={3} key={index}>

<motion.div whileHover={{ scale: 1.08 }}>

<Card
onClick={() => handleOpen(index)}
sx={{
cursor: "pointer",
textAlign: "center",
p: 3,
borderRadius: 4
}}
>

<Box sx={{ color: "#22c55e" }}>
{item.icon}
</Box>

<Typography sx={{ mt: 1 }}>
{item.title}
</Typography>

</Card>

</motion.div>

</Grid>

))}

</Grid>

{/* MODAL */}

<AnimatePresence>

{open && (

<Modal
open={open}
onClose={() => setOpen(false)}
sx={{
display: "flex",
alignItems: "center",
justifyContent: "center",
p: 2
}}
>

<motion.div
initial={{ scale: 0.8 }}
animate={{ scale: 1 }}
exit={{ scale: 0.8 }}
>

<Box
sx={{
background: "#0f172a",
borderRadius: 4,
p: 4,
color: "#fff",
maxWidth: 500,
height:300,
position: "relative"
}}
>

<IconButton
onClick={() => setOpen(false)}
sx={{ position: "absolute", right: 10, top: 10 }}
>
<CloseIcon sx={{ color: "#fff" }} />
</IconButton>

<Typography
variant="h5"
sx={{ mb: 2, color: "#22c55e" }}
>
{benefits[activeIndex].title}
</Typography>

<Typography>
{benefits[activeIndex].content}
</Typography>

</Box>

</motion.div>

</Modal>

)}

</AnimatePresence>

</Container>

</Box>



{/* SECTION 7 */}

<Box sx={{ py: 10, background: "#fff" }}>

<Container>

<Grid container spacing={6} alignItems="center">

{/* IMAGE */}

<Grid item xs={12} md={5}>

<motion.img
src={productImage}
alt="Super Knee Product"
style={{
width: "100%",
borderRadius: "20px",
boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
}}
initial={{ opacity: 0, x: -50 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.6 }}
/>

</Grid>


{/* CONTENT */}

<Grid item xs={12} md={7}>

<Typography
variant="h4"
fontWeight="bold"
mb={3}
>
WHO SHOULD USE SUPER KNEE?
</Typography>

<Typography mb={4} color="text.secondary">
Super Knee is ideal for people looking to maintain healthy
joints, reduce stiffness and support long-term mobility.
</Typography>

<Grid container spacing={2}>

{[
"Adults (30+) experiencing mild to moderate knee pain",
"People with early-stage knee osteoarthritis",
"Those looking for natural alternatives to NSAIDs",
"People taking glucosamine without results",
"Anyone wanting proactive knee health support",
"People who struggle swallowing large capsules"
].map((text, index) => (

<Grid item xs={12} sm={6} key={index}>

<Paper
sx={{
p: 2,
display: "flex",
alignItems: "center",
gap: 1,
borderRadius: 3
}}
>

<CheckCircleIcon sx={{ color: "#22c55e" }} />

<Typography fontSize={14}>
{text}
</Typography>

</Paper>

</Grid>

))}

</Grid>


{/* IMPORTANT NOTES */}

<Box mt={5}>

<Typography
variant="h6"
fontWeight="bold"
mb={2}
>
Important Notes
</Typography>

<Paper
sx={{
p: 3,
borderRadius: 3,
background: "#fff7ed"
}}
>

<Typography sx={{ display: "flex", gap: 1, mb: 1 }}>
<WarningAmberIcon color="warning" />
Super Knee is a nutraceutical supplement, not a medicine
</Typography>

<Typography sx={{ mb: 1 }}>
It is not intended to diagnose, treat, cure, or prevent any disease
</Typography>

<Typography sx={{ mb: 1 }}>
Always consult your healthcare professional before starting any supplement
</Typography>

<Typography sx={{ mb: 1 }}>
Do not exceed the recommended daily usage (1 sachet per day)
</Typography>

<Typography>
Best results typically appear after 60–90 days of consistent use
</Typography>

</Paper>

</Box>

</Grid>

</Grid>

</Container>

</Box>

</>
);
}