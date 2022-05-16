import React from "react";
import AboutMe from "../components/AboutMe";
import Art from "../components/Art";
import SurfGame from "../components/SurfGame";
import ProfilePic from "../components/ProfilePic";
import { themes, useTheme } from "../lib/ThemeContext";
import Main from "../components/styles/Main";
import Technologies from "../components/Technologies";
import styled from "styled-components";

const about = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { theme } = useTheme();
  return (
    <Main lightTheme={theme === "light"}>
      <section className='max-width centered'>
        <ProfilePic />
        <AboutMe />
      </section>
      <AboutHero>
        <div>
          <h3>Experience</h3>
          <p></p>
        </div>
        <Technologies />
      </AboutHero>
      <Art />
      <SurfGame />
    </Main>
  );
};

export default about;

export const Section = styled.section`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 8rem auto;
  padding: 0 1rem;
`;

const AboutHero = styled.section`
  max-width: 1300px;
  margin: 8rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
