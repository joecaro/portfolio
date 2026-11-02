"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, RotateCcw, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

// A replay of Scout's investigation viewer. The run, steps, cohorts, flow and finding
// follow the synthetic demo journal that ships with Scout; the turn text is invented.

const C = {
  paper: "#F7F6F3", surface: "#FBFAF8", raised: "#FFFFFF", sunk: "#F1EFEB",
  ink: "#1F1D24", muted: "#6E6A75", faint: "#A29DA8", line: "#E9E6E1",
  accent: "#6B4FD8", accentSoft: "#F1EDFC",
  ok: "#4C7A57", okSoft: "#E8F1EA", bad: "#B4495D", badSoft: "#FBECEF", warn: "#93611A", warnSoft: "#F8EFDE", open: "#77727E", openSoft: "#EFEDEA",
  well: "#13111B", well2: "#241E3D", wellInk: "#E7E3F4", wellMuted: "#9C95B8",
};
const COHORT_COLORS = ["#6F86FF", "#FF7A3D", "#2FCB98", "#EC63D6"];
const ROLE_COLORS: Record<string, string> = { prior: "#66708F", trigger: "#B4495D", response: "#6B4FD8", consequence: "#93611A" };

const QUESTION = "Why do some customers get asked for their payment method twice after they confirm an amount?";

type Step = { label: string; detail: string; ms: number; failed?: boolean };
const STEPS: Step[] = [
  { label: "Searched calls", detail: "1,286 calls · Oct 1–8", ms: 1840 },
  { label: "Semantic search timed out", detail: "Retried with the same filters", ms: 30000, failed: true },
  { label: "Searched by meaning", detail: "48 matching passages", ms: 6420 },
  { label: "Built cohorts", detail: "4 cohorts · 287 of 300 calls have runtime stages", ms: 9590 },
  { label: "Mapped the stage flow", detail: "Found a return edge: method → details", ms: 2310 },
  { label: "Read a batch of calls", detail: "6 representatives", ms: 4120 },
  { label: "Read a call", detail: "f58b8187 · 34 turns", ms: 1210 },
  { label: "Read the runtime trace", detail: "12 runtime events", ms: 980 },
  { label: "Read a contrast call", detail: "1bfcb57c · clean cohort", ms: 1105 },
  { label: "Literal search refused", detail: "Population too large; narrow the filters", ms: 640, failed: true },
  { label: "Read a call", detail: "f533f6e7 · date-change cohort", ms: 1330 },
];

const COHORTS = [
  { label: "Clean method capture, single pass", size: 128 },
  { label: "Amount clarification, then method asked again", size: 84 },
  { label: "Date change before consent", size: 61 },
  { label: "Transfer before payment attempt", size: 27 },
];

type Turn = { n: number; speaker: "Agent" | "Customer"; text: string; role?: keyof typeof ROLE_COLORS };
const TURNS: Turn[] = [
  { n: 11, speaker: "Agent", text: "Your balance today is $412.60. How would you like to pay?" },
  { n: 12, speaker: "Customer", text: "Debit card, please.", role: "prior" },
  { n: 13, speaker: "Agent", text: "Thanks. Will you be paying the full $412.60 today?" },
  { n: 14, speaker: "Customer", text: "Wait, does that include the late fee?", role: "trigger" },
  { n: 15, speaker: "Agent", text: "Yes, it includes a $25 late fee from last month.", role: "trigger" },
  { n: 16, speaker: "Agent", text: "How would you like to make your payment today?", role: "response" },
  { n: 17, speaker: "Customer", text: "I just told you. Debit card." },
  { n: 18, speaker: "Agent", text: "Sorry about that. Is that a debit card or a bank account?" },
  { n: 19, speaker: "Customer", text: "Debit card. Same one as before.", role: "consequence" },
  { n: 20, speaker: "Agent", text: "Got it. And will you be paying the full amount?" },
  { n: 21, speaker: "Customer", text: "Yes. I already said that too.", role: "consequence" },
];

const LIMITS = ["Comparable call not established", "Recurrence not verified", "Avoidability not verified", "Negative effect not verified", "Code cause not verified"];

const GATES = [
  { name: "Prior state present", passed: true, detail: "Method recorded before the trigger in all supporting calls." },
  { name: "Same-trigger contrast", passed: true, detail: "A clarification before the method is chosen does not repeat." },
  { name: "Runtime confirms re-entry", passed: true, detail: "The trace shows payment method → payment details." },
  { name: "Recovery checked", passed: false, detail: "Later recovery after the repeat was not reviewed." },
];

type Finding = { id: string; title: string; hypothesis: string; status: "supported" | "rejected"; confidence: string; reach: string; gates: string };
const FINDINGS: Finding[] = [
  { id: "F1", title: "Amount clarification restarts method capture", hypothesis: "A question about the amount, asked after a method is chosen, sends the agent back to method selection.", status: "supported", confidence: "Medium", reach: "71 / 287 calls", gates: "3 of 4 gates" },
  { id: "F2", title: "Date changes do not explain the repeat", hypothesis: "The repeat happens only when the customer changes the payment date.", status: "rejected", confidence: "Low", reach: "0 / 61 calls", gates: "1 of 2 gates" },
];

// Deterministic point cloud: one blob per cohort, sized like the real cohorts.
function useCloud() {
  return useMemo(() => {
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const gauss = () => (rand() + rand() + rand() - 1.5) * 0.9;
    const centers = [[-0.55, 0.15, 0.2], [0.5, -0.1, 0.35], [0.1, 0.45, -0.45], [0.05, -0.55, -0.2]];
    return COHORTS.flatMap((c, i) =>
      Array.from({ length: Math.round(c.size * 0.8) }, () => ({
        c: i,
        x: centers[i][0] + gauss() * 0.28,
        y: centers[i][1] + gauss() * 0.22,
        z: centers[i][2] + gauss() * 0.28,
      }))
    );
  }, []);
}

function CohortMap({ visible, reduce, height = 168 }: { visible: number; reduce: boolean; height?: number }) {
  const cloud = useCloud();
  const [angle, setAngle] = useState(0.6);
  useEffect(() => {
    if (reduce || !visible) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      setAngle(a => a + (t - last) * 0.00025);
      last = t;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, visible]);
  const cos = Math.cos(angle), sin = Math.sin(angle);
  return (
    <div className="relative overflow-hidden rounded-[10px]" style={{ height, background: `radial-gradient(circle at 50% 40%, ${C.well2}, ${C.well})` }}>
      {visible ? (
        <svg viewBox="-1.05 -0.8 2.1 1.6" className="h-full w-full" aria-label="Cohort map: four cohorts of calls">
          {cloud.map((p, i) => {
            const x = p.x * cos - p.z * sin;
            const z = p.x * sin + p.z * cos;
            return <circle key={i} cx={x} cy={p.y} r={0.014 + (z + 1) * 0.005} fill={COHORT_COLORS[p.c]} opacity={0.55 + (z + 1) * 0.2} />;
          })}
        </svg>
      ) : (
        <p className="grid h-full place-items-center text-[12px]" style={{ color: C.wellMuted }}>Cohorts appear when the agent builds them</p>
      )}
      {visible > 0 && <span className="absolute bottom-2 right-2.5 text-[10.5px]" style={{ color: C.wellMuted }}>Display only · distance is not evidence</span>}
    </div>
  );
}

function StatusDot({ color, pulse }: { color: string; pulse?: boolean }) {
  return (
    <span className="relative inline-flex h-2 w-2">
      {pulse && <span className="absolute inset-0 animate-ping rounded-full opacity-60" style={{ background: color }} />}
      <span className="relative h-2 w-2 rounded-full" style={{ background: color }} />
    </span>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-semibold uppercase tracking-[.08em]" style={{ color: C.muted }}>{children}</p>;
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`min-w-0 rounded-[14px] border p-4 ${className}`} style={{ background: C.raised, borderColor: C.line }}>{children}</div>;
}

function StatusChip({ status }: { status: Finding["status"] }) {
  const s = status === "supported" ? { fg: C.ok, bg: C.okSoft, t: "Supported" } : { fg: C.bad, bg: C.badSoft, t: "Rejected" };
  return <span className="rounded-full px-2 py-0.5 text-[11px] font-medium" style={{ color: s.fg, background: s.bg }}>{s.t}</span>;
}

function GateIcon({ passed }: { passed: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="none" stroke={passed ? C.ok : C.bad} strokeWidth="2.2" strokeLinecap="round" aria-label={passed ? "Passed" : "Failed"}>
      <circle cx="10" cy="10" r="8" strokeWidth="1.6" opacity=".35" />
      {passed ? <path d="m6.3 10.3 2.5 2.5 5-5.4" /> : <path d="m7.2 7.2 5.6 5.6m0-5.6-5.6 5.6" />}
    </svg>
  );
}

function FindingPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div className="absolute inset-0 z-10 flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button type="button" aria-label="Close finding" onClick={onClose} className="absolute inset-0" style={{ background: "rgba(28,25,36,.28)" }} />
      <motion.aside
        role="dialog"
        aria-label="Finding F1"
        initial={{ x: 40 }}
        animate={{ x: 0 }}
        exit={{ x: 40 }}
        transition={{ type: "spring", stiffness: 380, damping: 36 }}
        className="relative flex h-full w-full max-w-[560px] flex-col overflow-y-auto border-l"
        style={{ background: C.surface, borderColor: C.line, boxShadow: "0 30px 70px -24px rgba(31,29,36,.32)" }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b px-4 py-2.5" style={{ background: C.surface, borderColor: C.line }}>
          <span className="flex items-center gap-1 text-[12px]" style={{ color: C.muted }}>
            <ChevronLeft className="h-4 w-4" style={{ color: C.faint }} /> 1 of 2 <ChevronRight className="h-4 w-4" />
          </span>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-7 w-7 place-items-center rounded-lg hover:bg-[#F1EFEB]">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4 p-5">
          <div>
            <p className="text-[12px] leading-5" style={{ color: C.muted }}>
              <StatusChip status="supported" /> <span className="ml-1">{FINDINGS[0].hypothesis}</span>
            </p>
            <h4 className="mt-3 text-[19px] font-[650] leading-snug tracking-[-.01em]">
              <span className="mr-2 font-mono text-[13px]" style={{ color: C.faint }}>F1</span>
              Amount clarification restarts method capture
            </h4>
            <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11px]">
              {[
                ["Observation", C.open, C.openSoft],
                ["Agent-reported confidence: medium", C.open, C.openSoft],
                ["3 of 4 gates", C.open, C.openSoft],
                ["Provisional", C.warn, C.warnSoft],
              ].map(([t, fg, bg]) => (
                <span key={t} className="rounded-full px-2 py-0.5 font-medium" style={{ color: fg, background: bg }}>{t}</span>
              ))}
            </div>
          </div>

          <Card className="space-y-4">
            <div>
              <Label>What happened</Label>
              <p className="mt-1 text-[13.5px] leading-6">After the customer picks a payment method, a question about the amount sends the agent back to the method question.</p>
            </div>
            <div>
              <Label>Why</Label>
              <p className="mt-1 text-[13.5px] leading-6">The clarification returns the flow to payment details. Method state is cleared on re-entry, so the agent asks again.</p>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label>Relevant turns</Label>
                <span className="text-[11.5px]" style={{ color: C.muted }}>
                  Call <span className="font-mono">f58b8187</span> · <span style={{ color: C.ok }}>Supporting</span>
                </span>
              </div>
              <p className="mt-2 text-[11.5px]" style={{ color: C.faint }}>10 earlier turns</p>
              <ol className="mt-1 space-y-1">
                {TURNS.map(t => (
                  <li key={t.n} className="grid grid-cols-[22px_1fr] gap-2 rounded-[9px] px-2 py-1.5" style={t.role ? { background: C.sunk } : undefined}>
                    <span className="pt-0.5 text-right font-mono text-[11px]" style={{ color: C.faint }}>{t.n}</span>
                    <div>
                      <p className="flex items-center gap-1.5 text-[11px]" style={{ color: C.muted }}>
                        {t.speaker}
                        {t.role && (
                          <span className="rounded px-1 text-[10px] font-semibold uppercase tracking-wide" style={{ color: ROLE_COLORS[t.role], background: `${ROLE_COLORS[t.role]}14` }}>
                            {t.role}
                          </span>
                        )}
                      </p>
                      <p className="text-[13px] leading-5">{t.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-1 text-[11.5px]" style={{ color: C.faint }}>13 later turns</p>
            </div>
            <div>
              <Label>Evidence calls</Label>
              <div className="mt-1.5 flex flex-wrap gap-1.5 font-mono text-[11.5px]">
                {[["f58b8187", "Supporting"], ["64683e0a", "Supporting"], ["58b270bf", "Supporting"], ["1bfcb57c", "Contrast"], ["40980f58", "Contrast"]].map(([id, kind]) => (
                  <span key={id} className="rounded-md border px-1.5 py-0.5" style={{ borderColor: C.line }}>
                    {id} <span className="font-sans" style={{ color: kind === "Contrast" ? C.open : C.ok }}>{kind}</span>
                  </span>
                ))}
              </div>
            </div>
          </Card>

          <div className="space-y-3 px-1 text-[12px]" style={{ color: C.muted }}>
            <div>
              <Label>Evidence limits</Label>
              <ul className="mt-1 space-y-0.5" style={{ color: C.warn }}>
                {LIMITS.map(l => <li key={l}>{l}</li>)}
              </ul>
              <p className="mt-1.5">Without these, the finding stays an observation. It is saved, not promoted to a supported problem.</p>
            </div>
            <div>
              <Label>Scope</Label>
              <p className="mt-1">The restart cohort for the collections agent: about one in four calls that reach method selection.</p>
            </div>
            <div>
              <Label>Reach</Label>
              <p className="mt-1">71 matched of 287 examined, 300 in population. Some calls have no runtime trace; reach counts runtime return edges, not reviewed calls.</p>
            </div>
            <div>
              <Label>Gates</Label>
              <ul className="mt-1.5 space-y-1.5">
                {GATES.map(g => (
                  <li key={g.name} className="flex gap-2">
                    <GateIcon passed={g.passed} />
                    <span>
                      <span style={{ color: C.ink }}>{g.name}</span> · {g.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.aside>
    </motion.div>
  );
}

export function ScoutViewerDemo() {
  const reduce = !!useReducedMotion();
  const [step, setStep] = useState(0); // number of steps recorded so far
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const timer = useRef<number>();
  const finished = step > STEPS.length;
  const cohortsBuilt = step >= 4;
  const findings = finished ? FINDINGS : step >= STEPS.length ? FINDINGS.slice(0, 1) : [];

  useEffect(() => {
    if (!playing) return;
    if (step > STEPS.length) {
      setPlaying(false);
      return;
    }
    timer.current = window.setTimeout(() => setStep(s => s + 1), reduce ? 0 : step === 0 ? 400 : 750);
    return () => window.clearTimeout(timer.current);
  }, [playing, step, reduce]);

  const play = () => {
    setOpen(false);
    setStep(0);
    setPlaying(true);
  };

  const failed = STEPS.slice(0, step).filter(s => s.failed).length;
  const recent = STEPS.slice(0, Math.min(step, STEPS.length)).slice(-4).reverse();

  return (
    <div className="font-[system-ui,-apple-system,'Segoe_UI',Roboto,sans-serif]" style={{ color: C.ink }}>
      <div className="relative overflow-hidden rounded-xl border shadow-xl" style={{ background: C.paper, borderColor: "#DEDAD3" }}>
        <header className="flex h-[52px] items-center gap-3 border-b px-4" style={{ background: "rgba(251,250,248,.9)", borderColor: C.line }}>
          <span className="flex items-center gap-2 text-[14px] font-[650]">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <circle cx="8.5" cy="10" r="1.4" fill={COHORT_COLORS[1]} />
              <circle cx="12.5" cy="8.5" r="1.4" fill={COHORT_COLORS[0]} />
              <circle cx="12" cy="13" r="1.4" fill={COHORT_COLORS[2]} />
              <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Scout
          </span>
          <span className="hidden truncate text-[13px] sm:inline" style={{ color: C.muted }}>/ Payment clarification resets method selection</span>
          <span className="ml-auto flex items-center gap-2 text-[12px]" style={{ color: C.muted }}>
            {step === 0 && !playing ? (
              "Ready"
            ) : finished ? (
              <><StatusDot color={C.ok} /> Finished</>
            ) : (
              <><StatusDot color={C.accent} pulse /> Live</>
            )}
          </span>
          <button
            type="button"
            onClick={play}
            disabled={playing}
            className="flex h-8 items-center gap-1.5 rounded-lg px-3 text-[12.5px] font-medium text-white disabled:opacity-50"
            style={{ background: C.accent }}
          >
            {step === 0 ? <Play className="h-3.5 w-3.5" /> : <RotateCcw className="h-3.5 w-3.5" />}
            {step === 0 ? "Run investigation" : "Replay"}
          </button>
        </header>

        <div className="space-y-5 p-5 md:p-7">
          <div>
            <h3 className="max-w-[34ch] text-[22px] font-[650] leading-tight tracking-[-.015em] md:text-[26px]">{QUESTION}</h3>
            <p className="mt-2 text-[14px]" style={{ color: finished ? C.ink : C.faint }}>
              {finished ? "Amount clarifications reset payment method state." : step > 0 ? "The agent is investigating…" : "No verdict yet. Run the investigation to watch the agent work."}
            </p>
            <p className="mt-1 text-[12px]" style={{ color: C.muted }}>
              {finished ? "Completed · 2 min 16 s" : step > 0 ? `Running · step ${Math.min(step, STEPS.length)} of ${STEPS.length}` : "Not started"} · collections agent · Oct 1–8
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_1.35fr]">
            <Card>
              <Label>Result</Label>
              <p className="mt-1 text-[46px] font-[650] leading-none tabular-nums">
                {findings.length}
                <span className="ml-2 text-[14px] font-normal" style={{ color: C.muted }}>findings</span>
              </p>
              <div className="mt-4">
                <div className="flex justify-between text-[11.5px]" style={{ color: C.muted }}>
                  <span>Calls with runtime stages</span>
                  <span className="tabular-nums">{cohortsBuilt ? "287 of 300" : "—"}</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full" style={{ background: C.sunk }}>
                  <motion.div className="h-full rounded-full" style={{ background: C.accent }} animate={{ width: cohortsBuilt ? "95.7%" : "0%" }} />
                </div>
              </div>
              <p className="mt-3 text-[12px] tabular-nums" style={{ color: C.muted }}>
                {step >= 11 ? 7 : step >= 6 ? 6 : 0} full calls read · {step >= 9 ? 2 : step >= 7 ? 1 : 0} repeat reads · {Math.min(step, STEPS.length)} steps ·{" "}
                <span style={{ color: failed ? C.bad : undefined }}>{failed} failed</span>
              </p>
              <ul className="mt-3 space-y-1.5 border-t pt-3 text-[12.5px]" style={{ borderColor: C.line }}>
                {findings.length === 0 && <li style={{ color: C.faint }}>Findings appear here as the agent records them.</li>}
                {findings.map(f => (
                  <li key={f.id} className="flex items-center gap-2">
                    <span className="font-mono text-[11px]" style={{ color: C.faint }}>{f.id}</span>
                    <StatusDot color={f.status === "supported" ? C.ok : C.bad} />
                    <span className="truncate">{f.title}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <Label>Cohort map</Label>
                {cohortsBuilt && <span className="text-[11px]" style={{ color: C.faint }}>300 calls</span>}
              </div>
              <div className="mt-2">
                <CohortMap visible={cohortsBuilt ? 1 : 0} reduce={reduce} />
              </div>
              <ul className="mt-2.5 grid gap-x-4 gap-y-1 text-[11.5px] sm:grid-cols-2" style={{ color: cohortsBuilt ? C.ink : C.faint }}>
                {COHORTS.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-1.5">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: cohortsBuilt ? COHORT_COLORS[i] : C.line }} />
                    <span className="truncate">{c.label}</span>
                    <span className="ml-auto tabular-nums" style={{ color: C.muted }}>{cohortsBuilt ? c.size : ""}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.35fr_1fr] [&>*]:min-w-0">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-[15px] font-[650]">Findings</h4>
                {finished && <span className="text-[12px]" style={{ color: C.muted }}>Select a finding to see its evidence</span>}
              </div>
              <div className="mt-2 space-y-2">
                {findings.length === 0 && (
                  <div className="rounded-[14px] border border-dashed p-5 text-center text-[13px]" style={{ borderColor: C.line, color: C.faint }}>
                    {step === 0 ? "Run the investigation to start." : "Findings appear here as the agent records them."}
                  </div>
                )}
                <AnimatePresence initial={false}>
                  {findings.map(f => (
                    <motion.button
                      key={f.id}
                      type="button"
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => f.id === "F1" && setOpen(true)}
                      className={`block w-full rounded-[14px] border p-3.5 text-left transition-colors ${f.id === "F1" ? "hover:border-[#6B4FD8]" : "cursor-default"}`}
                      style={{ background: C.raised, borderColor: C.line }}
                    >
                      <p className="flex items-start gap-2 text-[12px] leading-5" style={{ color: C.muted }}>
                        <StatusChip status={f.status} />
                        <span className="flex-1">{f.hypothesis}</span>
                        <span className="shrink-0 tabular-nums">{f.reach}</span>
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-[13.5px] font-medium">
                        <span className="font-mono text-[11px]" style={{ color: C.faint }}>{f.id}</span>
                        {f.title}
                        {f.id === "F1" && <ChevronRight className="ml-auto h-4 w-4" style={{ color: C.faint }} />}
                      </p>
                      <p className="mt-1 pl-6 text-[11.5px]" style={{ color: C.muted }}>
                        {f.confidence} confidence · {f.gates}
                      </p>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            <div>
              <h4 className="text-[15px] font-[650]">Steps</h4>
              <ol className="mt-2 space-y-1.5">
                {recent.length === 0 && <li className="text-[12.5px]" style={{ color: C.faint }}>No tool steps were recorded.</li>}
                {recent.map(s => (
                    <motion.li
                      key={`${s.label}-${s.detail}`}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="rounded-[9px] border px-3 py-2"
                      style={{ background: C.raised, borderColor: s.failed ? "#EBC7CF" : C.line }}
                    >
                      <p className="flex justify-between text-[12.5px]" style={{ color: s.failed ? C.bad : C.ink }}>
                        <span>{s.label}</span>
                        <span className="tabular-nums" style={{ color: C.faint }}>{(s.ms / 1000).toFixed(1)}s</span>
                      </p>
                      <p className="text-[11.5px]" style={{ color: C.muted }}>{s.detail}</p>
                    </motion.li>
                  ))}
              </ol>
              {step > 4 && <p className="mt-2 text-[11.5px]" style={{ color: C.faint }}>Showing the latest 4 of {Math.min(step, STEPS.length)} steps</p>}
            </div>
          </div>
        </div>

        <AnimatePresence>{open && <FindingPanel onClose={() => setOpen(false)} />}</AnimatePresence>
      </div>
    </div>
  );
}
