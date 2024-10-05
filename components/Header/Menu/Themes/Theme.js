"use client";
import { useState, useEffect } from "react";
import { BtnDark, BtnLight, BtnOrange, ThemeContainer } from "./Theme.styled";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  // Funkcja do zapamiętania wybranego motywu w localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Zmieniamy motyw i zapisujemy go w localStorage
  const changeTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
  };

  return (
    <ThemeContainer>
      <BtnDark onClick={() => changeTheme("dark")}></BtnDark>
      <BtnLight onClick={() => changeTheme("light")}></BtnLight>
      <BtnOrange onClick={() => changeTheme("orange")}></BtnOrange>
    </ThemeContainer>
  );
};
