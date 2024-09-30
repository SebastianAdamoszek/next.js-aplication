import { useState } from 'react';
import { auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Przełączanie między logowaniem a rejestracją
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <div>
      <h2>{isLogin ? 'Logowanie' : 'Rejestracja'}</h2>
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
        <button type="submit">{isLogin ? 'Zaloguj' : 'Zarejestruj'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Rejestracja' : 'Logowanie'}
      </button>
    </div>
  );
};
