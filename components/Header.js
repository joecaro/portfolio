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
    <HeaderStyles>
      <MaxWidthContainer>
        <Link passHref href="/">
          <svg width="50" height="50" viewBox="0 0 256 256">
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M208.778 43.602L112.499 43.602L110.394 155.193L65.5138 155.193L65.2463 138.046L41.222 138.046L42.2588 177.851L208.778 177.851L208.778 138.046L187.42 138.046L187.42 155.193L136.119 155.193L136.119 64.2487L187.764 64.2487L187.764 75.8804L208.778 75.8804L208.778 43.602Z"
              fill="currentfill"
              fillRule="evenodd"
              opacity="1"
              stroke="none"
            />
          </svg>
        </Link>
        <Nav />
        <MobileNav />
      </MaxWidthContainer>
    </HeaderStyles>
  );
}

const HeaderStyles = styled.header`
  svg {
    margin: auto 0;
  }

  a {
    :hover {
      text-decoration: underline;
    }
  }
  svg {
    :hover {
      cursor: pointer;
    }
  }
`;
