import styled from "styled-components";

const ButtonLink = styled.button`
  background-color: transparent;
  border: none;
  font-size: 2rem;
  font-weight: 400;
  z-index: 2;
  color: ${({ isDarkMode }) => (isDarkMode ? "#ccc" : "#222")};

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default ButtonLink;
