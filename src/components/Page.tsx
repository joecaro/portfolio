import Header from "./Header";
import { PropsWithChildren } from "react";
import Head from "next/head";

const Page = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Head>
                <link rel='icon' href='/favicon.png' />
            </Head>
            <div style={{ minHeight: "100vw" }}>
                <Header />
                {children}
            </div>
        </>
    );
};

export default Page;
