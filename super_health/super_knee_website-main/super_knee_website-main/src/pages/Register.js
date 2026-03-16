// import React, { useState } from "react";
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
// import { useParams, Link, useNavigate } from "react-router-dom";
// import api from "../api";

// const floatAnim = {
//   animate: {
//     y: [0, -10, 0],
//     transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
//   },
// };

// export default function Register() {
//   const { role } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     superKey: "",
//   });

//   const [errors, setErrors] = useState({});

//   const ADMIN_KEY = "ADMIN123";
//   const VENDOR_KEY = "VENDOR123";

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });

//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const validate = () => {
//     let temp = {};

//     if (!form.name) temp.name = "Full name required";

//     if (!form.email) temp.email = "Email required";
//     else if (!/\S+@\S+\.\S+/.test(form.email))
//       temp.email = "Invalid email format";

//     if (!form.password) temp.password = "Password required";
//     else if (form.password.length < 6)
//       temp.password = "Password must be at least 6 characters";

//     if (form.confirmPassword !== form.password)
//       temp.confirmPassword = "Passwords do not match";

//     if (role === "admin" && form.superKey !== ADMIN_KEY)
//       temp.superKey = "Invalid Admin Super Key";

//     if (role === "vendor" && form.superKey !== VENDOR_KEY)
//       temp.superKey = "Invalid Vendor Super Key";

//     setErrors(temp);

//     return Object.keys(temp).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     try {
//       await api.post(
//         "/auth/register",
//         {
//           name: form.name,
//           email: form.email,
//           password: form.password,
//           role: role || "user",
//         }
//       );

//       alert("Registration successful!");

//       navigate(`/login/${role}`);
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message || "Registration failed");
//     }
//   };

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
//                 src="https://media.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif"
//                 alt="Register"
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
//                 {role?.toUpperCase()} Registration
//               </Typography>

//               <Typography color="text.secondary" sx={{ mb: 3 }}>
//                 Create your account to continue.
//               </Typography>

//               <Box component="form" onSubmit={handleSubmit}>

//                 <TextField
//                   fullWidth
//                   label="Full Name"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   error={!!errors.name}
//                   helperText={errors.name}
//                   sx={{ mb: 2 }}
//                 />

//                 <TextField
//                   fullWidth
//                   label="Email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   error={!!errors.email}
//                   helperText={errors.email}
//                   sx={{ mb: 2 }}
//                 />

//                 <TextField
//                   fullWidth
//                   type="password"
//                   label="Password"
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   error={!!errors.password}
//                   helperText={errors.password}
//                   sx={{ mb: 2 }}
//                 />

//                 <TextField
//                   fullWidth
//                   type="password"
//                   label="Confirm Password"
//                   name="confirmPassword"
//                   value={form.confirmPassword}
//                   onChange={handleChange}
//                   error={!!errors.confirmPassword}
//                   helperText={errors.confirmPassword}
//                   sx={{ mb: 2 }}
//                 />

//                 {(role === "admin" || role === "vendor") && (
//                   <TextField
//                     fullWidth
//                     type="password"
//                     label="Super Key"
//                     name="superKey"
//                     value={form.superKey}
//                     onChange={handleChange}
//                     error={!!errors.superKey}
//                     helperText={errors.superKey}
//                     sx={{ mb: 2 }}
//                   />
//                 )}

//                 <motion.div whileHover={{ scale: 1.05 }}>
//                   <Button
//                     fullWidth
//                     type="submit"
//                     variant="contained"
//                     size="large"
//                     sx={{
//                       py: 1.5,
//                       borderRadius: "30px",
//                       background:
//                         "linear-gradient(135deg,#009688,#26c6da)",
//                       boxShadow: "0 10px 25px rgba(0,150,136,0.4)",
//                       fontSize: "1.1rem",
//                       mb: 2,
//                     }}
//                   >
//                     Register
//                   </Button>
//                 </motion.div>

//                 <Typography textAlign="center">
//                   Already have an account?{" "}
//                   <Button component={Link} to={`/login/${role}`} size="small">
//                     Login
//                   </Button>
//                 </Typography>

//               </Box>
//             </Grid>

//           </Grid>
//         </Paper>
//       </Container>
//     </Box>
//   );
// }




// import React, { useState } from "react";
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
// import { useParams, Link, useNavigate } from "react-router-dom";
// import api from "../api";

// const floatAnim = {
//   animate: {
//     y: [0, -10, 0],
//     transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
//   },
// };

// export default function Register() {
//   const { role } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     superKey: "",
//   });

//   const [errors, setErrors] = useState({});

//   const ADMIN_KEY = "ADMIN123";
//   const VENDOR_KEY = "VENDOR123";

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });

//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const validate = () => {
//     let temp = {};

//     if (!form.name) temp.name = "Full name required";

//     if (!form.email) temp.email = "Email required";
//     else if (!/\S+@\S+\.\S+/.test(form.email))
//       temp.email = "Invalid email format";

//     if (!form.password) temp.password = "Password required";
//     else if (form.password.length < 6)
//       temp.password = "Password must be at least 6 characters";

//     if (form.confirmPassword !== form.password)
//       temp.confirmPassword = "Passwords do not match";

//     if (role === "admin" && form.superKey !== ADMIN_KEY)
//       temp.superKey = "Invalid Admin Super Key";

//     if (role === "vendor" && form.superKey !== VENDOR_KEY)
//       temp.superKey = "Invalid Vendor Super Key";

//     setErrors(temp);

//     return Object.keys(temp).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     try {
//       await api.post("/auth/register", {
//         name: form.name,
//         email: form.email,
//         password: form.password,
//         role: role || "user",
//       });

//       alert("Registration successful!");

//       navigate(`/login/${role}`);
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message || "Registration failed");
//     }
//   };

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
//           }}
//         >
//           <Grid container>

//             {/* MOBILE HEADER */}

//             <Grid
//               item
//               xs={12}
//               sx={{
//                 display: { xs: "block", md: "none" },
//                 textAlign: "center",
//                 p: 3,
//                 background: "linear-gradient(180deg,#16a34a,#065f46)",
//                 color: "#fff"
//               }}
//             >
//               <motion.div variants={floatAnim} animate="animate">

//                 <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
//                   SUPER HEALTH
//                 </Typography>

//                 <Typography variant="body2">
//                   Welcome back! Login to continue your health journey.
//                 </Typography>

//               </motion.div>
//             </Grid>


//             {/* LEFT PANEL DESKTOP */}

//             <Grid
//               item
//               xs={12}
//               md={5}
//               sx={{
//                 display: { xs: "none", md: "flex" },
//                 alignItems: "center",
//                 justifyContent: "center",
//                 p: 4,
//                 background: "linear-gradient(180deg,#82faae,#059b49)",
//                 color: "#fff", width: "100%"
//               }}
//             >

//               <motion.div variants={floatAnim} animate="animate">

//                 <Typography
//                   variant="h4"
//                   fontWeight="bold"
//                   textAlign="center"
//                   sx={{ mb: 2 }}
//                 >
//                   SUPER HEALTH
//                 </Typography>

//                 <Typography textAlign="center">
//                   Register now and take the first step toward a healthier life.
//                 </Typography>

//               </motion.div>

//             </Grid>


//             {/* FORM */}

//             <Grid item xs={12} md={7} sx={{ p: 4 }}>

//               <Typography variant="h4" fontWeight="bold" gutterBottom>
//                 {role?.toUpperCase()} Registration
//               </Typography>

//               <Typography color="text.secondary" sx={{ mb: 3 }}>
//                 Create your account to continue.
//               </Typography>

//               <Box component="form" onSubmit={handleSubmit}>

//                 <TextField
//                   fullWidth
//                   label="Full Name"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   error={!!errors.name}
//                   helperText={errors.name}
//                   sx={{ mb: 2 }}
//                 />

//                 <TextField
//                   fullWidth
//                   label="Email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   error={!!errors.email}
//                   helperText={errors.email}
//                   sx={{ mb: 2 }}
//                 />

//                 <TextField
//                   fullWidth
//                   type="password"
//                   label="Password"
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   error={!!errors.password}
//                   helperText={errors.password}
//                   sx={{ mb: 2 }}
//                 />

//                 <TextField
//                   fullWidth
//                   type="password"
//                   label="Confirm Password"
//                   name="confirmPassword"
//                   value={form.confirmPassword}
//                   onChange={handleChange}
//                   error={!!errors.confirmPassword}
//                   helperText={errors.confirmPassword}
//                   sx={{ mb: 2 }}
//                 />

//                 {(role === "admin" || role === "vendor") && (
//                   <TextField
//                     fullWidth
//                     type="password"
//                     label="Super Key"
//                     name="superKey"
//                     value={form.superKey}
//                     onChange={handleChange}
//                     error={!!errors.superKey}
//                     helperText={errors.superKey}
//                     sx={{ mb: 2 }}
//                   />
//                 )}

//                 <motion.div whileHover={{ scale: 1.05 }}>
//                   <Button
//                     fullWidth
//                     type="submit"
//                     variant="contained"
//                     size="large"
//                     sx={{
//                       py: 1.5,
//                       borderRadius: "30px",
//                       background:
//                         "linear-gradient(135deg, #009688, #26c6da)",
//                       boxShadow: "0 10px 25px rgba(0,150,136,0.4)",
//                       fontSize: "1.1rem",
//                       mb: 2, 
//                     }}
//                   >
//                     Register
//                   </Button>
//                 </motion.div>

//                 <Typography textAlign="center">
//                   Already have an account?{" "}
//                   <Button component={Link} to={`/login/${role}`} size="small">
//                     Login
//                   </Button>
//                 </Typography>

//               </Box>
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
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api";



export default function Register() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    superKey: "",
  });

  const [errors, setErrors] = useState({});

  const ADMIN_KEY = "ADMIN123";
  const VENDOR_KEY = "VENDOR123";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let temp = {};

    if (!form.name) temp.name = "Full name required";

    if (!form.email) temp.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      temp.email = "Invalid email format";

    if (!form.password) temp.password = "Password required";
    else if (form.password.length < 6)
      temp.password = "Password must be at least 6 characters";

    if (form.confirmPassword !== form.password)
      temp.confirmPassword = "Passwords do not match";

    if (role === "admin" && form.superKey !== ADMIN_KEY)
      temp.superKey = "Invalid Admin Super Key";

    if (role === "vendor" && form.superKey !== VENDOR_KEY)
      temp.superKey = "Invalid Vendor Super Key";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      /* PREVIOUS CODE:
      await api.post(
        "/auth/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          role: role || "user",
        }
      );

      alert("Registration successful!");

      navigate(`/login/${role}`);
      */

      // NEW CODE: Using role-based endpoint
      const endpoint = (role === "admin" || role === "vendor") 
        ? "/auth/admin/register" 
        : "/auth/register";

      await api.post(
        endpoint,
        {
          name: form.name,
          email: form.email,
          password: form.password,
          role: role || "user",
        }
      );

      alert("Registration successful!");
      navigate(`/login/${role}`);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

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
          }}
        >
          <Grid container>

           

            {/* FORM */}
            <Grid item xs={12} md={7} sx={{ p: 4 }}>

              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {role?.toUpperCase()} Registration
              </Typography>

              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Create your account to continue.
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>

                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  sx={{ mb: 2 }}
                />

                {(role === "admin" || role === "vendor") && (
                  <TextField
                    fullWidth
                    type="password"
                    label="Super Key"
                    name="superKey"
                    value={form.superKey}
                    onChange={handleChange}
                    error={!!errors.superKey}
                    helperText={errors.superKey}
                    sx={{ mb: 2 }}
                  />
                )}

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    fullWidth
                    type="submit"
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
                    Register
                  </Button>
                </motion.div>

                <Typography textAlign="center">
                  Already have an account?{" "}
                  <Button component={Link} to={`/login/${role}`} size="small">
                    Login
                  </Button>
                </Typography>

              </Box>
            </Grid>

          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}