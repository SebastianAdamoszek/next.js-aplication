'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  }, [router]);

  return null;}


// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { auth } from '../firebase/firebase'; // Upewnij się, że ścieżka jest poprawna
// import { onAuthStateChanged } from 'firebase/auth'; // Funkcja do nasłuchiwania na zmiany autoryzacji

// export default function HomePage() {
//   const router = useRouter();
//   const [user, setUser] = useState(null); // Stan do przechowywania użytkownika
//   const [loading, setLoading] = useState(true); // Stan do sprawdzania ładowania

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user); // Ustawiamy użytkownika
//       setLoading(false); // Ustawiamy loading na false po ustaleniu stanu
//     });

//     return () => unsubscribe(); // Oczyszczenie subskrypcji
//   }, []);

//   useEffect(() => {
//     if (loading) return; // Nie rób nic, jeśli wciąż ładujesz

//     if (user) {
//       router.push('/home'); // Zalogowany użytkownik
//     } else {
//       router.push('/logowanie'); // Niezalogowany użytkownik
//     }
//   }, [router, user, loading]); // Zależności dla efektu

//   return null; // Nie wyświetlamy niczego
// }
