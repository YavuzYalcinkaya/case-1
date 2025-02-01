import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: #1F2937;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: fixed;
`;

const SidebarLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px;
  margin: 5px 0;
  display: block;
  border-radius: 6px;
  &:hover {
    background: #374151;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <h2>👥 Team Manager</h2>
      <SidebarLink to="/">🏠 Ekipler</SidebarLink>
      <SidebarLink to="/diagram">📊 Diyagram</SidebarLink>
      <SidebarLink to="/charts">📈 Grafikler</SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;
