import { createContext, useState, useEffect } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState("dark");

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) { setTheme(saved);}
  }, []);

  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        isLoaded,
        setIsLoaded,
        theme,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
