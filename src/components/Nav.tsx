"use client";

import Link from "next/link";
import React from "react";
import { ButtonLink } from "@/components/Button";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";

const Nav = () => {
    const pathname = usePathname();

    const linkGradient = (current: boolean) =>
        `bg-gradient-to-b from-transparent to-blue-300 dark:to-blue-500  ${
            current ? "bg-100% 100%" : "bg-0% 100%"
        } hover:bg-100% 100% transition-all duration-200`;

    return (
        <nav className='hidden md:flex items-center gap-4'>
            <ul className='list-none flex items-center gap-4 dark:text-white'>
                <li>
                    <Link
                        href='/'
                        className={`${linkGradient(pathname === "/")}`}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        href='/about'
                        className={`${linkGradient(pathname === "/about")}`}
                    >
                        About
                    </Link>
                </li>
                <li>
                    <Link
                        href='/projects'
                        className={`${linkGradient(pathname === "/projects")}`}
                    >
                        Projects
                    </Link>
                </li>
            </ul>
            <ButtonLink
                color='blue'
                inverted={false}
                animated={true}
                href='#contact'
            >
                Contact
            </ButtonLink>
            <ThemeToggle />
        </nav>
    );
};

export default Nav;
