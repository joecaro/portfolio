import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import { keyframes } from "styled-components";
import {
  beard,
  chin,
  ears,
  eyes,
  glasses,
  hair,
  mouth,
  nose,
} from "../lib/PortraitSVG";
import { useTheme } from "../lib/ThemeContext";
const Portrait = (props) => {
  const { theme } = useTheme();

  const noseRef = useRef(null);
  const [transformX, setTransformX] = useState(0);
  const [transformY, setTransformY] = useState(0);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  useEffect(() => {
    const moveEyes = (e) => {
      const nose = noseRef.current;
      const distanceMultiplier = 30;

      if (nose) {
        let mouseX = nose.getBoundingClientRect().right;
        let mouseY = nose.getBoundingClientRect().top;
        let radianDegrees = Math.atan2(e.pageX - mouseX, e.pageY - mouseY);
        let mouseRotationDegrees = radianDegrees * (180 / Math.PI) * -1 + 180;
        let newTranformY = Math.cos(radianDegrees) * distanceMultiplier;
        let newTranformX = Math.sin(radianDegrees) * distanceMultiplier;

        const calculateHeadRotation = (angle) => {
          let maximumRotation = 2.5;
          let counterClockwiseAdjustment = -1;

          let headRotation = 0;

          if (angle <= 90) {
            headRotation =
              Math.min(90 - angle, maximumRotation) *
              counterClockwiseAdjustment;
          } else if (angle <= 180) {
            headRotation = Math.min(angle - 90, maximumRotation);
          } else if (angle <= 270) {
            headRotation =
              Math.min(270 - angle, maximumRotation) *
              counterClockwiseAdjustment;
          } else if (angle <= 360) {
            headRotation = Math.min(angle - 270, maximumRotation);
          }

          return headRotation;
        };

        setTransformX(newTranformX);
        setTransformY(newTranformY);
        setRotationDegrees(calculateHeadRotation(mouseRotationDegrees));
      }
    };

    window.addEventListener("mousemove", moveEyes);

    return () => window.removeEventListener("mousemove", moveEyes);
  }, []);
  return (
    <Container page={props.page} theme={theme}>
      <div
        style={{
          transform: `translate(0, ${
            transformY / 10
          }px) rotate(${rotationDegrees}deg)`,
          transition: "200ms",
        }}>
        <svg
          height='100%'
          version='1.1'
          viewBox='1000 0 1500 1900'
          width='100%'>
          <g
            clipPath='url(#ArtboardFrame)'
            id='Layer-1'
            data-layer-name='Layer 1'></g>
          <g clipPath='url(#ArtboardFrame)' id='Chin' data-layer-name='Chin'>
            <g className='portraitbackground'>
              <path
                d='M1716.97 1703.72C1585.01 1703.72 1508.2 1615.42 1439.07 1511.34C1369.93 1407.26 1359.93 1300.76 1346.4 1285.39C1322.98 1258.8 1302.23 1214.7 1286.26 1138.33C1270.28 1061.95 1267.12 1020.83 1280.1 981.899C1293.07 942.962 1324.02 973.912 1324.02 973.912C1324.02 973.912 1256.22 641.577 1281.46 513.764L1392.7 438.71C1483.49 248.816 1682.58 166.317 1682.58 166.317L1667.76 253.964C1755.42 221 1939.3 223.872 1939.3 223.872L1918.14 260.4C2000.03 269.41 2093.46 330.134 2093.46 330.134L2038.4 364.023C2123.39 387.827 2203.7 510.578 2203.7 510.578L2164.07 551.295C2164.07 551.295 2164.07 831.923 2123.39 974.683C2123.39 974.683 2166.29 949.111 2168.47 1008.22C2170.65 1067.32 2138.93 1153.71 2117.45 1224.97C2095.97 1296.24 2104.33 1235.04 2082.54 1293.29C2060.75 1351.54 2071.38 1377.03 2030.28 1457.97C1989.18 1538.91 1981.27 1550.77 1910.94 1618.64C1840.61 1686.52 1830.04 1703.72 1716.97 1703.72Z'
                fill='currentColor'
                opacity='1'
                stroke='none'
              />
            </g>

            <g opacity='1'>{chin}</g>
          </g>
          <g
            id='Mouth'
            style={{ transform: `translate(0, ${transformY / 8}px)` }}
            data-layer-name='Mouth'>
            {mouth}
          </g>
          <g id='Ears' data-layer-name='Ears'>
            <g opacity='1'>{ears}</g>
          </g>
          <g
            id='Glasses'
            style={{ transform: `translate(0, ${transformY / 2}px)` }}
            data-layer-name='Glasses'>
            <g opacity='1'>{glasses}</g>
          </g>
          <g
            style={{ transform: `translate(${transformX}px, ${transformY}px)` }}
            id='Eyes'
            data-layer-name='Eyes'>
            {eyes}
          </g>
          <g
            id='Hair'
            style={{ transform: `translate(0, ${transformY / 5}px)` }}
            data-layer-name='Hair'>
            <g opacity='1'>{hair}</g>
          </g>
          <g id='Beard' data-layer-name='Beard'>
            {beard}
          </g>
          <g
            id='Nose'
            style={{ transform: `translate(0, ${transformY / 5}px)` }}
            data-layer-name='Nose'
            ref={noseRef}>
            {nose}
          </g>
        </svg>
      </div>
    </Container>
  );
};

export default Portrait;

const duration = 2000;

const containerKeyframesHome = keyframes`
0% {
  transform: translateY(15px);
  opacity: 0;
}
66% {
  transform: translateY(15px);
  opacity: 0;
}
100% {
  transform: translateY(0);
  opacity: 1;
}
`;

const containerAnimationHome = css`
  ${containerKeyframesHome} ${duration}ms
`;

const containerKeyframesAbout = keyframes`
0% {
  transform: translate(25px, 15px);
  opacity: 0;
}


100% {
  transform: translate(0, 0);
  opacity: 1;
}
`;

const containerAnimationAbout = css`
  ${containerKeyframesAbout} ${duration / 2}ms
`;

const Container = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  animation: ${(props) =>
    props.page === "home" ? containerAnimationHome : containerAnimationAbout};
  animation-iteration-count: 1;
  .portraitbackground {
    color: ${(props) => (props.theme === "light" ? "#f5f5f5" : "#191919")};
  }
`;
