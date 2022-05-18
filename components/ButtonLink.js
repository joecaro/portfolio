import styled from "styled-components";
import { css } from "styled-components";
import { keyframes } from "styled-components";
import { useTheme } from "../lib/ThemeContext";

const ButtonLink = ({ children, color, href, label, inverted, animated }) => {
  const { theme } = useTheme();
  return (
    <Container>
      <LogoLink
        passHref
        theme={theme}
        className={!href && "disabled"}
        color={color || "gray"}
        inverted={inverted}
        animated={animated}
        href={href}
        target='_blank'
        rel='noopener noreferrer'>
        {children}
      </LogoLink>
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

export const LogoLink = styled.a`
  background-color: ${(props) =>
    !props.inverted
      ? `var(--${props.color}400)`
      : props.theme === "light"
      ? "#ffffff"
      : `var(--gray200)`};
  border-bottom: 3px solid ${(props) => `var(--${props.color}300)`};
  border: ${(props) =>
    props.inverted ? `3px solid var(--${props.color}400)` : ""};
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
  transition: 0.2s ease;
  animation: ${(props) =>
    props.animated &&
    css`
      ${bounce} 5s ease-in-out 3s 1
    `};

  height: 3rem;
  width: 6rem;
  border-radius: var(--radiusSm);

  color: ${(props) =>
    !props.inverted ? "#ffffff" : `var(--${props.color}400)`};
  border-bottom: 3px solid ${(props) => `var(--${props.color}300)`};

  :hover {
    animation: ${noAnimation} 1s;
    transform: translateY(-4px);
    box-shadow: 3px 8px 8px rgba(0, 0, 0, 0.3);
    transition: 0.2s ease;
  }

  :active {
    animation: ${noAnimation} 1s;
    transform: translateY(5px);
    box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.8);
    transition: 0.2s ease;
  }
`;

const Container = styled.div`
  gap: 0.5rem;

  :hover {
    .disabled {
      ::after {
        content: "Not Available";
        position: absolute;
        background-color: var(--gray300);
      }
    }
  }
  .disabled {
    animation: ${noAnimation} 1s;
    pointer-events: none;
    background-color: var(--gray700);
    border-bottom: var(--gray700);
    position: relative;
  }

  .label {
    font-size: 1.25rem;
    font-weight: var(--semi-bold);
    color: var(--gray500);
    margin: 0;
  }
`;
