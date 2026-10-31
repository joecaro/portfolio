import "./globals.css";

import { cookies } from "next/headers";
import Header from "@/components/Header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Sora } from "next/font/google";

const sora = Sora({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    variable: "--font-sora",
});

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
        <html
            lang='en'
            className={`${sora.variable} ${cookieTheme?.value || ""}`}
        >
            <body className='dark:bg-neutral-900'>
                <Header cookieTheme={cookieTheme?.value} />
                {children}
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}
