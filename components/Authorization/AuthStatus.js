import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { WelcomeMessage } from "./WelcomeMessage";
// import { AuthForm } from "./AuthForm";
import { OpenFormButton } from "./OpenFormButton";

export const AuthStatus = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Czyszczenie subskrypcji
    return () => unsubscribe();
  }, []);

  return (
    <div>{user ? <WelcomeMessage email={user.email} /> : <OpenFormButton />}</div>
  );
};
