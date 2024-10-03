import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid rgba(100, 100, 100, 0.8);
  border-radius: 50%;
  background-color: rgba(100, 100, 100, 0.2);
  width: 50px;
  height: 50px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const TextTitle = styled.span`
  font-size: 8px;
`;
export const TextUser = styled.span`
  font-size: 8px;
  overflow: hidden;
  width: 50px;
  text-align: center;
  // transition: 0.5s ease-in-out;
  &:hover {
    width: auto;
    background-color: rgba(50, 0, 0, 0.5);
  }
`;
export const LogOut = styled.span`
  font-size: 8px;
  cursor: pointer;
  background-color: rgba(100, 10, 10, 0.5);
  padding: 2px;
  border-radius: 5px;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    color: rgba(100, 10, 10, 1);
  }
`;
