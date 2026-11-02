"use client";

import { CheckCircle2, GitBranch, MessageSquare, RotateCcw, ShieldCheck, Users, Workflow } from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";

// A scripted replay of the agent control room. The effort, agents, branches and messages are
// invented; the layout, labels and state copy follow the real screen.

const T = {
  bg: "#f7f7f4", surface: "#ffffff", border: "#dfdfd8", text: "#191918", muted: "#64655f", subtle: "#8c8d86", accent: "#171716", soft: "#ecece8",
};
const TONE: Record<string, [string, string]> = {
  running: ["#9f7521", "#f4ecd6"], review: ["#7357a7", "#eee7f7"], done: ["#2f7a4d", "#e2f1e7"], ready: ["#3c6f8f", "#e4edf2"], planned: ["#8c8d86", "#ecece8"], danger: ["#a83232", "#f6e3e3"],
};

type NodeId = "approve_scope" | "api" | "ui" | "tests" | "review" | "approve_patch" | "integrate";
type Status = "planned" | "waiting" | "running" | "done" | "requeued";
type Frame = {
  nodes: Partial<Record<NodeId, Status>>;
  agents?: Partial<Record<string, string>>;
  worktrees?: number;
  deliveries?: Partial<Record<string, number>>; // 0..4 stages lit
  message?: { from: string; text: string; to: string; tone?: "danger" };
};

const NODES: { id: NodeId; title: string; type: string; col: number; row: number; deps: NodeId[]; task?: string }[] = [
  { id: "approve_scope", title: "Approve scope", type: "approval gate", col: 0, row: 1, deps: [] },
  { id: "api", title: "Export endpoint", type: "worker task", col: 1, row: 0, deps: ["approve_scope"], task: "T0412" },
  { id: "ui", title: "Export button", type: "worker task", col: 1, row: 1, deps: ["approve_scope"], task: "T0413" },
  { id: "tests", title: "Fixture + e2e test", type: "worker task", col: 1, row: 2, deps: ["approve_scope"], task: "T0414" },
  { id: "review", title: "Independent review", type: "review", col: 2, row: 1, deps: ["api", "ui", "tests"] },
  { id: "approve_patch", title: "Approve patch", type: "approval gate", col: 3, row: 1, deps: ["review"] },
  { id: "integrate", title: "Integrate & validate", type: "integration", col: 4, row: 1, deps: ["approve_patch"] },
];

const AGENTS = [
  { id: "manager", label: "Manager", role: "Owns the plan, delegation, review, and integration" },
  { id: "w1", label: "Worker 1 · codex", role: "Export endpoint" },
  { id: "w2", label: "Worker 2 · claude", role: "Export button" },
  { id: "w3", label: "Worker 3 · codex", role: "Fixture + e2e test" },
  { id: "rev", label: "Reviewer · claude", role: "Reads the combined patch cold" },
];
const BRANCHES = ["worker · reports-app — agent/export-endpoint", "worker · reports-app — agent/export-button", "worker · reports-app — agent/export-tests", "integration · reports-app — integrate/csv-export"];
const DELIVERY_STAGES = ["submitted", "accepted", "integrated", "validated"];

// Phase 1 runs after "Approve & start"; phase 2 after "Approve checkpoint".
const PHASE1: Frame[] = [
  { nodes: { approve_scope: "done" }, agents: { manager: "running" }, message: { from: "manager", to: "room", text: "Plan approved. Starting three worker lanes: endpoint, button, and tests. Review starts when all three are accepted." } },
  { nodes: { api: "running", ui: "running" }, agents: { w1: "running", w2: "running" }, worktrees: 2 },
  { nodes: { tests: "running" }, agents: { w3: "running" }, worktrees: 3 },
  { nodes: { ui: "requeued" }, agents: { w2: "requeued · attempt 2" }, message: { from: "runtime", to: "manager", tone: "danger", text: "Worker 2 lease expired after 45 s with no heartbeat. Job requeued as attempt 2; saved patch kept." } },
  { nodes: { ui: "running" }, agents: { w2: "running" }, deliveries: { api: 1 }, message: { from: "worker 1", to: "manager", text: "Submitted export endpoint. Streams rows, respects the current filters, 6 tests passing." } },
  { nodes: { api: "done" }, agents: { w1: "done" }, deliveries: { api: 2, tests: 1 } },
  { nodes: { tests: "done" }, agents: { w3: "done" }, deliveries: { tests: 2, ui: 1 }, message: { from: "worker 2", to: "manager", text: "Attempt 2 picked up from the saved patch. Button wired to the endpoint, disabled while exporting." } },
  { nodes: { ui: "done", review: "running" }, agents: { w2: "done", rev: "running" }, deliveries: { ui: 2 } },
  { nodes: { review: "done", approve_patch: "waiting" }, agents: { rev: "done", manager: "waiting approval" }, worktrees: 4, message: { from: "reviewer", to: "manager", text: "Two notes, both fixed: the filename wasn't escaped, and an empty export returned 500 instead of a header-only CSV. Patch a3f9c1 is ready." } },
];
const PHASE2: Frame[] = [
  { nodes: { approve_patch: "done", integrate: "running" }, agents: { manager: "running" }, message: { from: "manager", to: "room", text: "Approval matches patch a3f9c1. Integrating into the integration worktree; your checkout is untouched." } },
  { nodes: {}, deliveries: { api: 3, ui: 3, tests: 3 } },
  { nodes: { integrate: "done" }, agents: { manager: "done" }, deliveries: { api: 4, ui: 4, tests: 4 }, message: { from: "manager", to: "room", text: "Validated: typecheck, unit tests and the e2e export test pass on the integrated branch." } },
];

function apply(frames: Frame[], upto: number, base: State): State {
  const s: State = { ...base, nodes: { ...base.nodes }, agents: { ...base.agents }, deliveries: { ...base.deliveries }, messages: [...base.messages] };
  frames.slice(0, upto).forEach(f => {
    Object.assign(s.nodes, f.nodes);
    Object.assign(s.agents, f.agents || {});
    Object.assign(s.deliveries, f.deliveries || {});
    if (f.worktrees) s.worktrees = f.worktrees;
    if (f.message) s.messages.push(f.message);
  });
  return s;
}
type State = { nodes: Partial<Record<NodeId, Status>>; agents: Partial<Record<string, string>>; worktrees: number; deliveries: Partial<Record<string, number>>; messages: Frame["message"][] };
const INITIAL: State = {
  nodes: { approve_scope: "waiting" },
  agents: { manager: "waiting approval" },
  worktrees: 0,
  deliveries: {},
  messages: [{ from: "you", to: "manager", text: "Add CSV export to the reports page. Keep the current filters, and don't touch the auth middleware." }, { from: "manager", to: "you", text: "Plan v1 is ready: three parallel lanes, one review, then your approval of the combined patch." }],
};

const toneFor = (s?: string) => (!s || s === "planned" ? "planned" : s === "done" ? "done" : s.startsWith("waiting") ? "review" : s.startsWith("requeued") ? "danger" : "running");

function Pill({ status }: { status?: string }) {
  const [fg, bg] = TONE[toneFor(status)];
  return <b className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ color: fg, background: bg }}>{(status || "planned").replace(/_/g, " ")}</b>;
}
function Label({ children }: { children: ReactNode }) {
  return <span className="text-[10px] font-bold uppercase tracking-[.09em]" style={{ color: T.subtle }}>{children}</span>;
}
function Panel({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <article className="min-w-0 rounded-[14px] border p-3.5" style={{ background: T.surface, borderColor: T.border }}>
      <h4 className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold">{icon} {title}</h4>
      {children}
    </article>
  );
}

function Graph({ nodes, selected, onSelect }: { nodes: State["nodes"]; selected: NodeId | null; onSelect: (id: NodeId) => void }) {
  const CW = 168, RH = 64, NW = 140, NH = 42, X0 = 14, Y0 = 12;
  const p = (n: (typeof NODES)[number]) => ({ x: X0 + n.col * CW, y: Y0 + n.row * RH });
  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${X0 * 2 + 4 * CW + NW} ${Y0 * 2 + 2 * RH + NH}`} className="min-w-[760px]">
        {NODES.flatMap(n =>
          n.deps.map(d => {
            const a = p(NODES.find(x => x.id === d)!), b = p(n);
            const done = nodes[d] === "done";
            return <path key={`${d}-${n.id}`} d={`M${a.x + NW} ${a.y + NH / 2} C${a.x + NW + 30} ${a.y + NH / 2}, ${b.x - 30} ${b.y + NH / 2}, ${b.x} ${b.y + NH / 2}`} fill="none" stroke={done ? "#2f7a4d" : T.border} strokeWidth={1.6} />;
          })
        )}
        {NODES.map(n => {
          const st = nodes[n.id] || "planned";
          const [fg, bg] = TONE[toneFor(st)];
          const { x, y } = p(n);
          const gate = n.type === "approval gate";
          return (
            <g key={n.id} onClick={() => onSelect(n.id)} className="cursor-pointer" role="button" aria-label={`${n.title}: ${st}`}>
              <rect x={x} y={y} width={NW} height={NH} rx={gate ? 21 : 10} fill={st === "planned" ? T.surface : bg} stroke={selected === n.id ? T.accent : st === "planned" ? T.border : fg} strokeWidth={selected === n.id ? 2 : 1.2} />
              {st === "running" && <circle cx={x + 12} cy={y + NH / 2} r={3.5} fill={fg}><animate attributeName="opacity" values="1;.3;1" dur="1.2s" repeatCount="indefinite" /></circle>}
              <text x={x + (st === "running" ? 22 : 12)} y={y + 18} fontSize="11.5" fontWeight="600" fill={T.text}>{n.title}</text>
              <text x={x + (st === "running" ? 22 : 12)} y={y + 32} fontSize="10" fill={fg}>{st}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function AgentControlRoomDemo() {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<NodeId | null>("approve_scope");
  const [draft, setDraft] = useState("");
  const [extra, setExtra] = useState<Frame["message"][]>([]);

  const frames = phase === 2 ? PHASE2 : PHASE1;
  const running = phase > 0 && step < frames.length;
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setStep(s => s + 1), step === 0 ? 300 : 1100);
    return () => window.clearTimeout(id);
  }, [running, step]);

  const state = useMemo(() => {
    if (phase === 0) return INITIAL;
    if (phase === 1) return apply(PHASE1, step, INITIAL);
    return apply(PHASE2, step, apply(PHASE1, PHASE1.length, INITIAL));
  }, [phase, step]);

  const waitingPlan = phase === 0;
  const waitingPatch = phase === 1 && step >= PHASE1.length;
  const finished = phase === 2 && step >= PHASE2.length;
  const activeWorkers = ["w1", "w2", "w3", "rev"].filter(a => (state.agents[a] || "").startsWith("running")).length;
  const delivered = ["api", "ui", "tests"].filter(k => (state.deliveries[k] || 0) >= 4).length;

  const title = waitingPlan ? "Ready for your approval" : waitingPatch ? "A human checkpoint is waiting" : finished ? "All deliveries validated" : activeWorkers ? `${activeWorkers} worker${activeWorkers === 1 ? " is" : "s are"} active` : "Plan approved — starting workers";
  const detail = waitingPlan
    ? "Review the scope below. Approving starts the manager and all runnable worker lanes."
    : waitingPatch
      ? "The workflow reached a deliberate gate. Approval applies to patch a3f9c1 only; any newer revision needs its own approval."
      : finished
        ? "The integrated branch passed validation. Nothing merged without an approved patch."
        : "The manager is coordinating parallel work. Worktrees and delivery receipts appear as each worker progresses.";
  const effortStatus = finished ? "done" : waitingPlan || waitingPatch ? "waiting_approval" : "running";

  const approve = () => {
    setStep(0);
    setPhase(waitingPlan ? 1 : 2);
  };
  const reset = () => {
    setPhase(0);
    setStep(0);
    setExtra([]);
    setSelected("approve_scope");
  };
  const sel = NODES.find(n => n.id === selected);
  const messages = [...state.messages, ...extra];

  return (
    <div className="font-[system-ui,-apple-system,'Segoe_UI',Roboto,sans-serif]" style={{ color: T.text }}>
      <section aria-label="Agent control room" className="space-y-3.5 rounded-xl border p-4 shadow-xl md:p-5" style={{ background: T.bg, borderColor: T.border }}>
        <header className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <Label>Live orchestration</Label>
            <h3 className="flex items-center gap-1.5 text-[16px] font-semibold"><Workflow className="h-[18px] w-[18px]" /> Agent control room</h3>
          </div>
          <div className="flex items-center gap-2">
            {phase > 0 && <button type="button" onClick={reset} className="flex items-center gap-1 rounded-lg px-2 py-1 text-[12px] hover:bg-[#ecece8]" style={{ color: T.muted }}><RotateCcw className="h-3.5 w-3.5" /> Reset</button>}
            <Pill status={effortStatus} />
          </div>
        </header>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[10px] border p-3.5" style={{ background: T.surface, borderColor: T.border }}>
          <div className="min-w-0">
            <Label>Current state</Label>
            <p className="mt-0.5 text-[14px] font-semibold">{title}</p>
            <p className="text-[12px]" style={{ color: T.muted }}>{detail}</p>
            <p className="mt-1 flex items-center gap-2 text-[11px]" style={{ color: T.subtle }}>
              <span>Plan v1 · {waitingPlan ? "waiting_approval" : "approved"}</span>
              <code className="rounded px-1" style={{ background: T.soft }}>{waitingPatch || phase === 2 ? "patch a3f9c1e0b7d2" : "scope 9b2e07c41fa8"}</code>
            </p>
          </div>
          {(waitingPlan || waitingPatch) && (
            <button type="button" onClick={approve} className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12.5px] font-semibold text-white" style={{ background: T.accent }}>
              <ShieldCheck className="h-[15px] w-[15px]" /> {waitingPlan ? "Approve & start" : "Approve checkpoint"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            [waitingPlan ? "v1 · waiting" : "v1 · approved", "Plan"],
            [activeWorkers || "—", "Active workers"],
            [state.worktrees || "—", "Worktrees"],
            [`${delivered}/3`, "Deliveries complete"],
          ].map(([v, k]) => (
            <div key={k as string} className="rounded-[10px] border px-3 py-2" style={{ background: T.surface, borderColor: T.border }}>
              <strong className="block text-[14px] tabular-nums">{v}</strong>
              <span className="text-[11px]" style={{ color: T.muted }}>{k}</span>
            </div>
          ))}
        </div>

        <section className="rounded-[14px] border p-3.5" style={{ background: T.surface, borderColor: T.border }}>
          <div className="mb-1 flex flex-wrap items-end justify-between gap-2">
            <div><Label>Dependency map</Label><h4 className="text-[13px] font-semibold">Workflow</h4></div>
            <div className="flex gap-1.5 text-[10px] font-bold">
              {([["running", "Active"], ["done", "Done"], ["planned", "Planned"], ["danger", "Blocked"]] as const).map(([t, l]) => (
                <span key={t} className="rounded-full px-2 py-0.5" style={{ color: TONE[t][0], background: TONE[t][1] }}>{l}</span>
              ))}
            </div>
          </div>
          <Graph nodes={state.nodes} selected={selected} onSelect={setSelected} />
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg px-3 py-2 text-[12px]" style={{ background: T.bg }}>
            {sel ? (
              <>
                <span><Label>Selected step</Label> <strong className="ml-1">{sel.title}</strong></span>
                <Pill status={state.nodes[sel.id] || "planned"} />
                <span style={{ color: T.muted }}>{sel.type}</span>
                {sel.task && <code className="text-[11px]" style={{ color: T.muted }}>{sel.task}</code>}
                <small style={{ color: T.subtle }}>{sel.deps.length ? `After ${sel.deps.map(d => NODES.find(n => n.id === d)!.title).join(", ")}` : "Starts when the plan is approved"}</small>
              </>
            ) : (
              <span style={{ color: T.muted }}>Click any node to inspect its status, task, and dependencies.</span>
            )}
          </div>
        </section>

        <div className="grid gap-3.5 md:grid-cols-2">
          <div className="space-y-3.5">
            <Panel icon={<Users className="h-[15px] w-[15px]" />} title="Team">
              <div className="space-y-1.5">
                {AGENTS.filter(a => a.id === "manager" || state.agents[a.id]).map(a => (
                  <div key={a.id} className="grid grid-cols-[1fr_auto] items-center gap-x-2 text-[12px]">
                    <span className="font-medium">{a.label}</span>
                    <Pill status={state.agents[a.id]} />
                    <small className="col-span-2" style={{ color: T.subtle }}>{a.role}</small>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel icon={<GitBranch className="h-[15px] w-[15px]" />} title="Worktrees & integration">
              {state.worktrees === 0 ? (
                <p className="text-[12px]" style={{ color: T.subtle }}>Worker worktrees appear here as soon as assignments begin.</p>
              ) : (
                <div className="space-y-1">
                  {BRANCHES.slice(0, state.worktrees).map(b => {
                    const [kind, branch] = b.split(" — ");
                    return (
                      <div key={b} className="text-[12px]">
                        <span>{kind}</span> <code className="ml-1 text-[11px]" style={{ color: T.muted }}>{branch}</code>
                      </div>
                    );
                  })}
                </div>
              )}
            </Panel>
            <Panel icon={<CheckCircle2 className="h-[15px] w-[15px]" />} title="Delivery states">
              <div className="space-y-1.5">
                {(["api", "ui", "tests"] as const).map(k => (
                  <div key={k} className="flex flex-wrap items-center gap-1.5 text-[12px]">
                    <span className="w-28 shrink-0">{NODES.find(n => n.id === k)!.title}</span>
                    {DELIVERY_STAGES.map((d, i) => {
                      const on = (state.deliveries[k] || 0) > i;
                      return <span key={d} className="rounded-full px-1.5 py-px text-[10px] font-bold" style={on ? { color: TONE.done[0], background: TONE.done[1] } : { color: T.subtle, background: T.soft }}>{d}</span>;
                    })}
                  </div>
                ))}
              </div>
            </Panel>
          </div>
          <Panel icon={<MessageSquare className="h-[15px] w-[15px]" />} title="Agent room">
            <ul className="max-h-[360px] space-y-2 overflow-y-auto pr-1">
              {messages.map((m, i) => m && (
                <li key={i} className="rounded-lg border px-2.5 py-2 text-[12px]" style={{ borderColor: m.tone === "danger" ? "#ecc9c9" : T.border, background: m.from === "you" ? T.soft : T.surface } as CSSProperties}>
                  <p className="flex justify-between text-[10.5px]" style={{ color: m.tone === "danger" ? TONE.danger[0] : T.subtle }}>
                    <b>{m.from}</b><span>@{m.to} · delivered</span>
                  </p>
                  <p className="mt-0.5 leading-[1.45]">{m.text}</p>
                </li>
              ))}
            </ul>
            <form
              className="mt-2 flex gap-1.5"
              onSubmit={e => {
                e.preventDefault();
                if (!draft.trim()) return;
                setExtra(x => [...x, { from: "you", to: "manager", text: draft.trim() }, { from: "manager", to: "you", text: "Noted. (This demo's manager is scripted, so it won't change the plan.)" }]);
                setDraft("");
              }}
            >
              <input value={draft} onChange={e => setDraft(e.target.value)} placeholder="Message @manager or the room…" aria-label="Message the room" className="min-w-0 flex-1 rounded-lg border px-2.5 py-1.5 text-[12px] outline-none focus:border-[#171716]" style={{ borderColor: T.border }} />
              <button type="submit" className="rounded-lg px-3 text-[12px] font-semibold text-white" style={{ background: T.accent }}>Send</button>
            </form>
          </Panel>
        </div>
      </section>
    </div>
  );
}
