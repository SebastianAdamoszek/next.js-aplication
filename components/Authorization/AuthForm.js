import { useState } from "react";
import { auth, googleProvider } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth"; // Importowanie hooka z firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  AuthFormContainer,
  HideFormButton,
  LogInGoogle,
  Form,
  MinimizedFormButton,
  ValidateError,
} from "./AuthForm.styled";
import Image from "next/image";
import google from "/public/google.jpg";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Przełączanie między logowaniem a rejestracją
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(""); // Stan do walidacji e-maila
  const [user] = useAuthState(auth); // Hook do monitorowania stanu zalogowania użytkownika

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Zaktualizowano walidację e-maila z logami
    if (!validateEmail(emailValue)) {
      setEmailError("Adres musi zawierać '@' i domenę.");
    } else {
      console.log("Poprawny e-mail:", emailValue); // Log dla poprawnego e-maila
      setEmailError(""); // Czyszczenie błędu, jeśli e-mail jest poprawny
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formularz został wysłany!");
    setError("");

    // Walidacja e-maila
    if (!validateEmail(email)) {
      setError("Podaj poprawny adres e-mail.");
      return;
    }

    // Walidacja hasła
    if (password.length < 6) {
      setError("Hasło musi mieć co najmniej 6 znaków.");
      return;
    }

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
      setError(`Nieprawidłowy e-mail lub hasło`);
    }
  };

  const [zoomOut, setIsMinimized] = useState(false);

  // Funkcja minimalizowania okna
  const toggleMinimize = () => {
    setIsMinimized(!zoomOut);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Zalogowano przez Google:", result.user);
    } catch (error) {
      console.error("Błąd podczas logowania przez Google:", error.message);
    }
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
            <Image src={google} alt="google image" width={21} height={20} />{" "}
            <button onClick={handleGoogleLogin}>Log in with google</button>
          </LogInGoogle>
          <div>
            <Form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                // onChange={(e) => setEmail(e.target.value)}
                onChange={handleEmailChange}
                required
              />
              {emailError && <ValidateError>{emailError}</ValidateError>}
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <ValidateError>{error}</ValidateError>}

              <button type="submit">{isLogin ? "Log In" : "Register"}</button>
            </Form>
          </div>
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Log In"}
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