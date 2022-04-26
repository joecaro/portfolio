import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useAnimationFrame from "../../hooks/useAnimationFrame";
import { themes, useTheme } from "../../lib/ThemeContext";
import { Main } from "../../pages/about";

const src = "img/surfer.png";
const kooksrc = "img/kook.png";
const waterlinesrc = "img/waterline.png";

const gameConfig = {
  SCREEN_HEIGHT: 30,
  SCREEN_WIDTH: 100,
  dx: 0,
  dy: -1,
};

const SurfGame = () => {
  const [gameState, setGameState] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const { theme } = useTheme();

  return (
    <section
      style={{
        maxWidth: "1300px",
        display: "grid",
        placeItems: "center",
        margin: "4rem auto",
      }}>
      <h2>Kook Slams</h2>
      <button
        onClick={() => {
          setGameState(!gameState);
        }}>
        {gameState ? "Pause" : "Start"}
      </button>
      <GameScreen
        gameState={gameState}
        setGameState={setGameState}
        gameOver={gameOver}
        setGameOver={setGameOver}
      />
    </section>
  );
};

export default SurfGame;

const Game = styled.canvas`
  border: 1px solid black;
`;

const GameScreen = ({ gameState, setGameState, gameOver, setGameOver }) => {
  const [score, setScore] = useState(0);
  const canvasRef = useRef(null);
  const arrowDown = useRef(false);
  const arrowUp = useRef(false);
  const arrowLeft = useRef(false);
  const lastKeyPressed = useRef(null);
  const lastKeyDown = useRef(null);

  const hanldeKeyDown = (e) => {
    if (
      e.code !== "ArrowDown" &&
      e.code !== "ArrowUp" &&
      e.code !== "ArrowLeft"
    )
      return;

    e.preventDefault();
    if (e.code === "ArrowDown") arrowDown.current = true;
    if (e.code === "ArrowUp") arrowUp.current = true;
    if (e.code === "ArrowLeft") arrowLeft.current = true;

    if (lastKeyPressed.current !== e.code) {
      lastKeyPressed.current = e.code;
      lastKeyDown.current = Date.now();
    }
  };
  const hanldeKeyUp = (e) => {
    e.preventDefault();
    arrowDown.current = false;
    arrowUp.current = false;
    arrowLeft.current = false;
    lastKeyPressed.current = null;
    lastKeyDown.current = null;
  };

  useEffect(() => {
    var img = new Image();
    img.src = src;

    const canvas = canvasRef.current;
    canvas.height = 200;
    canvas.width = 600;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.beginPath();
    ctx.moveTo(0, 190);
    ctx.bezierCurveTo(20, 100, 50, 0, 600, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 200);
    ctx.bezierCurveTo(20, 100, 50, 5, 600, 0);
    ctx.stroke();

    ctx.drawImage(img, 0, 0, 50, 50);

    for (let i = 0; i < 5; i++) {
      let x = 20 + Math.random() * 20;
      let y = 160 + Math.random() * 20;
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, Math.PI * 2, false);
      ctx.stroke();
    }
    for (let i = 0; i < 5; i++) {
      let x = 20 + Math.random() * 20;
      let y = 160 + Math.random() * 20;
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2, false);
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    if (gameState) {
      setGameOver(false);
      window.addEventListener("keydown", hanldeKeyDown);
      window.addEventListener("keyup", hanldeKeyUp);

      const runGame = () => {
        let playerWidth = 50;
        let playerHeight = 50;
        let playerPos = { x: 0, y: 0 };
        let start = Date.now();
        let prevTime;
        let screenHeight = 200;
        let screenWidth = 600;
        let gameScore = 0;

        let MOVEMENT_MULTIPLIER = 0.0005;
        let MAXIMUM_SPEED = 150;

        let dx = 0;
        let dy = 0;

        var img = new Image();
        img.src = src;
        var Kookimg = new Image();
        Kookimg.src = kooksrc;
        var Waterlineimg = new Image();
        Waterlineimg.src = waterlinesrc;

        class Waterline {
          constructor() {
            this.x = screenWidth;
            this.y = Math.abs(Math.random()) * screenHeight;
          }

          generateY = () => Math.abs(Math.random()) * screenHeight;

          move = () => {
            if (this.x <= screenWidth * 0.1) {
              this.x = screenWidth;
              this.y = this.generateY();
            }
            this.x += -2;
          };
        }
        class Kook {
          constructor() {
            this.x = screenWidth;
            this.y = Math.abs(Math.random()) * screenHeight;
          }

          generateY = () => Math.abs(Math.random()) * (screenHeight - 50);

          move = () => {
            if (this.x <= screenWidth * 0.1) {
              addToScore();
              this.x = screenWidth;
              this.y = this.generateY();
            }
            this.x += -1;
          };
        }

        const waterLines = [];
        const kooks = [];

        const render = (time) => {
          const canvas = canvasRef.current;
          canvas.height = screenHeight;
          canvas.width = screenWidth;
          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, innerWidth, innerHeight);
          ctx.beginPath();
          ctx.moveTo(0, 190);
          ctx.bezierCurveTo(20, 100, 50, 0, 600, 0);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, 200);
          ctx.bezierCurveTo(20, 100, 50, 5, 600, 0);
          ctx.stroke();

          for (let i = 0; i < 5; i++) {
            let x = 20 + Math.random() * 20;
            let y = 160 + Math.random() * 20;
            ctx.beginPath();
            ctx.arc(x, y, 35, 0, Math.PI * 2, false);
            ctx.stroke();
          }
          for (let i = 0; i < 5; i++) {
            let x = 20 + Math.random() * 20;
            let y = 160 + Math.random() * 20;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2, false);
            ctx.stroke();
          }

          //Waterlines
          if ((start - Date.now()) % 1001 === 0 && waterLines.length < 5) {
            waterLines.push(new Waterline());
            console.log("waterline");
          }

          for (const Waterline of waterLines) {
            Waterline.move();
            ctx.drawImage(Waterlineimg, Waterline.x, Waterline.y, 20, 50);
          }

          //kooks
          if ((start - Date.now()) % 1001 === 0 && waterLines.length < 5) {
            kooks.push(new Kook());
            console.log("kook");
          }

          for (const kook of kooks) {
            kook.move();
            ctx.drawImage(Kookimg, kook.x, kook.y, 50, 50);
          }

          ctx.drawImage(
            img,
            playerPos.x,
            playerPos.y,
            playerWidth,
            playerHeight
          );

          const deltaTime = time - prevTime || time;
          prevTime = time;

          //MOVEMENT

          if (arrowDown.current === true) {
            down(canvas);
          } else if (arrowUp.current === true) {
            up();
          } else if (arrowLeft.current === true) {
            back();
          } else {
            dx += drag(dx);
            dy += -dy / 15;
          }

          checkEdges(canvas);

          checkCollision();

          playerPos = {
            x: (playerPos.x += dx * deltaTime * MOVEMENT_MULTIPLIER),
            y: (playerPos.y += dy * deltaTime * MOVEMENT_MULTIPLIER),
          };

          requestAnimationFrame(render);
        };

        const drag = () => {
          if (playerPos.x <= 0) {
            if (dx < 10) return Math.abs(playerPos.x / 10);
            else return 0;
          } else return -0.3;
        };

        const down = (canvas) => {
          let timePressed = Date.now() - lastKeyDown.current;

          if (dx < (MAXIMUM_SPEED * playerPos.y) / canvas.height) dx += 15;
          else dy += 4;
          if (dy < 0) dy += 10;
        };

        const up = () => {
          dx += drag();
          dy += -4;
        };

        const back = () => {
          dx += -2;
          dy += -dy / 15;
        };

        const checkEdges = (canvas) => {
          if (
            (playerPos.y < canvas.height * 0.1 && arrowUp.current) ||
            (playerPos.y > canvas.height * 0.7 && arrowDown.current)
          ) {
            dy += -dy / 5;
          }

          if (playerPos.x + playerWidth >= canvas.width && arrowDown.current) {
            dx = 0;
          }
        };

        const checkCollision = () => {
          for (const kook of kooks) {
            if (playerPos.x > kook.x && playerPos.x < kook.x + 20) {
              if (playerPos.y > kook.y && playerPos.y < kook.y + 50) {
                gameOver();
              }
            }
            if (
              playerPos.x + playerWidth > kook.x &&
              playerPos.x + playerWidth < kook.x + 20
            ) {
              if (
                playerPos.y + playerHeight > kook.y &&
                playerPos.y + playerHeight < kook.y + 50
              ) {
                gameOver();
              }
            }
          }
        };

        const addToScore = () => {
          if (!gameOver) {
            gameScore++;
            setScore(gameScore);
          }
        };

        const gameOver = () => {
          setGameState(false);
          setGameOver(true);
        };

        requestAnimationFrame(render);
      };

      runGame();
    }

    return () => {
      window.removeEventListener("keydown", hanldeKeyDown);
      window.removeEventListener("keyup", hanldeKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  return (
    <Screen>
      <Game ref={canvasRef}></Game>
      {gameOver && (
        <GameOver>
          <p>Game Over</p>
        </GameOver>
      )}
      <Score>Kooks Avoided: {score}</Score>
    </Screen>
  );
};

const Screen = styled.div`
  position: relative;
`;
const Score = styled.div`
  position: absolute;
  top: -20px;
  left: 400px;
`;
const GameOver = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 600px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);

  display: grid;
  place-items: center;

  p {
    font-size: 2rem;
  }
`;
