"use client";
import React, { useState, useEffect } from "react";
import {
  LinkContainer,
  LinkBack,
  Container,
  SpanExpenses,
  StyledCurlyBracket,
  Exspan,
  ButtonAdd,
  ButtonsSort, Desc, Amount, DateSpan
} from "../Balance/IncomeExpenses.styled";
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
import Link from "next/link";

export const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState(null);
  const [sortOrder, setSortOrder] = useState("date");

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

  const sortedList = [...expenses].sort((a, b) => {
    if (sortOrder === "date") {
      return (
        new Date(b.createdAt.seconds * 1000) -
        new Date(a.createdAt.seconds * 1000)
      );
    }
    if (sortOrder === "alphabetical") {
      return a.description.localeCompare(b.description);
    }
    return 0;
  });

  return (
    <Container>
      <LinkContainer>
        <Link href="/finance/income">
          <p>Przychody</p>
        </Link>
        <Link href="/finance/expenses">
          <p>Wydatki</p>
        </Link>
      </LinkContainer>
      <LinkBack>
        <Link href="/finance">
          <p>Tylko Bilans</p>
        </Link>
      </LinkBack>

      <StyledCurlyBracket>
        <Exspan />
      </StyledCurlyBracket>

      <h2>Wydatki</h2>

      {user ? (
        <div>
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
            <ButtonAdd type="submit">
              Dodaj <span style={{ display: "block" }}>wydatek</span>
            </ButtonAdd>
          </form>
          <ButtonsSort>
            <button onClick={() => setSortOrder("alphabetical")}>abc...</button>
            <button onClick={() => setSortOrder("date")}>data</button>
          </ButtonsSort>
          <ul>
            {sortedList.map((inc) => {
              const formattedDate = inc.createdAt
                ? new Date(inc.createdAt.seconds * 1000).toLocaleDateString(
                    "pl-PL"
                  )
                : "Brak daty";

              return (
                <li key={inc.id}>
                <Desc>{inc.description}</Desc>
                <Amount>{inc.amount}zł</Amount>
                <DateSpan>{formattedDate}</DateSpan>
                <button onClick={() => deleteExpense(inc.id)}>Usuń</button>
              </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>Dostępne dla zalogowanych użytkowników</p>
      )}
    </Container>
  );
};
