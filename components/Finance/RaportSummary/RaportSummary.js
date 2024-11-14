"use client";
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../../firebase/firebase'; 
import { onAuthStateChanged } from 'firebase/auth'; 

export const ReportSummary = () => {
  const [user, setUser] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (uid) => {
      setIsLoading(true);
      try {
        // Fetch expenses
        const expensesQuery = query(collection(db, 'expenses'), where('userId', '==', uid));
        const expensesSnapshot = await getDocs(expensesQuery);
        let expensesTotal = 0;
        expensesSnapshot.forEach((doc) => {
          expensesTotal += doc.data().amount;
        });
        setTotalExpenses(expensesTotal);

        // Fetch income
        const incomeQuery = query(collection(db, 'income'), where('userId', '==', uid));
        const incomeSnapshot = await getDocs(incomeQuery);
        let incomeTotal = 0;
        incomeSnapshot.forEach((doc) => {
          incomeTotal += doc.data().amount;
        });
        setTotalIncome(incomeTotal);
      } catch (error) {
        console.error('Błąd pobierania danych: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchData(currentUser.uid);
      } else {
        setUser(null);
        setTotalExpenses(0);
        setTotalIncome(0);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      {isLoading ? (
        <p>Ładowanie danych...</p>
      ) : (
        <>
          <div>
            <h3>Wydatki</h3>
            <p>Całkowita suma wydatków: {totalExpenses.toFixed(2)} PLN</p>
          </div>
          <div>
            <h3>Przychody</h3>
            <p>Całkowita suma przychodów: {totalIncome.toFixed(2)} PLN</p>
          </div>
        </>
      )}
    </div>
  );
};
