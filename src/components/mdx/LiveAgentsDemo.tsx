"use client";

import { Bot, Info, LayoutList, RefreshCw, Table2 } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

// Invented agents, hosts and campaigns. Columns, state colors and copy follow the real
// Live Agents screen (compact view). Incident numbers come from the staging reproduction
// in the September 1 root-cause report.

type Cti = "READY" | "TALKING" | "WRAP" | "NOT_READY" | "IDLE";
type Agent = {
  id: string;
  name: string;
  campaign: string;
  cti: Cti;
  since: number; // seconds since last telephony event
  health: "healthy" | "warning";
  startup: "done" | "sip_failed";
};

const CTI_TONE: Record<Cti, string> = {
  READY: "text-green-700",
  TALKING: "text-purple-700",
  WRAP: "text-orange-600",
  NOT_READY: "text-red-600",
  IDLE: "text-blue-600",
};
const EVENT_FOR: Record<Cti, string> = {
  READY: "AGENT_READY",
  TALKING: "CALL_ESTABLISHED",
  WRAP: "CALL_CLEARED",
  NOT_READY: "AGENT_NOT_READY",
  IDLE: "AGENT_IDLE",
};
const NEXT: Record<Cti, Cti> = { READY: "TALKING", TALKING: "WRAP", WRAP: "READY", IDLE: "READY", NOT_READY: "NOT_READY" };

const START: Agent[] = [
  { id: "1101", name: "card-ob-01", campaign: "card-early-stage", cti: "TALKING", since: 41, health: "healthy", startup: "done" },
  { id: "1102", name: "card-ob-02", campaign: "card-early-stage", cti: "READY", since: 6, health: "healthy", startup: "done" },
  { id: "1103", name: "card-ob-03", campaign: "card-early-stage", cti: "WRAP", since: 12, health: "healthy", startup: "done" },
  { id: "1104", name: "card-ob-04", campaign: "card-early-stage", cti: "TALKING", since: 73, health: "healthy", startup: "done" },
  { id: "1105", name: "card-ob-05", campaign: "card-early-stage", cti: "READY", since: 2, health: "healthy", startup: "done" },
  { id: "2101", name: "auto-ob-01", campaign: "auto-early-stage", cti: "TALKING", since: 19, health: "healthy", startup: "done" },
  { id: "2102", name: "auto-ob-02", campaign: "auto-early-stage", cti: "IDLE", since: 33, health: "healthy", startup: "done" },
  { id: "2103", name: "auto-ob-03", campaign: "auto-early-stage", cti: "NOT_READY", since: 512, health: "warning", startup: "sip_failed" },
];

// Staging reproduction: p95 per poll burst at 5/10/20/30/50 concurrent viewers.
const BEFORE = [1.288, 1.738, 3.032, 3.108, 4.402];
const AFTER = [0.16, 0.21, 0.269, 0.222, 0.291];
const VIEWERS = [5, 10, 20, 30, 50];

type Phase = "normal" | "replay" | "down" | "fixing" | "fixed";

const fmt = (s: number) => (s < 3600 ? `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}` : `${Math.floor(s / 3600)} hours ago`);

export function LiveAgentsDemo() {
  const reduce = useReducedMotion();
  const [agents, setAgents] = useState(START);
  const [phase, setPhase] = useState<Phase>("normal");
  const [step, setStep] = useState(-1);
  const [polling, setPolling] = useState(false);
  const timers = useRef<number[]>([]);

  // Live fleet: clocks tick and agents move through calls, unless the page is down.
  useEffect(() => {
    if (reduce || phase === "down") return;
    let n = 0;
    const id = window.setInterval(() => {
      n++;
      setAgents(prev =>
        prev.map((a, i) => {
          if (a.health === "warning") return { ...a, since: a.since + 1 };
          const due = (n + i * 3) % 9 === 0;
          return due ? { ...a, cti: NEXT[a.cti], since: 0 } : { ...a, since: a.since + 1 };
        }),
      );
      if (n % 5 === 0) {
        setPolling(true);
        window.setTimeout(() => setPolling(false), 600);
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [reduce, phase]);

  useEffect(() => () => timers.current.forEach(t => window.clearTimeout(t)), []);

  const run = (series: "before" | "after") => {
    timers.current.forEach(t => window.clearTimeout(t));
    timers.current = [];
    setStep(-1);
    const delay = reduce ? 0 : 900;
    setPhase(series === "before" ? "replay" : "fixing");
    VIEWERS.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setStep(i), delay * (i + 1)));
    });
    timers.current.push(
      window.setTimeout(() => setPhase(series === "before" ? "down" : "fixed"), delay * (VIEWERS.length + 1)),
    );
  };

  const reset = () => {
    timers.current.forEach(t => window.clearTimeout(t));
    timers.current = [];
    setPolling(false);
    setAgents(START);
    setPhase("normal");
    setStep(-1);
  };

  const series = phase === "fixing" || phase === "fixed" ? AFTER : BEFORE;
  const payload = phase === "fixing" || phase === "fixed" ? "38 KB" : "2.5 MB";
  const needsHelp = agents.filter(a => a.health === "warning").length;

  const status = useMemo(() => {
    if (phase === "normal") return "Each poll returns every agent's row, full event history included. Fine while only a few people watch.";
    if (phase === "replay") return "More people open the page. Every poll carries each agent's full event history.";
    if (phase === "down") return "A year into production, polls piled up and requests timed out (503s and 504s). The table couldn't load.";
    if (phase === "fixing") return "Same load, but the poll no longer sends event history.";
    return "Fixed. Event history stays out of the poll; it's still there on each agent's detail page.";
  }, [phase]);

  return (
    <div className="font-sans text-gray-900">
      <div className="relative overflow-hidden rounded-xl border border-gray-300 bg-gray-100 shadow-xl">
        <div className="flex min-h-[520px]">
          <aside className="hidden w-44 shrink-0 border-r border-gray-200 bg-white p-3 text-xs text-gray-600 md:block">
            <div className="mb-4 h-6 w-20 rounded bg-gray-200" aria-hidden />
            <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">AI Agent</p>
            <div className="flex items-center gap-2 rounded-md bg-blue-50 px-2 py-1.5 font-medium text-blue-700">
              <Bot className="h-3.5 w-3.5" aria-hidden /> Live Agents
            </div>
            <div className="mt-1 px-2 py-1.5">Campaigns</div>
            <div className="px-2 py-1.5">Model Evaluations</div>
            <div className="px-2 py-1.5">Call Review</div>
          </aside>

          <div className="min-w-0 flex-1 bg-gray-50 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">AI Agents</h2>
                <p className="text-xs text-gray-500">Manage and monitor your AI agents</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <RefreshCw className={`h-4 w-4 ${polling && phase !== "down" && !reduce ? "animate-spin" : ""}`} aria-hidden />
                <span>Auto-refresh:</span>
                <span className="rounded-md border border-gray-300 bg-white px-2 py-1">5 seconds</span>
                <span className="ml-1 inline-flex overflow-hidden rounded-md border border-gray-300 bg-white" aria-hidden>
                  <span className="px-1.5 py-1 text-gray-400"><Table2 className="h-3.5 w-3.5" /></span>
                  <span className="bg-gray-100 px-1.5 py-1"><LayoutList className="h-3.5 w-3.5" /></span>
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-600">
              <span>{agents.length} of {agents.length} agents</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-red-500" />0 manually stopped</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500" />{needsHelp} needs manual intervention</span>
            </div>

            <div className="mt-3 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
              {phase === "down" ? (
                <div className="flex h-[300px] items-center justify-center text-sm text-gray-600">
                  Failed to load agents. Please try again.
                </div>
              ) : (
                <table className="w-full min-w-[720px] text-left text-xs">
                  <thead className="border-b border-gray-200 bg-gray-50 text-gray-700">
                    <tr>
                      {["Agent ID", "Vanity Name", "Campaign ID", "Telephony Event", "CTI Agent State", "Time Since Event", "Agent Startup"].map(h => (
                        <th key={h} className="whitespace-nowrap px-3 py-2 font-medium">
                          <span className="inline-flex items-center gap-1">{h}<Info className="h-3 w-3 text-gray-400" aria-hidden /></span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map(a => (
                      <tr key={a.id} className="border-b border-gray-100 last:border-0">
                        <td className="px-3 py-2">
                          <span className={`inline-flex rounded-full border px-2 py-0.5 font-mono font-semibold ${a.health === "healthy" ? "border-green-300 bg-green-50 text-green-700" : "border-amber-300 bg-amber-50 text-amber-700"}`}>{a.id}</span>
                        </td>
                        <td className="px-3 py-2">{a.name}</td>
                        <td className="whitespace-nowrap px-3 py-2 font-mono text-blue-600">{a.campaign}</td>
                        <td className="px-3 py-2 font-mono text-[11px] text-gray-600">{EVENT_FOR[a.cti]}</td>
                        <td className={`px-3 py-2 font-mono font-semibold ${CTI_TONE[a.cti]}`}>{a.cti}</td>
                        <td className="px-3 py-2"><span className="rounded bg-gray-100 px-1.5 py-0.5 font-mono tabular-nums text-gray-700">{fmt(a.since)}</span></td>
                        <td className="px-3 py-2">
                          {a.startup === "done" ? (
                            <span className="inline-flex gap-1" aria-label="Phone system and dialer login complete">
                              <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] text-green-700">Phone/SIP</span>
                              <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] text-green-700">Dialer Login</span>
                            </span>
                          ) : (
                            <span className="flex flex-col gap-0.5">
                              <span className="inline-flex items-center gap-1.5 text-red-600"><span className="h-2 w-2 rounded-full bg-red-500" />SIP Registration Failed</span>
                              <span className="text-[10px] text-amber-700">Needs manual intervention</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <section aria-label="September 1, 2026 incident replay" className="mt-4 rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold text-gray-900">Each poll: <span className="font-mono">{payload}</span></p>
                  <p className="text-xs text-gray-600" aria-live="polite">{status}</p>
                </div>
                <div className="flex gap-2">
                  {(phase === "normal") && (
                    <button type="button" onClick={() => run("before")} className="rounded-md bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Replay Sept 1, 2026</button>
                  )}
                  {phase === "down" && (
                    <button type="button" onClick={() => run("after")} className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Ship the fix</button>
                  )}
                  {(phase === "fixed" || phase === "down") && (
                    <button type="button" onClick={reset} className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Reset</button>
                  )}
                </div>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2" role="img" aria-label="Slowest-5% poll time by number of people watching">
                {VIEWERS.map((v, i) => {
                  const shown = phase !== "normal" && i <= step;
                  const s = series[i];
                  const pct = Math.min(100, (s / 4.5) * 100);
                  const bad = s > 2;
                  return (
                    <div key={v} className="flex flex-col items-center gap-1">
                      <div className="flex h-16 w-full items-end rounded bg-gray-100">
                        <div className={`w-full rounded ${bad ? "bg-red-400" : "bg-green-400"} ${reduce ? "" : "transition-all duration-500"}`} style={{ height: shown ? `${Math.max(pct, 4)}%` : "0%" }} />
                      </div>
                      <span className="font-mono text-[11px] tabular-nums text-gray-700">{shown ? `${s.toFixed(2)} s` : "—"}</span>
                      <span className="text-[10px] text-gray-500">{v} watching</span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-2 text-[10px] text-gray-500">Bars: slowest 5% of polls, from the staging reproduction (2,514,826 bytes per poll before, 38,100 after).</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
