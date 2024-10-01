import { signIn } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { IconButton } from "./OpenFormButton.styled";

export const OpenFormButton = () => {
  const handleLogin = async () => {
    try {
      await signIn(auth);
      console.log("Użytkownik zalogowany");
    } catch (error) {
      console.error("Błąd podczas logowania", error);
    }
  };

  return (
      <IconButton onClick={handleLogin} title="Otwórz formularz">
        💬
      </IconButton>
  );
};
