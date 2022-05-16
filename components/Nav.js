import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { css } from "styled-components";
import { useTheme } from "../lib/ThemeContext";
import ButtonLink from "./ButtonLink";
import ThemeToggle from "./ThemeToggle";

const Nav = () => {
  const { theme } = useTheme();
  return (
    <NavStyles>
      <ul>
        <ListItem lightTheme={theme === "light"}>
          <Link href='/'>Home</Link>
        </ListItem>
        <ListItem lightTheme={theme === "light"}>
          <Link href='/about'>About</Link>
        </ListItem>
        <ListItem lightTheme={theme === "light"}>
          <Link href='/projects'>Projects</Link>
        </ListItem>
        <ListItem lightTheme={theme === "light"}>
          <ButtonLink href='/contact' animated={false} color='purple'>
            Contact
          </ButtonLink>
        </ListItem>
      </ul>
      <ThemeToggle />
    </NavStyles>
  );
};

export default Nav;

const lightGradient = css`
linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 90%,
      var(--purple300)
    );
`;
const darkGradient = css`
linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 90%,
      var(--purple700)
    );
`;

const NavStyles = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  ul {
    list-style-type: none;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const ListItem = styled.li`
  height: fit-content;
  a {
    background-image: ${(props) =>
      props === "light" ? lightGradient : darkGradient};
    background-repeat: no-repeat;
    background-size: 0% 100%;
    background-position-x: right;

    transition: background-size 200ms;

    :hover {
      background-size: 100% 100%;
      background-position-x: left;
    }
  }
`;
