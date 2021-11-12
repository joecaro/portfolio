import React from "react";
import styles from "../styles/ProjectCard.module.css";
import Logos from "../lib/logos";
import ProjectCardStyles from "./styles/ProjectCardStyle";
import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  height: 15%;
  background-color: ${({ isDark }) => (isDark ? "#222" : "#888")};
  border-radius: 3px 3px 0 0;
  display: flex;
  justify-content: flex-start;
  div {
    height: 50%;
    aspect-ratio: 1/1;
    border-radius: 100%;
    margin: auto 5px;
  }
  div:nth-child(1) {
    background-color: ${({ isDark }) => (isDark ? "#111" : "rgb(223, 73, 14)")};
  }
  div:nth-child(2) {
    background-color: ${({ isDark }) =>
      isDark ? "#555" : "rgb(223, 186, 25)"};
  }
  div:nth-child(3) {
    background-color: ${({ isDark }) => (isDark ? "#333" : "rgb(30, 184, 16)")};
  }
  h4 {
    margin: auto;
  }
`;

export default function ProjectCard(props) {
  const logos = Logos();
  return (
    <ProjectCardStyles isDark={props.isDark} width={props.width}>
      <Header isDark={props.isDark}>
        <div />
        <div />
        <div />
        <h4>Project Name</h4>
      </Header>
      <div className={styles.info}>
        <p>
          DetailsLaborum veniam exercitation qui anim mollit proident Lorem ut
          dolore dolore eu laborum laborum minim.
        </p>
        <p>
          GitHub Demo <em>More Info...</em>
        </p>
      </div>
      {/* <div className={styles.grid}>
        <div>{logos.html}</div>
        <div>{logos.css}</div>
        <div>{logos.react}</div>
      </div> */}
    </ProjectCardStyles>
  );
}
