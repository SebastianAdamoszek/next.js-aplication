// components/Authorization/Authorization.js
import { auth, googleProvider } from "./firebase"; // Popraw ścieżkę do Firebase
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
    return { success: true };
  } catch (error) {
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
    return { success: false, message: "Błąd podczas rejestracji" };
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
    return { success: false, message: error.message };
  }
};
