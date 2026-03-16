// import React, { useEffect, useState } from "react";
// import { Box, Typography, Button, Container, Grid, useMediaQuery } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import { motion } from "framer-motion";

// import bgVideo from "../assets/videos/v3.mp4";
// import productImage from "../assets/images/product.png";
// import h1Video from "../assets/videos/h1.mp4";

// // ✅ Move outside component
// const mediaList = [
//   { type: "image", src: productImage },
//   { type: "video", src: h1Video },
//   ];

// export default function HeroSection() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % mediaList.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         minHeight: { xs: "auto", md: "100vh" },
//         py: { xs: 8, md: 0 },
//         overflow: "hidden",
//         display: "flex",
//         alignItems: "center",
//         color: "#fff",
//         width: "100%",
//       }}
//     >
//       <video
//         autoPlay
//         muted
//         loop
//         playsInline
//         style={{
//           position: "absolute",
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           zIndex: -2,
//         }}
//       >
//         <source src={bgVideo} type="video/mp4" />
//       </video>

//       <Box
//         sx={{
//           position: "absolute",
//           width: "100%",
//           height: "100%",
//           background: "rgba(0,0,0,0.65)",
//           zIndex: -1,
//         }}
//       />

//       <Container maxWidth="lg">
//         <Grid container spacing={{ xs: 3, md: 6 }} alignItems="center" justifyContent="center">
//           <Grid item xs={12} md={6}>
//             <motion.div
//               initial={{ opacity: 0, y: 30 }} // Changed from x: -80 for better mobile centering
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               style={{ width: "100%", textAlign: isMobile ? "center" : "left" }}
//             >
//               <Typography
//                 variant="h2"
//                 sx={{
//                   fontWeight: "bold",
//                   mb: 2,
//                   color: "orange",
//                   fontSize: { xs: "1.7rem", sm: "2.5rem", md: "3.2rem" },
//                   lineHeight: 1.2,
//                   textAlign: { xs: "center", md: "left" }
//                 }}
//               >
//                 SUPER HEALTH SACHETS
//               </Typography>

//               <Typography 
//                 variant="h6" 
//                 sx={{ 
//                   mb: 3, 
//                   color: "#e2e8f0", 
//                   fontSize: { xs: "0.9rem", md: "1.25rem" },
//                   textAlign: { xs: "center", md: "left" }
//                 }}
//               >
//                 By Super Health | Formulated by Pain Management Specialists
//               </Typography>

//               <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
//                 <Button
//                   variant="contained"
//                   size="large"
//                   sx={{
//                     borderRadius: "50px",
//                     px: { xs: 4, md: 6 },
//                     py: 1.5,
//                     backgroundColor: "#22c55e",
//                     color: "#000",
//                     fontWeight: "bold",
//                     fontSize: { xs: "0.85rem", md: "1.1rem" },
//                     "&:hover": {
//                       backgroundColor: "#16a34a",
//                     },
//                   }}
//                 >
//                   Get Relief Now
//                 </Button>
//               </Box>
//             </motion.div>
//           </Grid>

//           {/* Floating media */}
//           <Grid
//             item
//             xs={12}
//             md={6}
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//           >
//             <motion.div
//               key={currentIndex}
//               initial={{ opacity: 0, y: 60 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <Box
//                 sx={{
//                   width: { xs: "100%", sm: "320px", md: "420px" },
//                   maxWidth: "420px",
//                   aspectRatio: "1/1",
//                   mx: "auto",
//                   borderRadius: "20px",
//                   overflow: "hidden",
//                   boxShadow: "0 0 35px rgba(34,197,94,0.4)",
//                  }}
//               >
//                 {mediaList[currentIndex].type === "image" ? (
//                   <Box
//                     component="img"
//                     src={mediaList[currentIndex].src}
//                     alt="Relivex Product"
//                     sx={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                   />
//                 ) : (
//                   <Box
//                     component="video"
//                     src={mediaList[currentIndex].src}
//                     autoPlay
//                     muted
//                     playsInline
//                     sx={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                   />
//                 )}
//               </Box>
//             </motion.div>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }





// import React from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Container,
//   Grid,
//   useMediaQuery
// } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import { motion } from "framer-motion";

// import bgVideo from "../assets/videos/v3.mp4";
// import heroVideo from "../assets/videos/h1.mp4";

// export default function HeroSection() {

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   return (

//     <Box
//       sx={{
//         position: "relative",
//         minHeight: { xs: "auto", md: "100vh" },
//         py: { xs: 8, md: 0 },
//         overflow: "hidden",
//         display: "flex",
//         alignItems: "center",
//         color: "#fff",
//         width: "100%"
//       }}
//     >

//       {/* BACKGROUND VIDEO */}

//       <video
//         autoPlay
//         muted
//         loop
//         playsInline
//         style={{
//           position: "absolute",
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           zIndex: -2
//         }}
//       >
//         <source src={bgVideo} type="video/mp4" />
//       </video>

//       {/* DARK OVERLAY */}

//       <Box
//         sx={{
//           position: "absolute",
//           width: "100%",
//           height: "100%",
//           background: "rgba(0,0,0,0.65)",
//           zIndex: -1
//         }}
//       />

//       <Container maxWidth="lg">

//         <Grid
//           container
//           spacing={{ xs: 4, md: 6 }}
//           alignItems="center"
//           justifyContent="center"
//         >

//           {/* LEFT CONTENT */}

//           <Grid item xs={12} md={6}>

//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               style={{ textAlign: isMobile ? "center" : "left" }}
//             >

//               <Typography
//                 variant="h2"
//                 sx={{
//                   fontWeight: "bold",
//                   mb: 2,
//                   color: "orange",
//                   fontSize: { xs: "1.7rem", sm: "2.5rem", md: "3.2rem" }
//                 }}
//               >
//                 SUPER HEALTH SACHETS
//               </Typography>

//               <Typography
//                 variant="h6"
//                 sx={{
//                   mb: 3,
//                   color: "#e2e8f0",
//                   fontSize: { xs: "0.9rem", md: "1.25rem" }
//                 }}
//               >
//                 By Super Health | Formulated by Pain Management Specialists
//               </Typography>

//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: { xs: "center", md: "flex-start" }
//                 }}
//               >

//                 <Button
//                   variant="contained"
//                   size="large"
//                   sx={{
//                     borderRadius: "50px",
//                     px: { xs: 4, md: 6 },
//                     py: 1.5,
//                     backgroundColor: "#22c55e",
//                     color: "#000",
//                     fontWeight: "bold",
//                     fontSize: { xs: "0.85rem", md: "1.1rem" },
//                     "&:hover": {
//                       backgroundColor: "#16a34a"
//                     }
//                   }}
//                 >
//                   Get Relief Now
//                 </Button>

//               </Box>

//             </motion.div>

//           </Grid>

//           {/* RIGHT VIDEO */}

//           <Grid
//             item
//             xs={12}
//             md={6}
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//           >

//             <motion.div
//               animate={{ y: [0, -15, 0] }}
//               transition={{
//                 duration: 4,
//                 repeat: Infinity
//               }}
//             >

//               {/* VIDEO FRAME */}

//               <Box
//                 sx={{
//                   width: { xs: "100%", sm: "340px", md: "480px" },
//                   height: { xs: "260px", sm: "300px", md: "360px" },
//                   overflow: "hidden",

//                   borderRadius: "45% 55% 55% 45%",

//                   border: "6px solid white",

//                   boxShadow: "0 20px 60px rgba(0,0,0,0.7)",

//                   background: "#000"
//                 }}
//               >

//                 <Box
//                   component="video"
//                   src={heroVideo}
//                   autoPlay
//                   muted
//                   loop
//                   playsInline
//                   sx={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover"
//                   }}
//                 />

//               </Box>

//             </motion.div>

//           </Grid>

//         </Grid>

//       </Container>

//     </Box>

//   );

// }




import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import bgVideo from "../assets/videos/v3.mp4";
import heroVideo from "../assets/videos/h1.mp4";

export default function HeroSection() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const goToShop = () => {
    navigate("/shop");
  };

  return (

    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "auto", md: "100vh" },
        py: { xs: 8, md: 0 },
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        color: "#fff",
        width: "100%"
      }}
    >

      {/* BACKGROUND VIDEO */}

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
          zIndex: -2
        }}
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.65)",
          zIndex: -1
        }}
      />

      <Container maxWidth="lg">

        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
          justifyContent="center"
        >

          {/* LEFT CONTENT */}

          <Grid item xs={12} md={6}>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ textAlign: isMobile ? "center" : "left" }}
            >

              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  color: "orange",
                  fontSize: { xs: "1.7rem", sm: "2.5rem", md: "3.2rem" }
                }}
              >
                SUPER KNEE SACHETS
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  color: "#e2e8f0",
                  fontSize: { xs: "0.9rem", md: "1.25rem" }
                }}
              >
                By Super Health | Formulated by Pain Management Specialists
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" }
                }}
              >

                <Button
                  onClick={goToShop}
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: "50px",
                    px: { xs: 4, md: 6 },
                    py: 1.5,
                    backgroundColor: "#22c55e",
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: { xs: "0.85rem", md: "1.1rem" },
                    "&:hover": {
                      backgroundColor: "#16a34a"
                    }
                  }}
                >
                  Get Relief Now
                </Button>

              </Box>

            </motion.div>

          </Grid>

          {/* RIGHT VIDEO */}

          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity
              }}
            >

              {/* VIDEO FRAME */}

              <Box
                sx={{
                  width: { xs: "100%", sm: "340px", md: "480px" },
                  height: { xs: "260px", sm: "300px", md: "360px" },
                  overflow: "hidden",
                  borderRadius: "45% 55% 55% 45%",
                  border: "6px solid white",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
                  background: "#000"
                }}
              >

                <Box
                  component="video"
                  src={heroVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />

              </Box>

            </motion.div>

          </Grid>

        </Grid>

      </Container>

    </Box>

  );

}