import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#48c83a",
      light: "#6ae06c",
      dark: "#2d9a2b",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#1CB5B0",
      light: "#6EDAD6",
      dark: "#138F8B",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FAFAFA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1F2933",
      secondary: "#6B7280",
    },
  },

  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",

    h1: { fontSize: "3.2rem", fontWeight: 700 },
    h2: { fontSize: "2.6rem", fontWeight: 700 },
    h3: { fontSize: "2.1rem", fontWeight: 600 },
    h4: { fontSize: "1.7rem", fontWeight: 600 },
    h5: { fontSize: "1.3rem", fontWeight: 500 },

    body1: { fontSize: "1rem", lineHeight: 1.7 },
    body2: { fontSize: "0.9rem", lineHeight: 1.6 },

    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.3px",
    },
  },

  shape: {
    borderRadius: 3,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "8px 24px",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #3cc83a, #80e06a)",
          boxShadow: "0px 8px 22px rgba(58, 200, 58, 0.35)",
          "&:hover": {
            boxShadow: "0px 12px 28px rgba(75, 200, 58, 0.45)",
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #4fc83a, #1CB5B0)",
          color: "#FFFFFF",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "linear-gradient(180deg, #6ec83a, #1CB5B0)",
          color: "#FFFFFF",
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          boxShadow: "0px 14px 32px rgba(0,0,0,0.07)",
        },
      },
    },
  },
});

export default theme;