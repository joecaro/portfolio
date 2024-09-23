import { cn } from "@/lib/tw";

const duration = 4000; //duration in ms

// Circle component
export const Circle = () => {
    return (
        <span
            className={`absolute h-[200px] w-[200px] rounded-full transform rotate-[-90deg] z-20 border-4 animate-circleAnimation border-blue-600 bg-blue-400 dark:border-blue-500 dark:bg-gray-200`}
            style={{ top: "-60px", left: "-100px" }}
        >
            <span
                className={`absolute w-[200px] h-[100px] transform translate-x-[-50%] bg-blue-400 dark:bg-gray-200`}
                style={{ top: "-4px", left: "50%" }}
            />
        </span>
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
            className={`absolute h-[1000px] w-[1000px] border-r-3 border-blue-500 dark:border-gray-300 transform rotate-[45deg] animate-diagonalAnimation`}
            style={{ top: height, right: "10px" }}
        />
    );
};
