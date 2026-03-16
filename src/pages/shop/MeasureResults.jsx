

// import { useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Chip,
//   Stack
// } from "@mui/material";

// import { motion } from "framer-motion";

// import LocalDrinkOutlinedIcon from "@mui/icons-material/LocalDrinkOutlined";
// import HealingOutlinedIcon from "@mui/icons-material/HealingOutlined";
// import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
// import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
// import poster from "../../assets/superKnee_poster-2.jpeg";

// /* ----------------------------------
//    RESULT FLOW (SACHET ROUTINE)
// ----------------------------------- */

// const resultTimeline = [

//   {
//     period: "Day 1",
//     title: "Start Daily Sachet Routine",
//     description:
//       "Dissolve one Super Knee sachet in water after food. The clinically studied ingredients begin supporting anti-inflammatory pathways in the body.",
//     icon: LocalDrinkOutlinedIcon
//   },

//   {
//     period: "Day 7",
//     title: "Inflammation Pathways Targeted",
//     description:
//       "CurQlife® curcumin and Boswellin® Super begin targeting NF-κB and 5-LOX inflammatory pathways responsible for joint pain.",
//     icon: HealingOutlinedIcon
//   },

//   {
//     period: "Day 30",
//     title: "Mobility Support Improves",
//     description:
//       "Consistent use supports reduced stiffness and improved mobility. UC-II collagen helps protect cartilage through immune modulation.",
//     icon: DirectionsWalkOutlinedIcon
//   },

//   {
//     period: "Day 90",
//     title: "Long-Term Joint Support",
//     description:
//       "With regular use, the multi-pathway formulation supports joint comfort, flexibility and everyday movement.",
//     icon: VerifiedOutlinedIcon
//   }

// ];


// /* ----------------------------------
//    COMPONENT
// ----------------------------------- */

// export default function MeasureResults() {

//   const [activeIndex, setActiveIndex] = useState(0);

//   return (

//     <Box sx={{ mt: { xs: 8, md: 10 } }}>

//       {/* HEADER */}

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: .6 }}
//         viewport={{ once: true }}
//       >

//         <Typography
//           sx={{
//             fontSize: { xs: "2.2rem", md: "3.8rem" },
//             lineHeight: 1,
//             color: "#0b1d13"
//           }}
//         >
//           Measure Results
//         </Typography>

//         <Typography
//           sx={{
//             fontFamily: "Georgia, serif",
//             fontStyle: "italic",
//             fontSize: { xs: "2rem", md: "2.8rem" },
//             color: "#4f7556"
//           }}
//         >
//           From Your First Sachet
//         </Typography>

//         <Typography
//           sx={{
//             mt: 1.5,
//             color: "#6b786d",
//             maxWidth: 700,
//             lineHeight: 1.7
//           }}
//         >
//           Super Knee works through multiple clinically studied pathways.
//           This flow shows how the once-daily sachet routine supports joint
//           comfort and mobility over time.
//         </Typography>

//         <Typography
//           sx={{
//             mt: 1,
//             fontSize: ".9rem",
//             color: "#556a5c"
//           }}
//         >
//           Recommended for adults <b>18 years and above</b>.
//         </Typography>

//       </motion.div>


//       {/* TIMELINE BUTTONS */}

//       <Stack
//         direction="row"
//         spacing={1}
//         sx={{
//           mt: 3,
//           overflowX: "auto"
//         }}
//       >

//         {resultTimeline.map((item, i) => (

//           <Chip
//             key={item.period}
//             label={item.period}
//             onClick={() => setActiveIndex(i)}
//             sx={{
//               fontWeight: 700,
//               color: activeIndex === i ? "#fff" : "#2d503a",
//               backgroundColor:
//                 activeIndex === i
//                   ? "#4f7556"
//                   : "#edf2ea"
//             }}
//           />

//         ))}

//       </Stack>


//       {/* FLOW CHART */}

//       <Box
//         sx={{
//           mt: 5,
//           display: "grid",
//           gridTemplateColumns: {
//             xs: "1fr",
//             md: "repeat(4,1fr)"
//           },
//           gap: 3,
//           position: "relative"
//         }}
//       >

//         {/* CONNECTOR LINE (DESKTOP) */}

//         <Box
//           sx={{
//             display: { xs: "none", md: "block" },
//             position: "absolute",
//             top: 70,
//             left: 0,
//             right: 0,
//             height: 2,
//             backgroundColor: "#dde4da",
//             zIndex: 0
//           }}
//         />

//         {resultTimeline.map((step, index) => {

//           const Icon = step.icon;

//           return (

//             <motion.div
//               key={step.period}
//               initial={{ opacity: 0, y: 35 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * .15 }}
//               viewport={{ once: true }}
//             >

//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 3,
//                   borderRadius: 5,
//                   border: "1px solid rgba(27,94,32,0.1)",
//                   background: "#ffffff",
//                   position: "relative",
//                   zIndex: 2,
//                   textAlign: "center",
//                   transition: "all .3s ease",
//                   "&:hover": {
//                     transform: "translateY(-6px)",
//                     boxShadow: "0 20px 35px rgba(34,68,39,0.12)"
//                   }
//                 }}
//               >

//                 {/* ICON */}

//                 <Box
//                   sx={{
//                     width: 70,
//                     height: 70,
//                     borderRadius: "50%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     margin: "0 auto",
//                     background:
//                       index === activeIndex
//                         ? "#4f7556"
//                         : "#edf2ea",
//                     color:
//                       index === activeIndex
//                         ? "#fff"
//                         : "#4f7556",
//                     mb: 2
//                   }}
//                 >

//                   <Icon sx={{ fontSize: 30 }} />

//                 </Box>

//                 {/* PERIOD */}

//                 <Typography
//                   sx={{
//                     fontWeight: 700,
//                     color: "#315741",
//                     fontSize: "1.1rem"
//                   }}
//                 >
//                   {step.period}
//                 </Typography>

//                 {/* TITLE */}

//                 <Typography
//                   sx={{
//                     mt: .7,
//                     fontWeight: 700,
//                     color: "#173d2a"
//                   }}
//                 >
//                   {step.title}
//                 </Typography>

//                 {/* DESCRIPTION */}

//                 <Typography
//                   sx={{
//                     mt: 1,
//                     fontSize: ".9rem",
//                     color: "#5f7061",
//                     lineHeight: 1.7
//                   }}
//                 >
//                   {step.description}
//                 </Typography>

//               </Paper>

//             </motion.div>

//           )

//         })}

//       </Box>

//     </Box>

//   );

// }








import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack
} from "@mui/material";

import { motion } from "framer-motion";

import LocalDrinkOutlinedIcon from "@mui/icons-material/LocalDrinkOutlined";
import HealingOutlinedIcon from "@mui/icons-material/HealingOutlined";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

import poster from "../../assets/superKnee_poster-2.png";   // poster image


/* ----------------------------------
   RESULT FLOW (SACHET ROUTINE)
----------------------------------- */

const resultTimeline = [

  {
    period: "Day 1",
    title: "Start Daily Sachet Routine",
    description:
      "Dissolve one Super Knee sachet in water after food. The clinically studied ingredients begin supporting anti-inflammatory pathways in the body.",
    icon: LocalDrinkOutlinedIcon
  },

  {
    period: "Day 7",
    title: "Inflammation Pathways Targeted",
    description:
      "CurQlife® curcumin and Boswellin® Super begin targeting NF-κB and 5-LOX inflammatory pathways responsible for joint pain.",
    icon: HealingOutlinedIcon
  },

  {
    period: "Day 30",
    title: "Mobility Support Improves",
    description:
      "Consistent use supports reduced stiffness and improved mobility. UC-II collagen helps protect cartilage through immune modulation.",
    icon: DirectionsWalkOutlinedIcon
  },

  {
    period: "Day 90",
    title: "Long-Term Joint Support",
    description:
      "With regular use, the multi-pathway formulation supports joint comfort, flexibility and everyday movement.",
    icon: VerifiedOutlinedIcon
  }

];


/* ----------------------------------
   COMPONENT
----------------------------------- */

export default function MeasureResults() {

  const [activeIndex, setActiveIndex] = useState(0);

  return (

    <Box sx={{ mt: { xs: 8, md: 10 } }}>


      {/* POSTER IMAGE */}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: .7 }}
        viewport={{ once: true }}
      >

        <Box
          component="img"
          src={poster}
          alt="Super Knee measurable results poster"
          sx={{
            width: "100%",
            maxWidth: 900,
            borderRadius: 6,
            display: "block",
            margin: "0 auto",
            mb: 5,
            boxShadow: "0 20px 45px rgba(0,0,0,0.08)"
          }}
        />

      </motion.div>


      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: .6 }}
        viewport={{ once: true }}
      >

        <Typography
          sx={{
            fontSize: { xs: "2.2rem", md: "3.8rem" },
            lineHeight: 1,
            color: "#0b1d13",
            textAlign: "center"
          }}
        >
          Measure Results
        </Typography>

        <Typography
          sx={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: { xs: "2rem", md: "2.8rem" },
            color: "#4f7556",
            textAlign: "center"
          }}
        >
          From Your First Sachet
        </Typography>

        <Typography
          sx={{
            mt: 1.5,
            color: "#6b786d",
            maxWidth: 700,
            lineHeight: 1.7,
            textAlign: "center",
            margin: "auto"
          }}
        >
          Super Knee works through multiple clinically studied pathways.
          This flow shows how the once-daily sachet routine supports joint
          comfort and mobility over time.
        </Typography>

        <Typography
          sx={{
            mt: 1,
            fontSize: ".9rem",
            color: "#556a5c",
            textAlign: "center"
          }}
        >
          Recommended for adults <b>18 years and above</b>.
        </Typography>

      </motion.div>


      {/* TIMELINE BUTTONS */}

      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        sx={{
          mt: 3,
          overflowX: "auto"
        }}
      >

        {resultTimeline.map((item, i) => (

          <Chip
            key={item.period}
            label={item.period}
            onClick={() => setActiveIndex(i)}
            sx={{
              fontWeight: 700,
              color: activeIndex === i ? "#fff" : "#2d503a",
              backgroundColor:
                activeIndex === i
                  ? "#4f7556"
                  : "#edf2ea"
            }}
          />

        ))}

      </Stack>


      {/* FLOW CHART */}

      <Box
        sx={{
          mt: 5,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(4,1fr)"
          },
          gap: 3,
          position: "relative"
        }}
      >

        {/* CONNECTOR LINE */}

        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            top: 70,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: "#dde4da",
            zIndex: 0
          }}
        />

        {resultTimeline.map((step, index) => {

          const Icon = step.icon;

          return (

            <motion.div
              key={step.period}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * .15 }}
              viewport={{ once: true }}
            >

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 5,
                  border: "1px solid rgba(27,94,32,0.1)",
                  background: "#ffffff",
                  position: "relative",
                  zIndex: 2,
                  textAlign: "center",
                  transition: "all .3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 20px 35px rgba(34,68,39,0.12)"
                  }
                }}
              >

                {/* ICON */}

                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    background:
                      index === activeIndex
                        ? "#4f7556"
                        : "#edf2ea",
                    color:
                      index === activeIndex
                        ? "#fff"
                        : "#4f7556",
                    mb: 2
                  }}
                >

                  <Icon sx={{ fontSize: 30 }} />

                </Box>

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#315741"
                  }}
                >
                  {step.period}
                </Typography>

                <Typography
                  sx={{
                    mt: .6,
                    fontWeight: 700,
                    color: "#173d2a"
                  }}
                >
                  {step.title}
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    fontSize: ".9rem",
                    color: "#5f7061",
                    lineHeight: 1.7
                  }}
                >
                  {step.description}
                </Typography>

              </Paper>

            </motion.div>

          )

        })}

      </Box>

    </Box>

  );

}