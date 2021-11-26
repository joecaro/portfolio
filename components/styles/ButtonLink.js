import styled from "styled-components";

const ButtonLink = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.8rem;
  font-weight: 400;
  z-index: 2;
  color: ${({ theme }) => theme.foreground};
  padding: 0 2rem;

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default ButtonLink;
