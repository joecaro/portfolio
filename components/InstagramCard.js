import React from "react";
import styled from "styled-components";
import { useTheme } from "../lib/ThemeContext";

const cardHeight = 300;

export default function InstagramCard({ url }) {
  const { theme } = useTheme();

  return (
    <InstagramCardStyles
      target='_blank'
      rel='noreferrer'
      href='https://www.instagram.com/threedeedesign/'
      theme={theme}
      url={url}
      cardHeight={cardHeight}>
      <div className='header'>
        <div className='profile'></div>
        <h4 className='profile-name'>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://www.instagram.com/threedeedesign/'>
            threedeedesign
          </a>
        </h4>
        <p>...</p>
      </div>
      <div className='picture'></div>
      <div className='details'>
        <div className='icons'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={`${cardHeight / 15}`}
            height={`${cardHeight / 15}`}
            fill='currentColor'
            viewBox='0 0 16 16'>
            <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={`${cardHeight / 15}`}
            height={`${cardHeight / 15}`}
            fill='currentColor'
            viewBox='0 0 16 16'>
            <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={`${cardHeight / 15}`}
            height={`${cardHeight / 15}`}
            fill='currentColor'
            viewBox='0 0 16 16'>
            <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
          </svg>
        </div>
      </div>
    </InstagramCardStyles>
  );
}

const InstagramCardStyles = styled.a`
  color: ${({ theme }) => theme.foreground};
  height: ${({ cardHeight }) => `${cardHeight}px`};
  width: ${({ cardHeight }) => `${cardHeight * (7 / 8)}px`};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.background};
  display: grid;
  grid-template-rows: auto 1fr auto;
  box-shadow: 0 0 30px -20px #aaa;
  transition: 0.2s;
  :hover {
    transform: scale(1.1);
    ::after {
      content: "📷";
      font-size: 2rem;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 0.5rem;
      display: grid;
      place-items: center;
      background-color: #00000044;
    }
  }

  .header {
    display: flex;
    padding: 1rem;

    p {
      margin: 0;
    }
  }

  .profile {
    height: ${({ cardHeight }) => `${cardHeight / 11}px`};
    width: ${({ cardHeight }) => `${cardHeight / 11}px`};
    border-radius: 50%;
    background-color: #aaa;
    background-image: url("https://res.cloudinary.com/joecarothers/image/upload/v1637851355/misc/profile_uxp39t.jpg");
    background-size: cover;
  }

  .profile-name {
    margin: auto;
    font-weight: 500;
    :hover {
      text-decoration: underline;
    }
  }

  .picture {
    width: 100%;
    aspect-ratio: 16/9;
    background-image: url(${({ url }) => url});
    background-size: cover;
  }

  .details {
    height: ${({ cardHeight }) => `${cardHeight / 4}px`};
    width: 100%;
  }

  .icons {
    padding: 1rem;
    display: flex;
    gap: 1rem;
  }
`;
