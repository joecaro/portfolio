"use client";

import Link from "next/link";
import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const MobileNav = ({ cookieTheme }: { cookieTheme: string | undefined }) => {
    const [toggled, setToggled] = useState(false);
    return (
        <nav className='flex items-center gap-4 md:hidden'>
            {toggled && (
                <div
                    className={`bg-neutral-900 dark:bg-neutral-300 w-full h-full absolute top-0 left-0 z-50 grid animate-slideIn`}
                >
                    <ul className='h-1/2 grid grid-rows-[3.5rem,1fr,1fr,1fr,1fr] m-0 p-4 gap-8 list-none'>
                        <button
                            type='button'
                            className={`text-4xl bg-transparent border-none self-end justify-self-end text-neutral-200 dark:text-neutral-900`}
                            onClick={() => setToggled(!toggled)}
                        >
                            x
                        </button>
                        <li onClick={() => setToggled(!toggled)}>
                            <Link href='/'>Home</Link>
                        </li>
                        <li onClick={() => setToggled(!toggled)}>
                            <Link href='/about'>About</Link>
                        </li>
                        <li onClick={() => setToggled(!toggled)}>
                            <Link href='/projects'>Projects</Link>
                        </li>
                        <li onClick={() => setToggled(!toggled)}>
                            <Link href='/contact'>Contact</Link>
                        </li>
                        <ThemeToggle cookieTheme={cookieTheme} />
                    </ul>
                </div>
            )}
            <button
                type='button'
                className={`text-4xl bg-transparent border-none text-neutral-200 dark:text-neutral-900`}
                onClick={() => setToggled(!toggled)}
            >
                +
            </button>
        </nav>
    );
};

export default MobileNav;