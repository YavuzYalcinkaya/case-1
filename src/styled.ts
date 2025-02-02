import styled from "styled-components";

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
`;

export const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const AddButton = styled.button`
  background: #4F46E5;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #4338CA;
  }
`;
