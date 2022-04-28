import React from "react";
import { themes, useTheme } from "../lib/ThemeContext";
import ButtonLink from "./styles/ButtonLink";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import SelectButton from "./SelectButton";
import Link from "next/link";

export default function ProjectsList({ filter, setFilter, projects }) {
  const { theme } = useTheme();

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
        {projects.map((project) => {
          return (
            <CSSTransition
              key={`${project.slug}-transition`}
              in={project.tags.includes(filter)}
              timeout={300}
              classNames='project'
              unmountOnExit
              exit={false}>
              <Project
                lightTheme={theme.foreground === themes.light.foreground}
                key={`${project.slug}-container`}>
                <p className='title'>{project.title}</p>
                <div className='links'>
                  {project.github !== "not available" && (
                    <a target='_blank' rel='noreferrer' href={project.github}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='30'
                        height='30'
                        fill='hsl(300, 50%, 39%)'
                        className='bi bi-github'
                        viewBox='0 0 16 16'>
                        <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
                      </svg>
                    </a>
                  )}
                  {project.github === "not available" && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='30'
                      height='30'
                      fill={
                        theme.foreground === themes.light.foreground
                          ? "#ddd"
                          : "#555"
                      }
                      className='bi bi-github'
                      viewBox='0 0 16 16'>
                      <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
                    </svg>
                  )}
                  {project.demo !== "not available" && (
                    <a target='_blank' rel='noreferrer' href={project.demo}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='30'
                        height='30'
                        fill='hsl(200, 50%, 50%)'
                        className='bi bi-link'
                        viewBox='0 0 16 16'>
                        <path d='M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z' />
                        <path d='M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z' />
                      </svg>
                    </a>
                  )}
                  {project.demo === "not available" && (
                    <a target='_blank' rel='noreferrer' href={project.demo}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='30'
                        height='30'
                        fill={
                          theme.foreground === themes.light.foreground
                            ? "#ddd"
                            : "#555"
                        }
                        className='bi bi-link'
                        viewBox='0 0 16 16'>
                        <path d='M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z' />
                        <path d='M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z' />
                      </svg>
                    </a>
                  )}
                  <Link
                    target='_blank'
                    rel='noreferrer'
                    href={`/projects/${project.slug}`}>
                    Read More...
                  </Link>
                </div>
                <p className='description'>{project.description}</p>

                <div className='stack'>
                  <b>STACK |</b>
                  <StackGrid
                    lightTheme={theme.foreground === themes.light.foreground}>
                    {project.stack.map((tech) => (
                      <p
                        key={`${project.title} ${tech}`}
                        className='stack-item'>
                        {tech}
                      </p>
                    ))}
                  </StackGrid>
                </div>
              </Project>
            </CSSTransition>
          );
        })}
      </List>
      <ButtonLink theme={theme}>
        <Link href='/projects'>See All Projects...</Link>
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
  color: ${({ theme }) => theme.foreground};

  h2 {
    width: min(100%, 1300px);
    align-self: center;
    font-size: 2rem;
  }

  .filter-select {
    align-self: center;
    width: 100%;
    display: flex;
    max-width: 1300px;
  }
`;

const List = styled.div`
  align-self: center;
  list-style: none;
  padding: 20px 0;
  display: grid;
  gap: 1rem;
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};

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

  .stack {
    display: grid;
    grid-template-columns: 7ch 1fr;

    b {
      padding: 0.5rem 0;
    }
  }
`;

const Project = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2rem;
  grid-template-rows: 60px 1fr;
  border-radius: 0.25rem;

  background-color: ${(props) =>
    props.lightTheme ? props.theme.light.white : props.theme.dark.secondary};
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

  padding: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  p {
    margin: 0;
    padding: 0.5rem;
  }
  .title {
    font-size: 1.5rem;
    font-weight: 500;
    margin: auto 0;
  }
  .description {
    color: ${(props) => (props.lightTheme ? "#777" : "#ccc")};
  }
  .links {
    display: flex;
    justify-content: flex-end;
    gap: 2rem;

    @media (max-width: 600px) {
      justify-content: center;
    }
    a {
      height: 30px;
      display: grid;
      place-items: center;

      :hover {
        text-decoration: underline;
      }
    }
  }
`;

const StackGrid = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.5rem;

  .stack-item {
    padding: 0.5rem;
    margin: 0;
    background-color: ${(props) =>
      props.lightTheme
        ? props.theme.light.background
        : props.theme.dark.background};
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
