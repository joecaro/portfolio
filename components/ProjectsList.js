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
        theme={theme}
        onClick={() => handleRedirect(router, "/projects")}>
        Projects
      </ButtonLink>
      <List>
        {projects.map((project) => (
          <li className='project' key={`${project.slug}-container`}>
            <ProjectCard
              key={project.slug}
              project={project}
              theme={theme}
              width={cardWidth}
            />
            <ProjectDetails theme={theme} width={cardWidth}>
              <p style={{ fontSize: "1rem" }}>{project.description}</p>
              <p>{project.stack}</p>
            </ProjectDetails>
          </li>
        ))}
      </List>
      <ButtonLink
        theme={theme}
        onClick={() => handleRedirect(router, "/projects")}>
        See More Projects...
      </ButtonLink>
    </ListContainer>
  );
}

const ListContainer = styled.div`
  margin-top: 5rem;
  padding: 5rem 2rem;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const List = styled.ul`
  list-style: none;
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
  .project {
    display: flex;
    flex-direction: column;
  }
`;

const ProjectDetails = styled.div`
  margin: auto auto 50px;
  max-width: 80%;
  width: ${({ width }) => `${width}px`};
  color: ${({ theme }) => theme.foreground};
  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;
