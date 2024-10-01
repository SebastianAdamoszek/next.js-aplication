import styled from "styled-components";

export const ChatPageContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: ${({ isLoggedIn }) => (isLoggedIn ? "400px" : "60px")};
  background-color: gray;
  border: 3px solid darkgray;
  border-radius: 8px;
  z-index: 1000;
  cursor: grab;
`;

export const GuestChatContainer = styled.div`
    padding: 5px;
    text-align: center;
`