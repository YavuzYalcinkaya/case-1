import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TeamProvider } from "./context/TeamContext";
import Layout from "./Layout";
import TeamList from "./components/TeamList";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import { CssBaseline } from "@mui/material";

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <TeamProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TeamList />} />
          </Route>
        </Routes>
      </Router>
    </TeamProvider>
  </ThemeProvider>
);

export default App;
