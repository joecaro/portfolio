import styled, { css, keyframes } from "styled-components";

export const MaxWidthContainer = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  margin: auto;

  display: flex;
  justify-content: space-between;
`;
