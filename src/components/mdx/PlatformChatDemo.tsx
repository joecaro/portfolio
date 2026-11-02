"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  AtSign,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Megaphone,
  MessageSquareText,
  Phone,
  Plus,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Square,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

// Fictional data throughout. The layout, copy and step wording follow the real panel.

type Step = { icon: typeof Search; running: string; done: string; detail?: string; ms: number };
type Script = {
  id: string;
  question: string;
  context: string;
  steps: Step[];
  summary: string;
  answer: ReactNode[];
  visual?: ReactNode;
  scope: string;
  limit?: string;
  followUp?: string;
};

const CAMPAIGN = "Billing reminders";

function CallLink({ id }: { id: string }) {
  return (
    <span className="rounded px-0.5 font-mono text-[12px] text-[#1d4ed8] underline decoration-[#93c5fd] underline-offset-2">
      {id}
    </span>
  );
}

function VizFrame({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer?: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#e5e7ea] bg-white shadow-sm">
      <div className="px-3 pt-2.5">
        <p className="text-[12.5px] font-semibold text-[#15181c]">{title}</p>
        <p className="text-[11px] text-[#626973]">{subtitle}</p>
      </div>
      <div className="px-3 py-2.5">{children}</div>
      {footer && <p className="border-t border-[#e5e7ea] bg-[#f6f7f8] px-3 py-1.5 text-[11px] text-[#626973]">{footer}</p>}
    </div>
  );
}

const TRANSFER_REASONS = [
  { label: "Change payment date", last: 61, now: 248 },
  { label: "Dispute the balance", last: 142, now: 151 },
  { label: "Asked for a person", last: 128, now: 131 },
  { label: "Hardship / payment plan", last: 107, now: 115 },
];

function TransferChart() {
  const max = Math.max(...TRANSFER_REASONS.map(r => r.now));
  return (
    <VizFrame title="Transfers by reason" subtitle="This week vs last week · 645 vs 438 transfers" footer="Reasons come from the call summary each call recorded">
      <div className="space-y-2.5">
        {TRANSFER_REASONS.map(r => (
          <div key={r.label}>
            <div className="mb-1 flex justify-between text-[11.5px] text-[#464c54]">
              <span>{r.label}</span>
              <span className="tabular-nums">
                {r.last} → <b className="font-semibold text-[#15181c]">{r.now}</b>
              </span>
            </div>
            <div className="relative h-2 rounded-full bg-[#f1f3f5]">
              <div className="absolute inset-y-0 left-0 rounded-full bg-[#c7cbd1]" style={{ width: `${(r.last / max) * 100}%` }} />
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-[#4f46e5]"
                initial={{ width: 0 }}
                animate={{ width: `${(r.now / max) * 100}%` }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{ opacity: 0.85 }}
              />
            </div>
          </div>
        ))}
      </div>
    </VizFrame>
  );
}

const OUTCOMES = [
  ["Payment promised", 241, "33.8%"],
  ["No resolution", 164, "23.0%"],
  ["Paid during the call", 118, "16.6%"],
  ["Callback scheduled", 96, "13.5%"],
  ["Transferred", 93, "13.1%"],
] as const;

function OutcomeTable() {
  return (
    <VizFrame title="Yesterday's calls by outcome" subtitle={`${CAMPAIGN} · 712 calls`}>
      <table className="w-full text-[12px]">
        <thead>
          <tr className="text-left text-[11px] text-[#626973]">
            <th className="pb-1.5 font-medium">Outcome</th>
            <th className="pb-1.5 text-right font-medium">Calls</th>
            <th className="pb-1.5 text-right font-medium">Share</th>
          </tr>
        </thead>
        <tbody className="text-[#15181c]">
          {OUTCOMES.map(([label, calls, share]) => (
            <tr key={label} className="border-t border-[#f1f3f5]">
              <td className="py-1.5">{label}</td>
              <td className="py-1.5 text-right tabular-nums">{calls}</td>
              <td className="py-1.5 text-right tabular-nums text-[#464c54]">{share}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </VizFrame>
  );
}

const DISPUTES = [
  { id: "C-40917", time: "2:14", quote: "I paid this in September, I have the confirmation number." },
  { id: "C-41102", time: "0:48", quote: "That amount is wrong. It should be half that." },
  { id: "C-41388", time: "1:31", quote: "This isn't my account. I've never had service with you." },
  { id: "C-41560", time: "3:02", quote: "You charged the late fee twice." },
];

function DisputeList() {
  return (
    <VizFrame title="Calls with a balance dispute" subtitle="7 confirmed after reading · showing 4" footer="Quotes are what the caller said; open a call to hear it in context">
      <ul className="divide-y divide-[#f1f3f5]">
        {DISPUTES.map(d => (
          <li key={d.id} className="flex gap-2.5 py-2 first:pt-0 last:pb-0">
            <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9aa0a8]" />
            <div className="min-w-0">
              <p className="text-[11.5px] text-[#626973]">
                <CallLink id={d.id} /> · at {d.time}
              </p>
              <p className="text-[12.5px] leading-5 text-[#15181c]">“{d.quote}”</p>
            </div>
          </li>
        ))}
      </ul>
    </VizFrame>
  );
}

const SCRIPTS: Script[] = [
  {
    id: "transfers",
    question: "Why did transfers go up this week?",
    context: `${CAMPAIGN} · Last 7 days`,
    steps: [
      { icon: CalendarDays, running: "Looking at AI calls · Oct 20–26 (PDT)", done: "Looking at AI calls · Oct 20–26 (PDT)", ms: 700 },
      { icon: BarChart3, running: "Querying AI-call data", done: "Counted 4,812 calls", detail: "Compared with 4,813 the week before", ms: 1100 },
      { icon: BarChart3, running: "Breaking down calls", done: "Broke down transfers by reason", ms: 900 },
      { icon: Search, running: "Searching call transcripts", done: "Found 212 calls in transcripts", detail: "“change my payment date” and similar", ms: 1200 },
      { icon: FileText, running: "Reading 10 calls", done: "Read 10 calls", ms: 1400 },
      { icon: Sparkles, running: "Drawing a chart", done: "Drew a chart", ms: 600 },
    ],
    summary: "Counted 4,812 calls, searched call transcripts, read 10 calls · 14s",
    answer: [
      <>
        Transfers rose from <b>9.1%</b> to <b>13.4%</b> of calls (438 → 645). Almost all of the increase comes from one reason:{" "}
        <b>customers asking to change their payment date</b>, up from 61 to 248.
      </>,
      <>
        In all 10 calls I read, the caller asked to move a due date and the agent transferred because it has no tool to reschedule. Example:{" "}
        <CallLink id="C-40233" /> and <CallLink id="C-40871" />. The other reasons are flat.
      </>,
      <>Giving the agent a way to reschedule, or a scripted answer for it, would likely remove most of this increase.</>,
    ],
    visual: <TransferChart />,
    scope: `AI calls · ${CAMPAIGN} · Oct 20–26 (PDT), compared with Oct 13–19`,
    followUp: "Find calls where the customer disputed the balance",
  },
  {
    id: "outcomes",
    question: "Group yesterday's calls by outcome",
    context: `${CAMPAIGN} · Yesterday`,
    steps: [
      { icon: CalendarDays, running: "Looking at AI calls · Oct 26 (PDT)", done: "Looking at AI calls · Oct 26 (PDT)", ms: 600 },
      { icon: BarChart3, running: "Querying AI-call data", done: "Counted 712 calls", ms: 1000 },
      { icon: BarChart3, running: "Breaking down calls", done: "Grouped calls by outcome", ms: 900 },
    ],
    summary: "Counted 712 calls, grouped by outcome · 5s",
    answer: [
      <>
        Yesterday the campaign made <b>712</b> calls. Half ended with money committed: <b>241</b> promised a payment and <b>118</b> paid during the
        call.
      </>,
      <>
        <b>164</b> calls (23%) ended with no resolution. That is the largest group worth a closer look.
      </>,
    ],
    visual: <OutcomeTable />,
    scope: `AI calls · ${CAMPAIGN} · Oct 26 (PDT)`,
    followUp: "Compare this with all campaigns",
  },
  {
    id: "disputes",
    question: "Find calls where the customer disputed the balance",
    context: `${CAMPAIGN} · Last 7 days`,
    steps: [
      { icon: CalendarDays, running: "Looking at AI calls · Oct 20–26 (PDT)", done: "Looking at AI calls · Oct 20–26 (PDT)", ms: 600 },
      { icon: Search, running: "Searching calls for “disputed the balance”", done: "Found 23 calls in transcripts", ms: 1300 },
      { icon: FileText, running: "Reading 10 calls", done: "Read 10 calls", detail: "7 were real disputes, 3 only mentioned the balance", ms: 1600 },
    ],
    summary: "Searched call transcripts, read 10 calls · 9s",
    answer: [
      <>
        Search found <b>23</b> possible matches. I read 10 of them: <b>7</b> are real disputes, and 3 only mention the balance without disputing it.
      </>,
      <>The disputes fall into three kinds: a payment the caller says they already made, a wrong amount, and an account the caller says isn&apos;t theirs.</>,
    ],
    visual: <DisputeList />,
    scope: `AI calls · ${CAMPAIGN} · Oct 20–26 (PDT)`,
    limit: "Read 10 of 23 matches. The other 13 are unverified.",
    followUp: "Why did transfers go up this week?",
  },
  {
    id: "scope",
    question: "Compare this with all campaigns",
    context: `${CAMPAIGN} · Yesterday`,
    steps: [{ icon: Megaphone, running: "Checking which campaigns you can access", done: "Found 6 campaigns you can access", ms: 900 }],
    summary: "Needs your input",
    answer: [
      <>
        This chat is about <b>{CAMPAIGN}</b>. Comparing with all campaigns changes the question, so I want to confirm before widening it.
      </>,
      <>Should I compare yesterday&apos;s outcomes across all 6 campaigns you can access, or keep it to {CAMPAIGN}?</>,
    ],
    scope: `Scope unchanged · ${CAMPAIGN}`,
  },
];

type Turn = { script: Script; phase: "working" | "answering" | "done" | "stopped"; stepIndex: number };

function useTurnRunner(reduce: boolean) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach(t => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clear, []);

  const update = (i: number, patch: Partial<Turn>) =>
    setTurns(prev => prev.map((t, j) => (j === i ? { ...t, ...patch } : t)));

  const run = (script: Script, index: number) => {
    const speed = reduce ? 0 : 1;
    let at = 500 * speed;
    script.steps.forEach((step, s) => {
      timers.current.push(window.setTimeout(() => update(index, { stepIndex: s }), at));
      at += step.ms * speed;
    });
    timers.current.push(window.setTimeout(() => update(index, { stepIndex: script.steps.length, phase: "answering" }), at));
    timers.current.push(window.setTimeout(() => update(index, { phase: "done" }), at + 1400 * speed));
  };

  const count = useRef(0);
  const ask = (script: Script) => {
    run(script, count.current);
    count.current += 1;
    setTurns(prev => [...prev, { script, phase: "working", stepIndex: -1 }]);
  };
  const stop = () => {
    clear();
    setTurns(prev => prev.map(t => (t.phase === "done" || t.phase === "stopped" ? t : { ...t, phase: "stopped" })));
  };
  const reset = () => {
    clear();
    count.current = 0;
    setTurns([]);
  };
  return { turns, ask, stop, reset, busy: turns.some(t => t.phase === "working" || t.phase === "answering") };
}

function SparkIcon({ className = "" }: { className?: string }) {
  const lit = [3, 1, 5, 1, 3];
  return (
    <svg viewBox="0 0 25 25" className={className} aria-hidden>
      {Array.from({ length: 5 }).map((_, col) =>
        Array.from({ length: 5 }).map((_, row) => {
          const on = Math.abs(row - 2) <= (lit[col] - 1) / 2;
          return <circle key={`${col}-${row}`} cx={2.5 + col * 5} cy={2.5 + row * 5} r={1.7} fill={on ? "#7c3aed" : "#e5e7ea"} />;
        })
      )}
    </svg>
  );
}

function WorkLog({ turn }: { turn: Turn }) {
  const [open, setOpen] = useState(false);
  const { script, stepIndex, phase } = turn;
  const stopped = phase === "stopped";
  const finished = stopped || stepIndex >= script.steps.length;
  const current = script.steps[Math.max(0, stepIndex)];
  const label = stopped ? "Stopped · partial work" : finished ? script.summary : stepIndex < 0 ? "Understanding your question" : current.running;
  const shown = stopped ? script.steps.slice(0, Math.max(0, stepIndex)) : script.steps;
  const visible = finished ? (open ? shown : []) : script.steps.slice(Math.max(0, stepIndex - 3), stepIndex + 1);

  return (
    <div>
      <button
        type="button"
        onClick={() => finished && setOpen(o => !o)}
        className="flex items-center gap-1.5 text-left text-[12.5px] text-[#626973]"
        aria-expanded={finished ? open : undefined}
      >
        {stopped ? (
          <Square className="h-3.5 w-3.5 text-[#b45309]" />
        ) : finished ? (
          <Check className="h-[18px] w-[18px] text-[#626973]" strokeWidth={1.5} />
        ) : (
          <Sparkles className="h-4 w-4 animate-pulse text-[#7c3aed]" />
        )}
        <span className={finished ? "" : "pc-sweep"}>{label}</span>
        {finished && <ChevronRight className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-90" : ""}`} />}
      </button>
      <AnimatePresence initial={false}>
        {visible.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-1.5 mt-1.5 space-y-1 overflow-hidden border-l border-[#e5e7ea] pl-3.5"
          >
            {visible.map(step => {
              const idx = script.steps.indexOf(step);
              const done = idx < stepIndex;
              const Icon = step.icon;
              return (
                <motion.li key={step.running} layout initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="text-[12px] leading-[22px]">
                  <span className="flex items-center gap-1.5 text-[#464c54]">
                    {done ? <Check className="h-3.5 w-3.5 text-[#16a34a]" /> : <Icon className="h-3.5 w-3.5 animate-pulse text-[#7c3aed]" />}
                    {done ? step.done : step.running}
                  </span>
                  {done && step.detail && <span className="block pl-5 text-[11.5px] leading-4 text-[#9aa0a8]">{step.detail}</span>}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function AssistantTurn({ turn, onAsk, last }: { turn: Turn; onAsk: (q: string) => void; last: boolean }) {
  const { script, phase } = turn;
  const showAnswer = phase === "answering" || phase === "done";
  return (
    <div className="space-y-3">
      <WorkLog turn={turn} />
      {phase === "stopped" && (
        <p className="text-[13px] leading-6 text-[#464c54]">Stopped. Partial results do not establish a complete answer.</p>
      )}
      {phase === "stopped" && last && (
        <button
          type="button"
          onClick={() => onAsk(script.question)}
          className="flex items-center gap-1.5 rounded-[10px] border border-[#e5e7ea] px-3 py-1.5 text-left text-[12.5px] text-[#464c54] hover:border-[#93c5fd] hover:text-[#1d4ed8]"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Ask again
        </button>
      )}
      {showAnswer && (
        <div className="space-y-3">
          <div className="space-y-2 text-[13px] leading-6 text-[#2b3036]">
            {script.answer.map((para, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.35 }}>
                {para}
              </motion.p>
            ))}
          </div>
          {script.visual && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: script.answer.length * 0.35 }}>
              {script.visual}
            </motion.div>
          )}
          {phase === "done" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-0.5 text-[11px] text-[#626973]">
              <p>{script.scope}</p>
              {script.limit && <p className="text-[#b45309]">{script.limit}</p>}
            </motion.div>
          )}
          {phase === "done" && last && script.followUp && (
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => onAsk(script.followUp!)}
              className="flex items-center gap-1.5 rounded-[10px] border border-[#e5e7ea] px-3 py-1.5 text-left text-[12.5px] text-[#464c54] hover:border-[#93c5fd] hover:text-[#1d4ed8]"
            >
              <MessageSquareText className="h-3.5 w-3.5" /> {script.followUp}
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
}

function BackgroundPage() {
  const bars = [42, 48, 45, 51, 47, 63, 71];
  return (
    <div className="pointer-events-none flex h-full select-none" aria-hidden>
      <nav className="hidden w-14 flex-col items-center gap-4 border-r border-[#e5e7ea] bg-[#f6f7f8] py-4 lg:flex">
        <div className="h-7 w-7 rounded-md bg-[#15181c]" />
        {[LayoutDashboard, Megaphone, Phone, BarChart3, Settings].map((Icon, i) => (
          <Icon key={i} className={`h-[18px] w-[18px] ${i === 1 ? "text-[#15181c]" : "text-[#9aa0a8]"}`} />
        ))}
      </nav>
      <div className="flex-1 p-6">
        <p className="text-[11px] text-[#9aa0a8]">Campaigns / {CAMPAIGN}</p>
        <h3 className="mt-1 text-lg font-semibold text-[#15181c]">{CAMPAIGN}</h3>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            ["Calls this week", "4,812"],
            ["Payment rate", "41.2%"],
            ["Transfer rate", "13.4%"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-[#e5e7ea] bg-white p-3">
              <p className="text-[11px] text-[#626973]">{k}</p>
              <p className="mt-1 text-xl font-semibold tabular-nums text-[#15181c]">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-[#e5e7ea] bg-white p-4">
          <p className="text-[12px] font-medium text-[#464c54]">Transfers per day</p>
          <div className="mt-4 flex h-32 items-end gap-3">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-[#c7d2fe]" style={{ height: `${h + 20}%` }} />
            ))}
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-[#e5e7ea] bg-white">
          <p className="border-b border-[#e5e7ea] px-4 py-2.5 text-[12px] font-medium text-[#464c54]">Recent calls</p>
          {[
            ["C-41560", "Payment promised", "3:48"],
            ["C-41559", "Transferred", "2:12"],
            ["C-41557", "Paid during the call", "4:05"],
            ["C-41554", "No resolution", "1:37"],
          ].map(([id, outcome, length]) => (
            <div key={id} className="flex justify-between border-b border-[#f1f3f5] px-4 py-2 text-[12px] text-[#464c54] last:border-0">
              <span className="font-mono">{id}</span>
              <span>{outcome}</span>
              <span className="tabular-nums">{length}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PlatformChatDemo() {
  const reduce = !!useReducedMotion();
  const { turns, ask, stop, reset, busy } = useTurnRunner(reduce);
  const [draft, setDraft] = useState("");
  const [hint, setHint] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  });

  const askQuestion = (q: string) => {
    const script = SCRIPTS.find(s => s.question === q);
    if (script && !busy) ask(script);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    const text = draft.trim().toLowerCase();
    if (!text) return;
    const match = SCRIPTS.find(s => s.question.toLowerCase() === text) ??
      (text.includes("transfer") ? SCRIPTS[0] : text.includes("outcome") ? SCRIPTS[1] : text.includes("disput") ? SCRIPTS[2] : undefined);
    setDraft("");
    if (match) {
      setHint(false);
      ask(match);
    } else setHint(true);
  };

  return (
    <div className="font-[Inter,ui-sans-serif,system-ui,sans-serif] text-[#15181c]">
      <style>{`.pc-sweep{background:linear-gradient(90deg,#626973 0%,#626973 40%,#c4c8ce 50%,#626973 60%,#626973 100%);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:pc-sweep 2s linear infinite}@keyframes pc-sweep{from{background-position:100% 0}to{background-position:-150% 0}}@media (prefers-reduced-motion:reduce){.pc-sweep{animation:none;color:#626973}}`}</style>
      <div className="overflow-hidden rounded-xl border border-[#d8dbe0] bg-white shadow-xl">
        <div className="flex h-9 items-center gap-1.5 border-b border-[#e5e7ea] bg-[#f6f7f8] px-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e5e7ea]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e5e7ea]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e5e7ea]" />
          <span className="ml-3 text-[11px] text-[#9aa0a8]">Campaign · {CAMPAIGN}</span>
        </div>
        <div className="relative flex h-[640px]">
          <div className="hidden flex-1 opacity-60 md:block">
            <BackgroundPage />
          </div>
          <aside aria-label="Platform Chat" className="flex w-full flex-col border-l border-[#e5e7ea] bg-white md:w-[420px] md:shadow-2xl">
            <header className="flex h-12 shrink-0 items-center justify-between border-b border-[#e5e7ea] px-3">
              <span className="flex items-center gap-1 text-[13px] font-medium text-[#15181c]">
                {turns[0]?.script.question.slice(0, 32) ?? "New chat"}
                {turns[0] && turns[0].script.question.length > 32 ? "…" : ""}
                <ChevronDown className="h-3.5 w-3.5 text-[#9aa0a8]" />
              </span>
              <span className="flex gap-1">
                <button type="button" onClick={reset} title="New chat" className="grid h-7 w-7 place-items-center rounded-md text-[#626973] hover:bg-[#f1f3f5]">
                  <Plus className="h-4 w-4" />
                </button>
                <span className="grid h-7 w-7 place-items-center rounded-md text-[#9aa0a8]">
                  <X className="h-4 w-4" />
                </span>
              </span>
            </header>

            <div ref={threadRef} className="flex-1 overflow-y-auto px-4 pb-2 pt-5">
              {turns.length === 0 ? (
                <div className="flex h-full flex-col justify-end gap-5 pb-2">
                  <div>
                    <SparkIcon className="h-8 w-8" />
                    <p className="mt-3 flex items-center gap-2 text-[15px] font-semibold">
                      Platform Chat <span className="rounded-full bg-[#f1f3f5] px-1.5 py-px text-[10.5px] font-medium text-[#626973]">Preview</span>
                    </p>
                    <p className="mt-1 text-[13px] leading-5 text-[#626973]">
                      Ask about calls, campaigns, or outcomes. Type @ to reference something specific.
                    </p>
                    <p className="mt-2 text-[11.5px] text-[#9aa0a8]">Context: {CAMPAIGN}</p>
                  </div>
                  <div className="overflow-hidden rounded-[10px] border border-[#e5e7ea]">
                    {SCRIPTS.slice(0, 3).map((s, i) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => askQuestion(s.question)}
                        className={`group flex w-full items-center gap-2.5 py-2 pl-3 pr-2 text-left text-[13px] text-[#2b3036] hover:bg-[#f6f7f8] ${i ? "border-t border-[#e5e7ea]" : ""}`}
                      >
                        {[BarChart3, LayoutDashboard, Search].map((Icon, j) => j === i && <Icon key={j} className="h-4 w-4 text-[#9aa0a8] group-hover:text-[#1d4ed8]" />)}
                        {s.question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {turns.map((turn, i) => (
                    <div key={i} className="flex flex-col gap-3">
                      <div className="self-end text-right">
                        <p className="inline-block max-w-[86%] rounded-2xl rounded-br-md bg-[#f1f3f5] px-3 py-2 text-left text-[13px] leading-6">{turn.script.question}</p>
                        <p className="mt-1 text-[11px] text-[#9aa0a8]">with {turn.script.context}</p>
                      </div>
                      <AssistantTurn turn={turn} onAsk={askQuestion} last={i === turns.length - 1} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={submit} className="shrink-0 px-3 pb-3 pt-2">
              {hint && <p className="mb-1.5 px-1 text-[11.5px] text-[#b45309]">This demo has a few scripted questions. Try one of the suggestions.</p>}
              <div className="rounded-[14px] border border-[#d1d5db] bg-white shadow-sm focus-within:border-[#3b82f6] focus-within:ring-[3px] focus-within:ring-[#3b82f6]/15">
                <input
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  placeholder={turns.length ? "Ask a follow-up…" : "Ask about this campaign…"}
                  aria-label="Message"
                  className="w-full rounded-t-[14px] bg-transparent px-3 pt-2.5 text-[13px] outline-none placeholder:text-[#9aa0a8]"
                />
                <div className="flex items-center justify-between px-2 pb-2 pt-1.5">
                  <span className="flex gap-1 text-[12px] text-[#626973]">
                    <span className="grid h-7 w-7 place-items-center rounded-md"><AtSign className="h-3.5 w-3.5" /></span>
                    <span className="flex h-7 items-center gap-1 rounded-md px-1.5"><CalendarDays className="h-3.5 w-3.5" /> Dates</span>
                  </span>
                  {busy ? (
                    <button key="stop" type="button" onClick={stop} aria-label="Stop" className="grid h-[30px] w-[30px] place-items-center rounded-full bg-[#15181c] text-white">
                      <Square className="h-3 w-3 fill-white" />
                    </button>
                  ) : (
                    <button key="send" type="submit" aria-label="Send" disabled={!draft.trim()} className="grid h-[30px] w-[30px] place-items-center rounded-full bg-[#15181c] text-white disabled:opacity-40">
                      <ArrowUp className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-1.5 flex items-center justify-center gap-1 text-[11px] text-[#9aa0a8]">
                <ShieldCheck className="h-3 w-3" /> Read-only · asks before it changes anything
              </p>
            </form>
          </aside>
        </div>
      </div>
    </div>
  );
}
