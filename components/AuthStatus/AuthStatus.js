import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { LogIn } from "./LogIn/LogIn";
import { LogOut } from "./LogOut/LogOut";

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
    <div>{user ? <LogIn email={user.email} /> : <LogOut />}</div>
  );
};
