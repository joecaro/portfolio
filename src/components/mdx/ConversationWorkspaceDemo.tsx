"use client";

import { useMemo, useState } from "react";

type EventKind = "caller" | "agent" | "tool_attempt" | "tool_result";
type ReviewEvent = {
  id: string; time: string; kind: EventKind; label: string; text: string;
  tool?: string; input?: string; result?: string; proves: string;
};
type ReviewCall = {
  id: string; title: string; category: string; time: string; duration: string;
  initialStatus: "Needs review" | "In review" | "Reviewed"; events: ReviewEvent[];
};

const CALLS: ReviewCall[] = [
  {
    id: "address", title: "Correct a delivery address", category: "Delivery support",
    time: "Today · 10:42 AM", duration: "04:18", initialStatus: "Needs review",
    events: [
      { id: "a1", time: "00:04", kind: "caller", label: "Caller", text: "My package still has my previous apartment number. Can you update it before delivery?", proves: "What the caller requested." },
      { id: "a2", time: "00:12", kind: "agent", label: "Assistant", text: "I can check whether the address is still editable. One moment while I look.", proves: "What the assistant told the caller." },
      { id: "a3", time: "00:19", kind: "tool_attempt", label: "Address update · attempt", tool: "update_delivery_address", input: "Change unit from 4B to 7A", text: "Attempted to update the delivery address.", proves: "The requested operation and its submitted fields." },
      { id: "a4", time: "00:20", kind: "tool_result", label: "Address update · result", tool: "update_delivery_address", result: "Rejected: parcel is already loaded for dispatch. Address unchanged.", text: "The address update was rejected.", proves: "The recorded result: the address was not changed." },
      { id: "a5", time: "00:31", kind: "agent", label: "Assistant", text: "The address update did not go through, so the package still has the old unit number. I can send a delivery follow-up instead.", proves: "The assistant reported the rejected update accurately." },
      { id: "a6", time: "00:48", kind: "caller", label: "Caller", text: "Yes, please send the follow-up.", proves: "The caller approved the alternative." },
      { id: "a7", time: "00:54", kind: "tool_attempt", label: "Delivery follow-up · attempt", tool: "create_delivery_follow_up", input: "Request carrier review for the delivery address", text: "Submitted a delivery follow-up request.", proves: "A follow-up request was submitted." },
      { id: "a8", time: "01:02", kind: "tool_result", label: "Delivery follow-up · result", tool: "create_delivery_follow_up", result: "Accepted: follow-up request recorded for review.", text: "The follow-up request was accepted.", proves: "The system recorded the follow-up, not a completed address change." },
    ],
  },
  {
    id: "appointment", title: "Move a service appointment", category: "Scheduling",
    time: "Today · 9:18 AM", duration: "03:52", initialStatus: "Reviewed",
    events: [
      { id: "b1", time: "00:03", kind: "caller", label: "Caller", text: "Could we move tomorrow's visit to Friday afternoon?", proves: "The requested appointment change." },
      { id: "b2", time: "00:11", kind: "agent", label: "Assistant", text: "I'll check the available Friday times before changing anything.", proves: "The assistant described a check before the update." },
      { id: "b3", time: "00:18", kind: "tool_attempt", label: "Availability · attempt", tool: "find_open_slots", input: "Friday afternoon · existing service region", text: "Checked for an available appointment slot.", proves: "The search criteria sent to the availability tool." },
      { id: "b4", time: "00:20", kind: "tool_result", label: "Availability · result", tool: "find_open_slots", result: "Two slots returned: 1:30 PM and 3:00 PM.", text: "Two Friday slots were returned.", proves: "The available times returned by the system." },
      { id: "b5", time: "00:33", kind: "caller", label: "Caller", text: "Three o'clock works for me.", proves: "The caller chose the 3:00 PM slot." },
      { id: "b6", time: "00:40", kind: "tool_attempt", label: "Reschedule · attempt", tool: "reschedule_visit", input: "Move visit to Friday at 3:00 PM", text: "Submitted the selected appointment change.", proves: "The requested appointment update." },
      { id: "b7", time: "00:42", kind: "tool_result", label: "Reschedule · result", tool: "reschedule_visit", result: "Accepted: appointment moved to Friday at 3:00 PM.", text: "The appointment change was accepted.", proves: "The system recorded the new appointment time." },
      { id: "b8", time: "00:51", kind: "agent", label: "Assistant", text: "You're booked for Friday at 3:00 PM. I’ve updated the appointment.", proves: "The spoken confirmation matches the recorded result." },
    ],
  },
  {
    id: "refund", title: "Check a pending refund", category: "Payments",
    time: "Yesterday · 2:06 PM", duration: "05:07", initialStatus: "In review",
    events: [
      { id: "c1", time: "00:02", kind: "caller", label: "Caller", text: "I returned the item last week. Can you tell me when the refund should arrive?", proves: "The caller asked for a refund status." },
      { id: "c2", time: "00:14", kind: "agent", label: "Assistant", text: "I'll check the return and refund status for you.", proves: "What the assistant said it would check." },
      { id: "c3", time: "00:21", kind: "tool_attempt", label: "Refund lookup · attempt", tool: "lookup_return_status", input: "Read return and refund status for this order", text: "Looked up the return and refund status.", proves: "The read-only status lookup that was requested." },
      { id: "c4", time: "00:23", kind: "tool_result", label: "Refund lookup · result", tool: "lookup_return_status", result: "Return received. Refund status: processing. No completion date available.", text: "The refund is processing; no date was returned.", proves: "The returned status and its uncertainty." },
      { id: "c5", time: "00:37", kind: "agent", label: "Assistant", text: "The return is marked received and the refund is processing. I don't have a completion date to share.", proves: "The answer preserved the missing-date limitation." },
      { id: "c6", time: "00:49", kind: "caller", label: "Caller", text: "Okay, thanks for checking.", proves: "The caller acknowledged the status." },
    ],
  },
];

const button = "min-h-11 rounded-lg border px-3 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400";
const smallLabel: Record<EventKind, string> = {
  caller: "Caller said", agent: "Assistant said",
  tool_attempt: "Tool attempt", tool_result: "Tool result",
};
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

function eventTone(kind: EventKind) {
  if (kind === "tool_attempt") return "border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40";
  if (kind === "tool_result") return "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/40";
  return "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950";
}

export function ConversationWorkspaceDemo() {
  const [callId, setCallId] = useState(CALLS[0].id);
  const [selectedEventId, setSelectedEventId] = useState(CALLS[0].events[0].id);
  const [view, setView] = useState<"conversation" | "flow">("conversation");
  const [search, setSearch] = useState("");
  const [reviewedIds, setReviewedIds] = useState<string[]>(() =>
    CALLS.filter((item) => item.initialStatus === "Reviewed").map((item) => item.id),
  );

  const visibleCalls = useMemo(() => {
    const query = search.trim().toLowerCase();
    return CALLS.filter((item) => {
      const status = reviewedIds.includes(item.id)
        ? "Reviewed"
        : item.initialStatus;
      return !query || [item.title, item.category, status].join(" ").toLowerCase().includes(query);
    });
  }, [search, reviewedIds]);
  const call = CALLS.find((item) => item.id === callId) ?? CALLS[0];
  const selectedEvent =
    call.events.find((item) => item.id === selectedEventId) ?? call.events[0];
  const reviewed = reviewedIds.includes(call.id);
  const status = reviewed ? "Reviewed" : call.initialStatus;

  function selectCall(next: ReviewCall) {
    setCallId(next.id);
    setSelectedEventId(next.events[0].id);
  }

  function markReviewed() {
    setReviewedIds((current) =>
      current.includes(call.id) ? current : [...current, call.id],
    );
  }

  return (
    <section aria-label="Conversation review workspace" className="my-8 overflow-hidden rounded-2xl border border-slate-300 bg-white text-slate-900 shadow-xl dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-5">
        <div><p className="text-xs font-semibold uppercase tracking-wide text-blue-800 dark:text-blue-300">Conversation review</p><h2 className="mt-0.5 text-lg font-bold">Review what happened</h2></div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300">Call {call.duration}</span>
          <span className={cx("rounded-full border px-2.5 py-1 text-xs font-semibold", status === "Reviewed" ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200" : status === "In review" ? "border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200" : "border-blue-300 bg-blue-50 text-blue-950 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200")}>{status}</span>
        </div>
      </header>

      <div className="grid lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="border-b border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between px-2 pb-2"><h3 className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">Recent conversations</h3><span className="text-xs tabular-nums text-slate-600 dark:text-slate-400">{visibleCalls.length}</span></div>
          <label htmlFor="conversation-search" className="sr-only">Search conversations</label>
          <input id="conversation-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search conversations" className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-600 dark:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-400 dark:focus-visible:outline-blue-400" />
          <div role="group" aria-label="Conversation list" className="mt-3 grid gap-1">
            {visibleCalls.map((item) => {
              const isCurrent = item.id === call.id;
              const isReviewed = reviewedIds.includes(item.id);
              const rowStatus = isReviewed ? "Reviewed" : item.initialStatus;
              return (
                <button key={item.id} type="button" aria-pressed={isCurrent} onClick={() => selectCall(item)} className={cx(button, "min-w-0 text-left", isCurrent ? "border-blue-700 bg-blue-100 text-blue-950 dark:border-blue-500 dark:bg-blue-950 dark:text-blue-100" : "border-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800")}>
                  <span className="block break-words text-sm font-semibold">{item.title}</span>
                  <span className="mt-0.5 block text-xs text-slate-600 dark:text-slate-400">{item.category} · {item.time}</span>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium"><span aria-hidden="true" className={cx("size-2 rounded-full", rowStatus === "Reviewed" ? "bg-emerald-600" : rowStatus === "In review" ? "bg-amber-500" : "bg-blue-600")} />{rowStatus}</span>
                </button>
              );
            })}
          </div>
          {visibleCalls.length === 0 && <div role="status" className="mt-3 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">No conversations match “{search}”. Try a topic such as billing or delivery.</div>}
          {!visibleCalls.some((item) => item.id === call.id) && <div role="status" className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-950 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100"><span className="font-semibold">Pinned review</span><p className="mt-1">{call.title} is open outside the current search results.</p><button type="button" onClick={() => setSearch("")} className="mt-2 min-h-11 rounded-lg border border-blue-300 px-3 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-blue-700 dark:focus-visible:outline-blue-400">Clear search and show this conversation</button></div>}
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 px-4 py-4 dark:border-slate-800 sm:px-5">
            <div className="min-w-0"><p className="text-xs text-slate-600 dark:text-slate-400">{call.category} · {call.time}</p><h3 className="mt-1 break-words text-lg font-bold">{call.title}</h3></div>
            <div className="flex flex-wrap gap-2">
              <div role="group" aria-label="Conversation views">
                <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-slate-900" role="group" aria-label="Conversation display">
                  <button type="button" aria-pressed={view === "conversation"} onClick={() => setView("conversation")} className={cx(button, "border-transparent px-2.5", view === "conversation" ? "bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white" : "text-slate-600 dark:text-slate-300")}>Conversation</button>
                  <button type="button" aria-pressed={view === "flow"} onClick={() => setView("flow")} className={cx(button, "border-transparent px-2.5", view === "flow" ? "bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white" : "text-slate-600 dark:text-slate-300")}>Flow</button>
                </div>
              </div>
              <button type="button" onClick={markReviewed} disabled={reviewed} aria-pressed={reviewed} className={cx(button, reviewed ? "cursor-default border-emerald-700 bg-emerald-700 text-white disabled:opacity-100 dark:border-emerald-600 dark:bg-emerald-700" : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800")}>{reviewed ? "Reviewed ✓" : "Mark reviewed"}</button>
            </div>
          </div>

          <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(250px,0.75fr)]">
            <div className="min-w-0">
              <section aria-labelledby="event-timeline-heading" className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between gap-2"><h4 id="event-timeline-heading" className="text-sm font-semibold">Recorded event timeline</h4><span className="text-xs text-slate-600 dark:text-slate-400">{call.events.length} events · {call.duration}</span></div>
                <ol className="mt-3 flex flex-wrap gap-2" aria-label="Select an event from the timeline">
                  {call.events.map((event, index) => <li key={event.id}><button type="button" aria-pressed={selectedEvent.id === event.id} onClick={() => setSelectedEventId(event.id)} className={cx("min-h-11 rounded-lg border px-2.5 py-1.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400", selectedEvent.id === event.id ? "border-blue-700 bg-blue-700 text-white dark:border-blue-500 dark:bg-blue-600" : "border-slate-300 bg-white text-slate-700 hover:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300")}><span className="block text-[11px] font-semibold">{event.time}</span><span className="block max-w-36 break-words text-xs">{index + 1}. {event.label}</span></button></li>)}
                </ol>
              </section>

              {view === "conversation" ? (
                <section aria-labelledby="transcript-heading" className="mt-4">
                  <div className="mb-2 flex items-end justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">Read the exchange</p><h4 id="transcript-heading" className="text-base font-bold">Conversation transcript</h4></div><span className="text-xs text-slate-600 dark:text-slate-400">Event selection stays linked</span></div>
                  <ol className="space-y-2">
                    {call.events.map((event) => {
                      const active = selectedEvent.id === event.id;
                      const isSpeech = event.kind === "caller" || event.kind === "agent";
                      return <li key={event.id}><button type="button" aria-pressed={active} onClick={() => setSelectedEventId(event.id)} className={cx("w-full rounded-xl border p-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400 sm:p-4", active ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600 dark:border-blue-500 dark:bg-blue-950/60 dark:ring-blue-500" : eventTone(event.kind))}><span className="flex flex-wrap items-center justify-between gap-2"><span className="text-xs font-semibold">{event.label}</span><span className="font-mono text-xs text-slate-600 dark:text-slate-400">{event.time}</span></span><span className="mt-2 block text-sm leading-6 text-slate-800 dark:text-slate-200">{isSpeech ? "“" + event.text + "”" : event.text}</span>{!isSpeech && <span className="mt-2 inline-flex rounded-full border border-slate-300 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300">{smallLabel[event.kind]} · {event.tool}</span>}</button></li>;
                    })}
                  </ol>
                </section>
              ) : (
                <section aria-labelledby="flow-heading" className="mt-4 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">Follow the sequence</p><h4 id="flow-heading" className="mt-1 text-base font-bold">Conversation and action flow</h4>
                  <ol className="mt-4 space-y-2">
                    {call.events.map((event, index) => <li key={event.id} className="relative">{index < call.events.length - 1 && <span aria-hidden="true" className="absolute bottom-[-9px] left-[18px] top-10 w-px bg-slate-300 dark:bg-slate-700" />}<button type="button" aria-pressed={selectedEvent.id === event.id} onClick={() => setSelectedEventId(event.id)} className={cx("relative flex min-h-11 w-full items-start gap-3 rounded-lg border p-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400", selectedEvent.id === event.id ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/60" : eventTone(event.kind))}><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-slate-300 bg-white text-[10px] font-bold dark:border-slate-600 dark:bg-slate-950">{index + 1}</span><span className="min-w-0 flex-1"><span className="flex flex-wrap justify-between gap-2 text-xs font-semibold"><span>{event.label}</span><span className="font-mono text-slate-600 dark:text-slate-400">{event.time}</span></span><span className="mt-1 block break-words text-xs leading-5 text-slate-600 dark:text-slate-300">{event.text}</span></span></button></li>)}
                  </ol>
                </section>
              )}
            </div>

            <aside aria-label="Selected event evidence" className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">Selected event</p><h4 className="mt-1 text-base font-bold">{selectedEvent.label}</h4></div><span className="rounded-full border border-slate-300 px-2 py-1 font-mono text-xs dark:border-slate-700">{selectedEvent.time}</span></div>
              <div aria-live="polite" className="mt-3 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950"><p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">{smallLabel[selectedEvent.kind]}</p><p className="mt-2 text-sm leading-6">{selectedEvent.text}</p></div>
              {selectedEvent.kind === "tool_attempt" && <div className="mt-3 rounded-lg border border-amber-300 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/40"><p className="text-xs font-semibold text-amber-950 dark:text-amber-200">Attempt details</p><p className="mt-1 break-words font-mono text-xs leading-5 text-amber-950 dark:text-amber-100">{selectedEvent.tool}</p><p className="mt-1 text-sm text-amber-950 dark:text-amber-100">{selectedEvent.input}</p></div>}
              {selectedEvent.kind === "tool_result" && <div className="mt-3 rounded-lg border border-blue-300 bg-blue-50 p-3 dark:border-blue-900 dark:bg-blue-950/40"><p className="text-xs font-semibold text-blue-950 dark:text-blue-200">Recorded tool result</p><p className="mt-1 break-words text-sm leading-5 text-blue-950 dark:text-blue-100">{selectedEvent.result}</p></div>}
              <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950"><p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">What this supports</p><p className="mt-1 text-sm leading-5">{selectedEvent.proves}</p><p className="mt-2 border-t border-slate-200 pt-2 text-xs text-slate-600 dark:text-slate-400 dark:border-slate-800 dark:text-slate-400">{selectedEvent.kind === "tool_attempt" || selectedEvent.kind === "tool_result" ? "Tool event record" : "Conversation transcript"} · {call.title}</p></div>
              {(selectedEvent.kind === "tool_attempt" || selectedEvent.kind === "tool_result") && <p className="mt-3 rounded-lg border border-slate-200 px-3 py-2 text-xs leading-5 text-slate-600 dark:border-slate-800 dark:text-slate-400">A spoken confirmation does not replace the recorded tool result. Review both before deciding what changed.</p>}
            </aside>
          </div>

          <footer className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 sm:px-5">Fictional review fixture · no recorded audio</footer>
        </div>
      </div>
    </section>
  );
}

