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
  font-family: "Courier New", Courier, monospace;
  cursor: pointer;
  background-color: ${(props) => props.theme.secondary};
  padding: 1rem;
  border: none;
  border-top: 2px solid #bbb;
  border-left: 2px solid #bbb;
  border-reight: 2px solid #bbb;

  color: ${(props) => (props.selected ? props.theme.foreground : "#999")};
  font-weight: 600;

  position: relative;

  flex: 1;

  :hover {
    background-color: ${({ theme }) => theme.secondary};
  }

  ::after {
    content: "";
    height: ${(props) => (props.selected ? "2px" : "0px")};
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.foreground};
    transition: 0.2s;
  }
`;
