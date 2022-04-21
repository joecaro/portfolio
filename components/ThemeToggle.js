import React from "react";
import styled from "styled-components";
import { themes, useTheme } from "../lib/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    let newTheme = theme === themes.light ? themes.dark : themes.light;
    setTheme(newTheme);
    localStorage.setItem("themeSetting", JSON.stringify(newTheme));
  };

  return (
    <Toggle
      toggled={theme.background === themes.dark.background}
      onClick={handleToggleTheme}></Toggle>
  );
};

export default ThemeToggle;

const Toggle = styled.button`
  width: 4rem;
  height: 1.8rem;

  background-color: #ccc;

  border: none;
  border-radius: 0.25rem;
  position: relative;
  padding: 0;

  :before {
    content: "";
  }

  @media (min-width: 1550px) {
    :before {
      content: "Theme Toggle";
      position: absolute;
      right: -6rem;
    }
  }

  :after {
    position: absolute;
    content: "";
    width: 2rem;
    height: 1.8rem;
    background: #555;
    top: 0;
    left: ${(props) => (props.toggled ? "2rem" : "0")};
    border-radius: 0.25rem;
    transition: 0.2s;
  }
`;
