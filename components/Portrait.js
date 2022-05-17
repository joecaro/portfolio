import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Portrait = () => {
  return (
    <Container>
      <Head>
        <Hair />
        <EyeContainer>
          <Eye />
          <Eye className='eye-left' />
        </EyeContainer>
        <Nose />
        <Mouth />
      </Head>
    </Container>
  );
};

const Eye = () => {
  const [rotation, setRotation] = useState(0);
  const eyeRef = useRef(null);

  useEffect(() => {
    const rotateEye = (e) => {
      const eye = eyeRef.current;

      let mouseX = eye.getBoundingClientRect().right;
      if (eye.classList.contains("eye-left")) {
        mouseX = eye.getBoundingClientRect().left;
      }
      let mouseY = eye.getBoundingClientRect().top;
      let radianDegrees = Math.atan2(e.pageX - mouseX, e.pageY - mouseY);
      let rotationDegrees = radianDegrees * (180 / Math.PI) * -1 + 180;
      eye.style.transform = `rotate(${rotationDegrees}deg)`;
    };
    window.addEventListener("mousemove", rotateEye);

    return () => window.removeEventListener("mousemove", rotateEye);
  }, []);

  return (
    <EyeStyles ref={eyeRef} rotation={rotation}>
      <div></div>
    </EyeStyles>
  );
};

export default Portrait;

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: var(--gray500);
  display: grid;
  place-items: center;
`;
const Head = styled.div`
  width: 60%;
  background-color: var(--warning600);
  border-radius: 2rem;
  display: grid;
  justify-items: center;
`;

const Hair = styled.div`
  width: 100%;
  height: 30px;
  border-radius: 1rem 1rem 0 0;
  background-color: var(--warning300);
`;
const EyeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 1rem;
`;

const EyeStyles = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  background: white;
  border-radius: 50%;

  ::after {
    content: "";
    height: 20px;
    width: 20px;
    position: absolute;
    left: 50%;
    top: 5px;
    transform: translateX(-50%);
    background-color: var(--blue400);
    border-radius: 50%;
  }
`;
const Nose = styled.div`
  height: 30px;
  width: 10px;
  background-color: var(--warning500);
  margin-top: -25px;
  border-radius: 0 0 20% 20%;
`;

const Mouth = styled.div`
  width: 40%;
  border-bottom: 2px solid var(--danger200);
  border-radius: 1rem;
  height: 0.5rem;
  margin: 1rem;
`;
