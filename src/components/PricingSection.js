import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Chip
} from "@mui/material";
import { motion } from "framer-motion";

const plans = [
  {
    title: "Single Pack",
    price: "₹499",
    description: "100g Relivex Pain Relief Powder",
    highlight: false
  },
  {
    title: "Combo Pack (Best Seller)",
    price: "₹1199",
    description: "3 x 100g Packs (Save 20%)",
    highlight: true
  }
];

export default function PricingSection() {
  return (
    <Box
      sx={{
        py: 10,
        background: "linear-gradient(to right, #f7f8fa, #054b13)"
      }}
    >
      <Container>
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 6,
            fontWeight: "bold",
            fontSize: { xs: "1.8rem", md: "2.5rem" }
          }}
        >
          Choose Your Pack
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item xs={12} sm={8} md={5} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    backgroundColor: plan.highlight
                      ? "#0f913e"
                      : "#0f172a",
                    color: plan.highlight ? "#000" : "#fff",
                    borderRadius: 4,
                    p: 4,
                    textAlign: "center",
                    position: "relative",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 0 25px #22c55e"
                    }
                  }}
                >
                  {plan.highlight && (
                    <Chip
                      label="Best Value"
                      sx={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        backgroundColor: "#000",
                        color: "#22c55e"
                      }}
                    />
                  )}

                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {plan.title}
                    </Typography>

                    <Typography
                      variant="h3"
                      sx={{
                        mb: 2,
                        fontWeight: "bold"
                      }}
                    >
                      {plan.price}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{ mb: 3 }}
                    >
                      {plan.description}
                    </Typography>

                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        borderRadius: "30px",
                        px: 5,
                        backgroundColor:  "black"
                          ? "#000"
                          : "#010101",
                        color: plan.highlight ? "#0d0d0d" : "#000",
                        "&:hover": {
                          backgroundColor: "#060606"
                        }
                      }}
                    >
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}