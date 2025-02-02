import { Link } from "react-router-dom";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  width: 260px; /* Masaüstü için sabit */
  height: 100vh;
  background: #1f2937;
  color: white;
  display: flex;
  flex-direction: column;
  padding: ${({ isOpen }) => (isOpen ? "20px" : "0px")};
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  transition: transform 0.3s ease;
  z-index: 1100;

  @media (max-width: 768px) {
    width: ${({ isOpen }) =>
      isOpen ? "100vw" : "0"}; /* Mobilde tüm ekranı kaplıyor */
  }
`;

const SidebarLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px;
  margin: 5px 0;
  display: block;
  border-radius: 6px;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    background: #374151;
  }
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 15px;
  right: 15px;
  color: white;

  @media (min-width: 769px) {
    display: none; /* Masaüstünde çarpı butonu gizleniyor */
  }
`;

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <SidebarContainer isOpen={isOpen}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        👥 Team Manager
      </Typography>
      <SidebarLink to="/">🏠 Ekipler</SidebarLink>
      <SidebarLink to="/diagram">📊 Diyagram</SidebarLink>
      <SidebarLink to="/charts">📈 Grafikler</SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;
