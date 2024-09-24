import "./globals.css";

import { cookies } from "next/headers";
import Header from "@/components/Header";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = cookies();
    const cookieTheme = cookieStore.get("theme");

    return (
        <html lang='en' className={cookieTheme?.value || ""}>
            <Head>
                <title>Joseph Carothers</title>
                <meta
                    name='description'
                    content='Web Development Portfolio for Joseph Carothers'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <body className='dark:bg-neutral-900'>
                <Header cookieTheme={cookieTheme?.value} />
                {children}
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}
