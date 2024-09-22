import Head from "next/head";
import { markdownToHtml } from "../../lib/markdownToHtml";
import getAllProjects, { getProjectBySlug } from "../../lib/getAllProjects";
import styled from "styled-components";
import { useTheme } from "../../lib/ThemeContext";

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

  p {
    font-size: 1.2rem;
  }
`;

const Article = styled.article`
  padding: 20px;
  h1 {
    margin-bottom: 5rem;
  }
  img {
    width: 70%;
    justify-self: center;
  }
`;

export default function Slug(props) {
  const { theme, setTheme } = useTheme();

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

      <Main isDark={theme === "dark"}>
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
