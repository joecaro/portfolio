import styled from "styled-components";

const Main = styled.main`
  .max-width {
    max-width: var(--maxWidth);
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

  h2 {
    font-size: 2rem;
  }
`;

export default Main;
