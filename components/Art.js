import React from "react";
import InstagramCard from "./InstagramCard";
import { themes, useTheme } from "../lib/ThemeContext";
import styled from "styled-components";

const Art = () => {
  const { theme } = useTheme();
  return (
    <>
      <Section theme={theme}>
        <h3>3D Art</h3>
        <p>
          I use the program, Blender to 3d model, simulate, rig, and render 3d
          art. I started in 2017 and have helped with small projects providing
          3d illustrations.
        </p>
          <ul>
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
      </Section>
    </>
  );
};

export default Art;

const Section = styled.section`
  max-width: var(--maxWidth);
  margin: auto;

  background-color: ${(props) =>
    props.theme === "light" ? "#fff" : "var(--gray300)"};
  border-radius: var(--radiusLg);

  border-bottom: 3px solid var(--gray700);
  border-right: 3px solid var(--gray700);

  padding: 4rem;

  h3 {
    font-size: 2rem;
    margin: 1rem 0;
  }

  ul {
    list-style-type: none;
    display: grid;
    justify-items: center;
    gap: 2rem;

    @media (min-width: 900px) {
      display: flex;
      justify-content: space-around;
    }
  }
`;
