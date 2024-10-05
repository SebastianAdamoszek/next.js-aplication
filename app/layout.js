"use client";
import React from "react";
import { HeaderComponent } from "@/components/Header/Header.js";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import styles from "./layout.module.css";
import { ChatPage } from "@/components/Chat/ChatPage.js";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    cursor: url('/icons8-cursor.svg'), auto;
  }

  button, a, span {
    cursor: url('/cursor-pointer.svg'), pointer;
  }
`;

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <>
      <GlobalStyle />
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
              <ChatPage />

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
    </>
  );
}
