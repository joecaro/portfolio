import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { MDXRenderer } from "@/components/mdx/MDXRenderer";
import { getAllProjects, getProjectBySlug } from "@/lib/getAllProjects";
import { slugify } from "@/lib/utils";
import type { Project } from "@/types";

const IGNORED_TAGS = ["featured"];

const kindLabel = (project: Project) =>
    project.tags
        .filter(tag => !IGNORED_TAGS.includes(tag.toLowerCase()))
        .slice(0, 2)
        .map(tag => tag.replace(/\b\w/g, c => c.toUpperCase()))
        .join(" · ");

const headingsOf = (content = "") => {
    let inFence = false;
    return content
        .split("\n")
        .filter(line => {
            if (/^\s*```/.test(line)) inFence = !inFence;
            return !inFence && /^##\s+/.test(line);
        })
        .map(line => line.replace(/^##\s+/, "").trim())
        .map(text => ({ text: text.replace(/[`*]/g, ""), id: slugify(text) }));
};

const readMinutes = (content = "") =>
    Math.max(1, Math.round(content.split(/\s+/).length / 220));

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const project = await getProjectBySlug(params.slug);
    return {
        title: `${project.title} | Joseph Carothers`,
        description: project.description,
    };
}

export default async function ProjectPage({
    params,
}: {
    params: { slug: string };
}) {
    const [project, all] = await Promise.all([
        getProjectBySlug(params.slug),
        getAllProjects(),
    ]);

    const index = all.findIndex(p => p.slug === project.slug);
    const next = all[(index + 1) % all.length];
    const related = all.find(
        p =>
            p.slug !== project.slug &&
            p.slug !== next.slug &&
            p.tags.some(
                tag =>
                    !IGNORED_TAGS.includes(tag) && project.tags.includes(tag)
            )
    );
    const headings = headingsOf(project.content);
    const kind = kindLabel(project);

    const glance = [
        { label: "My role", value: project.role },
        { label: "Focus", value: project.focus },
    ].filter(item => item.value);

    return (
        <main className='dark:text-neutral-300'>
            <section className='mx-auto flex max-w-6xl flex-col gap-5 px-4 pt-8 md:px-8'>
                <div>
                    <ButtonLink href='/projects' variant='line' size='sm'>
                        ← All projects
                    </ButtonLink>
                </div>
                {kind && (
                    <p className='text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400'>
                        {kind}
                    </p>
                )}
                <h1 className='max-w-[22ch] text-4xl font-bold leading-tight tracking-tight md:text-5xl'>
                    {project.title}
                </h1>
                <p className='max-w-[58ch] text-lg leading-relaxed text-neutral-700 md:text-xl dark:text-neutral-300'>
                    {project.description}
                </p>
                <div className='flex flex-wrap items-center gap-4'>
                    {project.demo && (
                        <ButtonLink href={project.demo}>Live demo ↗</ButtonLink>
                    )}
                    {project.github && (
                        <ButtonLink href={project.github} variant='line'>
                            GitHub ↗
                        </ButtonLink>
                    )}
                    <span className='text-sm text-neutral-600 dark:text-neutral-400'>
                        {project.date} · {readMinutes(project.content)} min
                        read
                    </span>
                </div>
            </section>

            <section
                aria-label='At a glance'
                className='mx-auto max-w-6xl px-4 pt-10 md:px-8'
            >
                <div className='overflow-hidden rounded-lg border-[3px] border-l-blue-200 border-t-blue-200 border-r-blue-300 border-b-blue-300 shadow-[2px_2px_0_rgba(0,0,0,0.12)] dark:border-neutral-600'>
                    <dl className='grid md:grid-cols-3'>
                        {glance.map(item => (
                            <div
                                key={item.label}
                                className='flex flex-col gap-1.5 border-b border-blue-100 p-5 md:border-b-0 md:border-r dark:border-neutral-700'
                            >
                                <dt className='text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400'>
                                    {item.label}
                                </dt>
                                <dd className='text-[15px] leading-relaxed'>
                                    {item.value}
                                </dd>
                            </div>
                        ))}
                        <div className='flex flex-col gap-2 p-5'>
                            <dt className='text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400'>
                                Stack
                            </dt>
                            <dd className='flex flex-wrap gap-1.5'>
                                {project.stack.map(tech => (
                                    <span
                                        key={tech}
                                        className='rounded border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[13px] text-blue-800 dark:border-neutral-600 dark:bg-neutral-800 dark:text-blue-300'
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </dd>
                        </div>
                    </dl>
                    {project.impact && (
                        <div className='flex flex-wrap items-baseline gap-x-4 gap-y-1 bg-blue-600 px-5 py-4 text-white'>
                            <span className='text-xs font-semibold uppercase tracking-widest text-blue-100'>
                                Impact
                            </span>
                            <span className='text-base font-medium leading-relaxed md:text-[17px]'>
                                {project.impact}
                            </span>
                        </div>
                    )}
                </div>
            </section>

            {project.image && (
                <section className='mx-auto max-w-6xl px-4 pt-10 md:px-8'>
                    <figure className='overflow-hidden rounded-lg border-2 border-neutral-200 bg-slate-100 dark:border-neutral-700 dark:bg-neutral-800'>
                        <div
                            aria-hidden='true'
                            className='flex gap-1.5 border-b border-slate-200 px-3 py-2.5 dark:border-neutral-700'
                        >
                            <span className='h-2.5 w-2.5 rounded-full bg-red-300' />
                            <span className='h-2.5 w-2.5 rounded-full bg-amber-300' />
                            <span className='h-2.5 w-2.5 rounded-full bg-green-300' />
                        </div>
                        <div className='relative aspect-[16/7] bg-white dark:bg-neutral-900'>
                            <Image
                                src={project.image}
                                alt={`${project.title} cover`}
                                fill
                                sizes='(min-width: 1152px) 1152px, 100vw'
                                className='object-contain p-4'
                                priority
                            />
                        </div>
                    </figure>
                </section>
            )}

            <section className='mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 md:px-8 lg:flex-row lg:items-start lg:gap-14'>
                {headings.length > 1 && (
                    <nav
                        aria-label='On this page'
                        className='rounded-lg border-2 border-neutral-200 p-3 lg:sticky lg:top-6 lg:w-64 lg:flex-none dark:border-neutral-700'
                    >
                        <p className='px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-widest text-neutral-600 dark:text-neutral-400'>
                            On this page
                        </p>
                        <ul>
                            {headings.map(heading => (
                                <li key={heading.id}>
                                    <a
                                        href={`#${heading.id}`}
                                        className='block rounded px-3 py-1.5 text-sm text-neutral-600 hover:bg-blue-50 hover:text-blue-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-blue-300'
                                    >
                                        {heading.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
                <article className='min-w-0 max-w-[72ch] flex-1 text-[17px] leading-relaxed'>
                    <MDXRenderer
                        content={project.content || ""}
                        isMDX={project.isMDX}
                        mdxSource={project.mdxSource}
                    />
                </article>
            </section>

            <section className='border-t border-neutral-200 bg-slate-50 dark:border-neutral-700 dark:bg-neutral-800/50'>
                <div className='mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-16 pt-12 md:px-8'>
                    <h2 className='text-2xl font-semibold'>Keep looking</h2>
                    <div className='grid gap-6 md:grid-cols-3'>
                        {[
                            { label: "Next", project: next },
                            { label: "Related", project: related },
                        ]
                            .filter(
                                (item): item is { label: string; project: Project } =>
                                    !!item.project
                            )
                            .map(item => (
                                <Link
                                    key={item.label}
                                    href={`/projects/${item.project.slug}`}
                                    className='flex flex-col gap-2 rounded-lg border-2 border-neutral-200 bg-white p-5 transition hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[6px_6px_0_#1e3a8a] motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0 dark:border-neutral-700 dark:bg-neutral-900'
                                >
                                    <span className='text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400'>
                                        {item.label}
                                    </span>
                                    <span className='text-lg font-semibold leading-snug'>
                                        {item.project.title}
                                    </span>
                                    <span className='text-sm leading-relaxed text-neutral-600 dark:text-neutral-400'>
                                        {item.project.description}
                                    </span>
                                </Link>
                            ))}
                        <div className='flex flex-col justify-between gap-4 rounded-lg bg-blue-600 p-5 text-white'>
                            <span className='text-lg font-semibold leading-snug'>
                                Like what you see? I&apos;d like to hear what
                                you&apos;re building.
                            </span>
                            <div>
                                <ButtonLink href='/#contact' variant='line'>
                                    Get in touch
                                </ButtonLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
