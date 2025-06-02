import { getProjectBySlug } from "@/lib/getAllProjects";
import Image from "next/image";
import { MDXRenderer } from '@/components/mdx/MDXRenderer';

export default async function Slug({ params }: { params: { slug: string } }) {
    const project = await getProjectBySlug(params.slug);

    return (
        <div className='min-h-screen max-w-3xl mx-auto py-16 px-2 flex-1 flex flex-col justify-start items-center dark:text-neutral-300'>
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
            <div className='p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-w-full'>
                <MDXRenderer 
                    content={project.content || ''} 
                    isMDX={project.isMDX} 
                    mdxSource={project.mdxSource}
                />
            </div>
        </div>
    );
}
