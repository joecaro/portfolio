import React, { useContext, useState } from "react";

export const themes = {
  light: {
    foreground: "#111",
    background: "#ddd",
    header: "#bbb",
    red: "rgb(223,73,14)",
    yellow: "rgb(223,186,25)",
    green: "rgb(30,184,16)",
  },
  dark: {
    foreground: "#ddd",
    background: "#333",
    header: "#222",
    red: "#111",
    yellow: "#555",
    green: "#333",
  },
};

export const ThemeContext = React.createContext({
  theme: undefined,
  setTheme: async (theme) => null,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.dark);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
