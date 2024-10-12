import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import {
  Container,
  TextTitle,
  TextUser,
  Icon,
  LogOutButton,
} from "./LogIn.styled";

export const LogIn = ({ email }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log(`Użytkownik ${email} wylogowany`);
    } catch (error) {
      console.error("Błąd podczas wylogowania", error);
    }
  };

  return (
    <Container>
      <TextTitle>
        Hi !<Icon>🙂</Icon>
      </TextTitle>
      <TextUser>{email}</TextUser>
      <LogOutButton onClick={handleLogout}>Log out</LogOutButton>
    </Container>
  );
};
