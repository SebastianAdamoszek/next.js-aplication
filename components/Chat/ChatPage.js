import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { Chat } from "./Chat";
import {
  ChatPageContainer,
  MinimizedChatButton,
  GuestChatContainer,
  HideChatButton
} from "./ChatPage.styled";

export const ChatPage = () => {
  const [user, loading] = useAuthState(auth);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ top: "90px", left: "30px" });
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setPosition({ top: "65px", left: "-20px" });
      } else {
        setPosition({ top: "90px", left: "30px" });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleTouchStart = (e) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setOffset({
      x: touch.clientX - parseInt(position.left, 10),
      y: touch.clientY - parseInt(position.top, 10),
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setPosition({
      top: `${touch.clientY - offset.y}px`,
      left: `${touch.clientX - offset.x}px`,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Funkcja minimalizowania okna
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {!isMinimized && (
        <ChatPageContainer
          isLoggedIn={!!user}
          style={{ top: position.top, left: position.left }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <HideChatButton onClick={toggleMinimize}>⬇️</HideChatButton>{" "}
          {/* Przycisk minimalizacji */}
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
      )}
      {isMinimized && (
        <MinimizedChatButton onClick={toggleMinimize}>💬</MinimizedChatButton>
      )}
    </>
  );
};
