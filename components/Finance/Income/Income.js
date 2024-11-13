"use client";
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase"; 
import { onAuthStateChanged } from "firebase/auth"; 

export const Income = () => {
  const [income, setIncome] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState(null); // Przechowywanie danych zalogowanego użytkownika
  
  // Funkcja do dodawania nowego przychodu do Firestore
  const addIncome = async (e) => {
    e.preventDefault();

    if (description && amount && user) {
      try {
        await addDoc(collection(db, "income"), {
          description,
          amount: parseFloat(amount),
          createdAt: new Date(),
          userId: user.uid,
        });
        setDescription(""); 
        setAmount("");
        fetchIncome(); // Aktualizacja listy przychodów
      } catch (error) {
        console.error("Błąd dodawania przychodu: ", error);
      }
    }
  };

  // Funkcja do usuwania przychodu
  const deleteIncome = async (id) => {
    try {
      await deleteDoc(doc(db, "income", id));
      fetchIncome(); // Aktualizacja listy po usunięciu
    } catch (error) {
      console.error("Błąd usuwania przychodu: ", error);
    }
  };

  // Funkcja do pobierania przychodów tylko dla zalogowanego użytkownika
  const fetchIncome = async () => {
    if (user) {
      try {
        const q = query(
          collection(db, "income"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const incomeList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIncome(incomeList);
      } catch (error) {
        console.error("Błąd pobierania przychodów: ", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchIncome(); 
      } else {
        setUser(null);
        setIncome([]); 
      }
    });

    return () => unsubscribe(); 
  }, );

  return (
    <div>
      <h2>Przychody</h2>

      {user ? (
        <div>
          {/* Formularz dodawania przychodów */}
          <form onSubmit={addIncome}>
            <input
              type="text"
              placeholder="Opis"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Kwota"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button type="submit">Dodaj przychód</button>
          </form>

          {/* Wyświetlanie listy przychodów */}
          <ul>
            {income.map((income) => (
              <li key={income.id}>
                {income.description}: {income.amount} zł
                <button onClick={() => deleteIncome(income.id)}>Usuń</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Dostępne dla zalogowanych użytkowników</p>
      )}
    </div>
  );
};
