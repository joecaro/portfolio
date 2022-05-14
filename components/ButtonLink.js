import styled from "styled-components";
import { css } from "styled-components";
import { keyframes } from "styled-components";

const ButtonLink = ({ children, color, href, label, inverted, animated }) => {
  return (
    <Container>
      <LogoLink
        className={!href && "disabled"}
        color={color || "gray"}
        inverted={inverted}
        animated={animated}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </LogoLink>
      <p className="label">{label}</p>
    </Container>
  );
};

export default ButtonLink;

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
  background-color: ${(props) => props.inverted ? "#ffffff" : `var(--${props.color}400)`};
  border-bottom: 3px solid ${(props) => `var(--${props.color}300)`};
  border: ${(props) => props.inverted ? `3px solid var(--${props.color}400)` : ""};
  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
  transition: 0.2s ease;
  animation: ${(props) => props.animated && css`${bounce} 5s ease-in-out 3s 1`};

  height: 3rem;
  width: 6rem;
  border-radius: var(--radiusSm);

  color: ${(props) => props.inverted ? `var(--${props.color}400)` : "#fff" };

  :hover {
    animation: ${noAnimation} 1s;
    transform: translateY(-8px);
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
  }


`;

const Container = styled.div`
  display: grid;
  /* grid-template-columns: 4rem 1fr; */
  gap: 0.5rem;

  .disabled {
    animation: ${noAnimation} 1s;
    pointer-events: none;
    background-color: var(--gray700);
  border-bottom: var(--gray700);
  }

  .label {
    font-size: 1.25rem;
    font-weight: var(--semi-bold);
    color: var(--gray500);
    margin: 0;
  }
`;
