import { cn } from "@/lib/tw";

type Variant = "fill" | "line";
type Size = "md" | "sm";

const BASE =
    "box-border inline-flex items-center justify-center gap-2 rounded-[5px] font-semibold " +
    "border-[3px] border-l-blue-500 border-t-blue-500 border-r-blue-900 border-b-blue-900 " +
    "shadow-[2px_2px_0_rgba(0,0,0,0.33)] transition-[transform,border-bottom-width] duration-100 " +
    "hover:-translate-y-[3px] hover:border-b-[6px] active:translate-y-px active:border-b-2 " +
    "motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const VARIANTS: Record<Variant, string> = {
    fill: "bg-blue-600 text-white hover:text-white",
    line: "bg-white text-blue-700 hover:text-blue-700 dark:bg-neutral-800 dark:text-blue-300",
};

const SIZES: Record<Size, string> = {
    md: "h-[46px] min-w-28 px-[18px] text-[15px]",
    sm: "h-9 px-3 text-[13px] border-2 border-b-[3px] hover:border-b-[5px]",
};

export const buttonClasses = (
    variant: Variant = "fill",
    size: Size = "md",
    className?: string
) => cn(BASE, VARIANTS[variant], SIZES[size], className);

type ButtonProps = {
    children: React.ReactNode;
    variant?: Variant;
    size?: Size;
    className?: string;
    onClick?: () => void;
    pressed?: boolean;
};

export const Button = ({
    children,
    variant = "fill",
    size = "md",
    className,
    onClick,
    pressed,
}: ButtonProps) => (
    <button
        type='button'
        className={buttonClasses(variant, size, className)}
        onClick={onClick}
        aria-pressed={pressed}
    >
        {children}
    </button>
);

type ButtonLinkProps = {
    children: React.ReactNode;
    href: string;
    variant?: Variant;
    size?: Size;
    className?: string;
};

export const ButtonLink = ({
    children,
    href,
    variant = "fill",
    size = "md",
    className,
}: ButtonLinkProps) => {
    const external = /^https?:\/\//.test(href);

    return (
        <a
            href={href}
            className={buttonClasses(variant, size, className)}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        >
            {children}
        </a>
    );
};
