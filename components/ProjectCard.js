import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import ButtonLink from "./ButtonLink";
import { useTheme } from "../lib/ThemeContext";
import { keyframes } from "styled-components";
import { css } from "styled-components";

export default function ProjectCard({ project }) {
  const { theme } = useTheme();
  return (
    <Container theme={theme}>
      <ProjectImage>
        <Image
          src={project.image}
          layout='fill'
          objectFit='contain'
          alt={`${project.name} - image`}></Image>
      </ProjectImage>
      <div className='header'>
        <Link
          target='_blank'
          rel='noreferrer'
          href={`/projects/${project.slug}`}
          passHref>
          <div className='title'>{project.title}</div>
        </Link>
        <div className='links'>
          {project.demo && (
            <ButtonLink
              inverted
              target='_blank'
              rel='noreferrer'
              href={project.demo === "not available" ? null : project.demo}>
              Demo
            </ButtonLink>
          )}
          {project.github && (
            <Link passHref href={project.github}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                fill='currentColor'
                viewBox='0 0 16 16'>
                <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
              </svg>
            </Link>
          )}
        </div>
      </div>
      <p className='description'>{project.description}</p>

      <div className='stack-container'>
        <b>STACK |</b>
        <div className='stack'>
          {project.stack.map((tech) => (
            <p key={`${project.title} ${tech}`} className='stack-item'>
              {tech}
            </p>
          ))}
        </div>
      </div>
    </Container>
  );
}

const enterKeyframes = keyframes`
0% {opacity: 0}
1% {transform: translateX(-50px)}
99% {opacity: 1}
100% {transform: translateX(0))}
`;

const enterAnimation = (props) =>
  css`
    ${enterKeyframes} .5s 1
  `;

const Container = styled.div`
  min-height: 300px;
  display: grid;
  grid-template-areas:
    " header"
    " desciption"
    " stack";
  grid-template-columns: 1fr;
  grid-template-rows: 100px 1fr 1fr;
  place-items: center;

  border-radius: var(--radiusMd);
  border-bottom: 4px solid var(--gray700);
  border-right: 4px solid var(--gray700);
  padding: 3rem 2rem;

  background-color: ${(props) => (props.theme === "light" ? "#fff" : "#444")};

  animation: ${enterAnimation};

  @media (min-width: 900px) {
    grid-template-rows: 60px 1fr 1fr 1fr;
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
      "image header "
      "image desciption "
      "image desciption "
      "image stack ";
  }

  .header {
    align-self: start;

    grid-area: header;
    width: 100%;
    display: flex;
    justify-content: space-between;

    svg {
      cursor: pointer;
      :hover {
        transform: scale(1.1);
      }
    }
  }

  .title {
    grid-area: title;
    font-size: 1.5rem;
    font-weight: 600;
    padding: 0;
    text-decoration: underline;
    :hover {
      cursor: pointer;
      opacity: 0.5;
    }
    @media (min-width: 900px) {
      justify-self: start;
    }
  }

  .links {
    display: flex;
    gap: 1rem;
  }
  .description {
    justify-self: start;
    grid-area: desciption;
    @media (min-width: 900px) {
      place-self: start;
    }
  }

  .stack-container {
    grid-area: stack;
    justify-self: start;
    display: grid;
    grid-template-columns: 5rem 1fr;
  }

  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .stack-item {
    width: fit-content;
    height: fit-content;

    margin: 0;
    flex: 0;

    color: ${(props) =>
      props.theme === "light" ? "var(--warning200)" : "var(--warning700)"};
    background-color: ${(props) =>
      props.theme === "light" ? "var(--warning600)" : "var(--warning200)"};
    padding: 0.25rem;
    border-radius: var(--radiusSm);
  }

  a {
    :hover {
      text-decoration: underline;
    }
  }
`;

const ProjectImage = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;

  grid-area: image;
`;
