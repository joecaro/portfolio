import { getProjectBySlug } from "@/lib/getAllProjects";
import Image from "next/image";
import Markdown from "react-markdown";

export default async function Slug({ params }: { params: { slug: string } }) {
    const project = getProjectBySlug(params.slug);

    return (
        <div className='min-h-screen max-w-2xl mx-auto py-16 px-2 flex-1 flex flex-col justify-start items-center dark:text-neutral-300'>
            <div className='relative w-full h-64 md:h-96'>
                <Image
                    src={project.image}
                    alt={project.title}
                    layout='fill'
                    objectFit='contain'
                    className='rounded-lg'
                />
            </div>
            <h1 className='text-4xl font-bold self-start'>{project.title}</h1>
            <div className='flex gap-4 self-start px-4'>
                <p className='text-neutral-400 dark:text-neutral-600'>
                    {project.date}
                </p>
                {project.demo && (
                    <a
                        href={project.demo}
                        target='_blank'
                        rel='noopener noreferrer'
                        className=' text-blue-500 hover:underline'
                    >
                        Live Demo
                    </a>
                )}
            </div>
            <div className=' p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-w-full'>
                <Markdown
                    components={{
                        h1: ({ node, ...props }) => (
                            <h1
                                className='text-2xl font-extrabold mt-8 mb-4 text-left'
                                {...props}
                            />
                        ),
                        h2: ({ node, ...props }) => (
                            <h2
                                className='text-2xl font-bold mt-6 mb-3 text-left'
                                {...props}
                            />
                        ),
                        h3: ({ node, ...props }) => (
                            <h2
                                className='text-xl font-bold mt-6 mb-3 text-left'
                                {...props}
                            />
                        ),
                        p: ({ node, ...props }) => (
                            <p
                                className='text-base leading-relaxed mb-4 text-left'
                                {...props}
                            />
                        ),
                        ul: ({ node, ...props }) => (
                            <ul
                                className='list-disc pl-5 mb-4 text-left'
                                {...props}
                            />
                        ),
                        ol: ({ node, ...props }) => (
                            <ol
                                className='list-decimal pl-5 mb-4 text-left'
                                {...props}
                            />
                        ),
                        li: ({ node, ...props }) => (
                            <li className='mb-2 text-left' {...props} />
                        ),
                        a: ({ node, ...props }) => (
                            <a
                                className='text-blue-500 hover:underline text-left'
                                target='_blank'
                                rel='noopener noreferrer'
                                {...props}
                            />
                        ),
                        blockquote: ({ node, ...props }) => (
                            <blockquote
                                className='border-l-4 border-blue-500 pl-4 italic my-4 text-left'
                                {...props}
                            />
                        ),
                        code: ({ node, ...props }) => (
                            <code
                                className='bg-gray-100 p-1 rounded text-sm text-left'
                                {...props}
                            />
                        ),
                        pre: ({ node, ...props }) => (
                            <pre
                                className='bg-gray-900 text-gray-100 p-4 rounded-md mb-4 overflow-auto text-left'
                                {...props}
                            />
                        ),
                    }}
                >
                    {project.content}
                </Markdown>
            </div>
        </div>
    );
}
