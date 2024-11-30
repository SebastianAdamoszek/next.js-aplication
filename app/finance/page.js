"use client";
import React, { useState, useEffect } from "react";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Balance } from "@/components/Finance/Balance/Balance";
import { Income } from "@/components/Finance/Income/Income";
import { Expenses } from "@/components/Finance/Expenses/Expenses";
import styles from "../page.module.css";

export default function FinancePage() {
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

  return (
    <div className={styles.main__next}>
      <div className={styles.description}>
        <div>
          {user && user.uid === allowedUserId ? (
            <div>
              <Balance />
                <Income />
                <Expenses />
              </div>
          ) : (
            <p>Nie masz dostępu do tego komponentu.</p>
          )}
        </div>
      </div>
    </div>
  );
}
