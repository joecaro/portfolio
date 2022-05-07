import styled from "styled-components";
import { keyframes } from "styled-components";

const HeroLink = ({ children, color, href, label }) => {
  return (
    <Container>
      <LogoLink
        color={color}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </LogoLink>
      <p>{label}</p>
    </Container>
  );
};

export default HeroLink;

const bounce = keyframes`
0% {
  transform: translateY(0);
}
5% {
  transform: translateY(-10px);
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
}
10%{
  transform: translateY(0);
  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.3);
}
15% {
  transform: translateY(-5px);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
}
20% {
  transform: translateY(0);
  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.3);
}
100% {
  transform: translateY(0);
  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.3);
}
`;
const noAnimation = keyframes`
0% {
}
`;

const LogoLink = styled.a`
  background-color: ${(props) => `var(--${props.color}400)`};
  border-bottom: 3px solid ${(props) => `var(--${props.color}300)`};
  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
  transition: 0.2s ease;
  animation: ${bounce} 5s ease-in-out 3s infinite;

  height: 3rem;
  width: 4rem;
  border-radius: var(--radiusSm);

  :hover {
    animation: ${noAnimation} 1s;
    transform: translateY(-8px);
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
  gap: 0.5rem;
  width: 10rem;
`;
