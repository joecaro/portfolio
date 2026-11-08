import { PlatformChatDemo } from "./mdx/PlatformChatDemo";
import { CallReviewDemo } from "./mdx/CallReviewDemo";
import { AgentControlRoomDemo } from "./mdx/AgentControlRoomDemo";
import { ScoutViewerDemo } from "./mdx/ScoutViewerDemo";
import { EvalConsoleDemo } from "./mdx/EvalConsoleDemo";
import { LiveAgentsDemo } from "./mdx/LiveAgentsDemo";
import { PlatformTourDemo } from "./mdx/PlatformTourDemo";
import { VoiceTurnDemo } from "./mdx/VoiceTurnDemo";

type ProjectSummary = {
  instruction: string;
  standing?: { label: string; value: string }[];
};

export const HEADLINER_SUMMARIES: Record<string, ProjectSummary> = {
  "fortune-100-voice-ai": {
    instruction: "Explore the illustrative agent-state table, then compare the original and optimized polling responses in a staging replay.",
    standing: [{"label": "Status", "value": "In production since September 2025"}, {"label": "Scope", "value": "Two lines of business at one Fortune 100 bank"}, {"label": "Workflows", "value": "Card and auto-loan workflows. Business-performance results are private."}],
  },
  "voice-runtime": {
    instruction: "Pick a turn, then apply the fix to see what changed. Conversation text is made up; slow-turn timings are real.",
    standing: [{"label": "Status", "value": "Latency and speech fixes merged and running in staging"}, {"label": "Checked by", "value": "Real test calls, a scripted test caller and targeted tests"}, {"label": "Limits", "value": "Second-call audio bug not fixed yet; nothing confirmed in production"}],
  },
  "voice-ai-platform": {
    instruction: "Choose a tool to explore its reconstructed workflow. Each tab links to the engineering case study.",
    standing: [{"label": "Evaluation", "value": "Parts deployed in a client’s test environments"}, {"label": "Call review", "value": "Shared redesign merged; enterprise re-port in review"}, {"label": "Investigation", "value": "Scout used internally; Platform Chat v2 not yet released"}],
  },
  "platform-chat": {
    instruction: "Choose a preset question and follow the scripted analysis through scope, search and answer.",
    standing: [{"label": "Status", "value": "v2 merged to main; release awaits live acceptance"}, {"label": "Users", "value": "Staff preview; no customer adoption established"}, {"label": "Validation", "value": "Synthetic-data and live-model evaluations; no measured time savings"}],
  },
  "conversation-explorer": {
    instruction: "Select a turn or timeline marker, inspect a tool result, or switch to the call-flow map.",
    standing: [{"label": "Shared product", "value": "Call-flow map and call-details redesign merged"}, {"label": "Enterprise port", "value": "Fixed re-port in review after rollback"}, {"label": "Use", "value": "Adoption and review-time improvements not measured"}],
  },
  "agent-architecture": {
    instruction: "Step through a scripted plan, worker interruption, recovery and patch approval. No coding agents run in this demo.",
    standing: [{"label": "Status", "value": "Personal project, used locally"}, {"label": "Users", "value": "One: me"}, {"label": "Limits", "value": "Use peaked in June 2026; no measured productivity gain"}],
  },
  "scout-evidence-engine": {
    instruction: "Play the investigation replay, then open a candidate finding and inspect its evidence and remaining checks.",
    standing: [{"label": "Status", "value": "Deployed for internal staff; used by Platform Chat"}, {"label": "Research", "value": "Model cross-checks, not a human-labeled accuracy benchmark"}, {"label": "Limits", "value": "Prevalence counts still have known gaps; findings do not establish a customer fix"}],
  },
  "enterprise-voice-ai": {
    instruction: "Select a result cell to inspect attempts, tool calls, returned values and the nearest older result.",
    standing: [{"label": "Status", "value": "Parts deployed in a client’s test environments"}, {"label": "Source", "value": "Release and feature branches; main coverage not fully confirmed"}, {"label": "Use", "value": "Used for engineering test suites; usage impact not measured"}],
  },
};
export function HeadlinerExperience({slug}:{slug:string}) {
  const demo = slug === "fortune-100-voice-ai" ? <LiveAgentsDemo/> : slug === "voice-runtime" ? <VoiceTurnDemo/> : slug === "voice-ai-platform" ? <PlatformTourDemo/> : slug === "platform-chat" ? <PlatformChatDemo/> : slug === "conversation-explorer" ? <CallReviewDemo/> : slug === "agent-architecture" ? <AgentControlRoomDemo/> : slug === "scout-evidence-engine" ? <ScoutViewerDemo/> : slug === "enterprise-voice-ai" ? <EvalConsoleDemo/> : null;
  if(!demo) return null;
  return <section id="product-demo" aria-label="Product demo" className="mx-auto max-w-6xl scroll-mt-6 px-4 pt-6 md:px-8"><div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"><p className="max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{HEADLINER_SUMMARIES[slug].instruction}</p><span className="text-xs text-neutral-600 dark:text-neutral-400">Reconstruction · fictional data</span></div><div data-product-demo={slug}>{demo}</div></section>;
}
