import "./globals.css";

import { cookies } from "next/headers";
import Header from "@/components/Header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Joseph Carothers",
    description: "Web Development Portfolio for Joseph Carothers",
    icons: [
        {
            url: "/favicon.ico",
            rel: "icon",
        },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = cookies();
    const cookieTheme = cookieStore.get("theme");

    return (
        <html lang='en' className={cookieTheme?.value || ""}>
            <body className='dark:bg-neutral-900'>
                <Header cookieTheme={cookieTheme?.value} />
                {children}
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}
