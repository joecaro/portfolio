import { cn } from "@/lib/tw";

type Variant = "fill" | "line";
type Size = "md" | "sm";

// Content-box on purpose: on hover the bottom border grows by exactly the
// distance the button moves up, so its bottom edge stays put and it reads as
// rising out of the page. The negative margin keeps the extra height from
// shifting the layout around it.
const BASE =
    "box-content inline-flex items-center justify-center gap-2 rounded-[5px] font-semibold " +
    "border-[3px] border-l-blue-500 border-t-blue-500 border-r-blue-900 border-b-blue-900 " +
    "shadow-[2px_2px_0_rgba(0,0,0,0.33)] transition-[transform,border-bottom-width,margin] duration-100 " +
    "hover:-translate-y-[3px] hover:border-b-[6px] hover:-mb-[3px] " +
    "active:translate-y-px active:border-b-2 active:mb-px " +
    "motion-reduce:transition-none";

const VARIANTS: Record<Variant, string> = {
    fill: "bg-blue-600 text-white hover:text-white",
    line: "bg-white text-blue-700 hover:text-blue-700 dark:bg-neutral-800 dark:text-blue-300",
};

const SIZES: Record<Size, string> = {
    md: "h-10 min-w-24 px-[18px] text-[15px]",
    sm: "h-[31px] px-3 text-[13px] border-2 border-b-[3px] hover:-translate-y-[2px] hover:border-b-[5px] hover:-mb-[2px]",
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
