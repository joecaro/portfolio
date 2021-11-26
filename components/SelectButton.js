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
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  padding: 1rem;
  border-bottom: ${({ selected }) => (selected ? "2px solid #fff" : "")};
`;
