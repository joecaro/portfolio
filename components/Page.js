import Header from "../components/Header";
import { useEffect } from "react";
import { useTheme } from "../lib/ThemeContext";

const Page = ({ children }) => {
  const { theme } = useTheme();

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return (
    <div data-theme={theme}>
      <Header />
      {children}
    </div>
  );
};

export default Page;
