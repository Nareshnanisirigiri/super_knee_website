import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";

export default function VendorDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box sx={{ p: 4 }}>

      <Typography variant="h4" fontWeight="bold" mb={3}>
        Vendor Dashboard
      </Typography>

      <Typography mb={4}>
        Welcome Vendor : {user?.name}
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p:3 }}>
            <Typography variant="h6">My Products</Typography>
            <Typography variant="h4">15</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p:3 }}>
            <Typography variant="h6">Orders</Typography>
            <Typography variant="h4">8</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p:3 }}>
            <Typography variant="h6">Revenue</Typography>
            <Typography variant="h4">₹24,000</Typography>
          </Paper>
        </Grid>

      </Grid>

      <Button
        variant="contained"
        sx={{ mt:4 }}
      >
        Add Product
      </Button>

    </Box>
  );
}
