import React from "react";
import styled from "styled-components";

export default function AboutMe({ theme, themes }) {
  return (
    <AboutMeSection darkMode={theme === themes.dark}>
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
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </AboutMeSection>
  );
}

const AboutMeSection = styled.section`
  max-width: 900px;
  color: ${({ darkMode }) => (darkMode ? "#bbb" : "#111")};

  .pgrph {
    position: relative;
    border-radius: 3px;
    padding: 1rem;
    background-color: ${({ darkMode }) => (darkMode ? "#333" : "#ddd")};
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

  li {
    list-style: none;
  }
`;
