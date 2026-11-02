"use client";

import { AudioLines, ChevronDown, ChevronRight, Copy, Pause, Play, Search, UserRound } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

// Fictional call and flow data. Layout, copy and visual rules follow the real call-details
// redesign and the call-flow card.

type Pill = "Scripted" | "Uninterruptible" | "Sensitive action";
type Flag = { level: "Monitor" | "Warning"; text: string };
type Step = { kind: "Hear" | "Guard" | "Model" | "Tool" | "Error" | "Speak"; title: string; detail?: string; returned?: string; tone?: "bad" | "warn" };
type Msg = { turn: number; speaker: "Agent" | "Customer"; at: number; text: string; pill?: Pill; flag?: Flag; steps?: Step[] };

const DURATION = 112;

const MESSAGES: Msg[] = [
  { turn: 1, speaker: "Agent", at: 1, pill: "Scripted", text: "Hi, this is the automated assistant calling about your card account. Am I speaking with Jordan?" },
  { turn: 1, speaker: "Customer", at: 8, text: "Yes, that's me." },
  { turn: 2, speaker: "Agent", at: 10, pill: "Sensitive action", text: "Thanks, Jordan. To verify your identity, what are the last four digits of your Social Security number?" },
  { turn: 2, speaker: "Customer", at: 17, text: "Four four one seven." },
  {
    turn: 3, speaker: "Agent", at: 24, text: "You're verified. Your past-due balance is $911.00. Would you like to take care of that today?",
    steps: [
      { kind: "Hear", title: "Heard the customer" },
      { kind: "Tool", title: "verify_identity", returned: '{ "verified": true }' },
      { kind: "Model", title: "Collections step ran the model", detail: "1.2 s" },
      { kind: "Speak", title: "Speech synthesis" },
    ],
  },
  { turn: 3, speaker: "Customer", at: 31, text: "Yeah, let's pay it today with the card on file." },
  {
    turn: 4, speaker: "Agent", at: 39, pill: "Uninterruptible", text: "I'll charge $911.00 to the card ending 8812 today. Are you the authorized signer on this account? Please say yes to confirm.",
    steps: [
      { kind: "Hear", title: "Heard the customer" },
      { kind: "Guard", title: "Input checks", detail: "Passed" },
      { kind: "Tool", title: "validate_payment_amount_date", returned: '{ "valid": true, "amount": 911.00, "date": "today" }' },
      { kind: "Tool", title: "process_payment_with_card_on_file", returned: '{ "status": "held_for_confirmation" }' },
      { kind: "Speak", title: "Speech synthesis" },
    ],
  },
  { turn: 4, speaker: "Customer", at: 52, text: "Yes." },
  {
    turn: 5, speaker: "Agent", at: 69, flag: { level: "Warning", text: "8.6 s to first audio · fallback model" }, text: "Sorry, I need to confirm. Are you the authorized signer on this account?",
    steps: [
      { kind: "Hear", title: "Heard the customer", detail: "“Yes.”" },
      { kind: "Guard", title: "Confirmation check", detail: "“Yes” was not accepted", tone: "warn" },
      { kind: "Error", title: "Model timed out", detail: "6.0 s", tone: "bad" },
      { kind: "Speak", title: "Wait phrase played" },
      { kind: "Model", title: "Fallback model ran", detail: "1.9 s" },
      { kind: "Tool", title: "process_payment_with_card_on_file", returned: '{ "status": "held_for_confirmation" }' },
    ],
  },
  { turn: 5, speaker: "Customer", at: 75, text: "Yes. I said yes." },
  {
    turn: 6, speaker: "Agent", at: 81, flag: { level: "Monitor", text: "Same question 3 times · T4–T6" }, text: "To complete the payment, please confirm that you are the authorized signer.",
    steps: [
      { kind: "Guard", title: "Confirmation check", detail: "“Yes. I said yes.” was not accepted", tone: "warn" },
      { kind: "Tool", title: "process_payment_with_card_on_file", returned: '{ "status": "held_for_confirmation" }' },
      { kind: "Guard", title: "Loop detector", detail: "Monitor: same question three turns in a row", tone: "warn" },
    ],
  },
  { turn: 6, speaker: "Customer", at: 89, text: "Yes! Can I just talk to a person?" },
  {
    turn: 7, speaker: "Agent", at: 98, text: "I'm sorry for the trouble. I'm transferring you to a specialist now.",
    steps: [
      { kind: "Guard", title: "Frustration check", detail: "Fired", tone: "bad" },
      { kind: "Tool", title: "transfer_to_live_agent", returned: '{ "transferred": true, "queue": "payments" }' },
    ],
  },
];

const MOMENTS = [
  { turn: 3, title: "Payment validated", detail: "$911.00 for today" },
  { turn: 4, title: "Confirmation loop", detail: "Same question 3 times, T4–T6" },
  { turn: 5, title: "Slow turn", detail: "8.6 s to first audio · fallback model" },
  { turn: 7, title: "Transfer", detail: "Frustration check fired" },
];

const MARKERS: { lane: "Tools" | "Checks"; at: number; turn: number; tone?: "warn" | "bad" }[] = [
  { lane: "Tools", at: 21, turn: 3 }, { lane: "Tools", at: 36, turn: 4 }, { lane: "Tools", at: 46, turn: 4 },
  { lane: "Tools", at: 66, turn: 5 }, { lane: "Tools", at: 79, turn: 6 }, { lane: "Tools", at: 96, turn: 7 },
  { lane: "Checks", at: 57, turn: 5, tone: "warn" }, { lane: "Checks", at: 78, turn: 6, tone: "warn" }, { lane: "Checks", at: 94, turn: 7, tone: "bad" },
];

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const turnAt = (t: number) => [...MESSAGES].reverse().find(m => m.at <= t)?.turn ?? 1;

function usePeaks(n: number) {
  return useMemo(() => {
    let seed = 11;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    return Array.from({ length: n }, (_, i) => {
      const t = (i / n) * DURATION;
      const speaking = MESSAGES.some((m, j) => t >= m.at && t < (MESSAGES[j + 1]?.at ?? DURATION) - 1.5);
      return speaking ? 0.25 + rand() * 0.75 : 0.04 + rand() * 0.06;
    });
  }, [n]);
}

const PILL_STYLE: Record<Pill, string> = {
  Scripted: "bg-teal-50 text-teal-800 ring-teal-200",
  Uninterruptible: "bg-orange-50 text-orange-800 ring-orange-200",
  "Sensitive action": "bg-gray-100 text-gray-700 ring-gray-200",
};

function StepRow({ step }: { step: Step }) {
  const [open, setOpen] = useState(false);
  const color = step.tone === "bad" ? "text-red-700" : step.tone === "warn" ? "text-amber-700" : "text-gray-800";
  return (
    <li className="text-[12px]">
      <div className="flex items-center gap-2">
        <span className="w-12 shrink-0 rounded bg-gray-100 px-1.5 py-px text-center text-[10.5px] font-medium text-gray-600">{step.kind}</span>
        <span className={`font-mono text-[11.5px] ${color}`}>{step.title}</span>
        {step.detail && <span className="text-gray-500">· {step.detail}</span>}
      </div>
      {step.returned && (
        <div className="ml-14 mt-0.5">
          <button type="button" onClick={() => setOpen(o => !o)} className="flex items-center gap-0.5 text-[11.5px] text-violet-700 hover:underline">
            {open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />} Show what it returned
          </button>
          {open && <pre className="mt-1 overflow-x-auto rounded-md bg-gray-50 px-2 py-1.5 font-mono text-[11px] text-gray-700">{step.returned}</pre>}
        </div>
      )}
    </li>
  );
}

function CallDetails() {
  const peaks = usePeaks(140);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState(4);
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setTime(t => {
        const next = t + 0.5;
        if (next >= DURATION) {
          setPlaying(false);
          return DURATION;
        }
        return next;
      });
    }, 125);
    return () => window.clearInterval(id);
  }, [playing]);

  useEffect(() => {
    if (playing) setSelected(turnAt(time));
  }, [time, playing]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-turn="${selected}"]`);
    const list = listRef.current;
    if (el && list) list.scrollTo({ top: el.offsetTop - list.offsetTop - 8, behavior: "smooth" });
  }, [selected]);

  const jump = (turn: number, at?: number) => {
    setSelected(turn);
    setTime(at ?? MESSAGES.find(m => m.turn === turn)!.at);
  };

  const q = query.trim().toLowerCase();
  const matches = q ? MESSAGES.filter(m => m.text.toLowerCase().includes(q)).length : 0;

  return (
    <div className="grid h-full md:grid-cols-[1fr_340px]">
      <section className="flex min-h-0 min-w-0 flex-col">
        <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-2">
          <label className="flex h-8 flex-1 items-center gap-1.5 rounded-md border border-gray-200 px-2 text-[12.5px] text-gray-500 focus-within:border-violet-400">
            <Search className="h-3.5 w-3.5" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search transcript" aria-label="Search transcript" className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400" />
            {q && <span className="shrink-0 text-[11px]">{matches ? `${matches} matches` : "No matches"}</span>}
          </label>
          <span className="hidden items-center gap-1 text-[12px] text-gray-600 sm:flex"><Copy className="h-3.5 w-3.5" /> Copy transcript</span>
        </div>
        <div ref={listRef} className="relative min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-3">
          {MESSAGES.map((m, i) => {
            const isSel = m.turn === selected;
            const hit = q && m.text.toLowerCase().includes(q);
            const first = MESSAGES.findIndex(x => x.turn === m.turn) === i;
            return (
              <div
                key={i}
                data-turn={first ? m.turn : undefined}
                onClick={() => jump(m.turn, m.at)}
                className={`cursor-pointer rounded-xl px-2.5 py-2 transition-colors ${isSel ? "bg-violet-50/70" : "hover:bg-gray-50"} ${q && !hit ? "opacity-40" : ""}`}
              >
                <div className="grid grid-cols-[28px_1fr] gap-2.5">
                  <span className={`grid h-7 w-7 place-items-center rounded-full ${m.speaker === "Agent" ? "bg-gray-900 text-white" : "bg-teal-100 text-teal-800"}`}>
                    {m.speaker === "Agent" ? <AudioLines className="h-3.5 w-3.5" /> : <UserRound className="h-3.5 w-3.5" />}
                  </span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-gray-500">
                      <span className="font-medium text-gray-900">{m.speaker}</span>
                      <span className="tabular-nums text-violet-700">{fmt(m.at)}</span>
                      <span>Turn {m.turn}</span>
                      {m.pill && <span className={`rounded-full px-1.5 py-px text-[10.5px] font-medium ring-1 ring-inset ${PILL_STYLE[m.pill]}`}>{m.pill}</span>}
                      {m.flag && (
                        <span className={`rounded-full px-1.5 py-px text-[10.5px] font-medium ${m.flag.level === "Warning" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-800"}`}>
                          {m.flag.level} · {m.flag.text}
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 max-w-[72ch] text-[13.5px] leading-6 text-gray-900">{m.text}</p>
                    {isSel && m.steps && (
                      <div className="mt-2 rounded-lg border border-gray-200 bg-white p-2.5">
                        <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-gray-500">What the agent did · Turn {m.turn}</p>
                        <ul className="space-y-1.5">{m.steps.map((s, k) => <StepRow key={k} step={s} />)}</ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <aside className="hidden min-h-0 flex-col gap-4 overflow-y-auto border-l border-gray-200 bg-gray-50/60 p-4 md:flex">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">Summary</p>
          <p className="mt-1 text-[12.5px] leading-5 text-gray-800">
            Jordan wanted to pay the $911.00 past-due balance. Identity and the payment checked out, but the confirmation step didn&apos;t accept &ldquo;yes&rdquo; three times. Jordan asked for a person and was transferred. No payment was processed.
          </p>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">Key moments</p>
          <ul className="mt-1.5 space-y-1">
            {MOMENTS.map(k => (
              <li key={k.title}>
                <button type="button" onClick={() => jump(k.turn)} className="w-full rounded-lg px-2 py-1.5 text-left hover:bg-white">
                  <span className="text-[12.5px] font-medium text-gray-900">T{k.turn} · {k.title}</span>
                  <span className="block text-[11.5px] text-gray-500">{k.detail}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">Recording</p>
            <span className="text-[11px] tabular-nums text-gray-500">{fmt(time)} / {fmt(DURATION)}</span>
          </div>
          <div className="mt-2 rounded-lg border border-gray-200 bg-white p-2.5">
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setPlaying(p => !p)} aria-label={playing ? "Pause" : "Play"} className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gray-900 text-white">
                {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 translate-x-px" />}
              </button>
              <button
                type="button"
                aria-label="Seek recording"
                onClick={e => {
                  const r = e.currentTarget.getBoundingClientRect();
                  const t = ((e.clientX - r.left) / r.width) * DURATION;
                  setTime(t);
                  setSelected(turnAt(t));
                }}
                className="relative flex h-9 flex-1 items-center gap-px"
              >
                {peaks.map((p, i) => (
                  <span key={i} className={`flex-1 rounded-full ${(i / peaks.length) * DURATION <= time ? "bg-violet-500" : "bg-gray-300"}`} style={{ height: `${p * 100}%` }} />
                ))}
              </button>
            </div>
            <div className="mt-2.5 space-y-1.5 pl-9">
              {(["Customer", "Agent"] as const).map(lane => (
                <div key={lane} className="flex items-center gap-2">
                  <span className="w-14 text-[10.5px] text-gray-500">{lane}</span>
                  <div className="relative h-2 flex-1 rounded bg-gray-100">
                    {MESSAGES.filter(m => m.speaker === lane).map((m, i) => {
                      const end = MESSAGES[MESSAGES.indexOf(m) + 1]?.at ?? DURATION;
                      return <span key={i} className={`absolute inset-y-0 rounded ${lane === "Customer" ? "bg-teal-400" : "bg-gray-700"}`} style={{ left: `${(m.at / DURATION) * 100}%`, width: `${((end - m.at - 1.5) / DURATION) * 100}%` }} />;
                    })}
                  </div>
                </div>
              ))}
              {(["Tools", "Checks"] as const).map(lane => (
                <div key={lane} className="flex items-center gap-2">
                  <span className="w-14 text-[10.5px] text-gray-500">{lane}</span>
                  <div className="relative h-3 flex-1">
                    <span className="absolute inset-x-0 top-1/2 h-px bg-gray-200" />
                    {MARKERS.filter(k => k.lane === lane).map((k, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`${lane} event in turn ${k.turn}`}
                        onClick={() => jump(k.turn, k.at)}
                        className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] ring-2 ring-white transition-transform hover:scale-125 ${k.tone === "bad" ? "bg-red-500" : k.tone === "warn" ? "bg-amber-500" : "bg-violet-500"}`}
                        style={{ left: `${(k.at / DURATION) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              ))}
              <div className="relative h-0">
                <span className="absolute -top-[68px] h-[68px] w-px bg-violet-600/70" style={{ left: `calc(3.5rem + 0.5rem + (100% - 4rem) * ${time / DURATION})` }} />
              </div>
            </div>
          </div>
          <p className="mt-1.5 text-[11px] text-gray-500">Select a marker to jump to its turn.</p>
        </div>
      </aside>
    </div>
  );
}

type Node = { id: string; label: string; calls: number; col: number; row: number };
const NODES: Node[] = [
  { id: "start", label: "Start", calls: 300, col: 0, row: 1 },
  { id: "identity", label: "Identity", calls: 300, col: 1, row: 1 },
  { id: "details", label: "Payment details", calls: 292, col: 2, row: 1 },
  { id: "schedule", label: "Payment schedule", calls: 58, col: 3, row: 0 },
  { id: "transfer", label: "Transfer", calls: 27, col: 3, row: 2 },
  { id: "method", label: "Payment method", calls: 259, col: 4, row: 1 },
  { id: "consent", label: "Consent", calls: 213, col: 5, row: 1 },
  { id: "attempt", label: "Payment attempt", calls: 163, col: 6, row: 0 },
  { id: "end", label: "End", calls: 300, col: 7, row: 1 },
];
const EDGES: [string, string, number][] = [
  ["start", "identity", 300], ["identity", "details", 292], ["identity", "transfer", 8], ["details", "method", 201], ["details", "schedule", 58],
  ["schedule", "method", 49], ["method", "consent", 213], ["method", "details", 71], ["consent", "attempt", 163], ["consent", "end", 50],
  ["details", "transfer", 19], ["attempt", "end", 163], ["transfer", "end", 27], ["schedule", "end", 9], ["method", "end", 17],
];

function CallFlow() {
  const [view, setView] = useState<"Graph" | "Stages">("Graph");
  const [sel, setSel] = useState<string | null>(null);
  const W = 162, H = 78, X0 = 20, Y0 = 40, NW = 132, NH = 46;
  const pos = (n: Node) => ({ x: X0 + n.col * W, y: Y0 + n.row * H });
  const byId = Object.fromEntries(NODES.map(n => [n.id, n]));
  const max = Math.max(...EDGES.map(e => e[2]));
  const isReturn = (a: string, b: string) => byId[b].col < byId[a].col;
  const related = (e: [string, string, number]) => !sel || e[0] === sel || e[1] === sel;
  const selNode = sel ? byId[sel] : null;
  const returns = EDGES.filter(e => isReturn(e[0], e[1])).length;

  return (
    <div className="flex h-full flex-col overflow-y-auto p-4">
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-2 px-3 pt-2.5">
          <div>
            <p className="text-[12.5px] font-semibold text-gray-900">Call flow</p>
            <p className="text-[11px] text-gray-500">287 of 300 calls analyzed · Partial coverage · {NODES.length} stages</p>
          </div>
          <div className="flex items-center gap-3">
            {sel && <button type="button" onClick={() => setSel(null)} className="text-[11.5px] text-violet-700 underline">Clear selection</button>}
            <div role="group" aria-label="Call flow view" className="flex rounded-md bg-gray-100 p-1">
              {(["Graph", "Stages"] as const).map(v => (
                <button key={v} type="button" onClick={() => setView(v)} aria-pressed={view === v} className={`rounded px-2.5 py-0.5 text-[11.5px] ${view === v ? "bg-white font-medium text-gray-900 shadow-sm" : "text-gray-600"}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="px-3 pt-1 text-[11px] text-gray-500">Select a stage to isolate its connections.</p>

        {view === "Graph" ? (
          <div className="overflow-x-auto px-1 py-2" tabIndex={0} aria-label="Scrollable call flow graph">
            <svg viewBox={`0 0 ${X0 * 2 + 7 * W + NW} ${Y0 + 3 * H}`} className="min-w-[900px]">
              <defs>
                <marker id="cr-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto">
                  <path d="M0 0 8 4 0 8z" fill="#7c3aed" fillOpacity=".6" />
                </marker>
              </defs>
              {EDGES.map(([a, b, calls]) => {
                const pa = pos(byId[a]), pb = pos(byId[b]);
                const back = isReturn(a, b);
                const x1 = back ? pa.x + NW / 2 : pa.x + NW, y1 = back ? pa.y : pa.y + NH / 2;
                const x2 = back ? pb.x + NW / 2 : pb.x, y2 = back ? pb.y : pb.y + NH / 2;
                const d = back ? `M${x1} ${y1} C${x1} ${y1 - 46}, ${x2} ${y2 - 46}, ${x2} ${y2}` : `M${x1} ${y1} C${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`;
                const on = related([a, b, calls]);
                return (
                  <g key={`${a}-${b}`} opacity={on ? 1 : 0.07}>
                    <path d={d} fill="none" stroke={back ? "#6b7280" : "#7c3aed"} strokeOpacity={back ? 0.8 : 0.45} strokeWidth={1.4 + (9 * calls) / max} strokeDasharray={back ? "7 6" : undefined} markerEnd={back ? undefined : "url(#cr-arrow)"} />
                    <text x={(x1 + x2) / 2} y={back ? y1 - 38 : (y1 + y2) / 2 - 4} textAnchor="middle" className="fill-gray-700 text-[11px]" style={{ paintOrder: "stroke", stroke: "white", strokeWidth: 3 }}>
                      {calls}
                    </text>
                  </g>
                );
              })}
              {NODES.map(n => {
                const p = pos(n);
                const active = sel === n.id;
                return (
                  <g key={n.id} onClick={() => setSel(active ? null : n.id)} className="cursor-pointer" role="button" aria-label={`${n.label}, ${n.calls} calls`}>
                    <rect x={p.x} y={p.y} width={NW} height={NH} rx={10} fill={active ? "#f5f3ff" : "white"} stroke={active ? "#8b5cf6" : "#d1d5db"} />
                    <rect x={p.x + 8} y={p.y + NH - 6} width={(NW - 16) * (n.calls / 300)} height={3} rx={1.5} fill="#ddd6fe" />
                    <text x={p.x + 10} y={p.y + 19} className="fill-gray-900 text-[12px] font-semibold">{n.label}</text>
                    <text x={p.x + 10} y={p.y + 33} className="fill-gray-500 text-[11px]">{n.calls} calls</text>
                  </g>
                );
              })}
            </svg>
          </div>
        ) : (
          <ul className="space-y-1 px-3 py-2">
            {NODES.map(n => (
              <li key={n.id}>
                <button type="button" onClick={() => setSel(sel === n.id ? null : n.id)} className={`grid w-full grid-cols-[7.5rem_1fr_auto] items-center gap-2 rounded px-1.5 py-1 text-left text-[12px] ${sel === n.id ? "bg-violet-50" : "hover:bg-gray-50"}`}>
                  <span className="truncate text-gray-900">{n.label}</span>
                  <span className="h-1.5 rounded-full bg-violet-500" style={{ width: `${(n.calls / 300) * 100}%` }} />
                  <span className="tabular-nums text-gray-600">{n.calls}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {selNode && (
          <div className="mx-3 mb-2 rounded-md bg-gray-50 px-3 py-2 text-[11.5px]">
            <p className="font-medium text-gray-900">{selNode.label} · {selNode.calls} calls</p>
            <div className="mt-1 grid gap-3 sm:grid-cols-2">
              {(["Incoming", "Outgoing"] as const).map(dir => {
                const list = EDGES.filter(e => (dir === "Incoming" ? e[1] : e[0]) === selNode.id).sort((x, y) => y[2] - x[2]);
                return (
                  <div key={dir}>
                    <p className="text-gray-500">{dir}</p>
                    {list.length === 0 && <p className="text-gray-400">No {dir.toLowerCase()} connections recorded.</p>}
                    {list.map(e => (
                      <p key={e.join()} className="text-gray-800">
                        {byId[dir === "Incoming" ? e[0] : e[1]].label} · {e[2]}
                        {isReturn(e[0], e[1]) && <span className="text-gray-500"> · Return</span>}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-gray-200 bg-gray-50 px-3 py-1.5 text-[11px] text-gray-500">
          <span className="flex items-center gap-1.5"><span className="h-0.5 w-5 bg-violet-600/50" /> Forward</span>
          <span className="flex items-center gap-1.5"><span className="w-5 border-t-2 border-dashed border-gray-500" /> Return to an earlier stage group</span>
          <span>{returns} return transition{returns === 1 ? "" : "s"}</span>
          <span>Line width shows call count. Calls can appear in several stages and connections.</span>
        </div>
      </div>
    </div>
  );
}

export function CallReviewDemo() {
  const [tab, setTab] = useState<"details" | "flow">("details");
  return (
    <div className="text-gray-900">
      <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-xl">
        <div className="flex h-11 items-center gap-1 border-b border-gray-200 bg-gray-50 px-3">
          {([["details", "Call details"], ["flow", "Call flow"]] as const).map(([id, label]) => (
            <button key={id} type="button" onClick={() => setTab(id)} aria-pressed={tab === id} className={`rounded-md px-3 py-1 text-[12.5px] ${tab === id ? "bg-white font-medium shadow-sm ring-1 ring-gray-200" : "text-gray-600 hover:text-gray-900"}`}>
              {label}
            </button>
          ))}
          <span className="ml-auto hidden text-[11.5px] text-gray-500 sm:inline">
            {tab === "details" ? "Card collections · Outbound · 1:52 · Transferred" : "Collections agent · Oct 1–8"}
          </span>
        </div>
        <div className="h-[600px]">{tab === "details" ? <CallDetails /> : <CallFlow />}</div>
      </div>
    </div>
  );
}
