import React from "react";
import styled from "styled-components";

export default function ProjectInfo({ project }) {
  return (
    <Container>
      <h4>{project.title}</h4>
      <p>{project.description}</p>
      <p>
        <b>STACK</b> | {project.stack.join(", ")}
      </p>
      <a target='_blank' rel='noreferrer' href={`/projects/${project.slug}`}>
        Read More...
      </a>
    </Container>
  );
}

const Container = styled.div`

  a {
    :hover {
      text-decoration: underline;
    }
  }
`;
