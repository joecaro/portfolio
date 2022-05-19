import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import SelectButton from "./SelectButton";
import ProjectCard from "./ProjectCard";
import MaxWidthContainer from "./styles/MaxWidthContainer";
import { useTheme } from "../lib/ThemeContext";

export default function ProjectsList({ projects }) {
  const [filter, setFilter] = useState("featured");
  const { theme } = useTheme();

  return (
    <MaxWidthContainer>
      <Section>
        <h2>Projects</h2>
        <Select onChange={(e) => setFilter(e.target.value)}>
          <option value='featured'>Featured</option>
          <option value='reactjs'>ReactJS</option>
          <option value='nextjs'>NextJS</option>
          <option value='javascript'>Javascript</option>
          <option value='c#'>C#</option>
          <option value='game'>Game Dev</option>
          <option value='blockchain'>Blockchain</option>
        </Select>
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
          <SelectButton
            theme={theme}
            filter={filter}
            setFilter={setFilter}
            name={"Machine Learning"}
          />
        </div>
        <div className='list'>
          {projects.map((project) => {
            return (
              <CSSTransition
                key={`${project.slug}-transition`}
                in={project.tags.includes(filter)}
                timeout={300}
                classNames='project'
                unmountOnExit
                exit={false}>
                <ProjectCard
                  filter={filter}
                  setFilter={setFilter}
                  project={project}
                />
              </CSSTransition>
            );
          })}
        </div>
        <div>
          <Link href='/projects'>See All Projects...</Link>
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

  :hover {
    cursor: pointer;
  }

  @media (min-width: 900px) {
    display: none;
  }
`;

const Section = styled.section`
  padding-bottom: 5rem;
  width: 100%;

  h2 {
    font-size: 1.75rem;
  }

  .filter-select {
    display: none;
    @media (min-width: 900px) {
      display: flex;
      justify-content: space-between;
      gap: 2rem;
    }
  }

  .mobile-select {
  }

  .list {
    display: grid;
    gap: 5rem;
    overflow-x: hidden;

    padding: 2rem 0;

    @media (min-width: 1100px) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(auto-fit, minmax(200px, 350px));
    }
  }
`;
