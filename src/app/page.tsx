import Hero from "@/components/Hero";
import ProjectsList from "@/components/ProjectsList";
import getAllProjects from "@/lib/getAllProjects";
import { Form } from "@/pages/contact";
import Head from "next/head";
import { useMemo } from "react";

export default function Page({ Component, pageProps }: any) {
    const projects = getAllProjects();

    const sortedProjects = useMemo(
        () => projects.sort((a, b) => a.position - b.position),
        [projects]
    );
    return (
        <div>
            <Head>
                <title>Joseph Carothers</title>
                <meta
                    name='description'
                    content='Web Development Portfolio for Joseph Carothers'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <div className='p-1 sm:p-3' id='main-container'>
                <Hero />
                <ProjectsList projects={sortedProjects} />
                <Form />
            </div>
        </div>
    );
}
