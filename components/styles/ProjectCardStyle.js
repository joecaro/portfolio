import styled from "styled-components";

const ProjectCardStyles = styled.div`
  margin: 0 auto 50px;
  width: ${({ width }) => `clamp(300px, ${width}px, 80%)`};
  height: ${({ width }) => `${(width * 9) / 16}px`};
  aspect-ratio: 16/9;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  border-radius: 3px;
  display: flex;
  flex-direction: column;
`;
export const Header = styled.div`
  width: 100%;
  height: 10%;
  background-color: ${({ theme }) => theme.header};
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
    background-color: ${({ theme }) => theme.red};
  }
  div:nth-child(2) {
    background-color: ${({ theme }) => theme.yellow};
  }
  div:nth-child(3) {
    background-color: ${({ theme }) => theme.green};
  }
  h4 {
    margin: auto;
    font-weight: 400;
  }
`;

// ${({ isDark }) => (isDark ? "#282c34" : "#fafafa")}

export const Info = styled.div`
  position: relative;
  border-radius: 3px;
  background-image: ${({ background }) => `url(${background})`};
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const Description = styled.p`
  font-size: 1.3rem;
`;

export const Buttons = styled.span`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  height: 100%;
  color: #ddd;
  opacity: ${({ isHover }) => (isHover ? "1" : "0")};
  background-color: #222222dd;
  border-radius: 3px;
  transition: 0.2s;
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
