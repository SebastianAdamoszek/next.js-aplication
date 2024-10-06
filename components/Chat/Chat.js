import { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";
import {
  Container,
  Messages,
  UserMessage,
  Form,
  Input,
  Button,
} from "./Chat.styled";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = auth.currentUser; // Pobieramy aktualnego użytkownika

  useEffect(() => {
    // Pobieranie wiadomości w czasie rzeczywistym z Firestore
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesArray);
    });

    return () => unsubscribe(); // Zatrzymaj nasłuchiwanie, gdy komponent zostanie usunięty
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "" || !user) return; // Sprawdź, czy użytkownik jest zalogowany

    try {
      await setDoc(doc(db, "messages", `${Date.now()}_${user.uid}`), {
        text: message,
        userId: user.uid, // Id użytkownika
        timestamp: new Date(),
        username: user.email, // Użyj adresu e-mail jako nazwy użytkownika
      });
      setMessage(""); // Resetuj pole tekstowe
    } catch (error) {
      console.error("Błąd podczas wysyłania wiadomości:", error);
    }
  };

  const messagesEndRef =  useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };
  
  // Automatyczne przewinięcie po każdej aktualizacji wiadomości
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Container>
      <Messages>
        {messages.map((msg) => (
          <UserMessage
            key={msg.id}
            className={`message ${
              msg.userId === user.uid ? "my-message" : "other-message"
            }`}
          >
            <p>
              <span>{msg.username}</span>
              {msg.text}
            </p>{" "}
            {/* Wyświetl nazwę użytkownika i wiadomość */}
          </UserMessage>
        ))}
        <div ref={messagesEndRef} />
      </Messages>
      <Form onSubmit={handleSendMessage}>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Napisz wiadomość..."
        />
        <Button type="submit">Wyślij</Button>
      </Form>
    </Container>
  );
};
