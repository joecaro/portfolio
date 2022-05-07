import React from "react";
import Head from "next/head";
import { markdownToHtml } from "../../lib/markdownToHtml";
import getAllProjects, { getProjectBySlug } from "../../lib/getAllProjects";
import styles from "../../styles/ProjectPage.module.css";
import styled from "styled-components";
import { useTheme, themes } from "../../lib/ThemeContext";

const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Body = styled.div`
  width: 80%;
  max-width: 900px;
  margin: auto;
`;

const Article = styled.article`
  margin-top: 150px;
  padding: 20px;
  img {
    width: 50%;
    aspect-ratio: 6/5;
  }
`;

export default function Slug(props) {
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

      <Main isDark={theme === themes.dark}>
        <Article>
          <h1>{props.project.title}</h1>
          <Body
            dangerouslySetInnerHTML={{ __html: props.project.content }}></Body>
        </Article>
      </Main>
    </div>
  );
}

export async function getStaticProps(paths) {
  const project = getProjectBySlug(paths.params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "tags",
  ]);

  let content = await markdownToHtml(project.content || "");

  content = content !== undefined ? content : "";

  return {
    props: {
      project: {
        ...project,
        content: content.value,
      },
    },
  };
}

export async function getStaticPaths() {
  const projects = getAllProjects(["slug", "date"]);

  return {
    paths: projects.map((project) => {
      return {
        params: {
          slug: project.slug,
        },
      };
    }),
    fallback: false,
  };
}
