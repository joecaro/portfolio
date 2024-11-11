import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector"],
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
          "0%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(230deg)",
          },
        },
        startLeft: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "25%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        startRight: {
          "0%": {
            transform: "translateX(100%)",
          },
          "25%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        diagonalAnimation: {
          "0%": {
            transform: "translate(100%, -100%) rotate(45deg)",
          },
          "100%": {
            transform: "translate(0, 0) rotate(45deg)",
          },
        },
        fadeInHome: {
          "0%": {
            opacity: "0",
            transform: "translateY(1rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeInAbout: {
          "0%": {
            opacity: "0",
            transform: "translate(1rem, 1rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(0, 0)",
          },
        },
        slideInLeft: {
          "0%": {
            opacity: "0",
          },
          "49%": {
            opacity: "0",
          },
          "50%": {
            transform: "translateX(-100px)",
          },
          "99%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "spin-scale": "spinScale 0.5s ease-in-out",
        circleAnimation: "circleAnimation 3000ms",
        startLeft: "startLeft 8.33ms",
        startRight: "startRight 8.33ms",
        diagonalAnimation: "diagonalAnimation 5000ms",
        fadeInHome: "fadeInHome 0.5s ease-in-out",
        fadeInAbout: "fadeInAbout 0.5s ease-in-out",
        slideInLeft: "slideInLeft ease-in-out",
      },
      backgroundImage: {
        gradientBlue:
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 90%, rgb(37 99 235))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
