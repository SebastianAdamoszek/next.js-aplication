import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { WelcomeMessage } from "./WelcomeMessage";
import { IconStatus} from "./Icon";

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
    <div>{user ? <WelcomeMessage email={user.email} /> : <IconStatus />}</div>
  );
};
