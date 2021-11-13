import styled from "styled-components";

const ProjectCardStyles = styled.div`
  margin: auto auto 50px;
  max-width: 80%;
  width: ${({ width }) => `${width}px`};
  aspect-ratio: 3/2;
  background-color: ${({ isDark }) => (isDark ? "#333" : "#ccc")};
  color: ${({ isDark }) => (isDark ? "#eee" : "#222")};
  border-radius: 3px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
export const Header = styled.div`
  width: 100%;
  height: 15%;
  background-color: ${({ isDark }) => (isDark ? "#222" : "#aaa")};
  border-radius: 3px 3px 0 0;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  span {
    height: 100%;
    display: flex;
    margin: auto;
  }
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
    font-weight: 400;
  }
`;

export const Info = styled.div`
  margin: 5px;
  padding: 10px;
  border-radius: 3px;
  background-color: ${({ isDark }) => (isDark ? "#282c34" : "#fafafa")};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  p {
    margin: 0;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  color: ${({ isDark }) => (isDark ? "#aaa" : "#444")};
  a {
    padding: 5px;
    border-radius: 3px;
    cursor: pointer;
    :hover {
      transition: 0.1s;
      color: ${({ isDark }) => (isDark ? "#eee" : "#888")};
    }
  }
`;

export default ProjectCardStyles;
