import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import {
  Container,
  TextTitle,
  TextUser,
  LogOut,
} from "./WelcomeMessage.styled";

export const WelcomeMessage = ({ email }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Użytkownik wylogowany");
    } catch (error) {
      console.error("Błąd podczas wylogowania", error);
    }
  };

  return (
    <Container>
      <TextTitle>Hi !</TextTitle>
        <TextUser>{email}</TextUser>
        <LogOut onClick={handleLogout}>Log out</LogOut>
    </Container>
  );
};
