import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { Chat } from "./Chat";
import { ChatPageContainer, GuestChatContainer } from "./ChatPage.styled";

export const ChatPage = () => {
  const [user, loading] = useAuthState(auth);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ top: "90px", left: "50px" });

  if (loading) {
    return <div>Ładowanie...</div>;
  }
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - parseInt(position.left, 10),
      y: e.clientY - parseInt(position.top, 10),
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      top: `${e.clientY - offset.y}px`,
      left: `${e.clientX - offset.x}px`,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <ChatPageContainer
      isLoggedIn={!!user}
      style={{ top: position.top, left: position.left }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {user ? (
        <>
          <h3>Witaj, {user.email}</h3>
          <Chat />
          <button onClick={() => auth.signOut()}>Wyloguj</button>
        </>
      ) : (
        <GuestChatContainer>
          <p>Zaloguj się, aby uzyskać dostęp do czatu</p>
        </GuestChatContainer>
      )}
    </ChatPageContainer>
  );
};
