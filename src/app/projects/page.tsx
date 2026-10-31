import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProjectArchive from "@/components/ProjectArchive";
import { getAllProjects } from "@/lib/getAllProjects";
import type { Project } from "@/types";

export const metadata: Metadata = {
    title: "Projects | Joseph Carothers",
    description:
        "Case studies and side projects by Joseph Carothers, from production AI platforms to weekend experiments.",
};

const isFeatured = (project: Project) => project.tags.includes("featured");

const byPosition = (a: Project, b: Project) =>
    (a.position ?? Number.MAX_SAFE_INTEGER) -
    (b.position ?? Number.MAX_SAFE_INTEGER);

export default async function ProjectsPage() {
    const projects = await getAllProjects();
    const featured = projects.filter(isFeatured).sort(byPosition);
    const archive = projects
        .filter(project => !isFeatured(project))
        .map(project => ({
            slug: project.slug,
            title: project.title,
            description: project.description,
            kind: project.kind ?? "Experiments",
            year: new Date(project.date).getFullYear(),
            stack: project.stack ?? [],
        }));

    return (
        <main className='dark:text-neutral-200'>
            <section className='mx-auto flex max-w-6xl flex-col gap-3 px-4 pb-8 pt-12 md:px-8'>
                <h1 className='text-4xl font-bold tracking-tight md:text-5xl'>
                    Projects
                </h1>
                <p className='max-w-[60ch] text-lg leading-relaxed text-neutral-700 dark:text-neutral-300'>
                    Case studies first. Then everything else I&apos;ve built,
                    newest first, from production platforms to weekend
                    experiments.
                </p>
            </section>

            <section
                aria-label='Case studies'
                className='mx-auto max-w-6xl px-4 pb-16 md:px-8'
            >
                <div className='grid gap-7 lg:grid-cols-2'>
                    {featured.map(project => (
                        <Link
                            key={project.slug}
                            href={`/projects/${project.slug}`}
                            className='group grid overflow-hidden rounded-lg border-2 border-neutral-200 bg-white transition hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[6px_6px_0_#1e3a8a] motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] dark:border-neutral-700 dark:bg-neutral-900'
                        >
                            <div className='relative min-h-[200px] border-b-2 border-neutral-200 bg-slate-100 sm:border-b-0 sm:border-r-2 dark:border-neutral-700 dark:bg-neutral-800'>
                                {project.image && (
                                    <Image
                                        src={project.image}
                                        alt=''
                                        fill
                                        sizes='(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw'
                                        className='object-contain p-4'
                                    />
                                )}
                            </div>
                            <div className='flex flex-col gap-2.5 p-5'>
                                <span className='text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400'>
                                    {project.kind} ·{" "}
                                    {new Date(project.date).getFullYear()}
                                </span>
                                <h2 className='text-xl font-semibold leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400'>
                                    {project.title}
                                </h2>
                                <p className='flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400'>
                                    {project.description}
                                </p>
                                {project.impact && (
                                    <p className='text-[13px] leading-relaxed'>
                                        <b className='text-blue-600 dark:text-blue-400'>
                                            Impact
                                        </b>{" "}
                                        {project.impact}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section
                aria-label='Archive'
                className='border-t border-neutral-200 bg-slate-50 dark:border-neutral-700 dark:bg-neutral-800/50'
            >
                <div className='mx-auto max-w-6xl px-4 pb-20 pt-14 md:px-8'>
                    <ProjectArchive items={archive} />
                </div>
            </section>
        </main>
    );
}
