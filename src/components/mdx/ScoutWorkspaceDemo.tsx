"use client";

import { useMemo, useState } from "react";

type CohortId = "all" | "address" | "cancel" | "payment" | "refund" | "routing";
type ReviewStatus = "candidate" | "supported" | "needs review";
type SourceDecision = "support" | "counterexample" | "unresolved";

type Conversation = {
  id: string;
  cohort: Exclude<CohortId, "all">;
  summary: string;
  flow: string;
  events: string[];
  turns: Array<{ speaker: string; text: string }>;
  quoteTurn: number;
  tool: string;
  source: string;
  coverage: "complete" | "partial";
};

type Cohort = {
  id: Exclude<CohortId, "all">;
  short: string;
  title: string;
  description: string;
  left: string;
  top: string;
  finding: string;
  pattern: string[];
  sourceTerms: string[];
};

const cohorts: Cohort[] = [
  {
    id: "address", short: "Address", title: "Address update and fulfillment",
    description: "Compare when a requested correction reaches fulfillment and which value appears afterward.",
    left: "17%", top: "24%", finding: "An address correction can be followed by fulfillment using the prior value.",
    pattern: ["address update saved", "dispatch handoff", "old address printed"], sourceTerms: ["old street", "previous apartment number"],
  },
  {
    id: "cancel", short: "Cancel", title: "Cancellation around dispatch",
    description: "Inspect whether a cancellation arrives before or after dispatch takes control of an order.",
    left: "68%", top: "18%", finding: "A cancellation after dispatch handoff can leave the earlier route active.",
    pattern: ["dispatch handoff", "cancel requested", "route remains active"], sourceTerms: ["active route", "handoff remains active"],
  },
  {
    id: "payment", short: "Payment", title: "Payment retry and capture",
    description: "Separate a repeated payment attempt from evidence of more than one captured payment.",
    left: "79%", top: "65%", finding: "A payment retry may be followed by more than one capture.",
    pattern: ["payment authorized", "retry requested", "second capture recorded"], sourceTerms: ["two capture events"],
  },
  {
    id: "refund", short: "Refund", title: "Refund questions and status",
    description: "Distinguish refund timing questions from an approved return that remains unpaid.",
    left: "43%", top: "73%", finding: "An approved return can remain pending after the expected refund step.",
    pattern: ["return approved", "refund due", "refund still pending"], sourceTerms: ["pending status after approval"],
  },
  {
    id: "routing", short: "Routing", title: "Route reassignment and manifest",
    description: "Compare route changes with the manifest state seen by the next fulfillment step.",
    left: "48%", top: "34%", finding: "A route reassignment can leave the original manifest unchanged.",
    pattern: ["route reassigned", "new route selected", "old manifest used"], sourceTerms: ["original manifest"],
  },
];

const conversations: Conversation[] = [
  { id: "CASE-101", cohort: "address", summary: "Correction saved before handoff; previous street appears on label", flow: "Correction → handoff → old value", events: ["address update saved", "dispatch handoff", "old address printed"], turns: [{ speaker: "Customer", text: "I corrected the street before the order moved to fulfillment." }, { speaker: "Support", text: "I can see the new street on the order." }, { speaker: "Tool result", text: "Fulfillment handoff completed." }, { speaker: "Customer", text: "The label still shows my old street." }], quoteTurn: 3, tool: "Fulfillment lookup · handoff complete · label value: previous street", source: "SOURCE-101 · action trace + conversation", coverage: "complete" },
  { id: "CASE-102", cohort: "address", summary: "Updated address precedes dispatch; printed value remains old", flow: "Correction → handoff → old value", events: ["address update saved", "dispatch handoff", "old address printed"], turns: [{ speaker: "Customer", text: "The new apartment number was confirmed yesterday." }, { speaker: "Tool result", text: "Address update accepted before release." }, { speaker: "Tool result", text: "Order released to fulfillment." }, { speaker: "Customer", text: "The shipping label has the previous apartment number." }], quoteTurn: 3, tool: "Label check · previous apartment number returned", source: "SOURCE-102 · action trace + conversation", coverage: "complete" },
  { id: "CASE-103", cohort: "address", summary: "Similar address wording; new value was used successfully", flow: "Correction → verify → handoff", events: ["address update saved", "address verified", "new address printed"], turns: [{ speaker: "Customer", text: "I changed the delivery address before checkout." }, { speaker: "Support", text: "The new address is saved." }, { speaker: "Tool result", text: "Label generated with the verified new address." }], quoteTurn: 0, tool: "Label check · verified new address returned", source: "SOURCE-103 · action trace + conversation", coverage: "complete" },
  { id: "CASE-104", cohort: "address", summary: "Correction and handoff recorded; final label value unavailable", flow: "Correction → handoff → value unknown", events: ["address update saved", "dispatch handoff"], turns: [{ speaker: "Customer", text: "I submitted a corrected address before dispatch." }, { speaker: "Tool result", text: "Fulfillment handoff completed." }, { speaker: "Support", text: "The saved label value is unavailable in this record." }], quoteTurn: 0, tool: "Label check · pending source record", source: "SOURCE-104 · action trace; label read pending", coverage: "partial" },

  { id: "CASE-201", cohort: "cancel", summary: "Cancellation accepted after dispatch handoff; route stays active", flow: "Handoff → cancel → route active", events: ["dispatch handoff", "cancel requested", "route remains active"], turns: [{ speaker: "Tool result", text: "Dispatch handoff completed." }, { speaker: "Customer", text: "Please cancel this order now." }, { speaker: "Support", text: "The cancellation request was recorded." }, { speaker: "Tool result", text: "The active dispatch route remains unchanged." }], quoteTurn: 1, tool: "Dispatch status · active route unchanged after cancellation", source: "SOURCE-201 · action trace + conversation", coverage: "complete" },
  { id: "CASE-202", cohort: "cancel", summary: "A late cancel leaves the parcel in the dispatched queue", flow: "Handoff → cancel → route active", events: ["dispatch handoff", "cancel requested", "route remains active"], turns: [{ speaker: "Tool result", text: "Parcel entered the carrier queue." }, { speaker: "Customer", text: "I need to stop the order I just placed." }, { speaker: "Tool result", text: "Cancellation saved; carrier handoff is still active." }], quoteTurn: 1, tool: "Carrier queue lookup · handoff remains active", source: "SOURCE-202 · action trace + conversation", coverage: "complete" },
  { id: "CASE-203", cohort: "cancel", summary: "Cancellation arrives before dispatch and stops the order", flow: "Cancel → dispatch check → stopped", events: ["cancel requested", "dispatch checked", "dispatch stopped"], turns: [{ speaker: "Customer", text: "Can you cancel this before it goes out?" }, { speaker: "Tool result", text: "Cancellation accepted before dispatch handoff." }, { speaker: "Support", text: "The order is stopped." }], quoteTurn: 0, tool: "Dispatch check · no handoff; order stopped", source: "SOURCE-203 · action trace + conversation", coverage: "complete" },

  { id: "CASE-301", cohort: "payment", summary: "Retry followed by a second captured payment", flow: "Authorize → retry → second capture", events: ["payment authorized", "retry requested", "second capture recorded"], turns: [{ speaker: "Customer", text: "The payment spinner froze, so I tried once more." }, { speaker: "Tool result", text: "First payment authorization completed." }, { speaker: "Tool result", text: "Retry completed; a second capture is present." }], quoteTurn: 0, tool: "Payment ledger · two capture events returned", source: "SOURCE-301 · payment action trace + conversation", coverage: "complete" },
  { id: "CASE-302", cohort: "payment", summary: "Retry completed with one capture in the ledger", flow: "Authorize → retry → one capture", events: ["payment authorized", "retry requested", "single capture confirmed"], turns: [{ speaker: "Customer", text: "I saw a payment error and submitted the order again." }, { speaker: "Tool result", text: "Retry completed; one capture is present." }, { speaker: "Support", text: "There is one completed payment for this order." }], quoteTurn: 0, tool: "Payment ledger · one capture event returned", source: "SOURCE-302 · payment action trace + conversation", coverage: "complete" },
  { id: "CASE-303", cohort: "payment", summary: "Customer says duplicate; source capture history is incomplete", flow: "Retry → capture history pending", events: ["retry requested", "capture history pending"], turns: [{ speaker: "Customer", text: "I think the retry charged me twice." }, { speaker: "Support", text: "I will check the capture history." }, { speaker: "Tool result", text: "Capture history is not available in this record." }], quoteTurn: 0, tool: "Payment ledger · source read pending", source: "SOURCE-303 · conversation; capture history pending", coverage: "partial" },

  { id: "CASE-401", cohort: "refund", summary: "Refund timing question; no approved return in source", flow: "Refund asked → return checked → not approved", events: ["refund timing asked", "return checked", "return not approved"], turns: [{ speaker: "Customer", text: "If the return is approved, when would the refund arrive?" }, { speaker: "Tool result", text: "Return has not been approved." }, { speaker: "Support", text: "No refund is due yet." }], quoteTurn: 0, tool: "Return status · approval not recorded", source: "SOURCE-401 · action trace + conversation", coverage: "complete" },
  { id: "CASE-402", cohort: "refund", summary: "Return approved; refund remains pending in ledger", flow: "Return approved → refund due → pending", events: ["return approved", "refund due", "refund still pending"], turns: [{ speaker: "Tool result", text: "Return approval recorded." }, { speaker: "Customer", text: "The return was approved last week, but I still do not see the refund." }, { speaker: "Tool result", text: "Refund remains pending." }], quoteTurn: 1, tool: "Refund ledger · pending status after approval", source: "SOURCE-402 · action trace + conversation", coverage: "complete" },
  { id: "CASE-403", cohort: "refund", summary: "Refund completed after return approval", flow: "Return approved → refund issued", events: ["return approved", "refund issued"], turns: [{ speaker: "Customer", text: "Can you confirm the refund from my approved return?" }, { speaker: "Tool result", text: "Refund issued to the original payment method." }], quoteTurn: 0, tool: "Refund ledger · issued", source: "SOURCE-403 · action trace + conversation", coverage: "complete" },

  { id: "CASE-501", cohort: "routing", summary: "New route selected; old manifest used at handoff", flow: "Reassign → new route → old manifest", events: ["route reassigned", "new route selected", "old manifest used"], turns: [{ speaker: "Tool result", text: "Road closure caused route reassignment." }, { speaker: "Support", text: "The new van is selected." }, { speaker: "Tool result", text: "Fulfillment read the original manifest." }], quoteTurn: 2, tool: "Manifest lookup · original route still listed", source: "SOURCE-501 · action trace + conversation", coverage: "complete" },
  { id: "CASE-502", cohort: "routing", summary: "New route and manifest both updated", flow: "Reassign → new route → new manifest", events: ["route reassigned", "new route selected", "new manifest used"], turns: [{ speaker: "Customer", text: "The road is closed; did my delivery move to another route?" }, { speaker: "Tool result", text: "New route selected and manifest refreshed." }, { speaker: "Support", text: "The updated route is ready." }], quoteTurn: 0, tool: "Manifest lookup · new route listed", source: "SOURCE-502 · action trace + conversation", coverage: "complete" },
  { id: "CASE-503", cohort: "routing", summary: "Customer asks about reassignment; no route change recorded", flow: "Route asked → status read → unchanged", events: ["route status asked", "route checked", "route unchanged"], turns: [{ speaker: "Customer", text: "Was my delivery route changed after the closure?" }, { speaker: "Tool result", text: "No route reassignment is recorded." }, { speaker: "Support", text: "Your current route remains the same." }], quoteTurn: 0, tool: "Route lookup · unchanged", source: "SOURCE-503 · action trace + conversation", coverage: "complete" },
];

function inCohort(item: Conversation, selected: CohortId) {
  return selected === "all" || item.cohort === selected;
}

function hasOrderedEvents(events: string[], required: string[]) {
  if (required.length === 0) return false;
  let cursor = 0;
  for (const event of events) {
    if (event === required[cursor]) cursor += 1;
    if (cursor === required.length) return true;
  }
  return false;
}

function hasSourceEvidence(item: Conversation, cohort: Cohort) {
  const quote = item.turns[item.quoteTurn]?.text.toLocaleLowerCase() ?? "";
  const tool = item.tool.toLocaleLowerCase();
  return item.source.length > 0 && item.coverage === "complete" && cohort.sourceTerms.some((term) => {
    const normalized = term.toLocaleLowerCase();
    return quote.includes(normalized) || tool.includes(normalized);
  });
}

function statusStyle(status: ReviewStatus) {
  if (status === "supported") return "border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100";
  if (status === "needs review") return "border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100";
  return "border-blue-300 bg-blue-50 text-blue-950 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100";
}

function CohortMap({ selected, onSelect }: { selected: CohortId; onSelect: (id: CohortId) => void }) {
  const counts = useMemo(() => Object.fromEntries(cohorts.map((cohort) => [cohort.id, conversations.filter((item) => item.cohort === cohort.id).length])), []);
  return <div className="relative h-64 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950" role="group" aria-label="Synthetic cohort map">
    <div className="absolute inset-0 opacity-50" aria-hidden="true"><svg viewBox="0 0 100 100" className="h-full w-full"><path d="M18 25 48 36 68 20 80 67 48 75 18 25M48 36 80 67" fill="none" stroke="currentColor" strokeDasharray="2 2" strokeWidth=".5" className="text-slate-400" /></svg></div>
    <p className="absolute left-3 top-3 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">Cohort map · select a group</p>
    {cohorts.map((cohort) => {
      const active = selected === cohort.id;
      const size = 42 + counts[cohort.id] * 3;
      return <button key={cohort.id} type="button" aria-pressed={active} aria-label={`${cohort.title}, ${counts[cohort.id]} synthetic conversations`} onClick={() => onSelect(cohort.id)} style={{ left: cohort.left, top: cohort.top, width: size, height: size }} className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 text-[10px] font-bold leading-tight shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${active ? "border-blue-700 bg-blue-600 text-white ring-4 ring-blue-200 dark:border-blue-300 dark:bg-blue-600 dark:ring-blue-900" : "border-slate-400 bg-white text-slate-800 hover:border-blue-600 hover:text-blue-800 dark:border-slate-500 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-400"}`}>
        {cohort.short}<span className="block text-[9px] font-medium">{counts[cohort.id]}</span>
      </button>;
    })}

    <span className="absolute bottom-3 left-3 text-[10px] text-slate-600 dark:text-slate-400">Position is an illustrative projection</span>
  </div>;
}

export function ScoutWorkspaceDemo() {
  const [cohortId, setCohortId] = useState<CohortId>("address");
  const [conversationId, setConversationId] = useState("CASE-101");
  const [candidate, setCandidate] = useState<{ cohort: CohortId; refs: string[]; status: ReviewStatus } | null>(null);
  const [sourceDecisions, setSourceDecisions] = useState<Record<string, SourceDecision>>({});
  const [fixtureChecksRun, setFixtureChecksRun] = useState(false);

  const selectedCohort = cohorts.find((item) => item.id === cohortId);
  const selectedCalls = conversations.filter((item) => inCohort(item, cohortId));
  const selectedConversation = selectedCalls.find((item) => item.id === conversationId) ?? selectedCalls[0];
  const routePatterns = useMemo(() => {
    const groups = new Map<string, { events: string[]; count: number }>();
    selectedCalls.forEach((item) => {
      const existing = groups.get(item.flow);
      if (existing) existing.count += 1;
      else groups.set(item.flow, { events: item.events, count: 1 });
    });
    return [...groups.entries()].sort((a, b) => b[1].count - a[1].count || a[0].localeCompare(b[0]));
  }, [selectedCalls]);

  const candidateCalls = candidate ? conversations.filter((item) => candidate.refs.includes(item.source)) : [];
  const candidateDefinition = candidate && candidate.cohort !== "all" ? cohorts.find((item) => item.id === candidate.cohort) : undefined;
  const fixtureResults = candidateCalls.map((item) => ({
    item,
    orderMatches: Boolean(candidateDefinition && hasOrderedEvents(item.events, candidateDefinition.pattern)),
    sourceMatches: Boolean(candidateDefinition && hasSourceEvidence(item, candidateDefinition)),
  }));
  const reviewedSupport = candidateCalls.filter((item) => sourceDecisions[item.source] === "support");
  const reviewedCounterexamples = candidateCalls.filter((item) => sourceDecisions[item.source] === "counterexample");
  const reviewedUnresolved = candidateCalls.filter((item) => sourceDecisions[item.source] === "unresolved");
  const sourceUnknown = candidateCalls.filter((item) => item.coverage === "partial");

  function selectCohort(id: CohortId) {
    setCohortId(id);
    const nextCalls = conversations.filter((item) => inCohort(item, id));
    setConversationId(nextCalls[0]?.id ?? "");
    setCandidate(null);
    setSourceDecisions({});
    setFixtureChecksRun(false);
  }

  function buildCandidate() {
    setCandidate({ cohort: cohortId, refs: selectedCalls.map((item) => item.source), status: "candidate" });
    setSourceDecisions({});
    setFixtureChecksRun(false);
  }

  function setDecision(item: Conversation, decision: SourceDecision) {
    const canSupport = fixtureChecksRun && fixtureResults.some((result) => result.item.id === item.id && result.orderMatches && result.sourceMatches);
    if (decision === "support" && !canSupport) return;
    setSourceDecisions((current) => ({ ...current, [item.source]: decision }));
    setCandidate((current) => current ? { ...current, status: "candidate" } : current);
  }

  function finalizeSourceReview() {
    if (!candidate || Object.keys(sourceDecisions).length === 0) return;
    const distinctCompleteSupport = new Set(reviewedSupport.filter((item) => {
      const fixture = fixtureResults.find((result) => result.item.id === item.id);
      return item.coverage === "complete" && fixture?.orderMatches && fixture?.sourceMatches;
    }).map((item) => item.source));
    setCandidate({ ...candidate, status: distinctCompleteSupport.size >= 2 ? "supported" : "needs review" });
  }

  const buttonBase = "min-h-11 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400";
  const buttonOn = "border-blue-700 bg-blue-600 text-white dark:border-blue-400 dark:bg-blue-600";
  const buttonOff = "border-slate-300 bg-white text-slate-800 hover:border-blue-500 hover:text-blue-800 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-400";

  return <section aria-labelledby="scout-workspace-title" className="my-8 space-y-5 overflow-hidden rounded-2xl border border-slate-300 bg-slate-50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
    <header className="flex flex-wrap items-start justify-between gap-3">
      <div><p className="text-xs font-bold uppercase tracking-widest text-blue-800 dark:text-blue-300">Scout · research workspace</p><h2 id="scout-workspace-title" className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Explore a behavior. Review its sources.</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300">Select a cohort, compare the routes inside it, then draft a finding with linked conversations and action evidence.</p></div>
      <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">Illustrative synthetic dataset · 16 calls</span>
    </header>

    <div className="grid gap-4 lg:grid-cols-[minmax(17rem,.82fr)_minmax(0,1.18fr)]">
      <div className="space-y-3">
        <div><h3 className="font-semibold text-slate-950 dark:text-white">1. Choose a cohort</h3><p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">The buttons and map select the same cohort. Counts below use this fixture&apos;s denominator.</p></div>
        <CohortMap selected={cohortId} onSelect={selectCohort} />
        <div className="flex flex-wrap gap-2" role="group" aria-label="Support cohorts"><button type="button" aria-pressed={cohortId === "all"} onClick={() => selectCohort("all")} className={`${buttonBase} ${cohortId === "all" ? buttonOn : buttonOff}`}>All fixture calls · 16</button>{cohorts.map((cohort) => <button key={cohort.id} type="button" aria-pressed={cohortId === cohort.id} onClick={() => selectCohort(cohort.id)} className={`${buttonBase} ${cohortId === cohort.id ? buttonOn : buttonOff}`}>{cohort.title}</button>)}</div>
      </div>
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950"><p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">Selected cohort</p><h3 className="mt-1 font-bold text-slate-950 dark:text-white">{cohortId === "all" ? "All fixture calls" : selectedCohort?.title}</h3><p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">{cohortId === "all" ? "Explore all observed route families." : selectedCohort?.description}</p><div className="mt-3 flex items-end gap-2"><strong className="text-3xl text-slate-950 dark:text-white">{selectedCalls.length}</strong><span className="pb-1 text-sm text-slate-600 dark:text-slate-300">of {conversations.length} fixture calls</span></div><p className="mt-1 text-[11px] leading-4 text-slate-600 dark:text-slate-400">Fixture coverage only. This is not a source-population rate.</p></div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950"><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="font-semibold text-slate-950 dark:text-white">2. Route patterns</h3><span className="text-xs text-slate-600 dark:text-slate-400">Computed from selected calls</span></div><div className="mt-3 space-y-3">{routePatterns.map(([flow, value]) => <div key={flow}><div className="flex items-baseline justify-between gap-2"><strong className="text-sm text-slate-800 dark:text-slate-200">{flow}</strong><span className="shrink-0 text-xs font-semibold text-slate-600 dark:text-slate-300">{value.count} {value.count === 1 ? "call" : "calls"}</span></div><div className="mt-1 flex flex-wrap items-center gap-1" aria-label={`Route sequence: ${value.events.join(" then ")}`}>{value.events.map((event, index) => <span key={`${event}-${index}`} className="inline-flex items-center gap-1"><span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">{event}</span>{index < value.events.length - 1 && <span className="text-xs text-slate-600 dark:text-slate-400" aria-hidden="true">→</span>}</span>)}</div></div>)}</div></div>
        </div>
      </div>
    </div>

    <div className="grid gap-4 border-t border-slate-200 pt-5 dark:border-slate-700 lg:grid-cols-[minmax(15rem,.72fr)_minmax(0,1.28fr)]">
      <div className="min-w-0"><div className="flex flex-wrap items-baseline justify-between gap-2"><div><h3 className="font-semibold text-slate-950 dark:text-white">3. Contributing conversations</h3><p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{selectedCalls.length} selected source records</p></div></div><div className="mt-3 space-y-2">{selectedCalls.map((item) => <button key={item.id} type="button" aria-pressed={selectedConversation?.id === item.id} onClick={() => setConversationId(item.id)} className={`min-h-11 w-full rounded-xl border p-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${selectedConversation?.id === item.id ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950" : "border-slate-200 bg-white hover:border-blue-400 dark:border-slate-700 dark:bg-slate-950"}`}><span className="flex flex-wrap items-center justify-between gap-1"><strong className="text-xs text-slate-900 dark:text-white">{item.id}</strong><span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">{item.coverage === "complete" ? "Source read complete" : "Source read partial"}</span></span><span className="mt-1 block break-words text-xs leading-5 text-slate-600 dark:text-slate-300">{item.summary}</span></button>)}</div></div>

      {selectedConversation && <article className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950" aria-live="polite"><div className="flex flex-wrap items-start justify-between gap-2"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">Source review · {selectedConversation.id}</p><h3 className="mt-1 font-semibold text-slate-950 dark:text-white">{selectedConversation.summary}</h3></div><span className={`rounded-md border px-2 py-1 text-[11px] font-semibold ${selectedConversation.coverage === "complete" ? "border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100" : "border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100"}`}>{selectedConversation.coverage === "complete" ? "Complete read" : "Partial read"}</span></div>
        <blockquote className="mt-3 rounded-lg border-l-4 border-blue-500 bg-slate-50 p-3 dark:bg-slate-900"><p className="text-[10px] font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">Exact source excerpt · turn {selectedConversation.quoteTurn + 1} · {selectedConversation.turns[selectedConversation.quoteTurn].speaker}</p><p className="mt-1 text-sm italic leading-6 text-slate-900 dark:text-slate-100">“{selectedConversation.turns[selectedConversation.quoteTurn].text}”</p></blockquote>
        <ol className="mt-3 space-y-2" aria-label={`Full conversation ${selectedConversation.id}`}>{selectedConversation.turns.map((turn, index) => <li key={`${index}-${turn.speaker}`} className="grid grid-cols-[6rem_minmax(0,1fr)] gap-2 text-sm"><span className="font-semibold text-slate-600 dark:text-slate-400">Turn {index + 1}<br />{turn.speaker}</span><span className="min-w-0 break-words leading-5 text-slate-800 dark:text-slate-200">{turn.text}</span></li>)}</ol>
        <div className="mt-4 rounded-lg border border-slate-200 p-3 dark:border-slate-700"><p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">Recorded action evidence</p><p className="mt-1 text-sm text-slate-800 dark:text-slate-200">{selectedConversation.tool}</p><p className="mt-1 break-all text-[11px] text-slate-600 dark:text-slate-400">{selectedConversation.source}</p><div className="mt-2 flex flex-wrap gap-1">{selectedConversation.events.map((event, index) => <span key={`${event}-${index}`} className="rounded bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">{index + 1}. {event}</span>)}</div></div>
      </article>}
    </div>

    <div className="grid gap-4 border-t border-slate-200 pt-5 dark:border-slate-700 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950"><div className="flex flex-wrap items-start justify-between gap-2"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">4. Discovery</p><h3 className="mt-1 font-semibold text-slate-950 dark:text-white">Draft a candidate finding</h3></div><span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-900 dark:bg-blue-950 dark:text-blue-200">Human review required</span></div><p className="mt-2 text-sm leading-5 text-slate-700 dark:text-slate-300">{cohortId === "all" ? "A shared behavior may be present across the reviewed set." : selectedCohort?.finding}</p><p className="mt-2 text-xs text-slate-600 dark:text-slate-400">Drafting links every source in this selection. It does not mark them as supporting.</p><button type="button" onClick={buildCandidate} className={`mt-4 ${buttonBase} ${buttonOn}`}>Build candidate with source refs</button></div>

<div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950" aria-live="polite"><div className="flex flex-wrap items-start justify-between gap-2"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">5. Source validation</p><h3 className="mt-1 font-semibold text-slate-950 dark:text-white">Review finding</h3></div>{candidate && <span className={`rounded-md border px-2 py-1 text-xs font-bold ${statusStyle(candidate.status)}`}>Status: {candidate.status}</span>}</div>
        {!candidate ? <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Build a candidate first. Its status will remain “candidate” until you record and finalize source decisions.</p> : <>
          <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">{candidate.cohort === "all" ? "A behavior may recur across the selected calls." : cohorts.find((item) => item.id === candidate.cohort)?.finding}</p>
          <div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => setFixtureChecksRun(true)} className={`${buttonBase} ${buttonOff}`}>Run fixture checks</button><span className="self-center text-xs text-slate-600 dark:text-slate-400">{candidate.refs.length} linked sources</span></div>
          <p className="mt-2 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-700 dark:bg-slate-900 dark:text-slate-300">Fixture checks are deterministic aids for event order, source completeness, and quote/tool clues. They do not make a human review decision. The illustrative support threshold below is a demo policy, not a research algorithm.</p>
          <div className="mt-3 space-y-3">{fixtureResults.map(({ item, orderMatches, sourceMatches }) => {
            const decision = sourceDecisions[item.source];
            const canSupport = fixtureChecksRun && orderMatches && sourceMatches && item.coverage === "complete";
            const fixtureLabel = item.coverage !== "complete" ? "Partial source" : !orderMatches ? "Order does not match" : sourceMatches ? "Order and source clue match" : "Source clue missing";
            return <article key={item.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <div className="flex flex-wrap items-start justify-between gap-2"><div><h4 className="text-sm font-semibold text-slate-950 dark:text-white">{item.id} · {item.summary}</h4><p className="mt-1 break-all text-[11px] text-slate-600 dark:text-slate-400">{item.source} · turn {item.quoteTurn + 1} · action trace</p></div><span className="rounded-md border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-700 dark:border-slate-600 dark:text-slate-200">Fixture aid: {fixtureChecksRun ? fixtureLabel : "not run"}</span></div>
              <details className="mt-2 rounded-lg bg-slate-50 p-3 dark:bg-slate-900"><summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 dark:text-blue-300">Open full source and recorded tool evidence</summary><blockquote className="border-l-2 border-blue-500 pl-3 text-sm text-slate-800 dark:text-slate-200"><span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Turn {item.quoteTurn + 1} · {item.turns[item.quoteTurn].speaker}</span><br />“{item.turns[item.quoteTurn].text}”</blockquote><ol className="mt-2 space-y-1">{item.turns.map((turn, index) => <li key={`${item.id}-${index}`} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-2 text-xs"><span className="font-semibold text-slate-600 dark:text-slate-400">Turn {index + 1} · {turn.speaker}</span><span className="break-words text-slate-700 dark:text-slate-200">{turn.text}</span></li>)}</ol><p className="mt-2 text-xs leading-5 text-slate-700 dark:text-slate-200">Recorded tool evidence: {item.tool}</p><p className="mt-1 break-all text-[10px] text-slate-600 dark:text-slate-400">{item.source}</p><p className="mt-1 text-[10px] text-slate-600 dark:text-slate-400">Ordered events: {item.events.join(" → ")}</p></details>
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={`Reviewer decision for ${item.id}`}><span className="self-center mr-1 text-xs font-semibold text-slate-700 dark:text-slate-300">Your source judgment:</span><button type="button" disabled={!canSupport} aria-pressed={decision === "support"} title={!canSupport ? fixtureChecksRun ? "Fixture checks do not show complete matching source evidence." : "Run fixture checks before marking support." : undefined} onClick={() => setDecision(item, "support")} className={`${buttonBase} ${decision === "support" ? buttonOn : buttonOff} disabled:cursor-not-allowed disabled:opacity-50`}>Support</button><button type="button" aria-pressed={decision === "counterexample"} onClick={() => setDecision(item, "counterexample")} className={`${buttonBase} ${decision === "counterexample" ? "border-amber-700 bg-amber-100 text-amber-950 dark:border-amber-400 dark:bg-amber-950 dark:text-amber-100" : buttonOff}`}>Counterexample</button><button type="button" aria-pressed={decision === "unresolved"} onClick={() => setDecision(item, "unresolved")} className={`${buttonBase} ${decision === "unresolved" ? "border-slate-700 bg-slate-200 text-slate-950 dark:border-slate-300 dark:bg-slate-700 dark:text-white" : buttonOff}`}>Unresolved</button><span className="self-center text-xs text-slate-600 dark:text-slate-400">Decision: {decision ?? "not reviewed"}</span></div>
            </article>;
          })}</div>
          <div className="mt-3 flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-700"><p className="mr-auto text-xs leading-5 text-slate-700 dark:text-slate-300">Reviewer decisions: {reviewedSupport.length} support · {reviewedCounterexamples.length} counterexample · {reviewedUnresolved.length} unresolved. Counterexamples remain visible but do not erase a supported example. Partial sources cannot count as support.</p><button type="button" disabled={Object.keys(sourceDecisions).length === 0} onClick={finalizeSourceReview} className={`${buttonBase} ${buttonOn} disabled:cursor-not-allowed disabled:opacity-50`}>Finalize source review</button></div>
          {candidate.status === "candidate" && <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">Status stays “candidate” until you make at least one source judgment and finalize the review.</p>}
          <div className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-700"><p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">6. Engineering handoff</p>{candidate.status === "candidate" && <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Waiting for a finalized human source review. No engineering action is proposed yet.</p>}{candidate.status === "supported" && <p className="mt-2 rounded-lg border border-blue-300 bg-blue-50 p-3 text-sm leading-5 text-blue-950 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100"><strong>Ready to discuss:</strong> the reviewer marked {reviewedSupport.length} complete matching source references as support. This supports an example pattern for investigation, not a shared root cause, population rate, or automatic workflow change.</p>}{candidate.status === "needs review" && <p className="mt-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm leading-5 text-amber-950 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100"><strong>Hold for review:</strong> the finalized source decisions contain fewer than two distinct complete matching supports. Keep the candidate open; no engineering fix is proposed.</p>}</div>
        </>}
      </div>
    </div>
    <footer className="border-t border-slate-200 pt-3 text-xs leading-5 text-slate-600 dark:text-slate-400 dark:border-slate-700 dark:text-slate-400">All names, conversations, actions, references, and counts are invented. The denominator is the complete synthetic fixture and does not represent any customer population.</footer>
  </section>;
}
