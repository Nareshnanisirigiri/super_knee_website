// import React from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   TextField,
//   Button,
//   Paper,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";



// export default function ForgotPassword() {
//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         py: 10,
//         background: "linear-gradient(135deg,#e0f7fa,#ffffff)",
//         display: "flex",
//         alignItems: "center",
//       }}
//     >
//       <Container maxWidth="md">
//         <Paper
//           elevation={6}
//           sx={{
//             borderRadius: 4,
//             overflow: "hidden",
//             background: "rgba(255,255,255,0.9)",
//             mt: -15
//           }}
//         >
//           <Grid container>

//             {/* LEFT GIF */}
//             {/* <Grid
//               item
//               xs={12}
//               md={5}
//               sx={{
//                 bgcolor: "#e0f2f1",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 p: 2,
//               }}
//             >
//               <motion.img
//                 variants={floatAnim}
//                 animate="animate"
//                 src="https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif"
//                 alt="Forgot Password"
//                 style={{
//                   width: "100%",
//                   maxWidth: "250px",
//                   borderRadius: "16px",
//                 }}
//               />
//             </Grid> */}

//             {/* FORM */}
//             <Grid item xs={12} md={7} sx={{ p: 4 }}>

//               <Typography variant="h4" fontWeight="bold" gutterBottom>
//                 Forgot Password
//               </Typography>

//               <Typography color="text.secondary" sx={{ mb: 3 }}>
//                 Enter your email address and we will send you a password reset link.
//               </Typography>

//               <TextField
//                 fullWidth
//                 label="Email Address"
//                 sx={{ mb: 3 }}
//               />

//               <motion.div whileHover={{ scale: 1.05 }}>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   size="large"
//                   sx={{
//                     py: 1.5,
//                     borderRadius: "30px",
//                     background:
//                       "linear-gradient(135deg,#009688,#26c6da)",
//                     boxShadow: "0 10px 25px rgba(0,150,136,0.4)",
//                     fontSize: "1.1rem",
//                     mb: 2,
//                   }}
//                 >
//                   Send Reset Link
//                 </Button>
//               </motion.div>

//               <Button
//                 component={Link}
//                 to="/login/user"
//                 size="small"
//               >
//                 Back to Login
//               </Button>

//             </Grid>

//           </Grid>
//         </Paper>
//       </Container>
//     </Box>
//   );
// }




import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }
    try {
      await api.post("/auth/forgot-password", { email });
      alert("Password reset link sent to your email!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send reset link");
    }
  };
// -----------------------
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 10,
        background: "linear-gradient(135deg,#e0f7fa,#ffffff)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: "rgba(255,255,255,0.9)",
            mt: -15
          }}
        >
          <Grid container>

            {/*  */}

            {/* FORM */}
            <Grid item xs={12} md={7} sx={{ p: 4 }}>

              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Forgot Password
              </Typography>

              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Enter your email address and we will send you a password reset link.
              </Typography>

              {/* --- PREVIOUS CODE ---
              <TextField
                fullWidth
                label="Email Address"
                sx={{ mb: 3 }}
              />

              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    py: 1.5,
                    borderRadius: "30px",
                    background:
                      "linear-gradient(135deg,#009688,#26c6da)",
                    boxShadow: "0 10px 25px rgba(0,150,136,0.4)",
                    fontSize: "1.1rem",
                    mb: 2,
                  }}
                >
                  Send Reset Link
                </Button>
              </motion.div>

              <Button
                component={Link}
                to="/login/user"
                size="small"
              >
                Back to Login
              </Button>
              ----------------------- */}

              {/* --- UPDATED CODE --- */}
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 3 }}
                />

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      py: 1.5,
                      borderRadius: "30px",
                      background:
                        "linear-gradient(135deg,#009688,#26c6da)",
                      boxShadow: "0 10px 25px rgba(0,150,136,0.4)",
                      fontSize: "1.1rem",
                      mb: 2,
                    }}
                  >
                    Send Reset Link
                  </Button>
                </motion.div>
              </Box>

              <Button
                component={Link}
                to="/login/user"
                size="small"
              >
                Back to Login
              </Button>
              {/* ----------------------- */}

            </Grid>

          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}