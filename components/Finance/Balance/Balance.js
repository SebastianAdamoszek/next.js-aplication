"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const Balance = () => {
  const [user, setUser] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [balance, setBalance] = useState(0);

  // Funkcja do sumowania wydatków
  const fetchExpenses = async (uid) => {
    try {
      const q = query(collection(db, "expenses"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      let total = 0;
      querySnapshot.forEach((doc) => {
        total += doc.data().amount; // Sumowanie kwot wydatków
      });
      setTotalExpenses(total); // Ustawianie sumy wydatków
    } catch (error) {
      console.error("Błąd pobierania wydatków: ", error);
    }
  };

  // Funkcja do sumowania przychodów
  const fetchIncome = async (uid) => {
    try {
      const q = query(collection(db, "income"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      let total = 0;
      querySnapshot.forEach((doc) => {
        total += doc.data().amount; // Sumowanie kwot przychodów
      });
      setTotalIncome(total); // Ustawianie sumy przychodów
    } catch (error) {
      console.error("Błąd pobierania przychodów: ", error);
    }
  };

  // Obliczanie bilansu
  const calculateBalance = () => {
    const balance = totalIncome - totalExpenses;
    setBalance(balance); // Ustawienie bilansu
  };

  // Nasłuchiwanie zmian autoryzacji i ustawianie użytkownika
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchExpenses(currentUser.uid); // Pobieranie wydatków
        fetchIncome(currentUser.uid); // Pobieranie przychodów
      } else {
        setUser(null);
        setTotalExpenses(0);
        setTotalIncome(0);
        setBalance(0);
      }
    });

    return () => unsubscribe();
  }, []);

  // Obliczanie bilansu przy zmianie przychodów lub wydatków
  useEffect(() => {
    const calculateBalance = () => {
      const balance = totalIncome - totalExpenses;
      setBalance(balance);
    };

    calculateBalance();
  }, [totalIncome, totalExpenses]);

  return (
    <div>
      <h3>Bilans finansowy</h3>

      <p>
        <strong>Bilans: {balance.toFixed(2)} PLN</strong>
      </p>
    </div>
  );
};
