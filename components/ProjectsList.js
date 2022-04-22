import React from "react";
import { useTheme, themes } from "../lib/ThemeContext";
import ButtonLink from "./styles/ButtonLink";
import styled from "styled-components";
import ProjectCard from "./ProjectCard";
import { CSSTransition } from "react-transition-group";
import Fade from "react-reveal/Fade";
import SelectButton from "./SelectButton";

export default function ProjectsList({ filter, setFilter, projects }) {
  const { theme, setTheme } = useTheme();
  const cardWidth = 500;

  return (
    <ListContainer theme={theme}>
      <h2>Projects</h2>
      <div className='filter-select'>
        <SelectButton
          theme={theme}
          filter={filter}
          setFilter={setFilter}
          name={"Featured"}
        />
        <SelectButton
          theme={theme}
          filter={filter}
          setFilter={setFilter}
          name={"ReactJS"}
        />
        <SelectButton
          theme={theme}
          filter={filter}
          setFilter={setFilter}
          name={"NextJS"}
        />
        <SelectButton
          theme={theme}
          filter={filter}
          setFilter={setFilter}
          name={"Javascript"}
        />
        <SelectButton
          theme={theme}
          filter={filter}
          setFilter={setFilter}
          name={"C#"}
        />
        <SelectButton
          theme={theme}
          filter={filter}
          setFilter={setFilter}
          name={"Game"}
        />
        <SelectButton
          theme={theme}
          filter={filter}
          setFilter={setFilter}
          name={"Blockchain"}
        />
      </div>
      <List>
        {projects.map((project) => (
          <CSSTransition
            key={`${project.slug}-transition`}
            in={project.tags.includes(filter)}
            timeout={300}
            classNames='project'
            unmountOnExit
            exit={false}>
            <div className='project' key={`${project.slug}-container`}>
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
            </div>
          </CSSTransition>
        ))}
      </List>
      <ButtonLink
        style={{ alignSelf: "flex-end" }}
        theme={theme}
        href='/projects'>
        See All Projects...
      </ButtonLink>
    </ListContainer>
  );
}

const ListContainer = styled.div`
  margin-top: 5rem;
  padding: 5rem 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.foreground};

  .filter-select {
    align-self: center;
  }
`;

const List = styled.div`
  list-style: none;
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};

  flex-wrap: wrap;

  .project {
    display: flex;
    flex-direction: column;
  }
  .project-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  .project-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms;
  }
  .project-exit {
    opacity: 1;
  }
  .project-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
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
