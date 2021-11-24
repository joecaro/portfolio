import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function ParralaxBackground() {
  const [percentScrolled, setPercentScrolled] = useState(0);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    let main = document.getElementById("main-container");

    let pScroll =
      window.scrollY /
      (main.getBoundingClientRect().height - window.innerHeight);
    console.log(pScroll);
    setPercentScrolled(pScroll);
  };

  return (
    <Container>
      <Wall
        yPos={-300 - 1000 * percentScrolled}
        rotation={0 + 20 * percentScrolled}
        src='https://res.cloudinary.com/joecarothers/image/upload/v1637769151/misc/backgournd/wall_i8axzm.jpg'
      />
      <Underfloor
        yPos={1330 - 1210 * percentScrolled}
        src='https://res.cloudinary.com/joecarothers/image/upload/v1637769070/misc/backgournd/underfloor_hfouxg.jpg'
      />
      <Floor
        yPos={670 - 1000 * percentScrolled}
        rotation={70 + 20 * percentScrolled}
        src='https://res.cloudinary.com/joecarothers/image/upload/v1637769068/misc/backgournd/floor_buzobx.jpg'
      />
      <White yPos={1430 - 1210 * percentScrolled} />
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 0;
`;

const Wall = styled.img`
  position: absolute;
  height: 1500px;
  top: ${({ yPos }) => `${yPos}px`};
  right: -550px;
  transform: ${({ rotation }) =>
    `perspective(100em) rotateX(${rotation}deg) rotateY(-50deg)`};
`;

const Floor = styled.img`
  position: absolute;
  width: 2000px;
  height: 900px;
  top: ${({ yPos }) => `${yPos}px`};
  right: 300px;
  transform: ${({ rotation }) => `perspective(100em) rotateX(${rotation}deg)`};
`;

const Underfloor = styled.img`
  position: absolute;
  width: 2600px;
  height: 100px;
  top: ${({ yPos }) => `${yPos}px`};
  right: 0;
`;

const White = styled.div`
  position: absolute;
  width: 100vw;
  height: 300px;
  background-color: #eee;
  top: ${({ yPos }) => `${yPos}px`};
`;
