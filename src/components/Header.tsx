"use client";

import React from "react";
import Nav from "./Nav";
import Link from "next/link";
import MaxWidthContainer from "./styles/MaxWidthContainer";
import MobileNav from "./MobileNav";

export default function Header() {
    return (
        <header className='max-w-screen-xl mx-auto p-4 text-lg h-22'>
            <MaxWidthContainer>
                <Link passHref href='/' legacyBehavior>
                    <span className='font-semibold hover:underline cursor-pointer z-10 dark:text-neutral-300'>
                        Joseph Carothers
                    </span>
                </Link>
                <Nav />
                <MobileNav />
            </MaxWidthContainer>
        </header>
    );
}
