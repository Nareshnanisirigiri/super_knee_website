import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { motion } from "framer-motion";

export default function WelcomeNotification() {

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {

    const showNotification = (event) => {
      const loggedUser = event.detail;
      setUser(loggedUser);
      setOpen(true);
    };

    window.addEventListener("showWelcomeNotification", showNotification);

    return () => {
      window.removeEventListener("showWelcomeNotification", showNotification);
    };

  }, []);

  if (!user) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >

      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >

        <Alert
          severity="success"
          sx={{
            fontWeight: "bold",
            borderRadius: 3,
            fontSize: "15px"
          }}
        >
          Welcome to Super Health 👋 <br/>

          {user.name} ({user.role}) <br/>

          Your Health — Our Support 💚

        </Alert>

      </motion.div>

    </Snackbar>
  );
}