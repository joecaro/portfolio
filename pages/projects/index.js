import Head from "next/head";
import ProjectCard from "../../components/ProjectCard";
import ProjectInfo from "../../components/ProjectInfo";
import styles from "../../styles/Projects.module.css";
import getAllProjects from "../../lib/getAllProjects";
import { useTheme, themes } from "../../lib/ThemeContext";
import ButtonLink from "../../components/styles/ButtonLink";
import handledRedirect from "../../lib/handleRedirect";
import { useRouter } from "next/router";

export default function Projects(props) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

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
                <ProjectCard project={project} theme={theme} width={400} />
              </div>
            );
          })}
        </div>
        <ButtonLink theme={theme} href='/contact'>
          Contact
        </ButtonLink>
      </main>
    </div>
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
  ]);

  return {
    props: { projects: projects },
  };
}
