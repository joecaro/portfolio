"use client";

import Link from "next/link";
import React from "react";
import { ButtonLink } from "@/components/Button";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";

const Nav = () => {
    const pathname = usePathname();

    const linkGradient = (current: boolean) =>
        `bg-no-repeat bg-right transition-[background-size] duration-200 bg-lightGradient dark:bg-darkGradient ${
            current ? "bg-[length:100%_100%]" : "bg-[length:0%_100%]"
        } hover:bg-[length:100%_100%] hover:bg-left`;

    return (
        <nav className='hidden md:flex items-center gap-4'>
            <ul className='list-none flex items-center gap-4 dark:text-neutral-300'>
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
