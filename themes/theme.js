"use client";
import { useState, useEffect } from "react";

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
    <div>
      <button onClick={() => changeTheme("light")}>Light</button>
      <button onClick={() => changeTheme("dark")}>Dark</button>
      <button onClick={() => changeTheme("colorful")}>Colorful</button>
    </div>
  );
};
