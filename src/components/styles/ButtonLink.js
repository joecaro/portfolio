import styled from "styled-components";

const ButtonLink = styled.div`
  background-color: transparent;
  border: none;
  font-size: 1.8rem;
  font-weight: 400;
  z-index: 2;
  padding: 0 2rem;
  align-self: flex-end;

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default ButtonLink;
