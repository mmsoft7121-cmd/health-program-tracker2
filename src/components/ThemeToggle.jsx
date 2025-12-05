/*import React from 'react';

function ThemeToggle() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  };

  React.useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      aria-label="Toggle dark mode"
    >
      <span className="block dark:hidden text-2xl">Sun</span>
      <span className="hidden dark:block text-2xl">Moon</span>
    </button>
  );
}

export default ThemeToggle; */

import { useTheme } from "../context/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="
        p-3 rounded-full transition-all duration-300 
        bg-blue-500/20 hover:bg-blue-500/30 
        flex items-center justify-center shadow-md
      "
    >
      {darkMode ? (
        <Sun className="h-5 w-5 rotate-180 transition-all duration-300" />
      ) : (
        <Moon className="h-5 w-5 rotate-0 transition-all duration-300" />
      )}
    </button>
  );
}
