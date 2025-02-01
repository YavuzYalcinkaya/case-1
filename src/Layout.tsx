import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  margin-left: 260px;
  padding: 20px;
  flex: 1;
`;

const Layout = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <Content>
        <Outlet />
      </Content>
    </LayoutContainer>
  );
};

export default Layout;
