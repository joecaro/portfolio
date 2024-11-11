import { cn } from "@/lib/tw";

const duration = 4000; //duration in ms

// Circle component
export const Circle = () => {
  return (
    <svg
      className="absolute -top-32 -left-32 rotate-[230deg] animate-circleAnimation"
      width="240"
      height="240"
      fill="rgb(59, 130, 246)"
      viewBox="0 0 64 64"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="half-circle"
        d="M32.076,7.963c-13.265,0 -24.018,10.754 -24.018,24.019c0,13.264 10.753,24.018 24.018,24.018l0,-4.013c-11.049,0 -20.006,-8.957 -20.006,-20.005c0,-11.049 8.957,-20.006 20.006,-20.006l0,-4.013Z"
      ></path>
    </svg>
  );
};

// Horizontal component
export const Horizontal = ({
  thickness,
  startLeft,
  top,
  bottom,
}: {
  thickness: number;
  startLeft: boolean;
  top?: number;
  bottom?: number;
}) => {
  return (
    <span
      className={cn(
        `absolute w-full border-blue-700`,
        startLeft ? "animate-startLeft" : "animate-startRight"
      )}
      style={{
        borderWidth: thickness,
        top: top || "auto",
        bottom: bottom || "auto",
      }}
    />
  );
};

// Diagonal component
export const Diagonal = ({
  height,
  delayMultiplier,
}: {
  height: string;
  delayMultiplier: number;
}) => {
  return (
    <span
      className={`absolute h-[1000px] w-[1000px] border border-l-0 border-t-0 border-b-0 border-r-4 border-blue-500 border-opacity-50 rotate-[45deg] animate-diagonalAnimation`}
      style={{ top: height, right: "10px" }}
    />
  );
};
