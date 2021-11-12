import Head from "next/head";
import { useEffect } from "react";
import Light from "../../components/Light";
import ProjectCard from "../../components/ProjectCard";
import ProjectInfo from "../../components/ProjectInfo";
import styles from "../../styles/Projects.module.css";
import getAllProjects from "../../lib/getAllProjects";
import Cover from "../../components/Cover";
import { useTheme, themes } from "../../lib/ThemeContext";

export default function Projects(props) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.container}>
      <Head>
        <title>Joseph Carothers</title>
        <meta
          name='description'
          content='Web Development Portfolio for Joseph Carothers'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main
        className={`${styles.main} ${
          theme === themes.light ? styles.mainLight : styles.mainDark
        }`}>
        <Cover />
        <Light />

        <h1
          className={`${styles.title} ${
            theme === themes.dark && styles.titleDark
          }`}>
          Projects
        </h1>

        <div className={styles.list}>
          {props.projects.map((project, index) => {
            return (
              <div
                key={project.slug}
                className={`${styles.project} ${
                  theme === themes.dark && styles.projectDark
                }`}>
                <ProjectInfo project={project} />
                <ProjectCard isDark={theme === themes.dark} width={400} />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

// This function gets called at build time on server-side.
export async function getStaticProps() {
  const projects = getAllProjects(["slug", "title", "description"]);

  return {
    props: { projects: projects },
  };
}
