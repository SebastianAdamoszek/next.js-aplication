"use client";
import React from "react";
import { HeaderComponent } from "../components/Header/Header.js";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import styles from "./layout.module.css";
import ChatPage from "@/components/Chat/ChatPage.js";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>
        <div>
          <HeaderComponent />

          <main>{children}</main>
          <footer>
            <ul className={styles.footer}>
              <li>
              <ChatPage/>

                <p>Footer Content</p>
              </li>
            </ul>
          </footer>
        </div>
      </body>
    </html>
  );
}
