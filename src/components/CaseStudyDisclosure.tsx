"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

const Walkthrough = dynamic(
  () => import("./HeadlinerExperience").then(module => module.HeadlinerExperience),
  { loading: () => <p role="status" className="py-6 text-sm">Loading the walkthrough…</p> },
);

export function CaseStudyDisclosure({ id, title, walkthroughSlug, children }: {
  id: string;
  title: string;
  walkthroughSlug?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const revealHash = () => {
      let hash: string;
      try { hash = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const target = hash ? document.getElementById(hash) : null;
      if (target && ref.current?.contains(target)) {
        setOpen(true);
        requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
      }
    };
    revealHash();
    window.addEventListener("hashchange", revealHash);
    return () => window.removeEventListener("hashchange", revealHash);
  }, []);

  return <details ref={ref} id={id} open={open} onToggle={event => setOpen(event.currentTarget.open)} className="group scroll-mt-8 border-t border-neutral-200 dark:border-neutral-700">
    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded px-1 py-4 text-lg font-semibold hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 dark:hover:text-blue-300 [&::-webkit-details-marker]:hidden">
      {title}<span aria-hidden className="text-2xl font-normal transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span>
    </summary>
    <div className="pb-8 pt-2">{walkthroughSlug ? open && <Walkthrough slug={walkthroughSlug} /> : children}</div>
  </details>;
}
