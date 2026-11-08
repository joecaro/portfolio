import { PlatformChatDemo } from "./mdx/PlatformChatDemo";
import { CallReviewDemo } from "./mdx/CallReviewDemo";
import { AgentControlRoomDemo } from "./mdx/AgentControlRoomDemo";
import { ScoutViewerDemo } from "./mdx/ScoutViewerDemo";
import { EvalConsoleDemo } from "./mdx/EvalConsoleDemo";
import { LiveAgentsDemo } from "./mdx/LiveAgentsDemo";
import { PlatformTourDemo } from "./mdx/PlatformTourDemo";
import { VoiceTurnDemo } from "./mdx/VoiceTurnDemo";

type ProjectSummary = {
  built: string;
  value: string;
  evidence: string;
  instruction: string;
  standing?: { label: string; value: string }[];
};

export const HEADLINER_SUMMARIES: Record<string, ProjectSummary> = {
  "fortune-100-voice-ai": {
    built: "Integration and release work to run a voice-AI platform inside a Fortune 100 bank.",
    value: "Connects virtual agents to the bank’s call handling, infrastructure and model-review process.",
    evidence: "Production launch in September 2025; a second line of business followed in July 2026. Controlled staging tests isolated a polling performance problem.",
    instruction: "Explore the illustrative agent-state table, then compare the original and optimized polling responses in a staging replay.",
    standing: [{"label": "Status", "value": "In production since September 2025"}, {"label": "Scope", "value": "Two lines of business at one Fortune 100 bank"}, {"label": "Workflows", "value": "Card and auto-loan workflows. Business-performance results are private."}],
  },
  "voice-runtime": {
    built: "Fixes to the live call path: model-step setup and the speech stream, plus an investigation of lost audio on second calls.",
    value: "A slow or failed step sounds like a dropped call, so each fix targets a silence the caller would hear.",
    evidence: "One turn spent 1.413 s of 2.726 s in our own setup. Two speech bugs that silenced calls are fixed in staging.",
    instruction: "Pick a turn, then apply the fix to see what changed. Conversation text is made up; slow-turn timings are real.",
    standing: [{"label": "Status", "value": "Latency and speech fixes merged and running in staging"}, {"label": "Checked by", "value": "Real test calls, a scripted test caller and targeted tests"}, {"label": "Limits", "value": "Second-call audio bug not fixed yet; nothing confirmed in production"}],
  },
  "voice-ai-platform": {
    built: "An evaluation console, call-review workspace, Scout investigation engine and conversational analyst.",
    value: "Covers the operator workflow from testing an agent to understanding what happened in its calls.",
    evidence: "The tools span client test environments, merged UI work and internal staff use. Platform Chat v2 still awaits release acceptance.",
    instruction: "Choose a tool to explore its reconstructed workflow. Each tab links to the engineering case study.",
    standing: [{"label": "Evaluation", "value": "Parts deployed in a client’s test environments"}, {"label": "Call review", "value": "Shared redesign merged; enterprise re-port in review"}, {"label": "Investigation", "value": "Scout used internally; Platform Chat v2 not yet released"}],
  },
  "platform-chat": {
    built: "A conversational interface combining scoped metrics, transcript search and call investigation.",
    value: "Keeps the question, analysis steps and linked call evidence in one interaction.",
    evidence: "Live-model evaluations caught a serving-schema mismatch and citation-contract bugs before release.",
    instruction: "Choose a preset question and follow the scripted analysis through scope, search and answer.",
    standing: [{"label": "Status", "value": "v2 merged to main; release awaits live acceptance"}, {"label": "Users", "value": "Staff preview; no customer adoption established"}, {"label": "Validation", "value": "Synthetic-data and live-model evaluations; no measured time savings"}],
  },
  "conversation-explorer": {
    built: "A transcript-first review workspace and a call-flow map.",
    value: "Lets a reviewer move between the recording, conversation and runtime actions without losing their place.",
    evidence: "Both views merged to main. The enterprise re-port followed a rollback and remains in review.",
    instruction: "Select a turn or timeline marker, inspect a tool result, or switch to the call-flow map.",
    standing: [{"label": "Shared product", "value": "Call-flow map and call-details redesign merged"}, {"label": "Enterprise port", "value": "Fixed re-port in review after rollback"}, {"label": "Use", "value": "Adoption and review-time improvements not measured"}],
  },
  "agent-architecture": {
    built: "A personal workspace for coding-agent plans, isolated workers, saved patches and review.",
    value: "Makes interrupted work recoverable and binds integration approval to a specific saved patch.",
    evidence: "534 recorded jobs and 83 automatic recoveries. Later plan-approval functionality had only one real plan run.",
    instruction: "Step through a scripted plan, worker interruption, recovery and patch approval. No coding agents run in this demo.",
    standing: [{"label": "Status", "value": "Personal project, used locally"}, {"label": "Users", "value": "One: me"}, {"label": "Limits", "value": "Use peaked in June 2026; no measured productivity gain"}],
  },
  "scout-evidence-engine": {
    built: "A service that searches and groups calls, then reads examples to investigate recurring behavior.",
    value: "Connects a candidate explanation to the conversation turns and runtime events behind it.",
    evidence: "Research compared call representations and checked first-pass findings with a second model. Hosted search fixes were timed on the failing requests.",
    instruction: "Play the investigation replay, then open a candidate finding and inspect its evidence and remaining checks.",
    standing: [{"label": "Status", "value": "Deployed for internal staff; used by Platform Chat"}, {"label": "Research", "value": "Model cross-checks, not a human-labeled accuracy benchmark"}, {"label": "Limits", "value": "Prevalence counts still have known gaps; findings do not establish a customer fix"}],
  },
  "enterprise-voice-ai": {
    built: "An evaluation console, comparison APIs, tool-result capture and test-case catalog.",
    value: "Helps engineers inspect repeated attempts and compare releases using compatible test results.",
    evidence: "Comparisons exclude incompatible cases by reason. Tool outputs support diagnosis alongside the transcript.",
    instruction: "Select a result cell to inspect attempts, tool calls, returned values and the nearest older result.",
    standing: [{"label": "Status", "value": "Parts deployed in a client’s test environments"}, {"label": "Source", "value": "Release and feature branches; main coverage not fully confirmed"}, {"label": "Use", "value": "Used for engineering test suites; usage impact not measured"}],
  },
};
export function HeadlinerExperience({slug}:{slug:string}) {
  const demo = slug === "fortune-100-voice-ai" ? <LiveAgentsDemo/> : slug === "voice-runtime" ? <VoiceTurnDemo/> : slug === "voice-ai-platform" ? <PlatformTourDemo/> : slug === "platform-chat" ? <PlatformChatDemo/> : slug === "conversation-explorer" ? <CallReviewDemo/> : slug === "agent-architecture" ? <AgentControlRoomDemo/> : slug === "scout-evidence-engine" ? <ScoutViewerDemo/> : slug === "enterprise-voice-ai" ? <EvalConsoleDemo/> : null;
  if(!demo) return null;
  return <section id="product-demo" aria-label="Explore the product workflow" className="mx-auto max-w-7xl scroll-mt-6 px-4 pt-8 md:px-8"><div className="mb-4 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">Explore the experience</p><p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{HEADLINER_SUMMARIES[slug].instruction}</p></div><span className="text-xs text-neutral-600 dark:text-neutral-400">Reconstruction · fictional data</span></div>{slug === "fortune-100-voice-ai" && <div className="mb-8 border-y border-neutral-200 py-6 dark:border-neutral-700">
      <h2 className="mb-4 text-xl font-semibold dark:text-neutral-200">The workflow the integration supports</h2>
      <ol className="grid gap-4 text-sm leading-relaxed sm:grid-cols-2 lg:grid-cols-4 dark:text-neutral-300">
        <li><b className="block mb-1">1. Sign in and become ready</b>The virtual agent joins the contact-center platform before it can receive a call.</li>
        <li><b className="block mb-1">2. Handle the conversation</b>The voice agent verifies identity, discusses the account and invokes the relevant tools.</li>
        <li><b className="block mb-1">3. Transfer or disconnect</b>Call events must stay associated with the session they belong to.</li>
        <li><b className="block mb-1">4. Complete wrap-up</b>Cleanup and readiness transitions determine when the agent can receive another call.</li>
      </ol>
      <p className="mt-4 text-xs text-neutral-600 dark:text-neutral-400">A simplified view of the intended workflow, not a claim of end-to-end validation. The case study separates startup/readiness checks, simulator tests and the staging performance comparison.</p>
    </div>}<div data-product-demo={slug}>{demo}</div></section>;
}
