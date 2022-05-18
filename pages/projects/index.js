import Head from "next/head";
import ProjectCard from "../../components/ProjectCard";
import ProjectInfo from "../../components/ProjectInfo";
import getAllProjects from "../../lib/getAllProjects";
import { useTheme, themes } from "../../lib/ThemeContext";
import ButtonLink from "../../components/styles/ButtonLink";

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

      <main
        style={{
          maxWidth: "1400px",
          margin: "8rem auto",
        }}>
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
      </main>
    </>
  );
}

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
