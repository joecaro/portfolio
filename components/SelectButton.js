import React from "react";
import styled from "styled-components";

export default function SelectButton({ theme, filter, setFilter, name }) {
  return (
    <Select
      theme={theme}
      selected={filter === name.toLowerCase()}
      onClick={() => setFilter(name.toLowerCase())}>
      {name}
    </Select>
  );
}

const Select = styled.button`
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  font-weight: ${(props) => (props.selected ? "550" : "500")};
  border: none;
  border: 2px solid
    ${(props) => (props.selected ? "var(--blue300)" : "var(--gray700)")};
  background-color: ${(props) =>
    !props.selected
      ? props.theme === "light"
        ? "var(--gray1000)"
        : "var(--gray400)"
      : "var(--blue400)"};

  color: ${(props) =>
    !props.selected
      ? props.theme === "light"
        ? "var(--gray(500))"
        : "var(--gray1000)"
      : "var(--gray1000)"};

  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
  border-radius: var(--radiusSm);
  transition: 200ms;

  :hover {
    cursor: pointer;
    color: white;
    background-color: var(--blue500);
    transform: translateY(-5px);
  }

  :active {
    background-color: var(--blue600);
    border-bottom: 2px solid var(--blue500);
    border-right: 2px solid var(--blue500);
    transform: translateY(0px);
  }

  ::after {
  }
`;
