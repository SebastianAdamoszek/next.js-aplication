import styled from "styled-components";

export const AuthFormContainer = styled.div`
  position: fixed;
  top: 63px;
  left: 10%;
  background-color: gray;
  z-index: 1000;
  width: 200px;
  padding: 10px;
  border-radius: 10px;
  display: ${({ signOut }) => (signOut ? "none" : "flex")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: scale(0.6);
  animation: incrase 0.5s ease-in-out;
  @keyframes incrase {
    0% {
      transform: scale(0.2);
    }
  }
  @media (min-width: 768px) {
    transform: scale(1);
    top: 100px;
    left: 41%;
  }
`;

export const HideFormButton = styled.button`
  position: absolute;
  top: -25px;
  right: 0px;
  width: 30px;
  height: 20px;
  background: none;
  border: none;
  font-size: 25px;
  cursor: pointer;
  text-align: center;
  transform: rotate(-90deg);
`;

export const MinimizedFormButton = styled.button`
  position: absolute;
  top: 80px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(70, 100, 250, 1);
  border: none;
  z-index: 1000;
  font-size: 35px;
  cursor: pointer;
  transition: 0.25s ease-in-out;

  animation: slideForm 0.5s ease-in-out;
  @keyframes slideForm {
    0% {
      top: 80px;
      right: 50%;
    }
    80% {
      top: 80px;
      right: -5%;
    }
  }

  &:hover {
    background-color: rgba(70, 60, 250, 1);
  }
`;
