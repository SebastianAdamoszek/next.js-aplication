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

  @media (max-width: 768px) {
    transform: scale(0.6);
  }

`;
export const HideChatButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0px;
  width: 30px;
  height: 20px;
  background: none;
  border: none;
  font-size: 25px;
  cursor: pointer;
  text-align: center;
`;

export const MinimizedChatButton = styled.button`
  position: fixed;
  bottom: 50px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: lightblue;
  border: none;
  z-index: 1000;
  font-size: 24px;
  cursor: pointer;
`;

export const GuestChatContainer = styled.div`
  padding: 5px;
  text-align: center;
`;
