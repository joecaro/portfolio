import styled from "styled-components";
import { keyframes } from "styled-components";
import { useTheme } from "../lib/ThemeContext";

const ButtonLink = ({ children, color, href, inverted, textColor }) => {
  const { theme } = useTheme();
  return (
    <Container>
      <LogoLink
        passHref
        theme={theme}
        className={!href && "disabled"}
        color={color || "gray"}
        textColor={textColor}
        inverted={inverted}
        href={href}
        target='_blank'
        rel='noopener noreferrer'>
        {children}
      </LogoLink>
    </Container>
  );
};

export default ButtonLink;

const noAnimation = keyframes`
0% {
}
`;

export const LogoLink = styled.a`
  box-sizing: content-box;
  background-color: ${(props) =>
    !props.inverted
      ? `var(--${props.color}400)`
      : props.theme === "light"
      ? "#ffffff"
      : `var(--gray200)`};

  border: ${(props) =>
    props.inverted ? `3px solid var(--${props.color}400)` : ""};
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
  transition: 0.2s ease;

  font-weight: 600;

  height: 3rem;
  width: 6rem;
  border-radius: var(--radiusSm);

  color: ${(props) =>
    props.textColor
      ? props.textColor
      : !props.inverted
      ? "#ffffff"
      : `var(--${props.color}400)`};
  border-bottom: 3px solid ${(props) => `var(--${props.color}300)`};
  border-right: 3px solid ${(props) => `var(--${props.color}300)`};

  :hover {
    animation: ${noAnimation} 1s;
    transform: translateY(-3px);
    border-bottom: 6px solid ${(props) => `var(--${props.color}300)`};
    transition: 100ms ease;
  }

  :active {
    animation: ${noAnimation} 1s;
    border-bottom: 2px solid ${(props) => `var(--${props.color}300)`};
    transform: translateY(1px);
    transition: 0.2s ease;
  }
`;

const Container = styled.div`
  gap: 0.5rem;
  height: 3rem;

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
