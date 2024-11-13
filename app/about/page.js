"use client";
import { db, auth } from "@/firebase/firebase";
import styles from "../page.module.css";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function WorkLogNotebook() {
  const [workLog, setWorkLog] = useState({}); // Struktura danych do przechowywania logów pracy
  const [user, setUser] = useState(null); // Przechowywanie danych zalogowanego użytkownika

  // Sprawdzenie, czy użytkownik jest zalogowany
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Odsubskrybuj, gdy komponent się odmontuje
  }, []);

  // Funkcja dodawania nowego wpisu do danego dnia
  const addWorkEntry = (day) => {
    const newEntry = { place: "", hours: "" };
    setWorkLog((prevLog) => {
      const updatedDay = prevLog[day]
        ? [...prevLog[day], newEntry]
        : [newEntry];
      return { ...prevLog, [day]: updatedDay };
    });
  };

  // Funkcja do aktualizacji wpisu
  const updateWorkEntry = (day, index, field, value) => {
    setWorkLog((prevLog) => {
      const updatedEntries = prevLog[day].map((entry, i) =>
        i === index ? { ...entry, [field]: value } : entry
      );
      return { ...prevLog, [day]: updatedEntries };
    });
  };

  // Renderowanie komponentu
  return (
    <div className={`${styles.main__next} ${styles.grid}`}>
      {user ? (
        <>
          <h2>Notatnik Miesięczny Pracy</h2>
          {[...Array(31).keys()].map((day) => (
            <div
              key={day}
              style={{
                marginBottom: "20px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <h3>Dzień {day + 1}</h3>
              <button onClick={() => addWorkEntry(day + 1)}>
                Dodaj miejsce pracy
              </button>
              {workLog[day + 1] &&
                workLog[day + 1].map((entry, index) => (
                  <div key={index} style={{ marginTop: "10px" }}>
                    <input
                      type="text"
                      placeholder="Miejsce pracy"
                      value={entry.place}
                      onChange={(e) =>
                        updateWorkEntry(day + 1, index, "place", e.target.value)
                      }
                      style={{ marginRight: "10px" }}
                    />
                    <input
                      type="number"
                      placeholder="Liczba godzin"
                      value={entry.hours}
                      onChange={(e) =>
                        updateWorkEntry(day + 1, index, "hours", e.target.value)
                      }
                    />
                  </div>
                ))}
            </div>
          ))}
        </>
      ) : (
        <p>Proszę się zalogować, aby zobaczyć ten komponent.</p>
      )}
    </div>
  );
}
