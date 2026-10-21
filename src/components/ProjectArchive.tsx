"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./Button";

export type ArchiveItem = {
    slug: string;
    title: string;
    description: string;
    kind: string;
    year: number;
    stack: string[];
};

const KINDS = ["All", "AI & platform", "Libraries", "Tools", "Experiments"];

export default function ProjectArchive({ items }: { items: ArchiveItem[] }) {
    const [kind, setKind] = useState("All");
    const [query, setQuery] = useState("");

    const q = query.trim().toLowerCase();
    const shown = items.filter(
        item =>
            (kind === "All" || item.kind === kind) &&
            (!q ||
                [item.title, item.description, ...item.stack]
                    .join(" ")
                    .toLowerCase()
                    .includes(q))
    );
    const years = Array.from(new Set(shown.map(item => item.year))).sort(
        (a, b) => b - a
    );

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex flex-wrap items-end justify-between gap-4'>
                <div className='flex flex-col gap-1.5'>
                    <h2 className='text-3xl font-semibold'>Everything else</h2>
                    <p className='text-[15px] text-neutral-600 dark:text-neutral-400'>
                        {shown.length} of {items.length} projects
                    </p>
                </div>
                <label className='flex flex-col gap-1.5 text-[13px] font-semibold text-neutral-700 dark:text-neutral-300'>
                    Search
                    <input
                        type='search'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder='Title or tech'
                        className='h-[42px] w-64 rounded-[5px] border-2 border-neutral-300 bg-white px-3.5 text-[15px] font-normal text-neutral-900 focus:border-blue-600 focus:outline-none dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100'
                    />
                </label>
            </div>

            <div
                role='group'
                aria-label='Filter by kind'
                className='flex flex-wrap gap-3.5'
            >
                {KINDS.map(k => {
                    const count =
                        k === "All"
                            ? items.length
                            : items.filter(item => item.kind === k).length;
                    return (
                        <Button
                            key={k}
                            size='sm'
                            variant={kind === k ? "fill" : "line"}
                            pressed={kind === k}
                            onClick={() => setKind(k)}
                        >
                            {k}
                            <span className='font-medium opacity-75'>
                                {count}
                            </span>
                        </Button>
                    );
                })}
            </div>

            {years.map(year => (
                <div key={year} className='flex flex-col'>
                    <h3 className='mb-2 mt-4 text-sm font-bold tracking-wider text-blue-600 dark:text-blue-400'>
                        {year}
                    </h3>
                    <div className='overflow-hidden rounded-lg border-2 border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900'>
                        {shown
                            .filter(item => item.year === year)
                            .map(item => (
                                <Link
                                    key={item.slug}
                                    href={`/projects/${item.slug}`}
                                    className='project group grid gap-x-5 gap-y-1 border-b border-slate-100 px-5 py-4 transition-colors last:border-b-0 hover:bg-blue-50 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)_minmax(0,0.9fr)_24px] md:items-center dark:border-neutral-800 dark:hover:bg-neutral-800'
                                >
                                    <span className='flex flex-col gap-0.5'>
                                        <span className='font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300'>
                                            {item.title}
                                        </span>
                                        <span className='text-xs text-neutral-600 dark:text-neutral-400'>
                                            {item.kind}
                                        </span>
                                    </span>
                                    <span className='text-sm leading-relaxed text-neutral-700 dark:text-neutral-300'>
                                        {item.description}
                                    </span>
                                    <span className='text-[13px] text-neutral-600 dark:text-neutral-400'>
                                        {item.stack.join(" · ")}
                                    </span>
                                    <span
                                        aria-hidden='true'
                                        className='hidden text-blue-600 transition-transform group-hover:translate-x-1 md:block'
                                    >
                                        →
                                    </span>
                                </Link>
                            ))}
                    </div>
                </div>
            ))}

            {shown.length === 0 && (
                <p className='rounded-lg border-2 border-dashed border-neutral-300 p-6 text-neutral-600 dark:border-neutral-600 dark:text-neutral-400'>
                    Nothing matches. Try another filter.
                </p>
            )}
        </div>
    );
}
