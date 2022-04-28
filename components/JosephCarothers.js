import React from "react";
import styled from "styled-components";
import { themes, useTheme } from "../lib/ThemeContext";

const JosephCarothers = () => {
  const { theme } = useTheme();

  return (
    <Name lightTheme={theme.foreground === themes.light.foreground}>
      Joseph Carothers
    </Name>
  );
};

export default JosephCarothers;

const Name = styled.h1`
  margin: 2.5rem;
  font-size: 4.5rem;
  font-weight: 400;
  font-family: "Courier New", Courier, monospace;
  color: ${(props) =>
    props.lightTheme
      ? props.theme.light.foreground
      : props.theme.dark.foreground};
`;
