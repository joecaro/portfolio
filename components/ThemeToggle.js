import React from "react";
import styled from "styled-components";
import { css } from "styled-components";
import { keyframes } from "styled-components";
import { themes, useTheme } from "../lib/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    let newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Toggle theme={theme} onClick={handleToggleTheme}>
      <span className='moon'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          fill='#333'
          viewBox='0 0 16 16'>
          <path d='M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z' />
        </svg>
      </span>

      <span className='sun'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          fill='#333'
          viewBox='0 0 16 16'>
          <path d='M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z' />
        </svg>
      </span>
    </Toggle>
  );
};

export default ThemeToggle;

const enterKeyframes = keyframes`
0% { opacity: 0}
1% {transform: scale(.1) rotate(0deg) }
99% {opacity: 1}
100% {transform: scale(1) rotate(360deg) }
`;

const enterAnimation = (props) =>
  css`
    ${enterKeyframes} .5s 1
  `;

const Toggle = styled.button`
  width: 4rem;
  height: 1.8rem;

  background-color: #ccc;

  border: none;
  border-bottom: 2px solid var(--gray500);
  border-right: 2px solid var(--gray500);
  border-radius: 0.25rem;
  position: relative;
  padding: 0;

  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  .sun {
    z-index: 1;
    animation: ${(props) => (props.theme === "light" ? enterAnimation : "")};
  }
  .moon {
    z-index: 1;
    animation: ${(props) => (props.theme === "dark" ? enterAnimation : "")};
  }

  span {
    height: 20px;
    width: 20px;
  }

  :after {
    position: absolute;
    content: "";
    width: 2rem;
    height: 1.8rem;
    background: #555;
    top: 0;
    left: ${(props) => (props.theme === "dark" ? "2.1rem" : "0")};
    border-radius: 0.25rem;
    transition: 0.2s;
    z-index: 2;
  }

  :hover {
    cursor: pointer;
  }
`;
