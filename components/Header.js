import React from "react";
import Nav from "./Nav";
import Link from "next/link";
import styled from "styled-components";
import { MaxWidthContainer } from "./styles/MaxWidthContainer";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <HeaderStyles>
      <MaxWidthContainer>
        <Link passHref href='/'>
          <span>Joseph Carothers</span>
        </Link>
        <Nav />
        <MobileNav />
      </MaxWidthContainer>
    </HeaderStyles>
  );
}

const HeaderStyles = styled.header`
  max-width: var(--maxWidth);
  margin: auto;
  padding: 1rem;
  font-size: 1.2rem;
  height: 5.5rem;

  span {
    margin: auto 0;
    font-weight: 600;
    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
