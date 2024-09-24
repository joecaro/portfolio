import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "selector",
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            keyframes: {
                spinScale: {
                    "0%": {
                        opacity: "0",
                        transform: "scale(0.1) rotate(0deg)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "scale(1) rotate(360deg)",
                    },
                },
                circleAnimation: {
                    "0%": { transform: "rotate(90deg)" },
                    "25%": { transform: "rotate(90deg)" },
                    "100%": { transform: "rotate(-90deg)" },
                },
                startLeft: {
                    "0%": { transform: "translateX(-100%)" },
                    "25%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(0)" },
                },
                startRight: {
                    "0%": { transform: "translateX(100%)" },
                    "25%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(0)" },
                },
                diagonalAnimation: {
                    "0%": { transform: "translate(100%, -100%) rotate(45deg)" },
                    "100%": { transform: "translate(0, 0) rotate(45deg)" },
                },
                fadeInHome: {
                    "0%": { opacity: "0", transform: "translateY(1rem)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeInAbout: {
                    "0%": { opacity: "0", transform: "translate(1rem, 1rem)" },
                    "100%": { opacity: "1", transform: "translate(0, 0)" },
                },
            },
            animation: {
                "spin-scale": "spinScale 0.5s ease-in-out",
                circleAnimation: `circleAnimation ${10 / 3}ms`,
                startLeft: `startLeft ${10 / 1.2}ms`,
                startRight: `startRight ${10 / 1.2}ms`,
                diagonalAnimation: `diagonalAnimation ${10}ms`,
                fadeInHome: "fadeInHome 0.5s ease-in-out",
                fadeInAbout: "fadeInAbout 0.5s ease-in-out",
            },
            backgroundImage: {
                lightGradient:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 90%, var(--blue300))",
                darkGradient:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 90%, var(--blue500))",
            },
        },
    },
    plugins: [],
};
export default config;
