// components/WelcomeMessage.js
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

export const WelcomeMessage = ({ email }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Użytkownik wylogowany');
    } catch (error) {
      console.error('Błąd podczas wylogowania', error);
    }
  };

  return (
    <div>
      <h2>Witaj w aplikacji!</h2>
      <p>Użytkownik: {email}</p>
      <button onClick={handleLogout}>Wyloguj</button> {/* Przycisk wylogowania */}
    </div>
  );
};