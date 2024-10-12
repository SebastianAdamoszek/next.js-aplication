
// "use client";
// import React, { useState, useEffect } from "react";
// import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
// import { db, auth } from "../../../firebase/firebase"; 
// import { onAuthStateChanged } from "firebase/auth"; 

// export const Income = () => {
//   const [income, setIncome] = useState([]);
//   const [description, setDescription] = useState("");
//   const [amount, setAmount] = useState("");
//   const [user, setUser] = useState(null); // Przechowywanie danych zalogowanego użytkownika
  
//   // Funkcja do dodawania nowego przychodu do Firestore
//   const addIncome = async (e) => {
//     e.preventDefault();

//     if (description && amount && user) {
//       // Sprawdzanie czy użytkownik jest zalogowany
//       try {
//         await addDoc(collection(db, "income"), {
//           description,
//           amount: parseFloat(amount),
//           createdAt: new Date(),
//           userId: user.uid, // Dodajemy UID użytkownika do dokumentu
//         });
//         setDescription(""); // Wyczyszczenie pola
//         setAmount("");
//         fetchIncome(); // Aktualizacja listy przychodów
//       } catch (error) {
//         console.error("Błąd dodawania przychodu: ", error);
//       }
//     }
//   };

//   // Funkcja do pobierania przychodów tylko dla zalogowanego użytkownika
//   const fetchIncome = async () => {
//     if (user) {
//       try {
//         const q = query(
//           collection(db, "income"),
//           where("userId", "==", user.uid)
//         ); // Filtrowanie po UID
//         const querySnapshot = await getDocs(q);
//         const incomeList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setIncome(incomeList);
//       } catch (error) {
//         console.error("Błąd pobierania przychodów: ", error);
//       }
//     }
//   };

//   // Nasłuchiwanie zmian autoryzacji i ustawianie użytkownika
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         fetchIncome(); // Załaduj przychody dla zalogowanego użytkownika
//       } else {
//         setUser(null);
//         setIncome([]); // Wyczyszczenie przychodu, gdy nikt nie jest zalogowany
//       }
//     });

//     return () => unsubscribe(); // Odsubskrybuj, gdy komponent się odmontuje
//   }, );

//   return (
//     <div>
//       <h2>Przychody</h2>

//       {user ? (
//         <div>
//           {/* Formularz dodawania przychodów */}
//           <form onSubmit={addIncome}>
//             <input
//               type="text"
//               placeholder="Opis"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Kwota"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />
//             <button type="submit">Dodaj przychód</button>
//           </form>

//           {/* Wyświetlanie listy przychodów */}
//           <ul>
//             {income.map((income) => (
//               <li key={income.id}>
//                 {income.description}: {income.amount} PLN
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>Dostępne dla zalogowanych użytkowników</p>
//       )}
//     </div>
//   );
// };
