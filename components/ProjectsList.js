import React from "react";
import { useRouter } from "next/router";
import handleRedirect from "../lib/handleRedirect";
import { useTheme, themes } from "../lib/ThemeContext";
import ButtonLink from "./styles/ButtonLink";
import styled from "styled-components";
import ProjectCard from "./ProjectCard";

export default function ProjectsList() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const cardWidth = 300;
  return (
    <ListContainer>
      <ButtonLink
        isDarkMode={theme === themes.dark}
        onClick={() => handleRedirect(router, "/projects")}>
        Projects
      </ButtonLink>
      <List>
        <ProjectCard isDark={theme === themes.dark} width={cardWidth} />
        <ProjectCard isDark={theme === themes.dark} width={cardWidth} />
        <ProjectCard isDark={theme === themes.dark} width={cardWidth} />
        <ProjectCard isDark={theme === themes.dark} width={cardWidth} />
      </List>
    </ListContainer>
  );
}

const ListContainer = styled.div`
  margin-top: 5rem;
  width: 100%;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const List = styled.div`
  padding: 20px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
