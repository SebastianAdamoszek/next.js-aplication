"use client";
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase"; 
import { onAuthStateChanged } from "firebase/auth"; 

export const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState(null); // Przechowywanie danych zalogowanego użytkownika

  // Funkcja do dodawania nowego wydatku do Firestore
  const addExpense = async (e) => {
    e.preventDefault();

    if (description && amount && user) {
      try {
        await addDoc(collection(db, "expenses"), {
          description,
          amount: parseFloat(amount),
          createdAt: new Date(),
          userId: user.uid, // Dodajemy UID użytkownika do dokumentu
        });
        setDescription(""); // Wyczyszczenie pola
        setAmount("");
        fetchExpenses(); // Aktualizacja listy wydatków
      } catch (error) {
        console.error("Błąd dodawania wydatku: ", error);
      }
    }
  };

  // Funkcja do usuwania wydatku
  const deleteExpense = async (id) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
      fetchExpenses(); // Aktualizacja listy po usunięciu
    } catch (error) {
      console.error("Błąd usuwania wydatku: ", error);
    }
  };

  // Funkcja do pobierania wydatków tylko dla zalogowanego użytkownika
  const fetchExpenses = async () => {
    if (user) {
      try {
        const q = query(
          collection(db, "expenses"),
          where("userId", "==", user.uid)
        ); // Filtrowanie po UID
        const querySnapshot = await getDocs(q);
        const expensesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExpenses(expensesList);
      } catch (error) {
        console.error("Błąd pobierania wydatków: ", error);
      }
    }
  };

  // Nasłuchiwanie zmian autoryzacji i ustawianie użytkownika
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchExpenses(); // Załaduj wydatki dla zalogowanego użytkownika
      } else {
        setUser(null);
        setExpenses([]); // Wyczyszczenie wydatków, gdy nikt nie jest zalogowany
      }
    });

    return () => unsubscribe(); // Odsubskrybuj, gdy komponent się odmontuje
  }, );

  return (
    <div>
      <h2>Wydatki</h2>

      {user ? (
        <div>
          {/* Formularz dodawania wydatków */}
          <form onSubmit={addExpense}>
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
            <button type="submit">Dodaj wydatek</button>
          </form>

          {/* Wyświetlanie listy wydatków */}
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id}>
                {expense.description}: {expense.amount} zł
                <button onClick={() => deleteExpense(expense.id)}>Usuń</button>
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
