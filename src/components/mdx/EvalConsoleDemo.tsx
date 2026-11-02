"use client";

import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useMemo, useState } from "react";

// Invented suite, cases and runs. Labels, states and layout rules follow the real evaluation console.

type Outcome = "passed" | "failed" | "not_graded" | "didnt_finish";
type Cell = Outcome[] | null; // null = did not run
type Case = {
  id: string;
  name: string;
  expected: string;
  grader: string;
  cells: Cell[]; // one per run, newest first
  tool?: { call: string; returned: string; changed?: string };
  why?: string;
};
type Category = { name: string; cases: Case[] };

const RUNS = [
  { id: "R6", label: "Oct 21", kind: "Full-suite run", note: "Candidate" },
  { id: "R5", label: "Oct 20", kind: "Selected-cases run", note: "" },
  { id: "R4", label: "Oct 17", kind: "Full-suite run", note: "Approved run" },
  { id: "R3", label: "Oct 14", kind: "Full-suite run", note: "" },
  { id: "R2", label: "Oct 10", kind: "Full-suite run", note: "" },
];

const P: Outcome = "passed", F: Outcome = "failed", N: Outcome = "not_graded", D: Outcome = "didnt_finish";

const CATEGORIES: Category[] = [
  {
    name: "Payments / Make payment",
    cases: [
      { id: "pay-011", name: "Pays full balance with card on file", expected: "Confirms amount and date, then calls the payment tool once.", grader: "Calls a tool", cells: [[P, P, P], null, [P, P, P], [P, P, F], [P, P, P]], tool: { call: "process_payment(amount=911.00, date=\"today\", method=\"card_on_file\")", returned: "{ \"status\": \"approved\", \"confirmation\": \"PMT-2291\" }" } },
      {
        id: "pay-014", name: "Caller confirms authorized signer", expected: "Accepts a clear “yes” as confirmation and completes the payment.", grader: "AI judge", cells: [[P, P, P], [P, P], [F, F, P], [F, F, F], [F, F, F]],
        tool: { call: "process_payment(amount=911.00, date=\"today\", confirmed=true)", returned: "{ \"status\": \"approved\" }", changed: "confirmed=true" },
        why: "Fixed since the approved run. The agent now accepts “yes” and passes confirmed=true; before, the tool returned held_for_confirmation and the agent asked again.",
      },
      { id: "pay-020", name: "Future-dated payment", expected: "Schedules for the requested date, never today.", grader: "Exact match", cells: [[P, F, P], null, [P, P, P], [P, P, P], [P, P, P]], tool: { call: "process_payment(amount=120.00, date=\"2026-11-03\")", returned: "{ \"status\": \"scheduled\" }" }, why: "Regressed: one of three attempts scheduled the payment for today." },
    ],
  },
  {
    name: "Payments / Add account",
    cases: [
      { id: "acct-003", name: "Adds a checking account", expected: "Reads back the last four digits before saving.", grader: "Pattern match", cells: [[P, P, P], null, [P, P, P], [P, P, P], [P, N, P]] },
      { id: "acct-007", name: "Rejects an invalid routing number", expected: "Explains the error and asks again; does not call the save tool.", grader: "Does not call a tool", cells: [[D, P, P], null, [P, P, P], [P, P, P], [P, P, P]], why: "One attempt didn't finish: the test call dropped before the agent spoke. That's an infrastructure error, not a failure, so it's excluded from the comparison." },
    ],
  },
  {
    name: "Transfers / Containment",
    cases: [
      { id: "xfer-002", name: "Asks for a person once", expected: "Offers help once, then transfers if the caller insists.", grader: "Ends with disposition", cells: [[P, P, P], null, [P, P, F], [P, F, F], [F, F, F]] },
      { id: "xfer-009", name: "Hardship request", expected: "Transfers to the hardship queue without collecting payment.", grader: "AI judge", cells: [[N, N, N], null, [P, P, P], [P, P, P], null], why: "Not graded: the judge timed out on all three attempts. Ungraded cases are left out of the comparison instead of counted as failures." },
    ],
  },
  {
    name: "Identity / Verification",
    cases: [
      { id: "id-001", name: "Verifies with last four digits", expected: "Calls verify_identity before discussing the balance.", grader: "Calls a tool", cells: [[P, P, P], null, [P, P, P], [P, P, P], [P, P, P]], tool: { call: "verify_identity(ssn_last4=\"••••\")", returned: "{ \"verified\": true }" } },
      { id: "id-004", name: "Wrong person answers", expected: "Doesn't disclose the debt; ends the call politely.", grader: "AI judge", cells: [[P, P, P], null, [P, P, P], [P, P, F], [P, P, P]] },
    ],
  },
];

const COLOR: Record<Outcome, string> = { passed: "bg-emerald-500", failed: "bg-rose-500", not_graded: "bg-gray-300", didnt_finish: "bg-gray-300" };
const WORD: Record<Outcome, string> = { passed: "Passed", failed: "Failed", not_graded: "Not graded", didnt_finish: "Didn't finish" };

const state = (c: Cell): "no_result" | "unscored" | "failed" | "passed" => {
  if (!c) return "no_result";
  const scored = c.filter(o => o === "passed" || o === "failed");
  if (!scored.length) return "unscored";
  return scored.every(o => o === "passed") ? "passed" : "failed";
};
const comparable = (a: Cell, b: Cell) => !!a && !!b && a.every(o => o === "passed" || o === "failed") && b.every(o => o === "passed" || o === "failed") && a.length === b.length;

function Ticks({ cell }: { cell: Cell }) {
  if (!cell) return <span className="text-[10.5px] text-gray-400">did not run</span>;
  return (
    <span className="flex items-center gap-[3px]">
      {cell.map((o, i) => (
        <span key={i} title={WORD[o]} className={`h-3.5 w-1.5 rounded-sm ${COLOR[o]} ${o === "didnt_finish" ? "bg-[repeating-linear-gradient(45deg,#d1d5db_0_2px,#f3f4f6_2px_4px)]" : ""}`} />
      ))}
    </span>
  );
}

export function EvalConsoleDemo() {
  const [open, setOpen] = useState<Record<string, boolean>>({ "Payments / Make payment": true, "Transfers / Containment": true });
  const [sel, setSel] = useState<{ caseId: string; run: number } | null>({ caseId: "pay-014", run: 0 });

  const all = CATEGORIES.flatMap(c => c.cases);
  const summary = useMemo(() => {
    let fixed = 0, regressed = 0, same = 0;
    const excluded = { error: 0, unscored: 0, missing: 0 };
    all.forEach(c => {
      const a = c.cells[0], b = c.cells[2];
      if (!a || !b) return void excluded.missing++;
      if (a.includes("didnt_finish") || b.includes("didnt_finish")) return void excluded.error++;
      if (!comparable(a, b)) return void excluded.unscored++;
      const sa = state(a), sb = state(b);
      if (sa === "passed" && sb === "failed") fixed++;
      else if (sa === "failed" && sb === "passed") regressed++;
      else same++;
    });
    return { fixed, regressed, same, excluded };
  }, [all]);

  const selCase = sel ? all.find(c => c.id === sel.caseId)! : null;
  const prevIdx = selCase && sel ? selCase.cells.findIndex((c, i) => i > sel.run && c) : -1;

  const rate = (cases: Cell[][], run: number) => {
    const scored = cases.map(c => c[run]).filter((c): c is Outcome[] => !!c && state(c) !== "unscored");
    if (!scored.length) return "—";
    return `${Math.round((scored.filter(c => state(c) === "passed").length / scored.length) * 100)}%`;
  };

  return (
    <div className="text-gray-900">
      <div className="relative overflow-hidden rounded-xl border border-gray-300 bg-gray-100 shadow-xl">
        <div className="border-b border-gray-200 bg-white px-5 py-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">Model evaluations / Collections agent</p>
          <div className="mt-0.5 flex flex-wrap items-end justify-between gap-2">
            <h3 className="text-[15px] font-semibold">Collections suite · 9 cases shown</h3>
            <p className="text-[12px] text-gray-600">Latest: <span className="font-medium text-gray-900">Full-suite run · Oct 21</span> · Scored attempts 23 of 27</p>
          </div>
        </div>

        <div className="mx-4 mt-3 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[12.5px]">
          <p className="font-medium">Compared with the approved run (Oct 17)</p>
          <p className="mt-0.5 text-gray-700">
            <span className="tabular-nums">{summary.fixed}</span> fixed · <span className="tabular-nums">{summary.regressed}</span> regressed · <span className="tabular-nums">{summary.same}</span> unchanged
            <span className="text-gray-500"> · Left out: {summary.excluded.error} didn&apos;t finish, {summary.excluded.unscored} not graded, {summary.excluded.missing} not in both runs</span>
          </p>
        </div>

        <div className="mx-4 mb-4 mt-3 overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full min-w-[640px] border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b border-gray-200 text-left text-[11px] text-gray-500">
                <th className="px-3 py-2 font-medium">Case</th>
                {RUNS.map(r => (
                  <th key={r.id} className="px-2 py-2 font-medium">
                    <span className="block text-gray-900">{r.label}</span>
                    <span className={r.note === "Approved run" ? "text-emerald-700" : ""}>{r.note || (r.kind === "Selected-cases run" ? "Selected cases" : "Full suite")}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map(cat => (
                <FragmentRows key={cat.name} cat={cat} open={!!open[cat.name]} toggle={() => setOpen(o => ({ ...o, [cat.name]: !o[cat.name] }))} sel={sel} onSel={setSel} rate={rate} />
              ))}
            </tbody>
          </table>
        </div>

        {selCase && sel && (
          <div className="border-t border-gray-300 bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-2">
              <p className="text-[13px] font-semibold">
                {selCase.name} <span className="ml-1 font-mono text-[11px] font-normal text-gray-500">{selCase.id}</span>
                <span className="ml-2 font-normal text-gray-500">· {RUNS[sel.run].label}</span>
              </p>
              <button type="button" onClick={() => setSel(null)} aria-label="Close" className="grid h-7 w-7 place-items-center rounded-md hover:bg-gray-100"><X className="h-4 w-4" /></button>
            </div>
            <div className="grid gap-4 px-5 py-3 text-[12.5px] md:grid-cols-2">
              <div className="space-y-2.5">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">Expected behavior</p>
                  <p className="mt-0.5">{selCase.expected}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">Grader details</p>
                  <p className="mt-0.5">{selCase.grader}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">Attempts</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {selCase.cells[sel.run] ? selCase.cells[sel.run]!.map((o, i) => (
                      <span key={i} className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${o === "passed" ? "bg-emerald-50 text-emerald-800" : o === "failed" ? "bg-rose-50 text-rose-800" : "bg-gray-100 text-gray-700"}`}>{i + 1}. {WORD[o]}</span>
                    )) : <span className="text-gray-500">Did not run in this run.</span>}
                  </div>
                </div>
                {selCase.why && <p className="rounded-md bg-gray-50 px-3 py-2 text-gray-700">{selCase.why}</p>}
              </div>
              <div className="space-y-2.5">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">Tool calls</p>
                  {selCase.tool ? (
                    <div className="mt-1 rounded-md border border-gray-200 p-2 font-mono text-[11.5px]">
                      <p className="break-all">
                        {selCase.tool.changed ? selCase.tool.call.split(selCase.tool.changed).flatMap((part, i, arr) => (i < arr.length - 1 ? [part, <mark key={i} className="rounded bg-amber-100 px-0.5">{selCase.tool!.changed}</mark>] : [part])) : selCase.tool.call}
                      </p>
                      <p className="mt-1 text-gray-500">Returned: <span className="text-gray-800">{selCase.tool.returned}</span></p>
                    </div>
                  ) : (
                    <p className="mt-0.5 text-gray-500">No tool calls in this case.</p>
                  )}
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">Compared against</p>
                  <p className="mt-0.5">
                    {prevIdx > 0 ? <>Nearest older run with a result: <span className="font-medium">{RUNS[prevIdx].label}</span> ({WORD[state(selCase.cells[prevIdx]) === "passed" ? "passed" : "failed"]})</> : "No older run has a result for this case."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FragmentRows({
  cat, open, toggle, sel, onSel, rate,
}: {
  cat: Category; open: boolean; toggle: () => void; sel: { caseId: string; run: number } | null; onSel: (s: { caseId: string; run: number }) => void; rate: (cells: Cell[][], run: number) => string;
}) {
  const cells = cat.cases.map(c => c.cells);
  return (
    <>
      <tr className="border-b border-gray-100 bg-gray-50/70">
        <td className="px-3 py-1.5">
          <button type="button" onClick={toggle} className="flex items-center gap-1 font-medium" aria-expanded={open}>
            {open ? <ChevronDown className="h-3.5 w-3.5 text-gray-500" /> : <ChevronRight className="h-3.5 w-3.5 text-gray-500" />}
            {cat.name}
            <span className="ml-1 font-normal text-gray-500">{cat.cases.length}</span>
          </button>
        </td>
        {RUNS.map((r, i) => (
          <td key={r.id} className="px-2 py-1.5 tabular-nums text-gray-900">{/* plain ink: no threshold to colour against */ rate(cells, i)}</td>
        ))}
      </tr>
      {open && cat.cases.map(c => (
        <tr key={c.id} className="border-b border-gray-100">
          <td className="py-1.5 pl-8 pr-3">
            <span className="block">{c.name}</span>
            <span className="font-mono text-[10.5px] text-gray-400">{c.id}</span>
          </td>
          {c.cells.map((cell, i) => {
            const prev = c.cells.slice(i + 1).find(Boolean);
            const flipped = cell && prev && state(cell) !== "unscored" && state(prev) !== "unscored" && state(cell) !== state(prev);
            const active = sel?.caseId === c.id && sel.run === i;
            return (
              <td key={i} className="px-1 py-1">
                <button
                  type="button"
                  onClick={() => onSel({ caseId: c.id, run: i })}
                  aria-label={`${c.name}, ${RUNS[i].label}`}
                  className={`flex h-8 w-full items-center gap-1.5 rounded-md px-2 ${active ? "bg-violet-50 ring-1 ring-violet-300" : "hover:bg-gray-50"}`}
                >
                  <Ticks cell={cell} />
                  {flipped && <span title="Changed since the previous run" className="text-[10px] font-semibold text-gray-700">◆</span>}
                </button>
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}
