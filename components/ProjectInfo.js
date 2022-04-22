import React from "react";
import styled from "styled-components";

export default function ProjectInfo({ project }) {
  return (
    <Container>
      <h4>{project.title}</h4>
      <p>{project.description}</p>
      <a target='_blank' rel='noreferrer' href={`/projects/${project.slug}`}>
        Read More...
      </a>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 2;
  @media (max-width: 768px) {
    width: 400px;
  }
  a {
    :hover {
      text-decoration: underline;
    }
  }
`;
