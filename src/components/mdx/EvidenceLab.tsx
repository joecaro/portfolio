"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Lab({ title, kicker = "Interactive engineering exhibit", children }: { title: string; kicker?: string; children: ReactNode }) {
  return <section aria-label={title} className="my-8 min-w-0 overflow-hidden rounded-xl border border-slate-300 bg-slate-50 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
    <header className="border-b border-slate-200 p-5 dark:border-slate-700 sm:p-6"><p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">{kicker}</p><h3 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h3></header>
    <div className="min-w-0 space-y-5 p-4 sm:p-6">{children}</div>
    <footer className="border-t border-slate-200 px-5 py-3 text-xs leading-relaxed text-slate-600 dark:border-slate-700 dark:text-slate-400">Illustrative fixtures, computed in your browser. No customer records or production systems.</footer>
  </section>;
}

export function LabButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" {...props} className={`min-h-11 max-w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm font-semibold text-slate-800 hover:border-blue-600 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50 aria-pressed:border-blue-600 aria-pressed:bg-blue-600 aria-pressed:text-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus-visible:outline-blue-400 dark:aria-pressed:border-blue-400 dark:aria-pressed:bg-blue-600 ${className}`} />;
}

export function LabPanel({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return <div className={`min-w-0 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950 ${className}`}>{title && <h4 className="mb-3 text-sm font-bold text-slate-800 dark:text-slate-100">{title}</h4>}{children}</div>;
}
