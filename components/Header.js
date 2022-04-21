import React, { useEffect } from "react";
import Nav from "./Nav";
import Link from "next/link";
import styled from "styled-components";
import { themes, useTheme } from "../lib/ThemeContext";
import { MaxWidthContainer } from "./styles/MaxWidthContainer";
import MobileNav from "./MobileNav";

export default function Header() {
  const { theme } = useTheme();
  return (
    <HeaderStyles lightTheme={theme === themes.light}>
      <MaxWidthContainer>
        <Link href='/'>home</Link>
        <Nav />
        <MobileNav />
      </MaxWidthContainer>
    </HeaderStyles>
  );
}

const HeaderStyles = styled.header`
  margin: 0;
  background-color: ${(props) =>
    props.lightTheme ? props.theme.light.background : "#000"};
  display: flex;
  justify-content: space-between;

  padding: 0.5rem 4rem;

  font-size: 1.5rem;

  color: ${(props) =>
    props.lightTheme
      ? props.theme.light.foreground
      : props.theme.dark.foreground};

  a {
    color: ${(props) =>
      props.lightTheme
        ? props.theme.light.foreground
        : props.theme.dark.foreground};
    :hover {
      text-decoration: underline;
    }
  }
`;
