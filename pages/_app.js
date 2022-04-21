import Header from "../components/Header";
import StyledThemeProvider from "../components/StyledThemeProvider";
import { ThemeProvider } from "../lib/ThemeContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
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
