import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  light: {
    foreground: "#111",
    background: "hsl(47, 80%, 97%)",
    white: "#fafafa",
    secondary: "#ccc",
    header: "#bbb",
    red: "rgb(223,73,14)",
    yellow: "rgb(223,186,25)",
    green: "rgb(30,184,16)",
  },
  dark: {
    foreground: "#ddd",
    background: "#333",
    secondary: "#444",
    header: "#222",
    red: "#111",
    yellow: "#555",
    green: "#333",
  },
  fonts: ["sans-serif", "Roboto"],
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em",
  },
  maxWidth: "1300px",
};

const StyledThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default StyledThemeProvider;
