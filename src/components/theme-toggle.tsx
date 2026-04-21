"use client";

import { useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") {
      return "dark";
    }

    return (document.documentElement.dataset.theme as Theme | undefined) ?? "dark";
  });

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("app-theme", nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button className="btn btn-outline nav-action-btn" type="button" onClick={toggleTheme}>
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
