import { createTheme } from "@mui/material/styles";
export const theme = createTheme({
  spacing: 4,
  palette: {
    background: {
      main: "#ffffff",
    },
    background1: {
      main: "#f5f5fa",
    },
    white2: {
      main: "#eeeeee",
    },
    background2: {
      main: "#fafafa",
    },
    white1: {
      main: "#ebebf0",
    },

    first: {
      main: "#38383D",
    },
    second: {
      main: "#0B74E5",
    },
    third: {
      main: "#808089",
    },
    black: {
      main: "#000000",
    },
    back1: {
      main: "#242424",
    },
    black2: {
      main: "#333333",
    },
    black3: { main: "#27272A" },
    badge: {
      main: "#ff424f",
    },
    blue: {
      main: "#0A68FF",
    },
    blue1: {
      main: "#0B74E5",
    },
    blue2: { main: "#0D5CB6" },
    warning: {
      main: "#fdd835",
    },
    warning1: {
      main: "#dfbd15",
    },
    gray: { main: "#787878" },
    gray1: { main: "#EFEFEF" },
    gray2: { main: "#4A4A4A" },
    gray3: { main: "#9b9b9b" },
    red1: { main: "#ff424e" },
    red2: { main: "#ff3945" },
    red3: { main: "#d32f2f" },

    green: { main: "#00AB56" },
  },
  typography: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
    },
    h2: {
      fontSize: "1.25rem",
    },
    h4: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: "20px",
    },
    h3: {
      fontWeight: 300,
      fontSize: "0.75rem",
    },
    price: {
      fontWeight: 500,
      fontSize: "2rem",
    },
  },
});
