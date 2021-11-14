import React from "react";
import Head from "next/head";
import { markdownToHtml } from "../../lib/markdownToHtml";
import getAllProjects, { getProjectBySlug } from "../../lib/getAllProjects";
import Light from "../../components/Light";
import styles from "../../styles/ProjectPage.module.css";
import styled from "styled-components";

const Body = styled.div`
  width: 80%;
  max-width: 900px;
  margin: auto;
`;

const Article = styled.article`
  margin-top: 150px;
  padding: 20px;
`;

export default function slug(props) {
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

      <main className={styles.main}>
        <div className={styles.cover} id='cover'></div>

        <Light />
        <Article>
          <h1 className={styles.title}>{props.project.title}</h1>
          <Body
            dangerouslySetInnerHTML={{ __html: props.project.content }}></Body>
        </Article>
      </main>
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
