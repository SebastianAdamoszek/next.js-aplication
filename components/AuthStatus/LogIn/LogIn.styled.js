import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid rgba(100, 100, 100, 0.8);
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.5),
    rgba(100, 100, 100, 0.2)
  );
  width: 80px;
  padding: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;
export const TextTitle = styled.span`
  font-size: 12px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;
export const TextUser = styled.span`
  font-size: 10px;
  overflow: hidden;
  width: 70px;
  text-align: center;

  &:hover {
    width: auto;
    background-color: rgba(50, 0, 0, 0.5);
  }
`;

export const LogOut = styled.span`
  font-size: 8px;
  cursor: url("/cursor-pionter.svg") pointer;
  background-color: rgba(100, 10, 10, 0.5);
  padding: 2px 10px;
  border-radius: 5px;
  transition: 0.2s ease-in-out;z

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    color: rgba(100, 10, 10, 1);
  }
`;

export const Icon = styled.span`
  font-size: 17px;
  padding: 0 0 0 10px;
`;
