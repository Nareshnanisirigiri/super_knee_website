import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
  Stack
} from "@mui/material";


import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import productBox from "../../assets/product-box.jpeg";

/* -----------------------------
   TABLE DATA
------------------------------ */

const rows = [
  {
    feature: "Curcumin Bioavailability",
    super: "48× higher (CurQlife® patented)",
    turmeric: "Very poor (<2% absorbed)",
    glucosamine: "Not included",
    boswellia: "Not included",
    collagen: "Not included"
  },
  {
    feature: "Boswellia Quality",
    super: "Boswellin® Super (30% AKBA)",
    turmeric: "Not included",
    glucosamine: "Not included",
    boswellia: "Low AKBA (5-10%)",
    collagen: "Not included"
  },
  {
    feature: "Collagen Type",
    super: "UC-II (immune modulation)",
    turmeric: "Not included",
    glucosamine: "Sometimes added",
    boswellia: "Not included",
    collagen: "Hydrolyzed (no immune effect)"
  },
  {
    feature: "Ginger Extract",
    super: "yes",
    turmeric: "no",
    glucosamine: "no",
    boswellia: "no",
    collagen: "no"
  },
  {
    feature: "Piperine Enhancer",
    super: "yes",
    turmeric: "Sometimes",
    glucosamine: "no",
    boswellia: "no",
    collagen: "no"
  },
  {
    feature: "Number of Pathways Targeted",
    super: "5",
    turmeric: "1",
    glucosamine: "1-2",
    boswellia: "1",
    collagen: "0"
  },
  {
    feature: "Patented Ingredients",
    super: "2 (CurQlife® + Boswellin® Super)",
    turmeric: "0",
    glucosamine: "0",
    boswellia: "0",
    collagen: "0"
  },
  {
    feature: "Clinical Evidence",
    super: "Multiple RCTs",
    turmeric: "Limited",
    glucosamine: "Mixed results",
    boswellia: "Limited",
    collagen: "Different mechanism"
  },
  {
    feature: "Form",
    super: "Tasty orange drink",
    turmeric: "Capsule/tablet",
    glucosamine: "Tablet",
    boswellia: "Tablet",
    collagen: "Powder"
  },
  {
    feature: "Sugar Free",
    super: "yes",
    turmeric: "Varies",
    glucosamine: "Varies",
    boswellia: "Varies",
    collagen: "Varies"
  }
];

/* -----------------------------
   ICON HELPER
------------------------------ */

const renderValue = (value) => {
  if (value === "yes")
    return <CheckCircleRoundedIcon sx={{ color: "#2e7d32" }} />;

  if (value === "no")
    return <CancelRoundedIcon sx={{ color: "#c62828" }} />;

  return value;
};

/* -----------------------------
   COMPONENT
------------------------------ */

export default function SupplementComparison() {
  return (
    <Container maxWidth="xl" sx={{ mt: { xs: 7, md: 10 } }}>

      {/* TITLE */}

      <Typography
        sx={{
          fontSize: { xs: "2rem", md: "3.6rem" },
          color: "#0b1d13"
        }}
      >
        Why Super Knee Is Different
      </Typography>

      <Typography
        sx={{
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          fontSize: { xs: "1.7rem", md: "2.4rem" },
          color: "#4f7556"
        }}
      >
        Compared To Common Joint Supplements
      </Typography>


      {/* GRID */}

      <Box
        sx={{
          mt: 5,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "380px 1fr" },
          gap: 4
        }}
      >

        {/* LEFT PRODUCT IMAGE */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 6,
            border: "1px solid rgba(27,94,32,0.12)",
            background: "#f7faf6",
            textAlign: "center"
          }}
        >
          <Box
            component="img"
            src={productBox}
            sx={{
              width: "100%",
              maxWidth: 260,
              height: 320,
              objectFit: "contain"
            }}
          />

          <Typography
            sx={{
              mt: 2,
              fontWeight: 700,
              color: "#214529"
            }}
          >
            Super Knee Sachets
          </Typography>

          <Typography sx={{ color: "#6b786d", fontSize: ".9rem" }}>
            Advanced 5-ingredient joint support formula
          </Typography>
        </Paper>


        {/* DESKTOP TABLE */}

        <Paper
          elevation={0}
          sx={{
            display: { xs: "none", md: "block" },
            borderRadius: 6,
            overflow: "hidden",
            border: "1px solid rgba(27,94,32,0.12)"
          }}
        >
          <Table>

            <TableHead>
              <TableRow sx={{ background: "#eef5ed" }}>
                <TableCell sx={{ fontWeight: 700 }}>Feature</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1b5e20" }}>
                  Super Knee
                </TableCell>
                <TableCell>Turmeric Capsule</TableCell>
                <TableCell>Glucosamine</TableCell>
                <TableCell>Boswellia</TableCell>
                <TableCell>Collagen</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.feature}>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {row.feature}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#1b5e20" }}>
                    {renderValue(row.super)}
                  </TableCell>
                  <TableCell>{renderValue(row.turmeric)}</TableCell>
                  <TableCell>{renderValue(row.glucosamine)}</TableCell>
                  <TableCell>{renderValue(row.boswellia)}</TableCell>
                  <TableCell>{renderValue(row.collagen)}</TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </Paper>


        {/* MOBILE COMPARISON CARDS */}

        <Box sx={{ display: { xs: "block", md: "none" } }}>

          <Stack spacing={2}>

            {rows.map((row) => (

              <Paper
                key={row.feature}
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 4,
                  border: "1px solid rgba(27,94,32,0.12)"
                }}
              >

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#214529",
                    mb: 1
                  }}
                >
                  {row.feature}
                </Typography>

                <Stack spacing={1}>

                  <Typography>
                    <b>Super Knee:</b> {renderValue(row.super)}
                  </Typography>

                  <Typography>
                    <b>Turmeric Capsule:</b> {renderValue(row.turmeric)}
                  </Typography>

                  <Typography>
                    <b>Glucosamine:</b> {renderValue(row.glucosamine)}
                  </Typography>

                  <Typography>
                    <b>Boswellia:</b> {renderValue(row.boswellia)}
                  </Typography>

                  <Typography>
                    <b>Collagen:</b> {renderValue(row.collagen)}
                  </Typography>

                </Stack>

              </Paper>

            ))}

          </Stack>

        </Box>

      </Box>

    </Container>
  );
}