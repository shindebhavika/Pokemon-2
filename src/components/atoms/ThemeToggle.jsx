import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    // On mount, ensure the theme class is applied
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <div className="w-24 h-12 bg-gray-200 rounded-full relative shadow-inner">
        <div
          className="absolute top-1 left-1 w-10 h-10 bg-white rounded-full transition-transform duration-300 ease-in-out transform"
          style={{
            transform: theme === "dark" ? "translateX(100%)" : "translateX(0)",
          }}
        >
          <div className="flex items-center justify-center h-full">
            {theme === "light" ? "☀️" : "🌑"}
          </div>
        </div>
      </div>
    </label>
  );
}
