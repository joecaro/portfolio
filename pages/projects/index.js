import Head from "next/head";
import ProjectCard from "../../components/ProjectCard";
import getAllProjects from "../../lib/getAllProjects";
import { useTheme } from "../../lib/ThemeContext";
import styled from "styled-components";
import { Form } from "../contact";

export default function Projects(props) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Head>
        <title>Joseph Carothers</title>
        <meta
          name='description'
          content='Web Development Portfolio for Joseph Carothers'
        />
      </Head>

      <Main>
        <h1>Projects</h1>

        <div
          style={{
            display: "grid",
            gap: "5rem",
            height: "100%",
          }}>
          {props.projects.map((project, index) => {
            return (
              <ProjectCard
                key={project.slug}
                project={project}
                theme={theme}
                width={400}
              />
            );
          })}
        </div>
        <Form />
      </Main>
    </>
  );
}

const Main = styled.main`
  max-width: 1400px;
  margin: auto;
  padding: 8rem 1rem;
  @media (min-width: 1100px) {
    padding: 8rem 8rem;
  }
`;

// This function gets called at build time on server-side.
export async function getStaticProps() {
  const projects = getAllProjects([
    "slug",
    "title",
    "description",
    "stack",
    "github",
    "demo",
    "image",
    "position",
  ]);

  const sortedProjects = projects.sort((a, b) => a.position - b.position);

  return {
    props: { projects: sortedProjects },
  };
}
