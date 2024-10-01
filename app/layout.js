"use client";
import React from "react";
import { HeaderComponent } from "@/components/Header/Header.js";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import styles from "./layout.module.css";
import { ChatPage } from "@/components/Chat/ChatPage.js";
import { AuthForm } from "@/components/Authorization/AuthForm";
import { AuthStatus } from "@/components/Authorization/AuthStatus";


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
          <ChatPage/>
          <AuthForm />

          <main>{children}</main>
          <footer>
            <ul className={styles.footer}>
              <li>
                <p>Footer Content</p>
              </li>
            </ul>
          </footer>
        </div>
      </body>
    </html>
  );
}
