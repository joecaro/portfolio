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
  cursor: pointer;
  background-color: ${(props) =>
    props.selected ? "#888" : props.theme.background};
  color: ${({ theme }) => theme.foreground};
  padding: 1rem;
  border: inset;

  transition: 0.2s;

  :hover {
    background-color: #888;
  }
`;
