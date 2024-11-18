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
import { db, auth, messaging } from "../../firebase/firebase";
import { getToken } from "firebase/messaging";
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

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: "x57oO_7GYjHbt5SNwMhVxi5HUsQtZTYjW4FSp78JsZ0", // Musisz dodać swój klucz VAPID z konsoli Firebase
        });
        console.log("Token FCM:", token);
  
        // Teraz możesz zapisać token w bazie danych (np. w Firestore), aby później wysyłać powiadomienia
      } else {
        console.log("Brak zgody na powiadomienia");
      }
    } catch (error) {
      console.error("Błąd podczas uzyskiwania zgody na powiadomienia:", error);
    }
  };


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
