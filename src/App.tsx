import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TeamProvider } from "./context/TeamContext";
import TeamForm from "./components/TeamForm";
import Layout from "./Layout";

const App = () => (
  <TeamProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TeamForm />} />
        </Route>
      </Routes>
    </Router>
  </TeamProvider>
);

export default App;
