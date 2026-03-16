import {
  Container,
  Typography,
  Box,
  Avatar,
  Rating,
  IconButton,
  Chip,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import VerifiedIcon from "@mui/icons-material/Verified";

const MotionBox = motion(Box);

const reviews = [
  {
    name: "Rajesh Kumar",
    profession: "IT Professional, 52",
    rating: 5,
    review:
      "After 6 weeks of daily use, my knee stiffness reduced significantly. I can now climb stairs without discomfort. This is far better than the glucosamine tablets I tried before.",
  },
  {
    name: "Anita Sharma",
    profession: "Yoga Practitioner, 48",
    rating: 5,
    review:
      "Morning stiffness improved within a month. I feel more flexibility in my knees during practice. The sachet format is easy and tastes good too.",
  },
  {
    name: "Vikram Reddy",
    profession: "Business Owner, 60",
    rating: 4,
    review:
      "My orthopedic doctor suggested trying a nutraceutical. After 2 months, my walking distance improved and pain reduced noticeably.",
  },
  {
    name: "Sneha Patel",
    profession: "School Teacher, 55",
    rating: 5,
    review:
      "I had early-stage knee osteoarthritis. After consistent use for 3 months, my pain while standing for long hours has reduced a lot.",
  },
  {
    name: "Arjun Mehta",
    profession: "Fitness Enthusiast, 45",
    rating: 5,
    review:
      "Super Knee feels more advanced than regular turmeric supplements. My knee discomfort during workouts has reduced dramatically.",
  },
  {
    name: "Priya Nair",
    profession: "General Physician, 50",
    rating: 5,
    review:
      "I appreciate the inclusion of UC-II and standardized Boswellia. Patients looking for non-NSAID support have responded well.",
  },
  {
    name: "Suresh Yadav",
    profession: "Driver, 58",
    rating: 4,
    review:
      "Long driving hours used to worsen my knee pain. After 2 months of use, the pain is much more manageable.",
  },
  {
    name: "Kavitha Rao",
    profession: "Homemaker, 62",
    rating: 5,
    review:
      "Getting up from sitting cross-legged was difficult earlier. Now it feels much easier. Very satisfied with the results.",
  },
];

export default function Reviews() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [index, setIndex] = useState(0);
  const [ratingValue, setRatingValue] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animated rating counter
  useEffect(() => {
    let start = 0;
    const end = 4.8;
    const duration = 2000;
    const incrementTime = 20;
    const step = (end / duration) * incrementTime;

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setRatingValue(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? reviews.length - 1 : prev - 1
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f4f6f8, #e8f5e9, #fff3e0)",
        display: "flex",
        alignItems: "center",
        py: 10,
        overflowX: 'hidden'
      }}
    >
      <Container maxWidth="md">

        {/* HEADER */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant={isMobile ? "h5" : "h3"}
            fontWeight="bold"
            color="#1b5e20"
            sx={{ fontSize: { xs: '1.5rem', sm: '2.5rem' } }}
          >
            Trusted by Thousands Across India
          </Typography>

          <Typography
            variant="h2"
            fontWeight="bold"
            mt={3}
          >
            {ratingValue.toFixed(1)} / 5
          </Typography>

          <Rating
            value={4.8}
            precision={0.1}
            readOnly
            size="large"
            sx={{ mt: 1, "& .MuiRating-iconFilled": { color: "#ff9800" } }}
          />

          <Box mt={2}>
            <Chip
              icon={<VerifiedIcon />}
              label="2,000+ Verified Customers"
              color="success"
              variant="outlined"
            />
          </Box>

          <Typography color="text.secondary" mt={2}>
            Real experiences from adults managing knee pain and stiffness
          </Typography>
        </Box>

        {/* CAROUSEL */}
        <Box
          sx={{
            position: "relative",
            minHeight: { xs: 450, sm: 380, md: 300 },
          }}
        >
          <AnimatePresence mode="wait">
            <MotionBox
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -40 }}
              transition={{ duration: 0.6 }}
              sx={{
                background: "white",
                borderRadius: 6,
                padding: { xs: 3, md: 5 },
                boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <FormatQuoteIcon
                sx={{ fontSize: 40, mb: 2, color: "#ff6a00" }}
              />

              <Typography variant="h6" mb={3}>
                {reviews[index].review}
              </Typography>

              <Rating
                value={reviews[index].rating}
                readOnly
                sx={{
                  "& .MuiRating-iconFilled": { color: "#ff9800" },
                }}
              />

              <Box
                mt={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Avatar
                  sx={{
                    bgcolor: "#ff9800",
                    color: "white",
                    mr: 2,
                  }}
                >
                  {reviews[index].name.charAt(0)}
                </Avatar>

                <Box textAlign="left">
                  <Typography fontWeight="bold">
                    {reviews[index].name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {reviews[index].profession}
                  </Typography>
                </Box>
              </Box>
            </MotionBox>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <IconButton
            onClick={prevSlide}
            sx={{
              position: "absolute",
              top: "50%",
              left: -40,
              transform: "translateY(-50%)",
              display: { xs: 'none', md: 'inline-flex' },
              color:"green"
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <IconButton
            onClick={nextSlide}
            sx={{
              position: "absolute",
              top: "50%",
              right: -40,
              transform: "translateY(-50%)",
              display: { xs: 'none', md: 'inline-flex' },
             color:"green"

            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        {/* FOOTER NOTE */}
        <Box textAlign="center" mt={8}>
          <Typography variant="body2" color="text.secondary">
            *Results may vary. Super Knee is a nutraceutical supplement and
            not intended to diagnose, treat, cure, or prevent any disease.
            Consistent use for 60–90 days is recommended for optimal results.
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}