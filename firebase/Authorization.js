// components/Authorization/Authorization.js
import { auth, googleProvider } from "./firebase";
import { signOut } from "firebase/auth";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

/**
 * Logowanie użytkownika
 */
export const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log(`Użytkownik ${email} zalogowany`);
    return { success: true };
  } catch (error) {
    console.log("E-mail lub hasło jest nieprawidłowe");
    return { success: false, message: "Nieprawidłowy e-mail lub hasło" };
  }
};

/**
 * Rejestracja użytkownika
 */
export const registerUser = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    console.log("Błąd podczas rejestracji, email juz istnieje");
    return {
      success: false,
      message: "Błąd podczas rejestracji email juz istnieje",
    };
  }
};

/**
 * Logowanie przez Google
 */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user; // Pobieramy obiekt użytkownika z wyniku logowania

    console.log(`Użytkownik ${user.email} zalogowany`);
    return { success: true, user };
  } catch (error) {
    console.log(`Błąd podczas logowania: ${error.message}`);
    return { success: false, message: error.message };
  }
};

/**
 * Wylogowanie użytkownika
 */
export const handleLogout = async () => {
  try {
    const user = auth.currentUser; // Pobieramy obecnie zalogowanego użytkownika
    if (user) {
      await signOut(auth);
      console.log(`Użytkownik ${user.email} wylogowany`);
      alert("Pomyślnie wylogowano!");

    } else {
      console.log("Nie można wylogować, brak zalogowanego użytkownika");
    }
  } catch (error) {
    console.error("Błąd", error);
  }
};
