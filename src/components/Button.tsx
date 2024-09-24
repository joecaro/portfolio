import { cn } from "@/lib/tw";

const COLORS = {
    neutral: {
        bg: "bg-neutral-500",
        text: "text-neutral-600",
        borderDark: "border-r-neutral-800 border-b-neutral-800",
        borderLight: "border-l-neutral-500 border-t-neutral-500",
    },
    blue: {
        bg: "bg-blue-500",
        text: "text-blue-600",
        borderDark: "border-r-blue-800 border-b-blue-800",
        borderLight: "border-l-blue-500 border-t-blue-500",
    },
    green: {
        bg: "bg-green-500",
        text: "text-green-600",
        borderDark: "border-r-green-800 border-b-green-800",
        borderLight: "border-l-green-500 border-t-green-500",
    },
    red: {
        bg: "bg-red-500",
        text: "text-red-600",
        borderDark: "border-r-red-800 border-b-red-800",
        borderLight: "border-l-red-500 border-t-red-500",
    },
    yellow: {
        bg: "bg-yellow-500",
        text: "text-yellow-600",
        borderDark: "border-r-yellow-800 border-b-yellow-800",
        borderLight: "border-l-yellow-500 border-t-yellow-500",
    },
    purple: {
        bg: "bg-purple-500",
        text: "text-purple-600",
        borderDark: "border-r-purple-800 border-b-purple-800",
        borderLight: "border-l-purple-500 border-t-purple-500",
    },
};

type BaseButtonProps = {
    children: React.ReactNode;
    color?: keyof typeof COLORS;
    textColor?: keyof typeof COLORS;
    inverted?: boolean;
    animated?: boolean;
    className?: string;
    onClick?: () => void;
};

const BaseButton = ({
    children,
    color = "neutral",
    textColor,
    inverted = false,
    animated = true,
    className = "",
    onClick,
}: BaseButtonProps) => {
    const bgColor = inverted
        ? "bg-white dark:bg-neutral-800"
        : COLORS[color].bg;
    const textClass = textColor
        ? COLORS[textColor].text
        : inverted
        ? COLORS[color].text
        : "text-white";

    return (
        <div className={`relative ${className}`}>
            <button
                className={cn(
                    `box-content grid place-items-center font-semibold h-10 w-24 rounded-sm transition-all ease-in-out transform`,
                    bgColor,
                    textClass,
                    "border-[3px] rounded",
                    COLORS[color].borderLight,
                    COLORS[color].borderDark,
                    animated &&
                        `hover:border-b-[6px] active:border-b-2 hover:translate-y-[-3px] active:translate-y-[0px]`
                )}
                style={{
                    boxShadow: `2px 2px 0 #00000055`,
                }}
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    );
};

type ButtonProps = {
    children: React.ReactNode;
    color?: keyof typeof COLORS;
    textColor?: keyof typeof COLORS;
    inverted?: boolean;
    animated?: boolean;
    onClick: () => void;
    className?: string;
};

export const Button = ({
    children,
    color,
    textColor,
    inverted = false,
    animated = true,
    onClick,
    className,
}: ButtonProps) => {
    return (
        <BaseButton
            color={color}
            textColor={textColor}
            inverted={inverted}
            animated={animated}
            onClick={onClick}
            className={className}
        >
            {children}
        </BaseButton>
    );
};

type ButtonLinkProps = {
    children: React.ReactNode;
    color?: keyof typeof COLORS;
    href: string;
    textColor?: keyof typeof COLORS;
    inverted?: boolean;
    animated?: boolean;
};

export const ButtonLink = ({
    children,
    color,
    href,
    textColor,
    inverted = false,
    animated = true,
}: ButtonLinkProps) => {
    return (
        <div className='relative h-12'>
            <a
                className='block'
                href={href}
                target='_blank'
                rel='noopener noreferrer'
            >
                <BaseButton
                    color={color}
                    textColor={textColor}
                    inverted={inverted}
                    animated={animated}
                >
                    {children}
                </BaseButton>
            </a>
        </div>
    );
};
