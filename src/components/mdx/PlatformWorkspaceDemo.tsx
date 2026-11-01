"use client";

import { useMemo, useState, type FormEvent } from "react";

type ContactRow = {
  reason: string;
  team: string;
  previous: { contacts: number; repeats: number };
  current: { contacts: number; repeats: number };
};

const CONTACTS: ContactRow[] = [
  {
    reason: "Billing",
    team: "Account care",
    previous: { contacts: 1200, repeats: 180 },
    current: { contacts: 1500, repeats: 330 },
  },
  {
    reason: "Setup help",
    team: "Frontline",
    previous: { contacts: 900, repeats: 90 },
    current: { contacts: 1000, repeats: 130 },
  },
  {
    reason: "Order status",
    team: "Frontline",
    previous: { contacts: 800, repeats: 72 },
    current: { contacts: 780, repeats: 78 },
  },
];

type Evidence = {
  id: string;
  reason: string;
  team: string;
  excerpt: string;
  finding: string;
};

const EVIDENCE: Evidence[] = [
  {
    id: "billing-1",
    reason: "Billing",
    team: "Account care",
    excerpt:
      "“I called yesterday about the credit. Could you check whether it has appeared?”",
    finding: "A second contact inside the seven-day repeat window.",
  },
  {
    id: "billing-2",
    reason: "Billing",
    team: "Account care",
    excerpt:
      "“The payment is showing twice, so I’m following up on the earlier case.”",
    finding: "A repeat billing contact linked to the same issue.",
  },
  {
    id: "setup-1",
    reason: "Setup help",
    team: "Frontline",
    excerpt:
      "“I’m back because the activation step still stops at the same screen.”",
    finding: "A repeat setup contact with the same unresolved reason.",
  },
  {
    id: "order-1",
    reason: "Order status",
    team: "Frontline",
    excerpt:
      "“I checked in this morning and still can’t see the delivery update.”",
    finding: "A second status check within the comparison window.",
  },
];

const control =
  "min-h-11 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:focus-visible:outline-blue-400";
const action =
  "min-h-11 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus-visible:outline-blue-300";

function percent(repeats: number, contacts: number) {
  return contacts ? (repeats / contacts) * 100 : 0;
}

function fmt(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function PlatformWorkspaceDemo() {
  const [question, setQuestion] = useState("Why are repeat contacts rising?");
  const [reason, setReason] = useState("All reasons");
  const [team, setTeam] = useState("All teams");
  const [selectedEvidence, setSelectedEvidence] = useState("billing-1");
  const [view, setView] = useState<"investigation" | "report">("investigation");
  const [reportBuilt, setReportBuilt] = useState(false);
  const [followUpNote, setFollowUpNote] = useState("");
  const [followUp, setFollowUp] = useState("");

  const rows = useMemo(
    () =>
      CONTACTS.filter(
        (row) =>
          (reason === "All reasons" || row.reason === reason) &&
          (team === "All teams" || row.team === team),
      ),
    [reason, team],
  );

  const totals = useMemo(
    () =>
      rows.reduce(
        (total, row) => ({
          previousContacts: total.previousContacts + row.previous.contacts,
          previousRepeats: total.previousRepeats + row.previous.repeats,
          currentContacts: total.currentContacts + row.current.contacts,
          currentRepeats: total.currentRepeats + row.current.repeats,
        }),
        {
          previousContacts: 0,
          previousRepeats: 0,
          currentContacts: 0,
          currentRepeats: 0,
        },
      ),
    [rows],
  );

  const previousRate = percent(totals.previousRepeats, totals.previousContacts);
  const currentRate = percent(totals.currentRepeats, totals.currentContacts);
  const change = currentRate - previousRate;
  const largestIncrease = [...rows].sort(
    (a, b) =>
      b.current.repeats -
      b.previous.repeats -
      (a.current.repeats - a.previous.repeats),
  )[0];

  const matchingEvidence = EVIDENCE.filter(
    (item) =>
      (reason === "All reasons" || item.reason === reason) &&
      (team === "All teams" || item.team === team),
  );
  const activeEvidence =
    matchingEvidence.find((item) => item.id === selectedEvidence) ??
    matchingEvidence[0];
  const scopeLabel = [reason, team].filter((value) => !value.startsWith("All ")).join(" · ") || "All reasons · All teams";

  function chooseQuestion(nextQuestion: string, nextReason?: string, nextTeam?: string) {
    setQuestion(nextQuestion);
    setReportBuilt(false);
    setFollowUpNote("");
    if (nextReason) setReason(nextReason);
    if (nextTeam) setTeam(nextTeam);
    setView("investigation");
    setFollowUp("");
  }

  function buildReport() {
    if (!rows.length) return;
    setReportBuilt(true);
    setView("report");
  }

  function sendFollowUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!followUp.trim()) return;
    const request = followUp.trim().toLowerCase();
    if (request.includes("billing")) { setReason("Billing"); setQuestion("What is driving billing follow-ups?"); }
    else if (request.includes("frontline")) { setTeam("Frontline"); setQuestion("How did frontline repeat contacts change?"); }
    else if (request.includes("all reasons")) { setReason("All reasons"); setQuestion("How did repeat contacts change across all reasons?"); }
    else { setFollowUpNote("This local reconstruction supports billing, frontline, and all-reasons follow-ups. Choose a suggestion below; no live AI query was run."); return; }
    setFollowUpNote("Applied the follow-up. Existing period and other filters were retained.");
    setReportBuilt(false);
    setFollowUp("");
    setView("investigation");
  }

  return (
    <section
      aria-label="Synthetic analytics investigation workspace"
      className="my-8 overflow-hidden rounded-2xl border border-slate-300 bg-white text-slate-900 shadow-xl dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
    >
      <div className="flex min-h-12 items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-700 text-sm font-bold text-white dark:bg-blue-600">P</span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Platform Chat</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Example support workspace</p>
          </div>
        </div>
        <span className="rounded-full border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300">
          Example workspace
        </span>
      </div>

      <div className="grid min-h-[720px] lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="border-b border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between px-2 pb-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
              Investigations
            </h3>
            <span className="text-xs text-slate-600 dark:text-slate-400">3</span>
          </div>
          <div role="group" aria-label="Investigation threads" className="grid gap-1 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { title: "Repeat contacts", subtitle: "Today · 3 min", kind: "main" },
              { title: "Billing follow-ups", subtitle: "Yesterday · 6 min", kind: "billing" },
              { title: "Frontline comparison", subtitle: "Oct 28 · 4 min", kind: "frontline" },
            ].map((thread) => {
              const active =
                (thread.kind === "main" && reason === "All reasons" && team === "All teams") ||
                (thread.kind === "billing" && reason === "Billing") ||
                (thread.kind === "frontline" && team === "Frontline");
              return (
                <button
                  key={thread.kind}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    thread.kind === "main"
                      ? chooseQuestion("Why are repeat contacts rising?", "All reasons", "All teams")
                      : thread.kind === "billing"
                        ? chooseQuestion("What is driving billing follow-ups?", "Billing", "All teams")
                        : chooseQuestion("How do repeat rates compare across frontline reasons?", "All reasons", "Frontline")
                  }
                  className={`min-h-11 rounded-lg px-3 py-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400 ${active ? "bg-blue-100 text-blue-950 dark:bg-blue-950 dark:text-blue-100" : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}
                >
                  <span className="block break-words text-sm font-semibold">{thread.title}</span>
                  <span className="mt-0.5 block text-xs text-slate-600 dark:text-slate-400">{thread.subtitle}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
            Questions, results, and evidence stay together in each investigation.
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800 sm:px-6">
            <div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Investigation</p>
              <h2 className="text-lg font-bold">Repeat contacts</h2>
            </div>
            <div className="flex gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-900" role="group" aria-label="Investigation views">
              <button type="button" aria-pressed={view === "investigation"} onClick={() => setView("investigation")} className={`min-h-11 rounded-md px-3 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400 ${view === "investigation" ? "bg-white shadow-sm dark:bg-slate-800" : "text-slate-600 dark:text-slate-300"}`}>Investigation</button>
              <button type="button" aria-pressed={view === "report"} disabled={!reportBuilt} onClick={() => setView("report")} className={`min-h-11 rounded-md px-3 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-50 ${view === "report" ? "bg-white shadow-sm dark:bg-slate-800" : "text-slate-600 dark:text-slate-300"}`}>Report</button>
            </div>
          </div>

          <div className="grid gap-5 p-4 sm:p-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(260px,0.8fr)]">
            <div className="min-w-0">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-800 dark:text-blue-300">Question</p>
                <p className="mt-1 text-base font-semibold">{question}</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Scope: {scopeLabel} · Previous 30 days compared with current 30 days</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    { label: "Why are repeat contacts rising?", reason: "All reasons", team: "All teams" },
                    { label: "Look at frontline contacts", reason: "All reasons", team: "Frontline" },
                    { label: "Look at billing follow-ups", reason: "Billing", team: "All teams" },
                  ].map((preset) => (
                    <button key={preset.label} type="button" onClick={() => chooseQuestion(preset.label, preset.reason, preset.team)} className="min-h-11 rounded-full border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 hover:border-blue-500 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:text-blue-300 dark:focus-visible:outline-blue-400">
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <ol aria-label="Completed investigation steps" className="my-4 grid gap-2 sm:grid-cols-3">
                {[
                  ["Definition", "Repeat = another contact within 7 days"],
                  ["Comparison", "Same-length prior and current periods"],
                  ["Breakdown", "Contact reason and support team"],
                ].map(([label, detail]) => (
                  <li key={label} className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">
                    <span className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300"><span aria-hidden="true" className="grid size-5 place-items-center rounded-full bg-emerald-100 dark:bg-emerald-950">✓</span>{label} · complete</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-600 dark:text-slate-400">{detail}</span>
                  </li>
                ))}
              </ol>

              {view === "investigation" ? (
                <>
                  <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">Answer</p>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-800 dark:text-slate-200">
                          {rows.length ? <>Repeat-contact rate moved from <strong>{previousRate.toFixed(1)}%</strong> ({fmt(totals.previousRepeats)} of {fmt(totals.previousContacts)} contacts) to <strong>{currentRate.toFixed(1)}%</strong> ({fmt(totals.currentRepeats)} of {fmt(totals.currentContacts)}), a {change >= 0 ? "rise" : "drop"} of <strong>{Math.abs(change).toFixed(1)} percentage points</strong>.</> : <><strong>No records match this scope.</strong> Choose another reason or team. A missing population does not establish a zero repeat-contact rate.</>}
                        </p>
                        {largestIncrease && (
                          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            {largestIncrease.reason} has the largest increase in repeat count in this scope: {fmt(largestIncrease.current.repeats - largestIncrease.previous.repeats)} more repeat contacts.
                          </p>
                        )}
                      </div>
                      <span className="rounded-full border border-emerald-300 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-800 dark:text-emerald-300">{rows.length ? "Results ready" : "No matching records"}</span>
                    </div>

                    <div className="mt-5">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold">Repeat-contact rate by reason</h3>
                        <div className="flex gap-3 text-xs text-slate-600 dark:text-slate-400">
                          <span className="flex items-center gap-1.5"><i className="size-2.5 rounded-sm bg-slate-400" aria-hidden="true" />Previous</span>
                          <span className="flex items-center gap-1.5"><i className="size-2.5 rounded-sm bg-blue-600" aria-hidden="true" />Current</span>
                        </div>
                      </div>
                      <div className="mt-3 space-y-4">
                        {rows.map((row) => {
                          const previous = percent(row.previous.repeats, row.previous.contacts);
                          const current = percent(row.current.repeats, row.current.contacts);
                          const max = 30;
                          return (
                            <div key={row.reason} className="grid gap-1 sm:grid-cols-[110px_minmax(0,1fr)_78px] sm:items-center sm:gap-3">
                              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{row.reason}</span>
                              <div className="space-y-1.5" aria-label={`${row.reason}: previous ${previous.toFixed(1)} percent, current ${current.toFixed(1)} percent`}>
                                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-slate-400" style={{ width: `${Math.min(previous / max * 100, 100)}%` }} /></div>
                                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.min(current / max * 100, 100)}%` }} /></div>
                              </div>
                              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{previous.toFixed(1)}% → {current.toFixed(1)}%</span>
                            </div>
                          );
                        })}
                      </div>
                      <p className="mt-3 text-xs text-slate-600 dark:text-slate-400">Bars share a 0–30% scale. Rate = repeat contacts ÷ all contacts in the period.</p>
                    </div>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                      <div><h3 className="text-sm font-semibold">Result rows</h3><p className="text-xs text-slate-600 dark:text-slate-400">Computed from the same comparison</p></div>
                      <div className="flex flex-wrap gap-2">
                        <label className="sr-only" htmlFor="repeat-reason">Filter by reason</label>
                        <select id="repeat-reason" className={control} value={reason} onChange={(event) => { setReason(event.target.value); setReportBuilt(false); }}>
                          <option>All reasons</option><option>Billing</option><option>Setup help</option><option>Order status</option>
                        </select>
                        <label className="sr-only" htmlFor="repeat-team">Filter by team</label>
                        <select id="repeat-team" className={control} value={team} onChange={(event) => { setTeam(event.target.value); setReportBuilt(false); }}>
                          <option>All teams</option><option>Account care</option><option>Frontline</option>
                        </select>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <caption className="sr-only">Repeat contacts and total contacts in previous and current periods, with rate change</caption>
                        <thead className="bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                          <tr><th scope="col" className="px-3 py-2.5 font-semibold">Reason / team</th><th scope="col" className="px-3 py-2.5 font-semibold">Previous repeats / contacts</th><th scope="col" className="px-3 py-2.5 font-semibold">Current repeats / contacts</th><th scope="col" className="px-3 py-2.5 font-semibold">Rate change</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                          {rows.map((row) => {
                            const before = percent(row.previous.repeats, row.previous.contacts);
                            const after = percent(row.current.repeats, row.current.contacts);
                            return <tr key={row.reason}><th scope="row" className="px-3 py-3 font-medium">{row.reason}<span className="block font-normal text-slate-600 dark:text-slate-400">{row.team}</span></th><td className="px-3 py-3 tabular-nums">{fmt(row.previous.repeats)} / {fmt(row.previous.contacts)} <span className="text-slate-600 dark:text-slate-400">({before.toFixed(1)}%)</span></td><td className="px-3 py-3 tabular-nums">{fmt(row.current.repeats)} / {fmt(row.current.contacts)} <span className="text-slate-600 dark:text-slate-400">({after.toFixed(1)}%)</span></td><td className="px-3 py-3 font-semibold tabular-nums">{after - before >= 0 ? "+" : ""}{(after - before).toFixed(1)} pp</td></tr>;
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <form onSubmit={sendFollowUp} className="mt-4 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                    <label htmlFor="repeat-followup" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Ask a follow-up</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <input id="repeat-followup" className={`${control} min-w-0 flex-1`} value={followUp} onChange={(event) => setFollowUp(event.target.value)} placeholder="Try: show billing only" />
                      <button type="submit" className={action}>Ask</button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Supported follow-ups">{["Show billing only","Show frontline only","Show all reasons"].map(text=><button key={text} type="button" onClick={()=>setFollowUp(text)} className={`${control} text-xs`}>{text}</button>)}</div><p className="mt-2 text-xs text-slate-600 dark:text-slate-400" role="status">{followUpNote || "Supported local follow-ups retain the period and other filters."}</p>
                  </form>
                </>
              ) : (
                <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div><p className="text-xs font-semibold uppercase tracking-wide text-blue-800 dark:text-blue-300">Report</p><h3 className="mt-1 text-lg font-bold">Repeat contacts · period comparison</h3></div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">Ready to share</span>
                  </div>
                  <p className="mt-4 text-sm leading-6">For <strong>{scopeLabel}</strong>, repeat-contact rate changed from <strong>{previousRate.toFixed(1)}%</strong> ({fmt(totals.previousRepeats)} / {fmt(totals.previousContacts)}) to <strong>{currentRate.toFixed(1)}%</strong> ({fmt(totals.currentRepeats)} / {fmt(totals.currentContacts)}), a {change >= 0 ? "rise" : "drop"} of {Math.abs(change).toFixed(1)} percentage points.</p>
                  <div className="mt-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-900"><p className="text-xs font-semibold">Included in this report</p><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{rows.length} breakdown row(s) · {scopeLabel} · previous 30 days vs current 30 days.</p><p className="mt-2 text-xs text-slate-600 dark:text-slate-400">This report reuses the comparison shown in the investigation. It does not run another query.</p></div>
                  <button type="button" onClick={() => setView("investigation")} className={`${control} mt-4`}>Back to investigation</button>
                </div>
              )}
            </div>

            <aside aria-label="Supporting evidence" className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start justify-between gap-2">
                <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">Evidence</p><h3 className="mt-1 text-base font-bold">Why this result?</h3></div>
                <span className="rounded-full border border-slate-300 px-2 py-1 text-[11px] font-medium dark:border-slate-700">Scoped</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">The rate comes from aggregate contact counts. Examples below illustrate the coded repeat reasons; they do not determine the rate.</p>
              <div className="mt-3 grid gap-2" aria-label="Supporting conversation excerpts">
                {matchingEvidence.map((item, index) => (
                  <button key={item.id} type="button" aria-pressed={activeEvidence?.id === item.id} onClick={() => setSelectedEvidence(item.id)} className={`min-h-11 rounded-lg border p-3 text-left text-xs leading-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400 ${activeEvidence?.id === item.id ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-950" : "border-slate-200 bg-white hover:border-slate-400 dark:border-slate-700 dark:bg-slate-950"}`}>
                    <span className="block font-semibold">{item.reason} · {item.team}</span>
                    <span className="mt-1 block text-slate-600 dark:text-slate-400">Example conversation {index + 1}</span>
                  </button>
                ))}
              </div>
              {!activeEvidence && <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">No evidence examples match the selected reason and team.</p>}
              {activeEvidence && (
                <div aria-live="polite" className="mt-3 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950">
                  <p className="text-sm leading-6">{activeEvidence.excerpt}</p>
                  <p className="mt-2 text-xs font-medium text-blue-800 dark:text-blue-300">{activeEvidence.finding}</p>
                  <p className="mt-3 border-t border-slate-200 pt-2 text-xs leading-5 text-slate-600 dark:text-slate-400 dark:border-slate-800 dark:text-slate-400">Conversation evidence · {activeEvidence.reason} · {activeEvidence.team} · repeat window 7 days</p>
                </div>
              )}
              <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950">
                <h4 className="text-xs font-semibold">Result provenance</h4>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">Source: support contact summary<br />Measure: repeat contacts ÷ all contacts<br />Periods: prior 30 days and latest 30 days<br />Rows: {fmt(rows.length)} reason/team group(s)</p>
              </div>
            </aside>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
            <p className="text-xs text-slate-600 dark:text-slate-400">Fictional sample data · no live query</p>
            {view !== "report" && <button type="button" onClick={buildReport} disabled={!rows.length} className={`${action} disabled:cursor-not-allowed disabled:opacity-50`}>Build report from these results</button>}
          </div>
        </div>
      </div>
    </section>
  );
}

