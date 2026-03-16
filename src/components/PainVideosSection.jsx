// import React from "react";
// import {
//   Box,
//   Typography,
//   Container,
//   Grid,
//   Card,
//   CardContent
// } from "@mui/material";
// import { motion } from "framer-motion";

// const videos = [
//   {
//     title: "Back & Shoulder Pain Relief Exercises",
//     description:
//       "Scientifically designed stretches to relieve upper body muscle stiffness and chronic back pain.",
//     url: "https://www.youtube.com/embed/KGOv7sDiW_U?mute=1&rel=0"
//   },
//   {
//     title: "AI Insights on Knee Arthritis",
//     description:
//       "Learn how AI technology helps predict and prevent knee arthritis progression progression progression.",
//     url: "https://www.youtube.com/embed/9EViXM8AsfA?mute=1&rel=0"
//   },
//   {
//     title: "Complete Joint Pain Guide",
//     description:
//       "Comprehensive guide covering knee, shoulder, and back pain recovery strategies.",
//     url: "https://www.youtube.com/embed/O6kzVMZcPks?mute=1&rel=0"
//   }
// ];

// export default function PainVideosSection() {
//   return (
//     <Box
//       sx={{
//         py: 12,
//         background:
//           "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
//         position: "relative",
//         overflow: "hidden"
//       }}
//     >
//       {/* Animated Background Glow */}
//       <Box
//         sx={{
//           position: "absolute",
//           width: 400,
//           height: 400,
//           background:
//             "radial-gradient(circle, rgba(93, 200, 58, 0.25) 0%, transparent 70%)",
//           borderRadius: "50%",
//           top: -100,
//           left: -100,
//           animation: "float 8s ease-in-out infinite"
//         }}
//       />

//       <Container>
//         {/* Section Title */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <Typography
//             variant="h4"
//             align="center"
//             sx={{
//               mb: 2,
//               fontWeight: 700,
//               background:
//                 "linear-gradient(90deg, #bff77c, #115601)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent"
//             }}
//           >
//             Pain Relief & AI Insights Videos
//           </Typography>

//           <Typography
//             align="center"
//             sx={{
//               mb: 8,
//               maxWidth: 700,
//               mx: "auto",
//               color: "text.secondary",
//               fontSize: "1.1rem"
//             }}
//           >
//             Discover advanced pain relief techniques combined with AI-driven
//             healthcare insights to support your recovery journey.
//           </Typography>
//         </motion.div>

//         {/* Videos Grid */}
//         <Grid container spacing={5}>
//           {videos.map((video, index) => (
//             <Grid item xs={12} md={4} key={index}>
//               <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.2 }}
//                 whileHover={{ scale: 1.05, rotateY: 5 }}
//                 style={{ perspective: 1000 }}
//               >
//                 <Card
//                   sx={{
//                     backdropFilter: "blur(20px)",
//                     background:
//                       "rgba(244, 247, 239, 0.7)",
//                     borderRadius: 4,
//                     boxShadow:
//                       "0 15px 40px rgba(0,0,0,0.08)",
//                     overflow: "hidden",
//                     transition: "0.4s"
//                   }}
//                 >
//                   {/* Video */}
//                   <Box
//                     sx={{
//                       position: "relative",
//                       paddingTop: "56.25%",
//                       cursor: "pointer"
//                     }}
//                   >
//                     <iframe
//                       src={video.url}
//                       title={video.title}
//                       style={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         width: "100%",
//                         height: "100%"
//                       }}
//                       frameBorder="0"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                       onMouseOver={(e) =>
//                         (e.target.src =
//                           video.url + "&autoplay=1")
//                       }
//                       onMouseOut={(e) =>
//                         (e.target.src = video.url)
//                       }
//                     />
//                   </Box>

//                   {/* Content */}
//                   <CardContent sx={{ p: 3 }}>
//                     <Typography
//                       variant="h6"
//                       sx={{
//                         fontWeight: 600,
//                         mb: 1,
//                         fontSize: "1.1rem"
//                       }}
//                     >
//                       {video.title}
//                     </Typography>

//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: "text.secondary",
//                         fontSize: "0.95rem"
//                       }}
//                     >
//                       {video.description}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* Floating Animation Keyframe */}
//       <style>
//         {`
//         @keyframes float {
//           0% { transform: translateY(0px); }
//           50% { transform: translateY(40px); }
//           100% { transform: translateY(0px); }
//         }
//       `}
//       </style>
//     </Box>
//   );
// }







import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent
} from "@mui/material";

import { motion } from "framer-motion";

/* --------------------------
   VIDEO DATA
--------------------------- */

const videos = [
{
title: "Back & Shoulder Pain Relief Exercises",
description:
"Scientifically designed stretches to relieve upper body muscle stiffness and chronic back pain.",
url: "https://www.youtube.com/embed/KGOv7sDiW_U?mute=1&rel=0"
},
{
title: "AI Insights on Knee Arthritis",
description:
"Learn how AI technology helps predict and prevent knee arthritis progression.",
url: "https://www.youtube.com/embed/9EViXM8AsfA?mute=1&rel=0"
},
{
title: "Complete Joint Pain Guide",
description:
"Comprehensive guide covering knee, shoulder, and back pain recovery strategies.",
url: "https://www.youtube.com/embed/O6kzVMZcPks?mute=1&rel=0"
}
];


/* --------------------------
   VIDEO CARD
--------------------------- */

function VideoCard({ video, index }) {

return (

<motion.div
initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, delay: index * 0.15 }}
whileHover={{ scale: 1.04 }}
style={{ height:"400px", width:"500px" }}
>

<Card
sx={{
borderRadius: 4,
overflow: "hidden",
backdropFilter: "blur(20px)",
background: "rgba(244,247,239,0.75)",
boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
transition: "all .4s ease"
}}
>

{/* VIDEO */}

<Box
sx={{
position: "relative",
paddingTop: "56.25%"
}}
>

<iframe
src={video.url}
title={video.title}
style={{
position: "absolute",
top: 0,
left: 0,
width: "100%",
height: "100%"
}}
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowFullScreen
/>

</Box>

{/* TEXT */}

<CardContent sx={{ p: 3 }}>

<Typography
variant="h6"
sx={{
fontWeight: 700,
mb: 1
}}
>
{video.title}
</Typography>

<Typography
variant="body2"
sx={{ color: "text.secondary" }}
>
{video.description}
</Typography>

</CardContent>

</Card>

</motion.div>

);
}


/* --------------------------
   MAIN COMPONENT
--------------------------- */

export default function PainVideosSection() {

return (

<Box
sx={{
py: 12,
background: "linear-gradient(135deg,#fdfbfb 0%,#ebedee 100%)",
position: "relative",
overflow: "hidden"
}}
>

{/* Floating Background Glow */}

<Box
sx={{
position: "absolute",
width: 400,
height: 400,
background:
"radial-gradient(circle, rgba(93,200,58,0.25) 0%, transparent 70%)",
borderRadius: "50%",
top: -120,
left: -120,
animation: "float 8s ease-in-out infinite"
}}
/>


<Container>

{/* SECTION TITLE */}

<motion.div
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
>

<Typography
variant="h4"
align="center"
sx={{
mb: 2,
fontWeight: 700,
background: "linear-gradient(90deg,#bff77c,#115601)",
WebkitBackgroundClip: "text",
WebkitTextFillColor: "transparent"
}}
>
Pain Relief & AI Insights Videos
</Typography>

<Typography
align="center"
sx={{
mb: 8,
maxWidth: 700,
mx: "auto",
color: "text.secondary",
fontSize: "1.1rem"
}}
>
Discover advanced pain relief techniques combined with AI-driven
healthcare insights to support your recovery journey.
</Typography>

</motion.div>


{/* TOP ROW — 2 VIDEOS */}

<Grid container spacing={5}>

<Grid item xs={12} md={6}>
<VideoCard video={videos[0]} index={0} />
</Grid>

<Grid item xs={12} md={6}>
<VideoCard video={videos[1]} index={1} />
</Grid>

</Grid>


{/* BOTTOM ROW — SINGLE CENTER VIDEO */}

<Box sx={{ mt: 6 }}>

<Grid container justifyContent="center">

<Grid item xs={12} md={8}>

<motion.div
initial={{ opacity: 0, scale: 0.9 }}
whileInView={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.8 }}
>

<VideoCard video={videos[2]} index={2} />

</motion.div>

</Grid>

</Grid>

</Box>

</Container>


{/* FLOAT ANIMATION */}

<style>
{`
@keyframes float {
0% { transform: translateY(0px); }
50% { transform: translateY(40px); }
100% { transform: translateY(0px); }
}
`}
</style>

</Box>

);
}