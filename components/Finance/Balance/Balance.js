"use client";
import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const Balance = () => {
  const [user, setUser] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Query for expenses
        const expensesQuery = query(
          collection(db, "expenses"),
          where("userId", "==", currentUser.uid)
        );
        const unsubscribeExpenses = onSnapshot(expensesQuery, (snapshot) => {
          let totalExpenses = 0;
          snapshot.forEach((doc) => {
            totalExpenses += doc.data().amount;
          });
          setTotalExpenses(totalExpenses);
        });

        // Query for income
        const incomeQuery = query(
          collection(db, "income"),
          where("userId", "==", currentUser.uid)
        );
        const unsubscribeIncome = onSnapshot(incomeQuery, (snapshot) => {
          let totalIncome = 0;
          snapshot.forEach((doc) => {
            totalIncome += doc.data().amount;
          });
          setTotalIncome(totalIncome);
        });

        return () => {
          unsubscribeExpenses();
          unsubscribeIncome();
        };
      } else {
        setUser(null);
        setTotalExpenses(0);
        setTotalIncome(0);
        setBalance(0);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Update balance whenever income or expenses change
  useEffect(() => {
    setBalance(totalIncome - totalExpenses);
  }, [totalIncome, totalExpenses]);

  return (
    <div>
      <h3>Bilans finansowy</h3>
      <p>
        <strong>Bilans: {balance.toFixed(2)} PLN</strong>
      </p>
      <p>Całkowite przychody: {totalIncome.toFixed(2)} PLN</p>
      <p>Całkowite wydatki: {totalExpenses.toFixed(2)} PLN</p>
    </div>
  );
};
