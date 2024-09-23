"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export const useTheme = (initialValue?: string) => {
    const [theme, setTheme] = useState(initialValue || "light");

    const handleThemeChange = useCallback(
        (newTheme: string) => {
            document.cookie = `theme=${newTheme};path=/;`;
            document
                .querySelector("html")
                ?.setAttribute("data-theme", newTheme);
            document.querySelector("html")?.setAttribute("class", newTheme);
            setTheme(newTheme);
        },
        [setTheme]
    );

    const hydrated = useRef(false);

    useEffect(() => {
        if (initialValue && !hydrated.current) {
            handleThemeChange(initialValue);
            hydrated.current = true;
        }
    }, [initialValue, handleThemeChange]);

    return { theme, setTheme: handleThemeChange };
};
