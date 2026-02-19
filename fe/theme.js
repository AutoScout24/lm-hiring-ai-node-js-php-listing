"use client";

import { createTheme } from "@mui/material/styles";

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#1a4b8c",
      light: "#3b6db4",
      dark: "#0d2e59",
      contrastText: "#fff",
    },
    secondary: {
      main: "#2c3e50",
      light: "#4c5e70",
      dark: "#1c2e40",
      contrastText: "#fff",
    },
    error: {
      main: "#e74c3c",
    },
    warning: {
      main: "#f39c12",
    },
    info: {
      main: "#3498db",
    },
    success: {
      main: "#2ecc71",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#303030",
      secondary: "#707070",
    },
    divider: "rgba(0, 0, 0, 0.08)",
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 4px 8px rgba(0, 0, 0, 0.05)",
    "0px 6px 12px rgba(0, 0, 0, 0.05)",
    "0px 8px 16px rgba(0, 0, 0, 0.05)",
    "0px 10px 20px rgba(0, 0, 0, 0.05)",
    "0px 12px 24px rgba(0, 0, 0, 0.05)",
    "0px 14px 28px rgba(0, 0, 0, 0.05)",
    "0px 16px 32px rgba(0, 0, 0, 0.05)",
    "0px 18px 36px rgba(0, 0, 0, 0.05)",
    "0px 20px 40px rgba(0, 0, 0, 0.05)",
    "0px 22px 44px rgba(0, 0, 0, 0.05)",
    "0px 24px 48px rgba(0, 0, 0, 0.05)",
    "0px 26px 52px rgba(0, 0, 0, 0.05)",
    "0px 28px 56px rgba(0, 0, 0, 0.05)",
    "0px 30px 60px rgba(0, 0, 0, 0.05)",
    "0px 32px 64px rgba(0, 0, 0, 0.05)",
    "0px 34px 68px rgba(0, 0, 0, 0.05)",
    "0px 36px 72px rgba(0, 0, 0, 0.05)",
    "0px 38px 76px rgba(0, 0, 0, 0.05)",
    "0px 40px 80px rgba(0, 0, 0, 0.05)",
    "0px 42px 84px rgba(0, 0, 0, 0.05)",
    "0px 44px 88px rgba(0, 0, 0, 0.05)",
    "0px 46px 92px rgba(0, 0, 0, 0.05)",
    "0px 48px 96px rgba(0, 0, 0, 0.05)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
