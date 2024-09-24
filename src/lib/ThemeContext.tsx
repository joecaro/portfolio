"use client";

import { useCallback, useEffect, useState } from "react";

export const useTheme = (cookieTheme: string | undefined) => {
    const [theme, setTheme] = useState(cookieTheme || "light");

    const handleThemeChange = useCallback((newTheme: string) => {
        setTheme(newTheme);
        document.cookie = `theme=${newTheme};path=/;`;
        document.documentElement.setAttribute("class", newTheme);
    }, []);

    useEffect(() => {
        // check html class for theme
        const currentTheme = document.documentElement.getAttribute("class");
        if (currentTheme) {
            setTheme(currentTheme);
        }
    }, []);

    return { theme, setTheme: handleThemeChange };
};
