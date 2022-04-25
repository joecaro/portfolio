import React from "react";
import { Zoom } from "react-reveal";
import ProjectCard from "./ProjectCard";
import InstagramCard from "./InstagramCard";
import { useTheme } from "styled-components";

const Art = () => {
  const { theme } = useTheme();
  return (
    <>
      <section className='max-width'>
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
      <section className='max-width'>
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
    </>
  );
};

export default Art;
