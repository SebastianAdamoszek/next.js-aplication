"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Balance } from "@/components/Finance/Balance/Balance";
import { Income } from "@/components/Finance/Income/Income";
import { Expenses } from "@/components/Finance/Expenses/Expenses";
import styles from "../page.module.css";
import Link from "next/link";

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
              <LinkContainer>
                <Link href="/finance/income">
                  <p>Przychody</p>
                </Link>
                <Link href="/finance/expenses">
                  <p>Wydatki</p>
                </Link>
              </LinkContainer>
            </div>
          ) : (
            <p>Nie masz dostępu do tego komponentu.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    width: 75px;
    border: none;
    border-radius: 0;
    box-shadow: 0 0 10px gray;
  }

  a {
    line-height: 0;
    /* border-radius: 12px; */
    box-shadow: 0 0 3px white;
    border: none;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: rgba(0, 0, 0, 1);
      box-shadow: 0 0 10px gray;
    }
  }
`;
