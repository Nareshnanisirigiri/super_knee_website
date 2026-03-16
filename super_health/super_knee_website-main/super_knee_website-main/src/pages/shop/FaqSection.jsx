import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Container,
  IconButton
} from "@mui/material";

import { motion, AnimatePresence } from "framer-motion";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

/* -----------------------------
   FAQ DATA
------------------------------ */

const faqs = [
{
question: "How does Super Knee work?",
answer:
"Super Knee contains five scientifically studied ingredients that work together to reduce joint inflammation through multiple biological pathways, protect cartilage from further damage through immune modulation, and improve joint mobility and reduce stiffness naturally without the side effects associated with long-term painkiller use."
},

{
question: "How long before I notice results?",
answer:
"Clinical studies on the individual ingredients show that some benefits, especially pain reduction, can begin as early as 5–7 days. However, for optimal and sustained results including improvement in stiffness, mobility, and joint function, consistent daily use for 60–90 days is recommended."
},

{
question: "Is Super Knee safe for daily use?",
answer:
"Yes. All ingredients in Super Knee have been evaluated in clinical trials and have shown excellent safety profiles with no serious adverse events reported. However, please consult your doctor if you are pregnant, nursing, have a medical condition, or are taking prescription medications."
},

{
question: "Why is CurQlife® curcumin better than regular turmeric supplements?",
answer:
"Standard curcumin has extremely poor bioavailability and less than 2% reaches the bloodstream. CurQlife® uses patented delivery technology to deliver 48 times more curcumin into the blood with rapid release and longer activity, ensuring the anti-inflammatory benefits actually reach your joints."
},

{
question: "What makes the collagen in Super Knee different from other collagen products?",
answer:
"Most joint supplements use hydrolyzed collagen which only provides amino acids. Super Knee contains Undenatured Type II Collagen (UC-II) which activates the body's immune response to protect and repair cartilage through a mechanism known as oral tolerance."
},

{
question: "Can I take Super Knee along with my other medications?",
answer:
"Super Knee is a nutraceutical supplement and not a drug. However if you are taking blood thinners, diabetes medications, or other prescription medicines you should consult your doctor before starting the supplement."
},

{
question: "Is it suitable for diabetic patients?",
answer:
"Yes. Super Knee is sugar-free and contains only about 4.5 kcal per sachet. It uses sucralose as a non-caloric sweetener."
},

{
question: "Can young people use Super Knee?",
answer:
"Super Knee is designed for adults with mild to moderate knee osteoarthritis. It is recommended for adults aged 18 years and above. Children should not use this supplement without medical guidance."
},

{
question: "Why a sachet instead of a tablet?",
answer:
"Sachets dissolve easily in water and allow better absorption of ingredients. They also avoid swallowing large pills and allow higher ingredient dosages compared to capsules."
},

{
question: "Is Super Knee vegetarian or non-vegetarian?",
answer:
"Undenatured Type II Collagen (UC-II) is derived from chicken sternum cartilage, which makes the product non-vegetarian. The remaining ingredients are plant based."
}

];


/* -----------------------------
   COMPONENT
------------------------------ */

export default function FaqSection() {

const [openIndex, setOpenIndex] = useState(null);

const toggleFaq = (index) => {
setOpenIndex(openIndex === index ? null : index);
};

return (

<Container maxWidth="md" sx={{ mt: { xs: 8, md: 10 } }}>

{/* TITLE */}

<Typography
sx={{
fontSize: { xs: "2rem", md: "3rem" },
textAlign: "center",
fontWeight: 700,
color: "#0b1d13"
}}
>
Frequently Asked Questions
</Typography>

<Typography
sx={{
textAlign: "center",
color: "#5f7061",
mt: 1,
mb: 4
}}
>
Everything you need to know about Super Knee sachets.
</Typography>


{/* FAQ LIST */}

<Box>

{faqs.map((faq, index) => {

const isOpen = openIndex === index;

return (

<motion.div
key={index}
initial={{ opacity: 0, y: 25 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.07 }}
viewport={{ once: true }}
>

<Paper
elevation={0}
sx={{
mb: 2,
borderRadius: 4,
border: "1px solid rgba(27,94,32,0.12)",
overflow: "hidden"
}}
>

{/* QUESTION */}

<Box
onClick={() => toggleFaq(index)}
sx={{
display: "flex",
alignItems: "center",
justifyContent: "space-between",
p: 2.5,
cursor: "pointer"
}}
>

<Typography
sx={{
fontWeight: 600,
color: "#173d2a",
pr: 2
}}
>
{faq.question}
</Typography>

<IconButton>

{isOpen ? (
<RemoveIcon sx={{ color: "#2e7d32" }} />
) : (
<AddIcon sx={{ color: "#2e7d32" }} />
)}

</IconButton>

</Box>


{/* ANSWER */}

<AnimatePresence>

{isOpen && (

<motion.div
initial={{ height: 0, opacity: 0 }}
animate={{ height: "auto", opacity: 1 }}
exit={{ height: 0, opacity: 0 }}
transition={{ duration: 0.35 }}
style={{ overflow: "hidden" }}
>

<Box
sx={{
px: 2.5,
pb: 2.5,
color: "#5f7061",
lineHeight: 1.7
}}
>
{faq.answer}
</Box>

</motion.div>

)}

</AnimatePresence>

</Paper>

</motion.div>

);

})}

</Box>

</Container>

);
}