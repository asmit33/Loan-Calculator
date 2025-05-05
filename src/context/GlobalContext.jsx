import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const [currency, setCurrency] = useState("USD");

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <GlobalContext.Provider value={{ mode, toggleMode, currency, setCurrency }}>
      {children}
    </GlobalContext.Provider>
  );
};
