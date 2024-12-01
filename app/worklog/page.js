"use client";
import { db, auth } from "@/firebase/firebase";
import styles from "../page.module.css";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function WorkLogNotebook() {
  const [workLog, setWorkLog] = useState({}); // Struktura danych do przechowywania logów pracy
  const [user, setUser] = useState(null);
  const allowedUserId = process.env.NEXT_PUBLIC_MY_ID;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
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

  const exportToJsonFile = (data) => {
    const fileData = JSON.stringify(data, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "workLog.json";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const importFromJsonFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsedData = JSON.parse(e.target.result);
          setWorkLog(parsedData);
        } catch (error) {
          console.error("Błąd parsowania pliku JSON", error);
        }
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    // Przywrócenie danych z localStorage po załadowaniu komponentu
    const savedLog = localStorage.getItem("workLog");
    if (savedLog) {
      setWorkLog(JSON.parse(savedLog));
    }
  }, []);

  useEffect(() => {
    // Zapis danych do localStorage po każdej aktualizacji `workLog`
    localStorage.setItem("workLog", JSON.stringify(workLog));
  }, [workLog]);

  // Renderowanie komponentu
  return (
    <div className={styles.main__next}>
      <div className={styles.description}>
        {user && user.uid === allowedUserId ? (
          <>
            <h2>Notatnik Miesięczny Pracy</h2>
            <button onClick={() => exportToJsonFile(workLog)}>
              Eksportuj dane do pliku JSON
            </button>
            <input
              type="file"
              accept=".json"
              onChange={importFromJsonFile}
              style={{ marginTop: "10px" }}
            />

            <div
              style={{
                margin:"20px 0",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                alignItems:"center",
                justifyContent:"flex-start",
                width: "100%",
              }}
            >
              {[...Array(31).keys()].map((day) => (
                <div
                  key={day}
                  style={{
                    marginBottom: "20px",
                    border: "1px solid #ccc",
                    padding: "10px",
                    backgroundColor:"#08043dcc",

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
                            updateWorkEntry(
                              day + 1,
                              index,
                              "place",
                              e.target.value
                            )
                          }
                          style={{ marginRight: "10px" }}
                        />
                        <input
                          type="number"
                          placeholder="Liczba godzin"
                          value={entry.hours}
                          onChange={(e) =>
                            updateWorkEntry(
                              day + 1,
                              index,
                              "hours",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}
                </div>
              ))}{" "}
            </div>
          </>
        ) : (
          <p>Nie masz dostępu do tego komponentu.</p>
        )}
      </div>
    </div>
  );
}
