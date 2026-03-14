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

const floatAnim = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Login() {

  const { role } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      const user = res.data.user;

      if (role && user.role !== role) {
        alert(`You are registered as ${user.role}. Please login using correct role.`);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      window.dispatchEvent(new Event("userLogin"));

      alert("Login successful");

      if (user.role === "admin") {
        navigate("/admin-dashboard", { state: { user } });
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


            {/* LEFT PANEL DESKTOP */}

            <Grid
              item
              xs={12}
              md={5}
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                p: 4,
                background: "linear-gradient(180deg,#82faae,#059b49)",
                color: "#fff",
                width: "100%"
              }}
            >

              <motion.div variants={floatAnim} animate="animate">

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textAlign="center"
                  sx={{ mb: 2 }}
                >
                  SUPER HEALTH
                </Typography>

                <Typography textAlign="center">
                  Welcome back! Login to continue your health journey.
                </Typography>

              </motion.div>

            </Grid>


            {/* LOGIN FORM */}

            <Grid item xs={12} md={7} sx={{ p: 4 }}>

              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {role?.toUpperCase()} Login
              </Typography>

              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Welcome back! Please login to continue.
              </Typography>

              <Box component="form" onSubmit={handleLogin}>

                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
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
                      background: "linear-gradient(135deg,#009688,#26c6da)",
                      boxShadow: "0 10px 25px rgba(0,150,136,0.4)",
                      fontSize: "1.1rem",
                      mb: 2,
                    }}
                  >
                    Login
                  </Button>
                </motion.div>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    component={Link}
                    to={`/register/${role}`}
                    size="small"
                  >
                    Register
                  </Button>

                  <Button
                    component={Link}
                    to="/forgot-password"
                    size="small"
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