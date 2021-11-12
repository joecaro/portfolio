import React from "react";

export default function ProjectInfo({ project }) {
  return (
    <div
      style={{
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}>
      <h4>{project.title}</h4>
      <p>{project.description}</p>
      <a target='_blank' rel='noreferrer' href={`/projects/${project.slug}`}>
        Read More...
      </a>
    </div>
  );
}
