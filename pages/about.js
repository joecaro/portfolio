import React from "react";
import AboutMe from "../components/AboutMe";
import Art from "../components/Art";
import SurfGame from "../components/SurfGame";
import JosephCarothers from "../components/JosephCarothers";
import ProfilePic from "../components/ProfilePic";
import { useTheme } from "../lib/ThemeContext";
import Main from "../components/styles/Main";

const about = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
