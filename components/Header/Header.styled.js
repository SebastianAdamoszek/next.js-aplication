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

  @media (min-width: 768px) {
    justify-content: end;
    gap: 15%;
  }
`;
export const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  margin: 0 10px 0 0;

  @media (min-width: 768px) {
    gap: 5px;
    margin: 0 20px 0 0;

  }
`;
