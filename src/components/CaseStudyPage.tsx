import Link from "next/link";
import type { Project } from "@/types";
import type { CaseStudy } from "@/lib/caseStudies";
import { CaseStudyVisual } from "./CaseStudyVisual";
import { CaseStudyDisclosure } from "./CaseStudyDisclosure";
import { MDXRenderer } from "./mdx/MDXRenderer";

export function CaseStudyPage({ project, study, next, related, headings }: {
  project: Project;
  study: CaseStudy;
  next: Project;
  related?: Project;
  headings: { text: string; id: string }[];
}) {
  return <main className="text-neutral-900 dark:text-neutral-200">
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-5 md:px-8 md:pt-8">
      <header className="mb-6">
        <Link href="/projects" className="mb-4 inline-flex min-h-11 items-center rounded text-sm text-neutral-600 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 dark:text-neutral-400">← Projects</Link>
        <h1 className="max-w-[26ch] text-3xl font-bold leading-tight tracking-tight md:text-5xl">{project.title}</h1>
        <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-neutral-600 md:text-lg dark:text-neutral-300">{study.description}</p>
        <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs leading-relaxed md:text-sm"><span className="font-semibold">{study.role}</span><span className="text-neutral-600 dark:text-neutral-400">{study.status}</span></p>
      </header>

      <CaseStudyVisual slug={project.slug} />

      <section aria-label="Contribution and engineering decision" className="grid gap-8 py-8 md:grid-cols-[1fr_1.6fr] md:gap-12 md:py-12">
        <div><h2 className="text-sm font-semibold">My contribution</h2><ul className="mt-3 list-disc space-y-3 pl-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{study.contributions.map(item => <li key={item}>{item}</li>)}</ul></div>
        <div className="min-w-0"><h2 className="text-xl font-semibold leading-snug">{study.challenge}</h2>
          {[study.decision].flat().map(paragraph => (
            <p key={paragraph} className="mt-3 text-sm leading-relaxed text-neutral-700 md:text-base dark:text-neutral-300">{paragraph}</p>
          ))}
          <p className="mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{study.result}</p><p className="mt-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">{study.boundary}</p>
        </div>
      </section>

      <p className="mb-6 max-w-[80ch] text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">{project.slug === "agent-architecture" ? "Implemented largely with the coding agents it runs. I owned design and review." : "I used coding agents for much of the implementation."}</p>

      <CaseStudyDisclosure id="product-demo" title="Try the interactive walkthrough" walkthroughSlug={project.slug} />
      <CaseStudyDisclosure id="case-study" title="Technical notes">
        <div className="mx-auto max-w-[72ch]">
          <p className="mb-4 text-xs text-neutral-600 dark:text-neutral-400">{project.stack.join(" · ")}</p>
          {headings.length > 1 && <nav aria-label="Technical note sections" className="mb-6 flex flex-wrap gap-x-5 gap-y-1 border-b border-neutral-200 pb-4 dark:border-neutral-700">{headings.map(heading => <a key={heading.id} href={`#${heading.id}`} className="inline-flex min-h-11 items-center rounded text-sm text-blue-700 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 dark:text-blue-300">{heading.text}</a>)}</nav>}
          <article><MDXRenderer content={project.content || ""} isMDX={project.isMDX} mdxSource={project.mdxSource} /></article>
        </div>
      </CaseStudyDisclosure>

      <footer className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-neutral-200 pt-5 dark:border-neutral-700">
        <nav aria-label="More work" className="flex flex-wrap gap-x-6 gap-y-1">{[next, related].filter((item): item is Project => !!item).map(item => <Link key={item.slug} href={`/projects/${item.slug}`} className="inline-flex min-h-11 items-center rounded text-sm text-blue-700 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 dark:text-blue-300">{item.title} →</Link>)}</nav>
        <Link href="/#contact" className="inline-flex min-h-11 items-center rounded text-sm font-semibold underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600">Get in touch</Link>
      </footer>
    </div>
  </main>;
}
