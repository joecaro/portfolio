import React from "react";
import styles from "../styles/Light.module.css";
import { useTheme, themes } from "../lib/ThemeContext";
import styled from "styled-components";

export default function Light(props) {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    let newTheme = theme === themes.light ? themes.dark : themes.light;
    setTheme(newTheme);
    localStorage.setItem("themeSetting", JSON.stringify(newTheme));
  };

  return (
    <LightContainer>
      <div className={styles.light} onClick={handleToggleTheme}>
        {theme === themes.dark && (
          <div className={styles.lightbulb}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              fill='currentColor'
              className='bi bi-lightbulb-fill'
              viewBox='0 0 16 16'>
              <path d='M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z' />
            </svg>
          </div>
        )}
        {theme === themes.light && (
          <div className={`${styles.lightbulb} ${styles.lightbulbLight}`}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              fill='currentColor'
              className='bi bi-lightbulb'
              viewBox='0 0 16 16'>
              <path d='M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z' />
            </svg>
          </div>
        )}
        <div
          className={`${styles.cord} ${
            theme === themes.light ? styles.cordLight : ""
          }`}
        />
        <div className={theme === themes.dark ? styles.lightGlow : ""}></div>
      </div>
    </LightContainer>
  );
}

const LightContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;
  width: 400px;
  height: 400px;
`;
