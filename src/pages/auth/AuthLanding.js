import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment
} from "@mui/material";

import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

import api from "../../api";

const floatAnim = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function AuthLanding() {

  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("user");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const roles = ["user", "admin", "vendor"];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = { email: form.email, password: form.password };

    try {

      const res = await api.post("/auth/login", payload);

      const user = res.data.user;

      if (user.role !== selectedRole) {
        alert(`You are registered as ${user.role}. Please login using correct role.`);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      window.dispatchEvent(new Event("userLogin"));

      alert("Login successful");

      if (user.role === "admin") {
        navigate("/admin", { state: { user } });
      }
      else if (user.role === "vendor") {
        navigate("/vendor-dashboard", { state: { user } });
      }
      else {
        navigate("/", { state: { user } });
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#065f46,#16a34a,#34d399)",
        py: 6
      }}
    >

      <Container maxWidth="md">

        <Paper
          elevation={10}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
            backdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 30px 60px rgba(0,0,0,0.2)"
          }}
        >

          <Grid container>

            {/* MOBILE HEADER */}

            <Grid
              item
              xs={12}
              sx={{
                display: { xs: "block", md: "none" },
                textAlign: "center",
                p: 3,
                background: "linear-gradient(180deg,#16a34a,#065f46)",
                color: "#fff"
              }}
            >

              <motion.div variants={floatAnim} animate="animate">

                <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                  SUPER HEALTH
                </Typography>

                <Typography variant="body2">
                  Welcome back! Login to continue your health journey.
                </Typography>

              </motion.div>

            </Grid>


            {/* LEFT PANEL (Desktop Only) */}

            <Grid
              item
              xs={12}
              md={5}
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                p: 4,
                background: "linear-gradient(180deg, #82faae, #059b49)",
                color: "#fff", width: "100%"
              }}
            >

              <motion.div variants={floatAnim} animate="animate">

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textAlign="center"
                  sx={{ mb: 2, width: "100%",  }}
                >
                  SUPER HEALTH
                </Typography>

                <Typography textAlign="center">
                  Welcome back! Login to continue your health journey.
                </Typography>

              </motion.div>

            </Grid>


            {/* RIGHT FORM */}

            <Grid item xs={12} md={7} sx={{ p: { xs: 3, md: 5 } }}>

              <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                Login
              </Typography>

              <Typography color="text.secondary" sx={{ mb: 4 }}>
                Choose your role and login to continue.
              </Typography>


              {/* ROLE BUTTONS */}

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  mb: 4
                }}
              >

                {roles.map((role) => (

                  <motion.div
                    key={role}
                    whileHover={{ scale: 1.05 }}
                  >

                    <Button
                      variant={selectedRole === role ? "contained" : "outlined"}
                      onClick={() => setSelectedRole(role)}
                      sx={{
                        borderRadius: "25px",
                        textTransform: "capitalize",
                        px: 3,
                        background:
                          selectedRole === role
                            ? "linear-gradient(135deg,#16a34a,#22c55e)"
                            : "",
                        color: selectedRole === role ? "#fff" : "#065f46",
                        borderColor: "#16a34a",
                        fontWeight: "bold"
                      }}
                    >
                      {role}
                    </Button>

                  </motion.div>

                ))}

              </Box>


              {/* LOGIN FORM */}

              <Box component="form" onSubmit={handleLogin}>

                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="success" />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  sx={{ mb: 4 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="success" />
                      </InputAdornment>
                    )
                  }}
                />

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      py: 1.5,
                      borderRadius: "30px",
                      fontSize: "1.1rem",
                      background:
                        "linear-gradient(135deg,#16a34a,#4ade80)",
                      boxShadow:
                        "0 15px 30px rgba(22,163,74,0.5)"
                    }}
                  >
                    Login
                  </Button>

                </motion.div>


                {/* LINKS */}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3
                  }}
                >

                  <Button
                    component={Link}
                    to={`/register/${selectedRole}`}
                    size="small"
                    sx={{ color: "#16a34a" }}
                  >
                    Register
                  </Button>

                  <Button
                    component={Link}
                    to="/forgot-password"
                    size="small"
                    sx={{ color: "#16a34a" }}
                  >
                    Forgot Password
                  </Button>

                </Box>

              </Box>

            </Grid>

          </Grid>

        </Paper>

      </Container>

    </Box>
  );
}