import Cover from "../components/Cover";
import Header from "../components/Header";
import Light from "../components/Light";
import { ThemeProvider } from "../lib/ThemeContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
