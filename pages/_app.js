import { useEffect } from "react";
import Header from "../components/Header";
import StyledThemeProvider from "../components/StyledThemeProvider";
import { ThemeProvider, themes, useTheme } from "../lib/ThemeContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const { setTheme } = useTheme();

  useEffect(() => {
    let themeSetting = localStorage.getItem("themeSetting");
    if (themeSetting) {
      console.log();
      setTheme(
        JSON.parse(themeSetting).foreground === themes.light.foreground
          ? themes.light
          : themes.dark
      );
    } else {
      localStorage.setItem("themeSetting", JSON.stringify(themes.light));
    }
  }, []);
  return (
    <ThemeProvider>
      <StyledThemeProvider>
        <Header />
        <Component {...pageProps} />
      </StyledThemeProvider>
    </ThemeProvider>
  );
}

export default MyApp;
