import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const SidebarWrapper = styled.div<{ isOpen: boolean }>`
  width: ${({ isOpen }) =>
    isOpen ? "260px" : "260px"}; /* Desktop'ta her zaman açık */
  transition: width 0.3s ease;
  overflow: hidden;
  background: #f4f4f4;
  position: fixed;
  height: 100vh;
  z-index: 1000;

  @media (max-width: 768px) {
    width: ${({ isOpen }) =>
      isOpen ? "100vw" : "0"}; /* Mobilde tüm ekranı kaplıyor */
  }
`;

const Content = styled.div<{ isOpen: boolean }>`
  flex: 1;
  padding: 20px;
  margin-left: ${({ isOpen }) =>
    isOpen ? "260px" : "260px"}; /* Desktop'ta menü hep açık */
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 10px;
  }
`;

const MobileMenuButton = styled(IconButton)<{ isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${({ isOpen }) =>
      isOpen ? "none" : "block"}; /* Menü açıldığında ikon gizleniyor */
    position: absolute;
    top: 15px;
    left: 15px;
    z-index: 1200;
  }
`;

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768); // Desktop'ta her zaman açık

  return (
    <LayoutContainer>
      {/* Mobil Menü Butonu - Menü açıldığında gizleniyor */}
      <MobileMenuButton
        isOpen={isSidebarOpen}
        onClick={() => setSidebarOpen(true)}
      >
        <MenuIcon />
      </MobileMenuButton>

      {/* Sidebar */}
      <SidebarWrapper isOpen={isSidebarOpen}>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      </SidebarWrapper>

      {/* İçerik Alanı */}
      <Content isOpen={isSidebarOpen}>
        <Outlet />
      </Content>
    </LayoutContainer>
  );
};

export default Layout;
