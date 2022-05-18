import Head from "next/head";
import { useTheme, themes } from "../lib/ThemeContext";
import ProjectsList from "../components/ProjectsList";
import styled from "styled-components";
import getAllProjects from "../lib/getAllProjects";
import { useEffect } from "react";
import AboutMe from "../components/AboutMe";
import Hero from "../components/Hero";
import { Form } from "./contact";

export default function Home(props) {
  const { theme } = useTheme();

  return (
    <div>
      <Head>
        <title>Joseph Carothers</title>
        <meta
          name='description'
          content='Web Development Portfolio for Joseph Carothers'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main id='main-container'>
        <Hero />

        <ProjectsList projects={props.projects} />
        <Form />
      </main>
    </div>
  );
}

const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
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
    "position",
    "tech",
  ]);

  const sortedProjects = projects.sort((a, b) => a.position - b.position);

  return {
    props: { projects: sortedProjects },
  };
}
