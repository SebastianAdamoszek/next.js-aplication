import styled from "styled-components";

export const Header = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
    z-index: 100;
  background-color: rgb(12, 38, 124);
  padding: 10px 0;

  @media (min-width: 768px) {
    position: fixed;
    justify-content: end;
    gap: 11%;
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
