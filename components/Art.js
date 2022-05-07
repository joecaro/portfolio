import React from "react";
import { Zoom } from "react-reveal";
import InstagramCard from "./InstagramCard";
import { Section } from "../pages/about";
import { themes, useTheme } from "../lib/ThemeContext";

const Art = () => {
  const { theme } = useTheme();
  return (
    <>
      <Section>
        <h3>3D Art</h3>
        <Zoom cascade>
          <ul>
            <li>
              <InstagramCard
                pic={
                  "https://res.cloudinary.com/joecarothers/image/upload/v1637814520/misc/instacards/Screenshot_2021-11-24_232436_qgaygv.png"
                }
                url="https://www.instagram.com/p/BleYkf_Av5Z/"
              />
            </li>
            <li>
              <InstagramCard
                pic={
                  "https://res.cloudinary.com/joecarothers/image/upload/v1637814523/misc/instacards/Screenshot_2021-11-24_232735_ciov7s.png"
                }
                url="https://www.instagram.com/p/ByLCd61na24/"
              />
            </li>
            <li>
              <InstagramCard
                pic={
                  "https://res.cloudinary.com/joecarothers/image/upload/v1637814521/misc/instacards/Screenshot_2021-11-24_232552_onydr2.png"
                }
                url="https://www.instagram.com/p/BhqOg0ogpXW/"
              />
            </li>
          </ul>
        </Zoom>
      </Section>
    </>
  );
};

export default Art;
