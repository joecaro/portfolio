"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { EvalConsoleDemo } from "./EvalConsoleDemo";
import { CallReviewDemo } from "./CallReviewDemo";
import { ScoutViewerDemo } from "./ScoutViewerDemo";
import { PlatformChatDemo } from "./PlatformChatDemo";

// One frame, four tools. Each tab mounts the same reconstruction its deep-dive page uses.

const STAGES = [
  { id: "eval", label: "Test before release", caption: "Compare a candidate run with the approved one, and click any cell to see the attempts and the tool call behind it.", href: "/projects/enterprise-voice-ai", Demo: EvalConsoleDemo },
  { id: "call", label: "Review one call", caption: "See what the agent heard, did and said on one timeline. Click a turn or a marker to jump.", href: "/projects/conversation-explorer", Demo: CallReviewDemo },
  { id: "scout", label: "Investigate patterns", caption: "Run an investigation across many calls, then open a finding to see the turns behind it.", href: "/projects/scout-evidence-engine", Demo: ScoutViewerDemo },
  { id: "chat", label: "Ask in plain English", caption: "Pick a question and watch it scope, count, search, read and answer, with links to each call.", href: "/projects/platform-chat", Demo: PlatformChatDemo },
] as const;

export function PlatformTourDemo() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = STAGES[active];
  const Demo = stage.Demo;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" ? (i + 1) % STAGES.length : e.key === "ArrowLeft" ? (i - 1 + STAGES.length) % STAGES.length : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Platform tools" className="mb-3 grid grid-cols-2 gap-2 md:grid-cols-4">
        {STAGES.map((s, i) => (
          <button
            key={s.id}
            ref={el => { tabs.current[i] = el; }}
            role="tab"
            id={`tour-tab-${s.id}`}
            aria-selected={i === active}
            aria-controls={`tour-panel-${s.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={e => onKey(e, i)}
            className={`rounded-lg border px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 motion-reduce:transition-none ${i === active ? "border-blue-600 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-950 dark:text-blue-100" : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"}`}
          >
            <span className="block text-xs font-semibold tabular-nums text-blue-700 dark:text-blue-300">0{i + 1}</span>
            <span className="font-semibold">{s.label}</span>
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`tour-panel-${stage.id}`} aria-labelledby={`tour-tab-${stage.id}`}>
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <p className="max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{stage.caption}</p>
          <Link href={stage.href} className="text-sm font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900 dark:text-blue-300">Full write-up →</Link>
        </div>
        <Demo key={stage.id} />
      </div>
    </div>
  );
}
