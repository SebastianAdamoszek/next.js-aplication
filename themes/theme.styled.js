import styled from "styled-components";

export const ThemeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: center;
  gap: 5px;
  padding: 0px 5px 8px 8px;
`;

export const BtnDark = styled.button`
  background-color: black;
  border-radius: 50%;
  width: 15px;
  height: 10px;
  border: none;
  cursor: pointer;
`;

export const BtnLight = styled.button`
  background-color: white;
  border-radius: 50%;
  width: 15px;
  height: 10px;
  border: none;
  cursor: pointer;
`;

export const BtnOrange = styled.button`
  background-color: orange;
  border-radius: 50%;
  width: 15px;
  height: 10px;
  border: none;
  cursor: pointer;
`;
