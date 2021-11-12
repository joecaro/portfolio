import styled from "styled-components";

const ProjectCardStyles = styled.div`
  margin: auto auto 50px;
  max-width: 80%;
  width: ${({ width }) => `${width}px`};
  aspect-ratio: 3/2;
  background-color: ${({ isDark }) => (isDark ? "#333" : "#aaa")};
  color: ${({ isDark }) => (isDark ? "#eee" : "#222")};
  border-radius: 3px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export default ProjectCardStyles;
