import React from "react";
import styled from "styled-components";
import InstagramCard from "./InstagramCard";
import ProjectCard from "./ProjectCard";
import Fade from "react-reveal/Fade";

export default function AboutMe({ theme, themes }) {
  return (
    <AboutMeSection
      theme={theme === themes.dark ? themes.dark : themes.light}
      darkMode={theme === themes.dark}>
      <h2>About Me</h2>
      <p className='pgrph'>
        <div></div>
        Veniam in duis adipisicing aute anim velit. Lorem deserunt deserunt aute
        enim in nulla exercitation qui. Amet Lorem sint ipsum occaecat duis sint
        aute magna dolor ex id. Culpa quis do consequat veniam labore pariatur
        minim in ut minim labore labore eu. Minim minim incididunt ea ex nisi
        irure dolor ipsum adipisicing magna ad.
      </p>
      <div>
        <h3>3D Art</h3>
        <Fade cascade>
          <ul className={"card-list"}>
            <li>
              <InstagramCard
                url={
                  "https://res.cloudinary.com/joecarothers/image/upload/v1637814520/misc/instacards/Screenshot_2021-11-24_232436_qgaygv.png"
                }
              />
            </li>
            <li>
              <InstagramCard
                url={
                  "https://res.cloudinary.com/joecarothers/image/upload/v1637814523/misc/instacards/Screenshot_2021-11-24_232735_ciov7s.png"
                }
              />
            </li>
            <li>
              <InstagramCard
                url={
                  "https://res.cloudinary.com/joecarothers/image/upload/v1637814521/misc/instacards/Screenshot_2021-11-24_232552_onydr2.png"
                }
              />
            </li>
          </ul>
        </Fade>
      </div>
      <div>
        <h3>Game Developement</h3>
        <Fade cascade>
          <ul className={"card-list"}>
            <li>
              <ProjectCard
                width={450}
                project={{
                  image:
                    "https://res.cloudinary.com/joecarothers/image/upload/v1637816867/misc/Projects/Screenshot_2021-11-24_235510_ezrdig.png",
                  title: "3D Flappy Bird",
                  slug: "flappy-bird-3d",
                }}
                theme={theme}
              />
            </li>
            <li>
              <ProjectCard
                width={450}
                project={{
                  image:
                    "https://res.cloudinary.com/joecarothers/image/upload/v1637816868/misc/Projects/Screenshot_2021-11-24_235619_cjbf0j.png",
                  title: "Unity Boid Simulation",
                  slug: "boid-simulation",
                }}
                theme={theme}
              />
            </li>
            <li>
              <ProjectCard
                width={450}
                project={{
                  image:
                    "https://res.cloudinary.com/joecarothers/image/upload/v1637816868/misc/Projects/Screenshot_2021-11-24_235619_cjbf0j.png",
                  title: "Unity Boid Simulation",
                  slug: "boid-simulation",
                }}
                theme={theme}
              />
            </li>
          </ul>
        </Fade>
      </div>
    </AboutMeSection>
  );
}

const AboutMeSection = styled.section`
  max-width: 1300px;
  color: ${({ theme }) => theme.foreground};
  padding: 2rem;

  .pgrph {
    position: relative;
    border-radius: 3px;
    padding: 2rem;
    max-width: 80%;
    margin: auto;
    background-color: ${({ theme }) => theme.background};
    div {
      position: absolute;
      top: 0;
      left: 0;
      height: 15px;
      width: calc(100%);
      border-radius: 3px 3px 0 0;
      background-color: ${({ darkMode }) => (darkMode ? "#222" : "#aaa")};
    }
  }

  h2 {
    font-weight: 500;
  }

  .card-list {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 1rem;
  }

  li {
    list-style: none;
  }
`;
