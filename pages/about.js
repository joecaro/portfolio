import AboutMe from "../components/AboutMe";
import ProfilePic from "../components/ProfilePic";
import { useTheme } from "../lib/ThemeContext";
import Main from "../components/styles/Main";
import styled from "styled-components";
import { Form } from "./contact";

const about = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { theme } = useTheme();
  return (
    <Main theme={theme}>
      <Section theme={theme}>
        <ProfilePic />
        <AboutMe />
      </Section>
      <AboutHero theme={theme}>
        <div className='column'>
          <div className='title'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='64'
              height='64'
              fill='currentColor'
              viewBox='0 0 16 16'>
              <path d='M1.5 0A1.5 1.5 0 0 0 0 1.5v7A1.5 1.5 0 0 0 1.5 10H6v1H1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5v-1h4.5A1.5 1.5 0 0 0 16 8.5v-7A1.5 1.5 0 0 0 14.5 0h-13Zm0 1h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5ZM12 12.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm2 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0ZM1.5 12h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1ZM1 14.25a.25.25 0 0 1 .25-.25h5.5a.25.25 0 1 1 0 .5h-5.5a.25.25 0 0 1-.25-.25Z' />
            </svg>
            <h3>Developer</h3>
          </div>
          <p className='body'>
            I have experience with technologies across the stack. I focus
            working with React and NodeJS.
          </p>
          <h4>Languages I Speak</h4>
          <p className='body'>Javascript, HTML, CSS, SQL, NOSQL</p>

          <h4>Dev Tools</h4>
          <TechList theme={theme}>
            <li>ReactJS</li>
            <li>NextJS</li>
            <li>Styled Components</li>
            <li>NodeJS</li>
            <li>ExpresJS</li>
            <li>MongoDB</li>
            <li>Planetscale</li>
          </TechList>
        </div>
        <Separator />
        <div className='column'>
          <div className='title'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='64'
              height='64'
              fill='currentColor'
              viewBox='0 0 16 16'>
              <path d='M1.5 0A1.5 1.5 0 0 0 0 1.5v7A1.5 1.5 0 0 0 1.5 10H6v1H1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5v-1h4.5A1.5 1.5 0 0 0 16 8.5v-7A1.5 1.5 0 0 0 14.5 0h-13Zm0 1h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5ZM12 12.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm2 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0ZM1.5 12h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1ZM1 14.25a.25.25 0 0 1 .25-.25h5.5a.25.25 0 1 1 0 .5h-5.5a.25.25 0 0 1-.25-.25Z' />
            </svg>
            <h3>Designer</h3>
          </div>
          <p className='body'>
            I appreciate the ability to see a design before a write a line of
            code. {"I've"} dedicated time to learn design concepts and common
            design tools.
          </p>
          <h4>Things I design</h4>
          <p className='body'>Destkop Apps, Mobile Design, Logos</p>
          <h4>Design Tools</h4>
          <TechList theme={theme}>
            <li>AdobeXD</li>
            <li>Figma</li>
            <li>Vectonator</li>
            <li>Procreate</li>
          </TechList>
        </div>
        <Separator />
        <div className='column'>
          <div className='title'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='64'
              height='64'
              fill='currentColor'
              viewBox='0 0 16 16'>
              <path d='M1.5 0A1.5 1.5 0 0 0 0 1.5v7A1.5 1.5 0 0 0 1.5 10H6v1H1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5v-1h4.5A1.5 1.5 0 0 0 16 8.5v-7A1.5 1.5 0 0 0 14.5 0h-13Zm0 1h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5ZM12 12.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm2 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0ZM1.5 12h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1ZM1 14.25a.25.25 0 0 1 .25-.25h5.5a.25.25 0 1 1 0 .5h-5.5a.25.25 0 0 1-.25-.25Z' />
            </svg>
            <h3>Experience</h3>
          </div>
          <p className='body'>
            {"I've"} had the chance to design and create multiple company
            websites, internal web applications, and many personal projects.
          </p>
          <h4>What I Draw From</h4>
          <p className='body'>
            Leading Development, Customer Service, Freelancing
          </p>
          <h4>Projects {"I've"} Completed</h4>
          <TechList theme={theme}>
            <li>CMDI Website</li>
            <li>Internal CRM Application</li>
            <li>Design Tools</li>
          </TechList>
        </div>
      </AboutHero>
      <Form />
      {/* <Art /> */}
      {/* <SurfGame /> */}
    </Main>
  );
};

export default about;

export const Section = styled.section`
  max-width: var(--maxWidth);
  margin: 8rem auto 0;
  padding: 5rem 1rem 15rem;
  border-radius: var(--radiusMd);

  display: grid;
  justify-items: center;

  background-color: ${(props) =>
    props.theme === "light" ? "var(--blue600)" : "var(--blue100)"};

  border-bottom: 2px solid var(--gray400);
  border-right: 2px solid var(--gray400);

  @media (min-width: 1300px) {
    grid-template-columns: 1fr 3fr;
    align-items: center;
  }
`;

const TechList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: grid;
  gap: 0.5rem;
  align-items: start;

  li {
    padding: 0.5rem;
    margin: 0;
    background-color: ${(props) =>
      props.theme === "light" ? "var(--gray900)" : "var(--gray600)"};

    border-bottom: 3px solid black;
    border-right: 3px solid black;
    border-radius: 0.25rem;
  }
`;

const Separator = styled.span`
  background-color: var(--gray900);
  width: 100%;
  height: 100%;
`;

const AboutHero = styled.section`
  max-width: 1250px;
  margin: -5rem auto 5rem;

  background-color: ${(props) =>
    props.theme === "light" ? "#fff" : "var(--gray300)"};
  border-radius: var(--radiusLg);

  border-bottom: 3px solid var(--gray700);
  border-right: 3px solid var(--gray700);

  padding: 4rem;

  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 3px 1fr 3px 1fr;
  justify-items: center;

  .title {
    display: flex;
    gap: 1rem;
    font-size: 1.4rem;
    color: ${(props) => (props.theme === "light" ? "var(--gray200)" : "white")};
    justify-self: start;
  }

  .body {
    font-weight: 500;
    color: ${(props) =>
      props.theme === "light" ? "var(--gray400)" : "var(--gray800)"};
  }
  .column {
    display: grid;

    justify-items: center;
    grid-template-rows: 90px 9rem 1rem 6em 3rem 1fr;
  }

  .flex {
    display: flex;
    gap: 0.5rem;
  }

  svg {
    padding: 1rem;
    border-radius: var(--radiusMd);
    background-color: var(--blue400);
    color: white;
    border-bottom: 3px solid var(--gray500);
    border-right: 3px solid var(--gray500);
  }

  h4 {
    font-size: 1.2rem;
    margin: 0;
    color: ${(props) => (props.theme === "light" ? "var(--blue400)" : "white")};
  }
`;
