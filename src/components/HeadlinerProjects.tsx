import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";

const disciplines = ["Product & AI", "Design engineering", "Agent systems", "Research & retrieval", "Enterprise engineering"];

export default function HeadlinerProjects({ projects }: { projects: Project[] }) {
  const headliners = projects.filter(p => p.headliner).sort((a, b) => (a.position ?? 99) - (b.position ?? 99));
  if (!headliners.length) return null;
  return <section aria-labelledby="selected-work-title" className="mx-auto max-w-6xl px-4 pb-16 pt-12 md:px-8">
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-700">
      <div><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">Selected work / 01—05</p><h2 id="selected-work-title" className="text-3xl font-bold tracking-tight md:text-5xl">Systems you can explore.</h2></div>
      <p className="max-w-sm text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">AI products, investigation tools, and enterprise systems. See what I built, why it matters, and how the experience works.</p>
    </div>
    <div className="flex flex-col gap-10">
      {headliners.map((project, index) => <article key={project.slug} className="project grid overflow-hidden rounded-lg border border-neutral-200 bg-white md:grid-cols-2 dark:border-neutral-700 dark:bg-neutral-900">
        <Link href={`/projects/${project.slug}`} aria-label={`Explore ${project.title}`} className={`group relative block aspect-[16/10] overflow-hidden bg-slate-100 focus-visible:z-10 focus-visible:outline focus-visible:outline-4 focus-visible:outline-blue-600 dark:bg-neutral-800 ${index % 2 ? 'md:order-2' : ''}`}>
          <Image src={project.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none" />
          <span className="absolute bottom-4 left-5 text-xs font-medium text-slate-600">Product preview · illustrative data</span>
        </Link>
        <div className="flex flex-col justify-center gap-5 p-6 md:p-10">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400"><span className="text-base tabular-nums">0{index + 1}</span><span aria-hidden="true">/</span>{disciplines[index]}</p>
          <h3 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl"><Link href={`/projects/${project.slug}`} className="rounded hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 dark:hover:text-blue-400">{project.title}</Link></h3>
          <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300">{project.description}</p>
          <div className="flex flex-wrap gap-2 text-xs text-neutral-600 dark:text-neutral-400">{project.stack.map(tech => <span key={tech} className="rounded border border-neutral-200 px-2 py-1 dark:border-neutral-700">{tech}</span>)}</div>
          <div><Link href={`/projects/${project.slug}`} className="inline-flex min-h-12 items-center gap-4 rounded bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">Explore case study <span aria-hidden="true">↗</span></Link></div>
        </div>
      </article>)}
    </div>
  </section>;
}
