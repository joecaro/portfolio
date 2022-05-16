import React, { useContext, useState, useEffect } from "react";
import detectColorScheme from "./detectColorScheme";

export const ThemeContext = React.createContext({
  theme: undefined,
  setTheme: async (theme) => null,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    let theme = detectColorScheme();

    setTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
