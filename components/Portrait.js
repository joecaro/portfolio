import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Portrait = () => {
  return (
    <Container>
      <EyeContainer>
        <Eye />
        <Eye className='eye-left' />
      </EyeContainer>
    </Container>
  );
};

const Eye = () => {
  const [rotation, setRotation] = useState(0);
  const eyeRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      const eye = eyeRef.current;

      let mouseX = eye.getBoundingClientRect().right;
      if (eye.classList.contains("eye-left")) {
        mouseX = eye.getBoundingClientRect().left;
      }
      let mouseY = eye.getBoundingClientRect().top;
      let radianDegrees = Math.atan2(e.pageX - mouseX, e.pageY - mouseY);
      let rotationDegrees = radianDegrees * (180 / Math.PI) * -1 + 180;
      eye.style.transform = `rotate(${rotationDegrees}deg)`;
    });
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
`;
const EyeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 2rem;
  justify-content: center;
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
