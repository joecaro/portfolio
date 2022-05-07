import React from "react";
import { themes, useTheme } from "../lib/ThemeContext";
import ButtonLink from "./styles/ButtonLink";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import SelectButton from "./SelectButton";
import Link from "next/link";

export default function ProjectsList({ filter, setFilter, projects }) {
  return (
    <div>
      <h2>Projects</h2>
      <div className="filter-select">
        <SelectButton filter={filter} setFilter={setFilter} name={"Featured"} />
        <SelectButton filter={filter} setFilter={setFilter} name={"ReactJS"} />
        <SelectButton filter={filter} setFilter={setFilter} name={"NextJS"} />
        <SelectButton
          filter={filter}
          setFilter={setFilter}
          name={"Javascript"}
        />
        <SelectButton filter={filter} setFilter={setFilter} name={"C#"} />
        <SelectButton filter={filter} setFilter={setFilter} name={"Game"} />
        <button filter={filter} setFilter={setFilter} name={"Blockchain"} />
      </div>
      <div>
        {projects.map((project) => {
          return (
            <CSSTransition
              key={`${project.slug}-transition`}
              in={project.tags.includes(filter)}
              timeout={300}
              classNames="project"
              unmountOnExit
              exit={false}
            >
              <div key={`${project.slug}-container`}>
                <p className="title">{project.title}</p>
                <div className="links">
                  {project.github !== "not available" && (
                    <a target="_blank" rel="noreferrer" href={project.github}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="hsl(300, 50%, 39%)"
                        className="bi bi-github"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </a>
                  )}
                  {project.github === "not available" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill={"#555"}
                      className="bi bi-github"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  )}
                  {project.demo !== "not available" && (
                    <a target="_blank" rel="noreferrer" href={project.demo}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="hsl(200, 50%, 50%)"
                        className="bi bi-link"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                        <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                      </svg>
                    </a>
                  )}
                  {project.demo === "not available" && (
                    <a target="_blank" rel="noreferrer" href={project.demo}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill={"#555"}
                        className="bi bi-link"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                        <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                      </svg>
                    </a>
                  )}
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    href={`/projects/${project.slug}`}
                  >
                    Read More...
                  </Link>
                </div>
                <p className="description">{project.description}</p>

                <div className="stack">
                  <b>STACK |</b>
                  <div>
                    {project.stack.map((tech) => (
                      <p
                        key={`${project.title} ${tech}`}
                        className="stack-item"
                      >
                        {tech}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </CSSTransition>
          );
        })}
      </div>
      <div>
        <Link href="/projects">See All Projects...</Link>
      </div>
    </div>
  );
}
