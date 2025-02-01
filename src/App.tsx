import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TeamProvider } from "./context/TeamContext";
import Layout from "./Layout";
import TeamList from "./components/TeamList";

const App = () => (
  <TeamProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TeamList />} />
        </Route>
      </Routes>
    </Router>
  </TeamProvider>
);

export default App;
