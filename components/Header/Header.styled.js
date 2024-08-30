import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: auto;
  z-index: 100;
  background-color: rgb(12, 38, 124);
  padding: 10px 0;

  // @media (min-width: 768px) {
  //     justify-content: center;

  // }
`;
export const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 5px;
  width: 150px;
  margin: 0 10px 0 0;
  // border: 2px solid black;
`;
