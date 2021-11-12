import React from "react";
import { useRouter } from "next/router";
import handleRedirect from "../lib/handleRedirect";
import { useTheme, themes } from "../lib/ThemeContext";
import ButtonLink from "./styles/ButtonLink";

const headerStyles = {
  position: "absolute",
  top: "0",
  width: "100vw",
  height: "100px",
  padding: "20px",
  display: "flex",
  justifyContent: "flex-start",
  fontSize: "2rem",
  color: "white",
};

export default function Header() {
  const router = useRouter();

  const { theme, setTheme } = useTheme();

  return (
    <div style={headerStyles}>
      {router.pathname !== "/" && (
        <ButtonLink
          isDarkMode={theme === themes.dark}
          onClick={() => handleRedirect(router, "/")}>
          home
        </ButtonLink>
      )}
    </div>
  );
}
