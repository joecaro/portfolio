import Link from "next/link";
import { ArrowRight, AudioLines, Check, FileCheck, FlaskConical, GitBranch, MessageSquare, Phone, RotateCcw, Search } from "lucide-react";
import { operationsProjects } from "@/lib/projectGroups";

const surface = "rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900";
const label = "text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400";

export function CaseStudyVisual({ slug }: { slug: string }) {
  const isBank = slug === "fortune-100-voice-ai";
  const caption = isBank
    ? "Simplified contact-center workflow"
    : slug === "voice-ai-platform"
      ? "Four tools · select a workflow"
      : slug === "enterprise-voice-ai"
        ? "Evaluation comparison · fictional test cases"
        : slug === "conversation-explorer"
          ? "Call review and flow views · fictional call"
          : slug === "scout-evidence-engine"
            ? "Investigation report · fictional calls"
            : slug === "platform-chat"
              ? "Scoped answer · fictional call data"
              : "Saved job and patch approval · illustrative";
  return (
    <figure data-case-visual className="overflow-hidden rounded-lg border border-neutral-200 bg-slate-50 dark:border-neutral-700 dark:bg-neutral-800/50">
      <figcaption className="border-b border-neutral-200 px-4 py-3 text-xs text-neutral-600 dark:border-neutral-700 dark:text-neutral-400 md:px-6">
        {caption}
      </figcaption>
      <div className="p-4 md:p-8">
        {isBank ? <BankWorkflow /> : slug === "voice-ai-platform" ? <SuiteWorkflow /> : slug === "enterprise-voice-ai" ? <EvaluationView /> : slug === "conversation-explorer" ? <CallView /> : slug === "scout-evidence-engine" ? <ScoutView /> : slug === "platform-chat" ? <ChatView /> : <AgentView />}
      </div>
    </figure>
  );
}

function BankWorkflow() {
  return <div>
    <div className="mb-5 flex items-center gap-3 text-blue-700 dark:text-blue-300"><Phone className="h-5 w-5" aria-hidden /><p className="text-sm font-semibold">Inside the bank’s environment</p></div>
    <ol className="grid items-stretch gap-3 md:grid-cols-3">
      {[
        { title: "Legacy contact center", detail: "Sends call, transfer and agent status events", icon: Phone },
        { title: "Custom orchestration", detail: "Tracks calls, agent availability and wrap-up", icon: AudioLines },
        { title: "Air-gapped voice AI", detail: "Runs the conversation inside the bank", icon: FileCheck },
      ].map((step, i) => <li key={step.title} className={`${surface} grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3 md:block`}>
        <div className="row-span-2 flex items-start justify-between text-blue-600 dark:text-blue-300 md:mb-3 md:items-center"><step.icon className="h-6 w-6" aria-hidden /><span className="hidden text-xs font-semibold md:inline">0{i + 1}</span></div>
        <p className="font-semibold">{step.title}</p><p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{step.detail}</p>
      </li>)}
    </ol>
    <p className="mt-4 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">Simulator example: Call ends → agent stays unavailable during wrap-up → matching ready event → agent can take the next call.</p>
  </div>;
}

function SuiteWorkflow() {
  const tools = [
    { title: "Test agents", detail: "Compare graded attempts on matching case versions", state: "Used by engineers", icon: FlaskConical },
    { title: "Review a call", detail: "Compare the recording with tool results", state: "Shared views merged", icon: AudioLines },
    { title: "Find patterns", detail: "Check a finding against exact source turns", state: "Internal staff use", icon: Search },
    { title: "Ask a question", detail: "See the query scope and supporting calls", state: "v2 release pending", icon: MessageSquare },
  ];
  return <ol className="grid grid-cols-2 gap-3 lg:grid-cols-4">{tools.map((tool, i) => <li key={tool.title}>
    <Link href={`/projects/${operationsProjects[i].slug}`} className={`${surface} flex h-full flex-col gap-3 transition-colors hover:border-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600`}>
      <tool.icon className="h-7 w-7 text-blue-600 dark:text-blue-300" aria-hidden />
      <span className="text-lg font-semibold">{tool.title}</span><span className="text-sm text-neutral-600 dark:text-neutral-300">{tool.detail}</span>
      <span className="mt-auto flex items-center justify-between gap-2 border-t border-neutral-200 pt-3 text-xs text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">{tool.state}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden /></span>
    </Link>
  </li>)}</ol>;
}

function EvaluationView() {
  return <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
    <div className={surface}>
      <p className={`${label} mb-4`}>Compare like for like</p>
      <table className="w-full text-left text-sm"><thead><tr className="border-b border-neutral-200 dark:border-neutral-700"><th className="pb-3 pr-2 font-medium">Case</th><th className="pb-3 pr-2 font-medium">Baseline</th><th className="pb-3 font-medium">Candidate</th></tr></thead>
        <tbody>{[["Identity check", "Pass", "Pass"], ["Payment date", "Fail", "Pass"], ["Transfer", "Fail · v1", "Pass · v2"]].map(([name, before, after]) => <tr key={name} className="border-b border-neutral-100 last:border-0 dark:border-neutral-800"><th className="py-3 pr-2 font-normal">{name}</th><td className="py-3 pr-2 text-neutral-600 dark:text-neutral-400">{before}</td><td className="py-3 font-semibold text-blue-700 dark:text-blue-300">{after}</td></tr>)}</tbody>
      </table>
    </div>
    <div className={surface}><p className={label}>Why a case is excluded</p><p className="mt-4 text-lg font-semibold">Transfer changed between runs</p><dl className="mt-4 space-y-3 text-sm"><div><dt className="text-neutral-500 dark:text-neutral-400">Release comparison</dt><dd>Identity check and payment date count</dd></div><div><dt className="text-neutral-500 dark:text-neutral-400">Excluded</dt><dd>The candidate passed a different version, so this does not count as a fix.</dd></div></dl></div>
  </div>;
}

function CallView() {
  return <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
    <div className={surface}><p className={`${label} mb-4`}>Transcript · selected moment</p><div className="space-y-3 text-sm"><p className="rounded bg-neutral-100 p-3 dark:bg-neutral-800"><span className="mb-1 block text-xs text-neutral-600 dark:text-neutral-400">Customer</span>Can I pay on Friday?</p><p className="rounded border-l-4 border-blue-500 bg-blue-50 p-3 dark:bg-blue-950"><span className="mb-1 block text-xs text-blue-700 dark:text-blue-300">Agent · 00:42</span>Friday is available.</p></div></div>
    <div className={surface}><p className={label}>Recorded action · same moment</p><div className="mt-4 flex items-center gap-2 text-sm font-semibold"><FileCheck className="h-5 w-5 text-blue-600 dark:text-blue-300" aria-hidden />Payment-date check · 00:42</div><p className="mt-3 text-2xl font-semibold">Unavailable</p><p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">The recorded tool result disagrees with the transcript.</p><div className="mt-6 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400"><AudioLines className="h-5 w-5" aria-hidden />00:42 <span className="h-1 flex-1 rounded bg-blue-300" />01:18</div></div>
  </div>;
}

function ScoutView() {
  return <div className="grid gap-4 md:grid-cols-[.85fr_1.15fr]">
    <div className={surface}><p className={label}>Search → group → read → verify</p><p className="mt-4 text-xl font-semibold">Payment method asked twice</p><p className="mt-4 inline-block rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-950 dark:text-blue-200">Observation</p><p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">Calls 01 and 02 were grouped as candidates. The excerpt shows what happened in Call 01. Frequency and cause need separate checks.</p></div>
    <div className={surface}><p className={`${label} mb-4`}>Call 01 · supporting turns</p><ol className="space-y-3 text-sm"><li><span className="mr-2 font-mono text-neutral-600 dark:text-neutral-400">11</span><b>Agent</b><p className="mt-1 pl-6">How would you like to pay?</p></li><li><span className="mr-2 font-mono text-neutral-600 dark:text-neutral-400">12</span><b>Customer</b><p className="mt-1 pl-6">Debit card, please.</p></li><li className="border-l-4 border-blue-500 bg-blue-50 p-3 dark:bg-blue-950"><span className="mr-2 font-mono text-neutral-600 dark:text-neutral-400">16</span><b>Agent</b><p className="mt-1 pl-6">How would you like to make your payment?</p></li></ol></div>
  </div>;
}

function ChatView() {
  return <div className="mx-auto max-w-3xl space-y-4">
    <div className="ml-auto max-w-lg rounded-lg bg-blue-600 px-4 py-3 text-sm text-white">Earlier scope: Card campaign only</div>
    <p className="text-right text-sm">“What issues came up in the calls you reviewed?”</p>
    <div className={surface}><ol className="mb-4 flex flex-wrap gap-x-5 gap-y-2 border-b border-neutral-200 pb-4 text-xs text-neutral-600 dark:border-neutral-700 dark:text-neutral-300">{["Scope: card campaign", "Query metrics: card campaign", "Read calls: card campaign"].map(s => <li key={s} className="flex items-center gap-1"><Check className="h-4 w-4" aria-hidden />{s}</li>)}</ol><p className="font-semibold">Payment-date issues appear in the reviewed examples.</p><p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Scope: card campaign. The examples below are from that campaign.</p><p className="mt-4 text-xs text-blue-700 dark:text-blue-300">Call 01 · Call 02 · Call 03</p></div>
  </div>;
}

function AgentView() {
  return <div>
    <ol className="grid gap-3 sm:grid-cols-3">{[{ title: "Job saved", detail: "Worker starts in an isolated worktree", icon: GitBranch }, { title: "Worker interrupted", detail: "Saved job returns to queue", icon: RotateCcw }, { title: "Review saved patch", detail: "Approval applies to this exact revision", icon: FileCheck }].map(step => <li key={step.title} className={surface}><step.icon className="mb-4 h-6 w-6 text-blue-600 dark:text-blue-300" aria-hidden /><p className="font-semibold">{step.title}</p><p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{step.detail}</p></li>)}</ol>
    <p className="mt-4 text-center text-xs text-neutral-600 dark:text-neutral-400">Patch B supersedes approved patch A. Patch B needs its own approval.</p>
  </div>;
}
