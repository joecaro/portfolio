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
          <div key={`${project.slug}-container`}>
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
          </div>
        ))}
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
