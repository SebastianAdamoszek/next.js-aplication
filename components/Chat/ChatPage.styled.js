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

  animation: incrase 0.5s ease-in-out;
  @keyframes incrase {
    0% {
      transform: scale(0.2);
    }
  }
  @media (max-width: 768px) {
    transform: scale(0.6);
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    padding: 0 3px;
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
  bottom: 30px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(70, 0, 250, 0.8);
  border: none;
  z-index: 1000;
  font-size: 24px;
  cursor: pointer;
  transition: 0.25s ease-in-out;

  animation: slide 0.5s ease-in-out;
  @keyframes slide {
    0% {
      bottom: 300px;
      right: 200px;
      transform: scale(0.2);
    }
    80% {
      bottom: 200px;
      right: 20px;
    }
  }

  &:hover {
    background-color: rgba(70, 60, 250, 1);
  }
`;

export const GuestChatContainer = styled.div`
  padding: 5px;
  text-align: center;
`;
