import styled from "styled-components";

export const AuthFormContainer = styled.div`
  position: fixed;
  top: 100px;
  left: 40%;
  background-color: gray;
  z-index: 1000;
  width: 200px;
  padding: 10px;
  border-radius: 10px;
  display: ${({ signOut }) => (signOut ? "none" : "flex")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
 