"use client"
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';  // Import bazy danych

export const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  // Funkcja do dodawania nowego wydatku do Firestore
  const addExpense = async (e) => {
    e.preventDefault();

    if (description && amount) {
      try {
        await addDoc(collection(db, 'expenses'), {
          description,
          amount: parseFloat(amount),
          createdAt: new Date(),
        });
        setDescription(''); // Wyczyszczenie pola
        setAmount('');
        fetchExpenses(); // Aktualizacja listy wydatków
      } catch (error) {
        console.error('Błąd dodawania wydatku: ', error);
      }
    }
  };

  // Funkcja do pobierania wydatków z Firestore
  const fetchExpenses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'expenses'));
      const expensesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(expensesList);
    } catch (error) {
      console.error('Błąd pobierania wydatków: ', error);
    }
  };

  // Użycie useEffect do pobrania wydatków przy pierwszym renderowaniu
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Lista wydatków</h2>
      
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
            {expense.description}: {expense.amount} PLN
          </li>
        ))}
      </ul>
    </div>
  );
};
