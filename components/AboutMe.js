import React from "react";
import styled from "styled-components";
import { themes, useTheme } from "../lib/ThemeContext";

export default function AboutMe() {
  const { theme } = useTheme();

  return (
    <section >
      <div>
        <p>
          I am a <strong> web developer</strong> creating interactive
          applications, company websites, and company tools.{"I've "}focused
          primarily on front-ent applications, but have am comfortable working
          with back-end technologies. I find fulfillment in taking on topics
          that expand my skills and knowledge. Beyond web development, you can
          see the product of some of my other interests below.
        </p>
      </div>
    </section>
  );
}
