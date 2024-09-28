import styled from "styled-components";

export const Menu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export const Nav = styled.ul`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 10px;
  width: 100%;
  background-color: rgb(12, 38, 124);
  position: absolute;
  top: 70px;
  left: 0;
  padding: 15px;
  z-index: -1;

  animation: slide-down 0.5s ease-in-out;
  @keyframes slide-down {
    0% {
      color: rgba(0, 0, 0, 0);
      background-color: rgba(12, 38, 124, 0.5);
      transform: translateY(-150px);
      font-size: 0px;
    }
    90% {
      color: rgba(0, 0, 0, 0);
    }
    100% {
      color: auto;
    }
  }

  @media (min-width: 768px) {
    position: static;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: auto;
    gap: 15px;
    margin: 0 0 0 100px;
    background-color: inherit;
    z-index: 0;

    animation: show-font 1s ease-in-out;
    @keyframes show-font {
      0% {
        color: rgba(0, 0, 0, 0);
      }
      100% {
        color: auto;
      }
    }
  }
`;
