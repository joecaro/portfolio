import styled from "styled-components";

const Main = styled.main`
  background-color: ${(props) =>
    props.lightTheme
      ? props.theme.light.background
      : props.theme.dark.background};

  .max-width {
    max-width: ${(props) => props.theme.maxWidth};
    margin: auto;
  }

  .centered {
    display: grid;
    place-items: center;
  }

  .two-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
  }

  .card-list {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 1rem;
    list-style-type: none;
  }

  h1 {
    text-align: center;
    font-size: 3rem;
  }
`;

export default Main;
