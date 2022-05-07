import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
 LIGHT: "light",
 DARK: "dark",
 GRAY: "gray",
};

const StyledThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default StyledThemeProvider;
