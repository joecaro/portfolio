import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { themes, useTheme } from "../lib/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const MobileNav = () => {
  const [toggled, setToggled] = useState(false);
  const { theme } = useTheme();
  return (
    <NavStyles toggled={toggled} theme={theme}>
      <ul>
        <ToggleNav onClick={() => setToggled(!toggled)}>X</ToggleNav>
        <li onClick={() => setToggled(!toggled)}>
          <Link href='about'>About</Link>
        </li>
        <li onClick={() => setToggled(!toggled)}>
          <Link href='projects'>Projects</Link>
        </li>
        <li onClick={() => setToggled(!toggled)}>
          <Link href='contact'>Contact</Link>
        </li>
        <ThemeToggle />
      </ul>
      <ToggleNav onClick={() => setToggled(!toggled)}>+</ToggleNav>
    </NavStyles>
  );
};

export default MobileNav;

const ToggleNav = styled.button`
  font-size: 3.5rem;
  background-color: transparent;
  border: none;
  width: fit-content;
  align-self: flex-end;
`;

const NavStyles = styled.nav`
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    display: none;
  }

  button {
  }

  ul {
    display: ${(props) => (props.toggled ? "flex" : "none")};
    flex-direction: column;
    justify-items: center;

    margin: 0;
    padding: 1rem;

    gap: 1rem;
    list-style-type: none;
    z-index: 9;

    background-color: ${(props) =>
      props.theme === "light" ? "var(--gray900)" : "var(--gray300)"};

    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
`;
