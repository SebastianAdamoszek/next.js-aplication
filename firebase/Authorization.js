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
    return { success: true, user: result.user };
  } catch (error) {
    console.log("Błąd podczas logowania");
    return { success: false, message: error.message };
  }
};

export const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log(`Użytkownik ${email} wylogowany`);
  } catch (error) {
    console.error("Błąd podczas wylogowania", error);
  }
};