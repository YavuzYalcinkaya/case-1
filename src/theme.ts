import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#4F46E5" }, 
    secondary: { main: "#131318" }, 
    background: { default: "#F3F4F6", paper: "#ffffff" },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    button: { textTransform: "none", fontWeight: "bold" },
  },
});

export default theme;
