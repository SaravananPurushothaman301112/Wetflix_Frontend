import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: "#f8f8f8", // Light gray background
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#e3f2fd", // Light blue hover effect
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#1976d2", // Blue header background
          color: "white",
          fontWeight: "bold",
        },
        body: {
          fontSize: "16px",
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: "none", // Remove default shadow
          border: "1px solid #ddd", // Add border
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#1976d2", // Apply background to entire thead
        },
      },
    },
  },
});

export default theme;
