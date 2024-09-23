import Head from "next/head";
import { markdownToHtml } from "@/lib/markdownToHtml";
import getAllProjects, { getProjectBySlug } from "@/lib/getAllProjects";

export default function Slug({ project }: { project: Project }) {
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

            <div className='min-h-screen py-16 flex-1 flex flex-col justify-start items-center'>
                <div className='p-5'>
                    <h1>{project.title}</h1>
                    <div
                        className='w-4/5 max-w-4xl m-auto'
                        dangerouslySetInnerHTML={{
                            __html: project.content || "",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps(paths: { params: { slug: string } }) {
    const project = getProjectBySlug(paths.params.slug);

    let content = await markdownToHtml(project.content || "");

    // @ts-ignore
    content = content !== undefined ? content : "";

    return {
        props: {
            project: {
                ...project,
                content: content.value,
            },
        },
    };
}

export async function getStaticPaths() {
    const projects = getAllProjects(["slug", "date"]);

    return {
        paths: projects.map(project => {
            return {
                params: {
                    slug: project.slug,
                },
            };
        }),
        fallback: false,
    };
}
