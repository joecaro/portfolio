import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import ThemeToggle from "./ThemeToggle";

const MobileNav = () => {
  const [toggled, setToggled] = useState(false);
  return (
    <NavStyles toggled={toggled}>
      <ul>
        <ToggleNav onClick={() => setToggled(!toggled)}>X</ToggleNav>
        <li>
          <Link href='about'>About</Link>
        </li>
        <li>
          <Link href='projects'>Projects</Link>
        </li>
        <li>
          <Link href='contact'>Contact</Link>
        </li>
        <ThemeToggle />
      </ul>
      <ToggleNav onClick={() => setToggled(!toggled)}>+</ToggleNav>
    </NavStyles>
  );
};

export default MobileNav;

const ToggleNav = styled.span`
  justify-self: right;
  margin: 2rem;
  cursor: pointer;
`;

const NavStyles = styled.nav`
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    display: none;
  }

  ul {
    display: ${(props) => (props.toggled ? "grid" : "none")};

    margin: 0;

    gap: 1rem;
    list-style-type: none;
    justify-items: center;
    z-index: 9;
    background-color: ${(props) => props.theme.light.background};

    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
`;
