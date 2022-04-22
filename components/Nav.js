import Link from "next/link";
import React from "react";
import styled from "styled-components";
import ThemeToggle from "./ThemeToggle";

const Nav = () => {
  return (
    <NavStyles>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/about'>About</Link>
        </li>
        <li>
          <Link href='/projects'>Projects</Link>
        </li>
        <li>
          <Link href='/contact'>Contact</Link>
        </li>
      </ul>
      <ThemeToggle />
    </NavStyles>
  );
};

export default Nav;

const NavStyles = styled.nav`
  @media (min-width: 768px) {
    display: flex;
  }
  display: none;
  align-items: center;
  gap: 1rem;
  ul {
    margin: 0;
    display: flex;
    gap: 1rem;
    list-style-type: none;
    align-items: center;
  }
`;
