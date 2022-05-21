import styled from "styled-components";
import { css } from "styled-components";
import { keyframes } from "styled-components";

const duration = 4000; //duration in ms

const circleKeyframes = keyframes`
0% {
  transform: rotate(90deg);
}
25% {
  transform: rotate(90deg);
}
100% {
  transform: rotate(-90deg);
}
`;

const circleAnimation = (props) => css`
  ${circleKeyframes} ${duration / 3}ms
`;

export const Circle = styled.span`
  pointer-events: none;
  height: 200px;
  width: 200px;
  position: absolute;
  border: 4px solid
    ${(props) =>
      props.theme === "light" ? "var(--blue600)" : "var(--blue500)"};
  border-radius: 50%;
  transform: rotate(-90deg);
  animation: ${circleAnimation};
  background-color: ${(props) =>
    props.theme === "light" ? "var(--blue400)" : "var(--gray200)"};
  z-index: 2;

  top: -60px;
  left: -100px;

  ::after {
    content: "";
    width: 200px;
    height: 100px;
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${(props) =>
      props.theme === "light" ? "var(--blue400)" : "var(--gray200)"};
    position: absolute;
  }
`;

const startLeftHorizontalKeyframes = keyframes`
0% {
  transform: translateX(-100%);
}
25% {
  transform: translateX(-100%);
}
100% {
  transform: translateX(0);
}
`;

const startLeftHorizontalAnimation = (props) => css`
  ${startLeftHorizontalKeyframes} ${duration / 1.2}ms
`;

const startRightHorizontalKeyframes = keyframes`
0% {
  transform: translateX(100%);
}
25% {
  transform: translateX(100%);
}
100% {
  transform: translateX(0);
}
`;

const startRightHorizontalAnimation = (props) => css`
  ${startRightHorizontalKeyframes} ${duration / 1.2}ms
`;

export const Horizontal = styled.span`
  pointer-events: none;
  width: 100%;
  position: absolute;
  border: ${(props) => props.thickness} solid var(--blue700);
  animation: ${(props) =>
    props.startLeft
      ? startLeftHorizontalAnimation
      : startRightHorizontalAnimation};

  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: 0;
`;

const diagonalKeyframes = keyframes`
0% {
  transform: translate(100%, -100%) rotate(45deg);
}
100% {
  transform: translate(0, 0) rotate(45deg);
}
`;

const diagonalAnimation = (props) => css`
  ${diagonalKeyframes} ${duration * props.delayMuiltiplier}ms
`;

export const Diagonal = styled.span`
  pointer-events: none;
  width: 1000px;
  height: 1000px;
  position: absolute;
  border-right: 3px solid
    ${(props) =>
      props.theme === "light" ? "var(--blue500)" : "var(--gray300)"};
  animation: ${(props) => diagonalAnimation(props)};
  transform: rotate(45deg);

  top: ${(props) => props.height};
  right: 10px;
`;
