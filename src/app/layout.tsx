import Nav from "@/components/Nav";
import "./globals.css";

import ThemeToggle from "@/components/ThemeToggle";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import Head from "next/head";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = cookies();
    const theme = cookieStore.get("theme");

    return (
        <html
            lang='en'
            className={theme?.value || ""}
            data-theme={theme?.value || ""}
        >
            <Head>
                <title>Joseph Carothers</title>
                <meta
                    name='description'
                    content='Web Development Portfolio for Joseph Carothers'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}
