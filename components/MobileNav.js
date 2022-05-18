import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import { keyframes } from "styled-components";
import { themes, useTheme } from "../lib/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const MobileNav = () => {
  const [toggled, setToggled] = useState(false);
  const { theme } = useTheme();
  return (
    <NavStyles>
      <ToggledNav toggled={toggled} theme={theme}>
        <ul>
          <ToggleNav onClick={() => setToggled(!toggled)}>x</ToggleNav>
          <li onClick={() => setToggled(!toggled)}>
            <Link href='/'>Home</Link>
          </li>
          <li onClick={() => setToggled(!toggled)}>
            <Link href='/about'>About</Link>
          </li>
          <li onClick={() => setToggled(!toggled)}>
            <Link href='/projects'>Projects</Link>
          </li>
          <li onClick={() => setToggled(!toggled)}>
            <Link href='/contact'>Contact</Link>
          </li>
          <ThemeToggle />
        </ul>
      </ToggledNav>
      <ToggleNav onClick={() => setToggled(!toggled)}>+</ToggleNav>
    </NavStyles>
  );
};

export default MobileNav;

const enterKeyframes = keyframes`
0% {opacity: 0}
1% {transform: translateY(50px)}
99% {opacity: 1}
100% {transform: translateY(0))}
`;

const enterAnimation = (props) =>
  css`
    ${enterKeyframes} .5s 1
  `;

const ToggleNav = styled.button`
  font-size: 3.5rem;
  background-color: transparent;
  border: none;
  width: fit-content;
  justify-self: end;
`;

const NavStyles = styled.nav`
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    display: none;
  }

  button {
    cursor: pointer;
  }
`;

const ToggledNav = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) =>
    props.theme === "light" ? "var(--gray900)" : "var(--gray300)"};
  display: ${(props) => (props.toggled ? "grid" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  animation: ${enterAnimation};

  ul {
    height: 50vh;
    display: grid;
    grid-template-rows: 3.5rem 1fr 1fr 1fr 1fr;

    margin: 0;
    padding: 1rem 2rem;

    gap: 1rem;
    list-style-type: none;
  }
`;
