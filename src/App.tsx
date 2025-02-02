import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TeamProvider } from "./context/TeamContext";
import Layout from "./Layout";
import Diagram from "./pages/Diagram";
import TeamList from "./components/TeamList";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
import Charts from "./pages/Charts";

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <TeamProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TeamList />} />
            <Route path="/diagram" element={<Diagram />} />
            <Route path="/charts" element={<Charts />} />
          </Route>
        </Routes>
      </Router>
    </TeamProvider>
  </ThemeProvider>
);

export default App;
