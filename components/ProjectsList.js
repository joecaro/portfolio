import React from "react";
import { useRouter } from "next/router";
import handleRedirect from "../lib/handleRedirect";
import { useTheme, themes } from "../lib/ThemeContext";
import ButtonLink from "./styles/ButtonLink";
import styled from "styled-components";
import ProjectCard from "./ProjectCard";

export default function ProjectsList({ projects }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const cardWidth = 500;
  return (
    <ListContainer>
      <ButtonLink
        isDarkMode={theme === themes.dark}
        onClick={() => handleRedirect(router, "/projects")}>
        Projects
      </ButtonLink>
      <List>
        {projects.map((project) => (
          <Item
            isDarkMode={theme === themes.dark}
            key={`${project.slug}-container`}>
            <ProjectCard
              key={project.slug}
              project={project}
              isDark={theme === themes.dark}
              width={cardWidth}
            />
            <ProjectDetails
              isDarkMode={theme === themes.dark}
              width={cardWidth}>
              <p style={{ fontSize: "1.2rem" }}>{project.description}</p>
              <p>{project.stack}</p>
            </ProjectDetails>
          </Item>
        ))}
      </List>
      <ButtonLink
        isDarkMode={theme === themes.dark}
        onClick={() => handleRedirect(router, "/projects")}>
        See More Projects...
      </ButtonLink>
    </ListContainer>
  );
}

const ListContainer = styled.section`
  margin-top: 5rem;
  padding: 5rem 2rem;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const List = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
`;

const ProjectDetails = styled.div`
  margin: auto auto 50px;
  max-width: 80%;
  width: ${({ width }) => `${width}px`};
  color: ${({ isDarkMode }) => (isDarkMode ? "#aaa" : "#222")};
`;

const Item = styled.div`
  backdrop-filter: blur(16px);
  background-color: ${({ isDarkMode }) => (isDarkMode ? "" : "#ffffff44")};
  padding: 2rem 0;
  margin: 1rem;
  display: grid;
  width: 100%;
`;
