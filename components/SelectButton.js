import styled from "styled-components";

export default function SelectButton({ theme, filter, setFilter, name }) {
  return (
    <Container>
      <Select
        className={!setFilter && "disabled"}
        theme={theme}
        selected={filter === name.toLowerCase()}
        onClick={() => {
          if (setFilter) () => setFilter(name.toLowerCase());
        }}>
        {name}
      </Select>
    </Container>
  );
}

const Select = styled.button`
  box-sizing: content-box;
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
  transition: 100ms ease-in-out;

  :hover {
    cursor: pointer;
    border-bottom: 5px solid
      ${(props) => (props.selected ? "var(--blue300)" : "var(--gray600)")};
    transform: translateY(-3px);
    box-shadow: 3px 5px 2px rgba(0, 0, 0, 0.3);
  }

  :active {
    background-color: var(--blue600);
    border-bottom: 2px solid var(--blue500);
    border-right: 2px solid var(--blue500);
    box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.4);
    transform: translateY(0px);
  }

  ::after {
  }
`;

const Container = styled.div`
  height: 2.5rem;

  .disabled {
    box-shadow: none;
    :hover {
      cursor: default;
      transform: none;
      border-bottom: 2px solid
        ${(props) => (props.selected ? "var(--blue300)" : "var(--gray600)")};
    }
    :active {
      background-color: ${(props) =>
        props.theme === "light" ? "var(--gray1000)" : "var(--gray400)"}
  }
`;
