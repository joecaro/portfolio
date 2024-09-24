import { PropsWithChildren } from "react";

export const StyledProjectCard = ({
    width,
    children,
}: {
    width: number;
    children: React.ReactNode;
}) => {
    const cardHeight = (width * 9) / 16;

    return (
        <div
            className='mx-auto flex flex-col rounded-lg'
            style={{
                width: `clamp(300px, ${width}px, 80%)`,
                height: `${cardHeight}px`,
                aspectRatio: "16/9",
            }}
        >
            {children}
        </div>
    );
};

export const Header = ({
    isDark,
    children,
}: PropsWithChildren<{ isDark: boolean }>) => {
    const bgColor = isDark ? "bg-neutral-900" : "bg-neutral-50";

    return (
        <div
            className={`w-full h-10 rounded-t-lg grid grid-cols-[1fr_4fr_1fr] ${bgColor}`}
        >
            <span className='flex items-center justify-center'>
                <div className='w-8 h-8 bg-red-500 rounded-full mx-1'></div>
                <div className='w-8 h-8 bg-yellow-500 rounded-full mx-1'></div>
                <div className='w-8 h-8 bg-green-500 rounded-full mx-1'></div>
            </span>
            <h4 className='text-center font-semibold'>{children}</h4>
        </div>
    );
};

export const Info = ({
    background,
    children,
}: PropsWithChildren<{ background: string }>) => {
    return (
        <div
            className='relative flex flex-col justify-between rounded-lg'
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                height: "100%",
            }}
        >
            {children}
        </div>
    );
};

export const Buttons = ({
    isHover,
    children,
}: PropsWithChildren<{ isHover: boolean }>) => {
    return (
        <span
            className={`grid grid-cols-3 justify-center items-center rounded-lg transition-opacity duration-200 ${
                isHover ? "opacity-100" : "opacity-0"
            }`}
            style={{ height: "100%" }}
        >
            {children}
        </span>
    );
};
