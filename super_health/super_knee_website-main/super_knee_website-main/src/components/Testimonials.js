import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
  Rating
} from "@mui/material";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Ramesh Kumar",
    review:
      "My back pain reduced in just 3 days. Amazing product! Highly recommended.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    review:
      "I use Relivex after long office hours. Neck pain is almost gone!",
    rating: 5
  },
  {
    name: "Arjun Reddy",
    review:
      "Very effective and natural. I feel relief within minutes.",
    rating: 4
  },
  {
    name: "Sneha Patel",
    review:
      "Best pain relief solution I’ve used. Works better than tablets!",
    rating: 5
  },
  {
    name: "Vikram Singh",
    review:
      "Instant soothing effect. Perfect for gym recovery and muscle strain.",
    rating: 4
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        py: 12,
        background:
          "linear-gradient(135deg, #f7f7f8)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Animated glowing background */}
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 70%)",
          borderRadius: "50%",
          top: -100,
          right: -100,
          animation: "float 6s ease-in-out infinite"
        }}
      />

      <Container>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              mb: 8,
              fontWeight: 700,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              background:
                "linear-gradient(90deg,#22c55e,#38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            What Our Customers Say
          </Typography>
        </motion.div>

        {/* Carousel */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            minHeight: 320
          }}
        >
          {reviews.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: i === index ? 1 : 0,
                scale: i === index ? 1 : 0.8,
                position: i === index ? "relative" : "absolute"
              }}
              transition={{ duration: 0.6 }}
              style={{
                width: "100%",
                maxWidth: 420
              }}
            >
              {i === index && (
                <Card
                  sx={{
                    backdropFilter: "blur(20px)",
                    background:
                      "rgba(255,255,255,0.05)",
                    borderRadius: 5,
                    p: 4,
                    textAlign: "center",
                    boxShadow:
                      "0 20px 60px rgba(0,0,0,0.5)",
                    transition: "0.4s",
                    "&:hover": {
                      transform: "translateY(-12px) scale(1.02)",
                      boxShadow:
                        "0 0 30px rgba(34,197,94,0.6)"
                    }
                  }}
                >
                  <CardContent>
                    {/* Avatar */}
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        margin: "0 auto",
                        mb: 2,
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        background:
                          "linear-gradient(135deg,#22c55e,#38bdf8)"
                      }}
                    >
                      {item.name.charAt(0)}
                    </Avatar>

                    {/* Name */}
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: "#308c05"
                      }}
                    >
                      {item.name}
                    </Typography>

                    {/* Rating */}
                    <Rating
                      value={item.rating}
                      readOnly
                      sx={{
                        mb: 2,
                        "& .MuiRating-iconFilled": {
                          color: "#22c55e"
                        }
                      }}
                    />

                    {/* Review */}
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#0f1010",
                        fontSize: "1rem",
                        lineHeight: 1.6
                      }}
                    >
                      “{item.review}”
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          ))}
        </Box>

        {/* Dots Indicator */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            gap: 1
          }}
        >
          {reviews.map((_, i) => (
            <Box
              key={i}
              onClick={() => setIndex(i)}
              sx={{
                width: index === i ? 20 : 10,
                height: 10,
                borderRadius: 5,
                cursor: "pointer",
                transition: "0.3s",
                background:
                  index === i
                    ? "#22c55e"
                    : "#64748b"
              }}
            />
          ))}
        </Box>
      </Container>

      {/* Floating animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(30px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </Box>
  );
}