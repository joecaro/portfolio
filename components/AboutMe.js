import React from "react";
import styled from "styled-components";
import InstagramCard from "./InstagramCard";

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
      </div>
    </AboutMeSection>
  );
}

const AboutMeSection = styled.section`
  max-width: 900px;
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
    justify-content: center;
    gap: 1rem;
  }

  li {
    list-style: none;
  }
`;
