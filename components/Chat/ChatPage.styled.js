import styled from "styled-components";

export const ChatPageContainer = styled.div`
  position: fixed;
  // bottom: 20px;
  // right: 20px;
  width: ${({isLoggedIn}) => (isLoggedIn ? "320px" : "270px")};
  height: ${({ isLoggedIn }) => (isLoggedIn ? "415px" : "60px")};
  background-color: gray;
  border: 3px solid darkgray;
  border-radius: 8px;
  z-index: 1000;
  cursor: url('/cursor-grab.png'), grab;
  transform: scale(0.6);
  margin-top: ${({isLoggedIn}) => (isLoggedIn ? "-95px" : "")};
  animation: incrase 0.5s ease-in-out;
  @keyframes incrase {
    0% {
      transform: scale(0.2);
    }
  }
  @media (min-width: 768px) {
    transform: scale(1);
    margin-top: 0;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px;

  button {
    padding: 3px;
    border-radius: 7px;
    transition: 0.2s ease-in-out;
  }
`;

export const HideChatButton = styled.button`
  position: absolute;
  top: -35px;
  right: 0px;
  width: 30px;
  height: 20px;
  background: none;
  border: none;
  font-size: 25px;
  cursor: url('/cursor-pointer.svg'), pointer;
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
  cursor: url('/cursor-pointer.svg'), pointer;
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
