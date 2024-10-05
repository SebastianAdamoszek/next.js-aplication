import styled from "styled-components";

export const Icon = styled.div`
  border-radius: 50%;
  background-color: rgba(100, 100, 100, 0.6);
  width: 50px;
  height: 50px;
  // padding: 0 0 0 0;
  font-size: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  // cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.03);
    background-color: rgba(100, 100, 100, 0.8);
  }
`;
