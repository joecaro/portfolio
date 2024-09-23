import Nav from "@/components/Nav";
import "./globals.css";

import ThemeToggle from "@/components/ThemeToggle";
import { cookies } from "next/headers";
import Header from "@/components/Header";

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
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}
