import React from "react";
import styled from "styled-components";
import { themes, useTheme } from "../lib/ThemeContext";
import { Section } from "../pages/about";

const Technologies = () => {
  const { theme } = useTheme();
  return (
    <Styles lightTheme={theme.foreground === themes.light.foreground}>
      <h3>Technologies</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          placeItems: "start",
        }}>
        <p>Javascript</p>
        <p>HTML</p>
        <p>CSS</p>
        <p>ReactJS</p>
        <p>NextJS</p>
        <p>Styled Components</p>
        <p>NodeJS</p>
        <p>ExpresJS</p>
        <p>MongoDB</p>
        <p>SQL</p>
        <p>Planetscale</p>
      </div>
    </Styles>
  );
};

export default Technologies;

const Styles = styled.div`
  p {
    padding: 0.5rem;
    margin: 0;

    border-bottom: 3px solid
      ${(props) =>
        props.lightTheme
          ? props.theme.light.secondary
          : props.theme.dark.secondary};
    border-right: 3px solid
      ${(props) =>
        props.lightTheme
          ? props.theme.light.secondary
          : props.theme.dark.secondary};
    border-radius: 0.25rem;
  }
`;
