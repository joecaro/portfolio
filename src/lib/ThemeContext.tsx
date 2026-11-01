"use client";

import { useCallback, useEffect, useState } from "react";

const THEME_CHANGED = "portfolio-theme-changed";

export const useTheme = (cookieTheme: string | undefined) => {
    const [theme, setTheme] = useState(cookieTheme === "dark" ? "dark" : "light");

    const handleThemeChange = useCallback((newTheme: string) => {
        const next = newTheme === "dark" ? "dark" : "light";
        document.cookie = `theme=${next};path=/;`;
        document.documentElement.classList.toggle("dark", next === "dark");
        document.documentElement.classList.toggle("light", next === "light");
        setTheme(next);
        window.dispatchEvent(new Event(THEME_CHANGED));
    }, []);

    useEffect(() => {
        const sync = () => setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
        sync();
        window.addEventListener(THEME_CHANGED, sync);
        return () => window.removeEventListener(THEME_CHANGED, sync);
    }, []);

    return { theme, setTheme: handleThemeChange };
};
