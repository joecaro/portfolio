import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { useTheme, themes } from "../lib/ThemeContext";
import ProjectsList from "../components/ProjectsList";
import styled from "styled-components";
import getAllProjects from "../lib/getAllProjects";
import { useEffect } from "react";
import ButtonLink from "../components/styles/ButtonLink";
import handledRedirect from "../lib/handleRedirect";
import Cover from "../components/Cover";
import Light from "../components/Light";

export default function Home(props) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    let themeSetting = localStorage.getItem("themeSetting");
    if (themeSetting) {
      console.log(JSON.parse(themeSetting));
      console.log(themes.dark);
      setTheme(
        JSON.parse(themeSetting).foreground === themes.light.foreground
          ? themes.light
          : themes.dark
      );
    } else {
      localStorage.setItem("themeSetting", JSON.stringify(themes.dark));
    }
  }, []);

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
        <Light animate={true} />
        <h1
          className={`${styles.title} ${
            theme === themes.dark && styles.titleDark
          }`}>
          Joseph Carothers
        </h1>

        <div
          className={`${styles.grid} ${theme === themes.dark && styles.dark}`}>
          <LogoLink
            isDark={theme === themes.dark}
            color={"rgb(150, 50, 150)"}
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/joecaro'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              fill='currentColor'
              className='bi bi-github'
              viewBox='0 0 16 16'>
              <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
            </svg>
          </LogoLink>

          <LogoLink
            isDark={theme === themes.dark}
            color={"rgb(0, 115, 177)"}
            href='https://www.linkedin.com/in/joseph-samuel-carothers-b36218132/'
            rel='noopener noreferrer'
            target='_blank'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              fill='currentColor'
              className='bi bi-linkedin'
              viewBox='0 0 16 16'>
              <path d='M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z' />
            </svg>
          </LogoLink>

          <LogoLink
            isDark={theme === themes.dark}
            color={"rgb(0, 0, 0)"}
            href='/files/Resume_Joseph_Carothers_11-21.docx'
            rel='noopener noreferrer'
            target='_blank'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              fill='currentColor'
              className='bi bi-file-earmark-person'
              viewBox='0 0 16 16'>
              <path d='M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
              <path d='M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z' />
            </svg>
          </LogoLink>

          <LogoLink
            isDark={theme === themes.dark}
            color={"rgb(0, 150, 250)"}
            href='mailto:joseph.samuel.carothers@gmail.com?subject=I Love Your Portfolio!&body=I really want you on my team.'
            rel='noopener noreferrer'
            target='_blank'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              fill='currentColor'
              className='bi bi-envelope-fill'
              viewBox='0 0 16 16'>
              <path d='M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z' />
            </svg>
          </LogoLink>
        </div>

        <ProjectsList projects={props.projects} />
      </main>
    </div>
  );
}

const LogoLink = styled.a`
  margin: 1rem;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  color: ${({ isDark, color }) => (isDark ? "inherit" : `${color}`)};
  transition: color 0.15s ease;
  max-width: 300px;
  animation: flicker 10s linear 3s infinite;
  :hover {
    color: #dddd99;
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
    "tags",
    "image",
  ]);

  let featuredProjects = projects.filter((project) =>
    project.tags.includes("featured")
  );

  return {
    props: { projects: featuredProjects },
  };
}
