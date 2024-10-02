import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth"; // Importowanie hooka z firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  AuthFormContainer,
  HideFormButton,
  LogInGoogle,
  MinimizedFormButton,
} from "./AuthForm.styled";
import Image from "next/image";
import google from "/public/google.jpg";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Przełączanie między logowaniem a rejestracją
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth); // Hook do monitorowania stanu zalogowania użytkownika

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formularz został wysłany!");
    try {
      if (isLogin) {
        console.log("Logowanie...");
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Zalogowano pomyślnie!");
      } else {
        console.log("Rejestracja...");
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Zarejestrowano pomyślnie!");
      }
    } catch (error) {
      console.error("Błąd podczas logowania/rejestracji", error);
    }
  };
  const [zoomOut, setIsMinimized] = useState(false);

  // Funkcja minimalizowania okna
  const toggleMinimize = () => {
    setIsMinimized(!zoomOut);
  };

  // Formularz jest widoczny tylko jeśli użytkownik nie jest zalogowany
  return (
    <>
      {!zoomOut && (
        <AuthFormContainer signOut={!!user}>
          <HideFormButton onClick={toggleMinimize}>⬇️</HideFormButton>{" "}
          <div>
            <h2>{isLogin ? "Log in" : "Register"}</h2>
          </div>
          <LogInGoogle>
            <Image src={google} alt="google image" width={20} height={20} />{" "}
            <button>Log in with google</button>
          </LogInGoogle>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">
                {isLogin ? "Zaloguj" : "Zarejestruj"}
              </button>
            </form>
          </div>
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Rejestracja" : "Logowanie"}
          </button>
        </AuthFormContainer>
      )}

      {zoomOut && (
        <MinimizedFormButton
          onClick={toggleMinimize}
          title="Formularz rejestracji i logowania"
        >
          📝
        </MinimizedFormButton>
      )}
    </>
  );
};
