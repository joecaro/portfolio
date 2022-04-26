import React from "react";
import styled from "styled-components";
import AboutMe from "../components/AboutMe";
import Art from "../components/Art";
import SurfGame from "../components/SurfGame";
import JosephCarothers from "../components/JosephCarothers";
import ProfilePic from "../components/ProfilePic";
import { themes, useTheme } from "../lib/ThemeContext";

const about = () => {
  const { theme } = useTheme();
  return (
    <Main lightTheme={theme.foreground === themes.light.foreground}>
      <section className='max-width two-columns'>
        <div className='centered'>
          <ProfilePic />
          <JosephCarothers />
        </div>
        <AboutMe />
      </section>
      <Art />
      <SurfGame />
    </Main>
  );
};

export default about;

export const Main = styled.main`
  background-color: ${(props) =>
    props.lightTheme
      ? props.theme.light.background
      : props.theme.dark.background};

  .max-width {
    max-width: ${(props) => props.theme.maxWidth};
    margin: auto;
  }

  .centered {
    display: grid;
    place-items: center;
  }

  .two-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
  }

  .card-list {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 1rem;
    list-style-type: none;
  }

  h1 {
    text-align: center;
    font-size: 3rem;
  }
`;
