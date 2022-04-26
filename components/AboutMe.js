import React from "react";
import styled from "styled-components";
import { themes, useTheme } from "../lib/ThemeContext";

export default function AboutMe() {
  const { theme } = useTheme();

  return (
    <AboutMeSection lightTheme={theme.foreground === themes.light.foreground}>
      <div className='pgrph'>
        <p>
          I am a <strong> web developer</strong> creating interactive
          applications, company websites, and company tools.{"I've "}focused
          primarily on front-ent applications, but have am comfortable working
          with back-end technologies. I find fulfillment in taking on topics
          that expand my skills and knowledge. Beyond web development, you can
          see the product of some of my other interests below.
        </p>
      </div>
    </AboutMeSection>
  );
}

const AboutMeSection = styled.section`
  max-width: 1300px;
  color: ${(props) =>
    props.lightTheme
      ? props.theme.light.foreground
      : props.theme.dark.foreground};
  padding: 2rem;
  border-radius: 0.5rem;

  .pgrph {
    position: relative;
    border-radius: 3px;
    font-size: 1.4rem;
    font-weight: 300;
    width: clamp(20ch, 80%, 50ch);
    margin: auto;
    font-family: "Courier New", Courier, monospace;

    p {
      margin: 0;
    }
  }

  section {
    margin: 6rem 0;
  }
`;
