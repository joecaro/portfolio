import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import SelectButton from "./SelectButton";
import ProjectCard from "./ProjectCard";
import MaxWidthContainer from "./styles/MaxWidthContainer";

export default function ProjectsList({ projects }) {
  const [filter, setFilter] = useState("featured");

  return (
    <MaxWidthContainer>
      <Section>
        <h2>Projects</h2>
        <Select onChange={(e) => setFilter(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="reactjs">ReactJS</option>
          <option value="nextjs">NextJS</option>
          <option value="javascript">Javascript</option>
          <option value="c#">C#</option>
          <option value="game">Game Dev</option>
          <option value="blockchain">Blockchain</option>
        </Select>
        <div className="filter-select">
          <SelectButton
            filter={filter}
            setFilter={setFilter}
            name={"Featured"}
          />
          <SelectButton
            filter={filter}
            setFilter={setFilter}
            name={"ReactJS"}
          />
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
        <div className="list">
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
                <ProjectCard project={project} />
              </CSSTransition>
            );
          })}
        </div>
        <div>
          <Link href="/projects">See All Projects...</Link>
        </div>
      </Section>
    </MaxWidthContainer>
  );
}

const Select = styled.select`
  font-size: 1.5rem;
  border: 1px solid var(--gray200);
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin: 1rem auto;

  option {
    font-size: 0.75rem;
  }
`;

const Section = styled.section`
  padding: 0 var(--side-padding);

  h2 {
    font-size: 1.75rem;
  }

  .filter-select {
    display: none;
  }

  .mobile-select {
  }

  .list {
    height: 600px;
    overflow: scroll;
    display: grid;
    gap: 2rem;
  overflow-x: hidden;
  }
`;
