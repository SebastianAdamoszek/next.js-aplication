"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState(null);

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
      } catch (error) {
        console.error("Błąd dodawania wydatku: ", error);
        alert("Wystąpił błąd przy dodawaniu wydatku. Spróbuj ponownie.");
      }
    }
  };

  // Funkcja do usuwania wydatku
  const deleteExpense = async (id) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
    } catch (error) {
      console.error("Błąd usuwania wydatku: ", error);
      alert("Wystąpił błąd przy usuwaniu wydatku. Spróbuj ponownie.");
    }
  };

  // Nasłuchiwanie zmian w kolekcji wydatków w czasie rzeczywistym
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const expensesQuery = query(
          collection(db, "expenses"),
          where("userId", "==", currentUser.uid)
        );

        // Użycie onSnapshot do nasłuchiwania zmian
        const unsubscribeSnapshot = onSnapshot(
          expensesQuery,
          (querySnapshot) => {
            const expensesList = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setExpenses(expensesList);
          },
          (error) => {
            console.error("Błąd podczas nasłuchiwania wydatków: ", error);
          }
        );

        return () => unsubscribeSnapshot(); // Odsubskrybowanie od nasłuchiwania
      } else {
        setUser(null);
        setExpenses([]); // Czyszczenie wydatków po wylogowaniu
      }
    });

    return () => unsubscribe(); // Odsubskrybowanie od nasłuchiwania zmian autoryzacji
  }, []);

  return (
    <Container>
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
            <div>
              <input
                type="number"
                placeholder="Kwota"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div>
                <button type="submit">Dodaj wydatek</button>
              </div>
            </div>
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
    </Container>
  );
};
const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;

    input {
      border-radius: 5px;
      border: none;
      box-shadow: 0 0 3px white;
      transition: 0.3s ease-in-out;
      padding: 2px 5px;
      &:hover {
        background-color: rgba(0, 0, 0, 1);
        box-shadow: 0 0 10px gray;
      }
    }

    button {
      width: 110px;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.3);
      box-shadow: 0 0 3px white;
      border: none;
      transition: 0.3s ease-in-out;
      &:hover {
        background-color: rgba(0, 0, 0, 1);
        box-shadow: 0 0 10px gray;
      }
    }

    div {
      display: flex;
      gap: 8px;
    }
  }

  ul {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-align: left;

    li {
      width: 300px;
      display: flex;
      justify-content: flex-start;
      justify-content: space-between;
      border-bottom: 1px dashed;
      padding: 5px ;
      border-radius: 5px;
      transition: 0.2s ease-in-out;

       &:hover {
        box-shadow: 0 0 10px gray;

       } 
    }

    button {
      padding: 2px 15px;
      border-radius: 5px;
      box-shadow: 0 0 3px white;
      border: none;
      transition: 0.3s ease-in-out;
      &:hover {
        background-color: rgba(0, 0, 0, 1);
        box-shadow: 0 0 10px gray;
      }
    }
  }
`;
