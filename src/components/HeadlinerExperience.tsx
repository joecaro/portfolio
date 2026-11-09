import { VoiceTurnDemo } from "./mdx/VoiceTurnDemo";
import { PlatformChatDemo } from "./mdx/PlatformChatDemo";
import { CallReviewDemo } from "./mdx/CallReviewDemo";
import { AgentControlRoomDemo } from "./mdx/AgentControlRoomDemo";
import { ScoutViewerDemo } from "./mdx/ScoutViewerDemo";
import { EvalConsoleDemo } from "./mdx/EvalConsoleDemo";
import { LiveAgentsDemo } from "./mdx/LiveAgentsDemo";
import { PlatformTourDemo } from "./mdx/PlatformTourDemo";

export const VOICE_RUNTIME_SUMMARY = {
    instruction: "Pick a turn, then apply the fix to see what changed. Conversation text is made up; slow-turn timings are real.",
    standing: [{"label": "Status", "value": "Latency and speech fixes merged and running in staging"}, {"label": "Checked by", "value": "Real test calls, a scripted test caller and targeted tests"}, {"label": "Limits", "value": "Second-call audio bug not fixed yet; nothing confirmed in production"}],
};

const instructions: Record<string, string> = {
  "fortune-100-voice-ai": "Play a sample call, follow the transcript and events, and select an agent to inspect its state.",
  "voice-ai-platform": "Choose a tool to explore its reconstructed workflow.",
  "platform-chat": "Choose a preset question and follow the scripted analysis.",
  "conversation-explorer": "Select a turn, timeline marker or tool result; switch to the call-flow map.",
  "scout-evidence-engine": "Play the investigation replay and inspect a candidate finding.",
  "enterprise-voice-ai": "Select a result cell to inspect attempts and tool results.",
  "agent-architecture": "Step through worker interruption, recovery and patch approval. No agents run here.",
};

export function HeadlinerExperience({ slug }: { slug: string }) {
  if (slug === "voice-runtime") {
    return <section id="product-demo" aria-label="Product demo" className="mx-auto max-w-6xl scroll-mt-6 px-4 pt-6 md:px-8"><p className="mb-3 text-sm text-neutral-600 dark:text-neutral-300">{VOICE_RUNTIME_SUMMARY.instruction}</p><div data-product-demo={slug}><VoiceTurnDemo /></div></section>;
  }
  const demo = slug === "fortune-100-voice-ai" ? <LiveAgentsDemo /> : slug === "voice-ai-platform" ? <PlatformTourDemo /> : slug === "platform-chat" ? <PlatformChatDemo /> : slug === "conversation-explorer" ? <CallReviewDemo /> : slug === "agent-architecture" ? <AgentControlRoomDemo /> : slug === "scout-evidence-engine" ? <ScoutViewerDemo /> : slug === "enterprise-voice-ai" ? <EvalConsoleDemo /> : null;
  if (!demo) return null;
  return <div><p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{instructions[slug]} <span className="font-medium">Uses fictional data.</span></p>{demo}</div>;
}
