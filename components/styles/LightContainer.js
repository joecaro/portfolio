import styled, { css, keyframes } from "styled-components";

export const LightContainer = styled.div``;

export const FloorBounce = styled.div`
  height: 100px;
  width: 400px;
  position: absolute;
  top: 350px;
  right: -100px;
  border-radius: 100%;
  transform: perspective(6em) rotateX(45deg);
  filter: blur(2em);
`;
