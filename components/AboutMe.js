import React from "react";
import styled from "styled-components";
import InstagramCard from "./InstagramCard";
import ProjectCard from "./ProjectCard";
import Zoom from "react-reveal/Zoom";

export default function AboutMe({ theme, themes }) {
  return (
    <AboutMeSection
      theme={theme === themes.dark ? themes.dark : themes.light}
      darkMode={theme === themes.dark}>
      <h2>About Me</h2>
      <div className='pgrph'>
        <p>
          I am a <strong> web developer</strong> creating interactive
          applications, company websites, and company tools. I find fulfillment
          in taking on topics that expand my skills and knowledge.
        </p>
      </div>
      <section>
        <h3>3D Art</h3>
        <Zoom cascade>
          <ul className={"card-list"}>
            <li>
              <InstagramCard
                pic={
                  "https://res.cloudinary.com/joecarothers/image/upload/v1637814520/misc/instacards/Screenshot_2021-11-24_232436_qgaygv.png"
                }
                url='https://www.instagram.com/p/BleYkf_Av5Z/'
              />
            </li>
            <li>
              <InstagramCard
                pic={
                  "https://res.cloudinary.com/joecarothers/image/upload/v1637814523/misc/instacards/Screenshot_2021-11-24_232735_ciov7s.png"
                }
                url='https://www.instagram.com/p/ByLCd61na24/'
              />
            </li>
            <li>
              <InstagramCard
                pic={
                  "https://res.cloudinary.com/joecarothers/image/upload/v1637814521/misc/instacards/Screenshot_2021-11-24_232552_onydr2.png"
                }
                url='https://www.instagram.com/p/BhqOg0ogpXW/'
              />
            </li>
          </ul>
        </Zoom>
      </section>
      <section>
        <h3>Game Developement</h3>
        <Zoom cascade>
          <ul className={"card-list"}>
            <li>
              <ProjectCard
                width={450}
                project={{
                  image:
                    "https://res.cloudinary.com/joecarothers/image/upload/v1637816867/misc/Projects/Screenshot_2021-11-24_235510_ezrdig.png",
                  title: "3D Flappy Bird",
                  slug: "flappy-bird-3d",
                  github: "https://github.com/joecaro/3d-flappy-bird-clone",
                  demo: "not available",
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
                  github: "https://github.com/joecaro/unity-boid-simulation",
                  demo: "not available",
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
                  github: "https://github.com/joecaro/unity-boid-simulation",
                  demo: "not available",
                }}
                theme={theme}
              />
            </li>
          </ul>
        </Zoom>
      </section>
    </AboutMeSection>
  );
}

const AboutMeSection = styled.section`
  max-width: 1300px;
  color: ${({ theme }) => theme.foreground};
  padding: 2rem;
  border-radius: 0.5rem;

  .pgrph {
    position: relative;
    border-radius: 3px;
    padding: 2rem;
    font-size: 1.4rem;
    font-weight: 300;
    width: clamp(20ch, 80%, 50ch);
    margin: auto;
    font-family: "Courier New", Courier, monospace;

    p {
      margin: 0;
    }
  }

  section {
    margin: 6rem 0;
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
