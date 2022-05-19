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
  padding: 0.5rem;
  font-size: 1.25rem;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.selected ? "var(--blue300)" : "var(--gray500)")};
  border-right: 2px solid
    ${(props) => (props.selected ? "var(--blue300)" : "var(--gray500)")};
  background-color: ${(props) => (props.selected ? "var(--blue400)" : "")};
  color: ${(props) => (props.selected ? "var(--gray1000)" : "")};
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
