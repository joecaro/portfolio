"use client";

import { AudioLines, UserRound } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// Fictional conversation text in the call-details turn view. The slow-turn timings are the
// real model-step breakdown from one staging call; the silent-turn steps follow the
// speech-stream failure and its fix. No other numbers are real.

type Step = { kind: "Hear" | "Setup" | "Model" | "Speak" | "Error"; title: string; detail?: string; tone?: "bad" | "good"; secs?: number };
type Case = { caller: string; agent: string; flag?: string; before: Step[]; after: Step[]; note: { before: string; after: string } };

const CASES: Record<"slow" | "silent", Case> = {
  slow: {
    caller: "Do I have to pay the whole balance today?",
    agent: "No, you don't. I can set up a payment for part of it today, or schedule the full amount for later.",
    flag: "2.7 s in the model step",
    before: [
      { kind: "Hear", title: "Final transcript received" },
      { kind: "Setup", title: "Model policy looked up 4 times", detail: "uncached", tone: "bad", secs: 1.413 },
      { kind: "Model", title: "Request to first streamed event", detail: "42,788-token prompt", secs: 1.168 },
      { kind: "Model", title: "First sentence ready", secs: 0.145 },
      { kind: "Speak", title: "Speech synthesis" },
    ],
    after: [
      { kind: "Hear", title: "Final transcript received" },
      { kind: "Setup", title: "Policy pinned when the call arrived", detail: "no lookups on this turn", tone: "good" },
      { kind: "Model", title: "Request to first streamed event", detail: "prompt cache primed by warmup" },
      { kind: "Model", title: "First sentence ready" },
      { kind: "Speak", title: "Speech synthesis" },
    ],
    note: {
      before: "Real timings from one call. Over half the wait happened before the provider saw the request.",
      after: "Setup is off the reply path. The end-to-end gain isn't measured yet, so no time is shown.",
    },
  },
  silent: {
    caller: "Yes, this is Riley.",
    agent: "Thanks, Riley. I'm calling about your account. Do you have a minute?",
    flag: "No agent audio",
    before: [
      { kind: "Hear", title: "Final transcript received" },
      { kind: "Model", title: "Reply streamed in chunks" },
      { kind: "Speak", title: "Whitespace chunk sent as an empty “end of text”" },
      { kind: "Error", title: "Speech provider returned 400", detail: "invalid transcript", tone: "bad" },
      { kind: "Error", title: "Retry reused the closed tokenizer", detail: "no audio", tone: "bad" },
    ],
    after: [
      { kind: "Hear", title: "Final transcript received" },
      { kind: "Model", title: "Reply streamed in chunks" },
      { kind: "Speak", title: "Whitespace chunk skipped", tone: "good" },
      { kind: "Speak", title: "Retry allowed only before first audio", detail: "fresh tokenizer, buffered text replayed" },
      { kind: "Speak", title: "Caller hears the reply", tone: "good" },
    ],
    note: {
      before: "The model answered. The caller heard nothing.",
      after: "Retrying after audio starts would repeat words, so it never happens.",
    },
  },
};

const TOTAL = 2.726;

export function VoiceTurnDemo() {
  const reduce = useReducedMotion();
  const [which, setWhich] = useState<"slow" | "silent">("slow");
  const [fixed, setFixed] = useState(false);
  const [shown, setShown] = useState(0);
  const c = CASES[which];
  const steps = fixed ? c.after : c.before;
  const broken = !fixed && which === "silent";

  useEffect(() => {
    if (reduce) { setShown(steps.length); return; }
    setShown(0);
    const ids = steps.map((_, i) => window.setTimeout(() => setShown(i + 1), 350 * (i + 1)));
    return () => ids.forEach(id => window.clearTimeout(id));
  }, [which, fixed, reduce, steps]);

  const done = shown >= steps.length;
  const timed = steps.filter(s => s.secs);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white font-sans text-gray-900 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50 px-4 py-2.5">
        <div role="group" aria-label="Choose a turn" className="inline-flex rounded-md border border-gray-300 bg-white p-0.5 text-[12.5px]">
          {(["slow", "silent"] as const).map(k => (
            <button key={k} type="button" aria-pressed={which === k} onClick={() => { setWhich(k); setFixed(false); }} className={`min-h-9 rounded px-3 font-medium ${which === k ? "bg-violet-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}>
              {k === "slow" ? "Slow turn" : "Silent turn"}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setFixed(f => !f)} className="min-h-9 rounded-md border border-violet-300 bg-white px-3 text-[12.5px] font-semibold text-violet-700 hover:bg-violet-50">
          {fixed ? "Show before the fix" : "Apply the fix"}
        </button>
      </div>

      <div className="space-y-3 px-4 py-4">
        <div className="grid grid-cols-[28px_1fr] gap-2.5">
          <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600"><UserRound className="h-3.5 w-3.5" aria-hidden /></span>
          <div>
            <p className="text-[12px] font-medium text-gray-900">Customer</p>
            <p className="text-[13.5px] leading-6">{c.caller}</p>
          </div>
        </div>

        <div className="grid grid-cols-[28px_1fr] gap-2.5">
          <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-700"><AudioLines className="h-3.5 w-3.5" aria-hidden /></span>
          <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-2 text-[12px]">
              <span className="font-medium text-gray-900">Agent</span>
              {!fixed && c.flag && <span className="rounded bg-amber-50 px-1.5 py-px text-[11px] font-medium text-amber-800 ring-1 ring-amber-200">{c.flag}</span>}
            </p>
            <p className={`text-[13.5px] leading-6 ${broken ? "text-gray-400 line-through" : ""}`}>{c.agent}</p>

            <div className="mt-2 rounded-lg border border-gray-200 bg-white p-2.5">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">What happened this turn</p>
              {which === "slow" && !fixed && (
                <div className="mb-3" role="img" aria-label="Model step timing: setup 1.413 seconds, first event 1.168 seconds, first sentence 0.145 seconds">
                  <div className="flex h-3 overflow-hidden rounded bg-gray-100">
                    {timed.map((s, i) => (
                      <span key={s.title} style={{ width: `${((s.secs ?? 0) / TOTAL) * 100}%` }} className={`${i < shown - 1 ? "opacity-100" : "opacity-0"} transition-opacity motion-reduce:transition-none ${s.tone === "bad" ? "bg-red-400" : i === 1 ? "bg-violet-400" : "bg-violet-600"}`} />
                    ))}
                  </div>
                  <p className="mt-1 text-[11px] tabular-nums text-gray-500">0 s <span className="float-right">{TOTAL} s</span></p>
                </div>
              )}
              <ol className="space-y-1.5" aria-live="polite">
                {steps.slice(0, shown).map(s => (
                  <li key={s.title} className="flex flex-wrap items-center gap-2 text-[12px]">
                    <span className={`w-14 shrink-0 rounded px-1.5 py-px text-center text-[10.5px] font-medium ${s.tone === "bad" ? "bg-red-50 text-red-700" : s.tone === "good" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>{s.kind}</span>
                    <span className="text-gray-900">{s.title}</span>
                    {s.detail && <span className="hidden text-gray-500 sm:inline">· {s.detail}</span>}
                    {s.secs && <span className="ml-auto tabular-nums text-gray-700">{s.secs.toFixed(3)} s</span>}
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-2 min-h-5 text-[12px] text-gray-600">{done ? (fixed ? c.note.after : c.note.before) : ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
