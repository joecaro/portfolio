import { cn } from "@/lib/tw";

type SelectButtonProps = {
    theme: string;
    filter: string;
    setFilter: (filter: string) => void;
    name: string;
    className?: string;
};

export default function SelectButton({
    theme,
    filter,
    setFilter,
    name,
    className,
}: SelectButtonProps) {
    const isSelected = filter === name.toLowerCase();
    const themeClasses =
        theme === "light"
            ? "bg-gray-100 text-gray-500"
            : "bg-gray-400 text-gray-900";

    return (
        <div className='h-10'>
            <button
                className={cn(
                    `box-border px-3 py-2 text-sm font-semibold border-2 transition ease-in-out rounded-sm shadow-[3px_3px_0_rgba(0,0,0,0.3)] hover:cursor-pointer hover:border-b-4 hover:translate-y-[-3px] hover:shadow-[3px_5px_2px_rgba(0,0,0,0.3)] active:bg-blue-600 active:border-b-2 active:border-blue-500 active:shadow-[1px_1px_0_rgba(0,0,0,0.4)]`,
                    isSelected
                        ? "border-blue-300 bg-blue-400 text-gray-900"
                        : `border-gray-700 ${themeClasses}`,
                    className
                )}
                onClick={() => setFilter(name.toLowerCase())}
                disabled={!filter}
            >
                {name}
            </button>
        </div>
    );
}
