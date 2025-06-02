import Head from "next/head";
import { getAllProjects } from "../../lib/getAllProjects";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";

export default async function Page() {
    const projects = await getAllProjects();

    return (
        <>
            <Head>
                <title>Joseph Carothers</title>
                <meta
                    name='description'
                    content='Web Development Portfolio for Joseph Carothers'
                />
            </Head>

            <div className='py-32 px-4 max-w-2xl m-auto'>
                <h1 className='font-bold text-3xl dark:text-neutral-200 mb-4'>
                    Projects
                </h1>

                <div className='grid gap-5 h-full'>
                    {projects.map(project => {
                        return (
                            <Link
                                href={`/projects/${project.slug}`}
                                key={project.slug}
                                className='project border dark:border-neutral-200 bg-neutral-50 dark:bg-neutral-800 p-4 rounded dark:text-neutral-200 hover:border-2'
                            >
                                <p className='font-bold text-xl'>
                                    {project.title}
                                </p>
                                <p className='text-neutral-600 dark:text-neutral-400'>
                                    {project.date}
                                </p>
                                <p>{project.description}</p>
                            </Link>
                        );
                    })}
                </div>
                <ContactForm />
            </div>
        </>
    );
}
