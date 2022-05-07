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
display: none;

@media(min-width: 768px) {
  display: flex;
}

ul {
  list-style-type: none;
  display: flex;
  gap: 1rem;
}
`;
