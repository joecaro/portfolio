import Header from "../components/Header";
import { useEffect } from "react";
import { useTheme } from "../lib/ThemeContext";
import Head from "next/head";

const Page = ({ children }) => {
  const { theme } = useTheme();

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.png' />
      </Head>
      <div style={{ minHeight: "100vw" }} data-theme={theme}>
        <Header />
        {children}
      </div>
    </>
  );
};

export default Page;
