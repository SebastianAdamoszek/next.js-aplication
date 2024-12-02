"use client";
import React, { useState, useEffect } from "react";
import {
  LinkContainer,
  Container,
  LinkBack,
  StyledCurlyBracket,
  Inspan,
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

export const Income = () => {
  const [income, setIncome] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState(null);
  const [sortOrder, setSortOrder] = useState("date");

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
        setDescription(""); // Wyczyszczenie pola
        setAmount("");
      } catch (error) {
        console.error("Błąd dodawania przychodu: ", error);
        alert("Wystąpił błąd przy dodawaniu przychodu. Spróbuj ponownie.");
      }
    }
  };

  // Funkcja do usuwania przychodu
  const deleteIncome = async (id) => {
    try {
      await deleteDoc(doc(db, "income", id));
    } catch (error) {
      console.error("Błąd usuwania przychodu: ", error);
      alert("Wystąpił błąd przy usuwaniu przychodu. Spróbuj ponownie.");
    }
  };

  // Nasłuchiwanie zmian w kolekcji przychodów w czasie rzeczywistym
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const incomeQuery = query(
          collection(db, "income"),
          where("userId", "==", currentUser.uid)
        );

        // Użycie onSnapshot do nasłuchiwania zmian
        const unsubscribeSnapshot = onSnapshot(
          incomeQuery,
          (querySnapshot) => {
            const incomeList = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setIncome(incomeList);
          },
          (error) => {
            console.error("Błąd podczas nasłuchiwania przychodów: ", error);
          }
        );

        return () => unsubscribeSnapshot(); // Odsubskrybowanie od nasłuchiwania
      } else {
        setUser(null);
        setIncome([]); // Czyszczenie przychodów po wylogowaniu
      }
    });

    return () => unsubscribe(); // Odsubskrybowanie od nasłuchiwania zmian autoryzacji
  }, []);

  const sortedList = [...income].sort((a, b) => {
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
        <Inspan />
      </StyledCurlyBracket>

      <h2>Przychody</h2>

      {user ? (
        <div>
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
            <ButtonAdd type="submit">
              Dodaj <span style={{ display: "block" }}>przychód</span>
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
                  <Desc>{inc.description}-</Desc>
                  <Amount>{inc.amount}zł</Amount>
                  <DateSpan>{formattedDate}</DateSpan>
                  <button onClick={() => deleteIncome(inc.id)}>Usuń</button>
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
