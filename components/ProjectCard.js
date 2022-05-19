import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import SelectButton from "./SelectButton";
import { useTheme } from "../lib/ThemeContext";
import { keyframes } from "styled-components";
import { css } from "styled-components";

export default function ProjectCard({ filter, setFilter, project }) {
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
            <Link passHref target='_blank' rel='noreferrer' href={project.demo}>
              <svg
                className='demo'
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                fill='currentColor'
                viewBox='0 0 16 16'>
                <path d='M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z' />
                <path d='M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z' />
              </svg>
            </Link>
          )}
          {project.github && (
            <Link passHref href={project.github}>
              <svg
                className='github'
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

      <div className='stack'>
        {project.stack.map((tech) => (
          <SelectButton
            filter={filter}
            setFilter={setFilter}
            name={tech}
            key={`${project.title} ${tech}`}
            className='stack-item'>
            {tech}
          </SelectButton>
        ))}
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
  display: grid;
  grid-template-areas:
    "header"
    "desciption"
    "stack";
  grid-template-rows: repeat(auto-fit, minmax(min-content, max-content));

  border-radius: var(--radiusMd);
  border-bottom: 4px solid var(--gray700);
  border-right: 4px solid var(--gray700);
  padding: 3rem 2rem;

  background-color: ${(props) => (props.theme === "light" ? "#fff" : "#444")};

  animation: ${enterAnimation};

  @media (min-width: 900px) {
    grid-template-rows: 40px 2fr 1fr;
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
      "image header "
      "image desciption "
      "stack stack ";
    gap: 0.5rem;
    min-height: 290px;
  }

  .header {
    align-self: start;

    grid-area: header;
    width: 100%;
    display: flex;
    gap: 3rem;
  }

  a {
    font-weight: 550;
    font-size: 1.3rem;
    color: var(--blue600);

    :hover {
      opacity: 0.5;
    }
  }

  svg {
    cursor: pointer;
    :hover {
      transform: scale(1.1);
      opacity: 0.5;
    }
  }

  .demo {
    color: ${(props) =>
      props.theme === "light" ? "var(--blue300)" : "var(--blue600)"};
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
    align-items: center;
    gap: 1rem;
  }

  .description {
    justify-self: start;
    grid-area: desciption;
    margin: 1rem 0 2rem;
    @media (min-width: 900px) {
      place-self: start;
    }
  }

  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    place-self: start;
    grid-area: stack;
  }

  .stack-item {
    width: fit-content;
    height: fit-content;

    margin: 0;
    flex: 0;

    color: ${(props) =>
      props.theme === "light" ? "var(--gray100)" : "var(--gray800)"};
    background-color: ${(props) =>
      props.theme === "light" ? "var(--gray800)" : "var(--gray200)"};
    padding: 0.25rem;
    border-radius: var(--radiusSm);

    :hover {
      cursor: pointer;
      transform: scale(1.1) translateY(-3px);
    }
  }

  a {
    :hover {
      text-decoration: underline;
    }
  }
`;

const ProjectImage = styled.div`
  display: none;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;

  grid-area: image;

  @media (min-width: 900px) {
    display: block;
  }
`;
