// import React from "react";
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   Stack
// } from "@mui/material";

// import { motion } from "framer-motion";

// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
// import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
// import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

// const features = [
//   {
//     title: "Mobility Support",
//     icon: FavoriteBorderOutlinedIcon,
//     desc: "Supports daily joint comfort."
//   },
//   {
//     title: "Daily Energy",
//     icon: BoltOutlinedIcon,
//     desc: "Helps maintain active lifestyle."
//   },
//   {
//     title: "Easy Mix",
//     icon: WaterDropOutlinedIcon,
//     desc: "Mix sachet with water easily."
//   },
//   {
//     title: "Verified Formula",
//     icon: VerifiedOutlinedIcon,
//     desc: "Quality controlled formula."
//   }
// ];

// export default function ProductSections() {

//   return (
//     <Container maxWidth="lg" sx={{ mt: 10 }}>

//       <Typography
//         variant="h3"
//         textAlign="center"
//         fontWeight={700}
//       >
//         Why Super Knee Works
//       </Typography>

//       <Box
//         sx={{
//           mt: 5,
//           display: "grid",
//           gridTemplateColumns:
//             { xs: "1fr 1fr", md: "repeat(4,1fr)" },
//           gap: 3
//         }}
//       >

//         {features.map((f, i) => {

//           const Icon = f.icon

//           return (

//             <motion.div
//               key={f.title}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * .1 }}
//             >

//               <Paper
//                 sx={{
//                   p: 3,
//                   borderRadius: 4,
//                   textAlign: "center"
//                 }}
//               >

//                 <Icon sx={{ fontSize: 32 }} />

//                 <Typography fontWeight={700} mt={1}>
//                   {f.title}
//                 </Typography>

//                 <Typography variant="body2" mt={1}>
//                   {f.desc}
//                 </Typography>

//               </Paper>

//             </motion.div>

//           )

//         })}

//       </Box>

//     </Container>
//   )
// }



import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Stack
} from "@mui/material";

import { motion } from "framer-motion";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

/* -------------------------
   FEATURES DATA
-------------------------- */

const features = [
  {
    title: "Mobility Support",
    icon: FavoriteBorderOutlinedIcon,
    desc: "Supports daily joint comfort and smooth movement throughout the day."
  },
  {
    title: "Daily Energy",
    icon: BoltOutlinedIcon,
    desc: "Helps maintain a more active lifestyle with consistent support."
  },
  {
    title: "Easy Mix",
    icon: WaterDropOutlinedIcon,
    desc: "Simple sachet format that mixes quickly with water."
  },
  {
    title: "Verified Formula",
    icon: VerifiedOutlinedIcon,
    desc: "Quality controlled formula built with trusted ingredients."
  }
];

/* -------------------------
   ANIMATION VARIANTS
-------------------------- */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.92
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const iconVariants = {
  animate: {
    y: [0, -6, 0],
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "easeInOut"
    }
  }
};

/* -------------------------
   COMPONENT
-------------------------- */

export default function ProductSections() {

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background:
          "linear-gradient(180deg,#ffffff 0%,#f4f9f3 100%)"
      }}
    >

      <Container maxWidth="lg">

        {/* TITLE */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
        >

          <Typography
            variant="h3"
            textAlign="center"
            fontWeight={700}
            sx={{
              color: "#1b3b2c",
              mb: 1
            }}
          >
            Why Super Knee Works
          </Typography>

          {/* animated underline */}

          <Box
            component={motion.div}
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: .8 }}
            sx={{
              height: 4,
              bgcolor: "#2e7d32",
              mx: "auto",
              borderRadius: 3,
              mb: 5
            }}
          />

        </motion.div>

        {/* FEATURE GRID */}

        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              md: "repeat(4,1fr)"
            },
            gap: { xs: 2.5, md: 4 }
          }}
        >

          {features.map((feature) => {

            const Icon = feature.icon;

            return (

              <Box
                key={feature.title}
                component={motion.div}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.03
                }}
              >

                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    borderRadius: 4,
                    textAlign: "center",
                    height: "100%",
                    border: "1px solid rgba(27,94,32,0.12)",
                    background:
                      "linear-gradient(180deg,#ffffff 0%,#f7fbf6 100%)",
                    transition: "all .3s ease",
                    "&:hover": {
                      boxShadow:
                        "0 18px 40px rgba(34,68,39,0.18)",
                      borderColor: "#2e7d32"
                    }
                  }}
                >

                  {/* ICON */}

                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ mb: 1 }}
                  >

                    <Box
                      component={motion.div}
                      variants={iconVariants}
                      animate="animate"
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          "linear-gradient(135deg,#2e7d32,#66bb6a)",
                        color: "white",
                        mb: 2
                      }}
                    >

                      <Icon sx={{ fontSize: 30 }} />

                    </Box>

                  </Stack>

                  {/* TITLE */}

                  <Typography
                    fontWeight={700}
                    sx={{
                      color: "#16351f",
                      fontSize: "1.05rem"
                    }}
                  >
                    {feature.title}
                  </Typography>

                  {/* DESCRIPTION */}

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1.2,
                      color: "#5d6f60",
                      lineHeight: 1.7,
                      fontSize: ".9rem"
                    }}
                  >
                    {feature.desc}
                  </Typography>

                </Paper>

              </Box>

            );

          })}

        </Box>

      </Container>

    </Box>
  );
}