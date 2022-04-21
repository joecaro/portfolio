import React from "react";
import styled from "styled-components";

export default function AboutMe({ theme, themes }) {
  return (
    <AboutMeSection
      theme={theme === themes.dark ? themes.dark : themes.light}
      darkMode={theme === themes.dark}>
      <div className='pgrph'>
        <p>
          I am a <strong> web developer</strong> creating interactive
          applications, company websites, and company tools. I find fulfillment
          in taking on topics that expand my skills and knowledge. Beyond web
          development, you can see the product of some of my other interests
          below.
        </p>
      </div>
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
