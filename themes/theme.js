"use client";
import { useState, useEffect } from "react";
import { BtnDark, BtnLight, BtnOrange, ThemeContainer } from "./theme.styled";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  // Funkcja do zapamiętania wybranego motywu w localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
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
      <BtnLight onClick={() => changeTheme("light")}></BtnLight>
      <BtnDark onClick={() => changeTheme("dark")}></BtnDark>
      <BtnOrange onClick={() => changeTheme("colorful")}></BtnOrange>
    </ThemeContainer>
  );
};
