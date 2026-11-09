export type CaseStudy = {
  description: string;
  role: string;
  status: string;
  contributions: string[];
  challenge: string;
  decision: string | string[];
  result: string;
  boundary: string;
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "fortune-100-voice-ai": {
    description: "We connected voice AI to a bank’s legacy contact center. The AI infrastructure was air-gapped except for approved model access.",
    role: "Engineering lead",
    status: "In production since September 2025",
    contributions: [
      "Led integration and maintenance alongside the bank’s engineers, spanning telephony, the legacy contact center and agent management.",
      "Led infrastructure work across the application, APIs and database, including releases into the bank’s environment.",
      "Maintained and debugged telephony and worked on on-prem monitoring: event ingestion, OpenTelemetry, dashboards and alerts.",
      "Worked directly with model-risk reviewers to turn their requirements into call review and evaluation tooling.",
    ],
    challenge: "From the first call to the next",
    decision: [
      "After a call ended, the voice agent still had to wait. The bank’s contact center sends a separate ready event when wrap-up is done. We built the software that handles sign-in, transfers and that handoff, so the agent only takes another call once it gets the matching event.",
      "I led the work on the application, APIs and database that supported the integration. In staging, we used a simulator to replay call and agent state changes. Before releases, we checked that the bank had approved the same images we built.",
      "When a call failed, I helped debug the telephony integration. I also worked on the systems that collected contact-center events and surfaced them through OpenTelemetry instrumentation, dashboards and alerts. Separately, I worked with model-risk reviewers on call exports and repeatable evaluations so they could inspect calls and compare model changes.",
    ],
    result: "The bank launched voice agents for card collections in September 2025 and added auto loans in July 2026.",
    boundary: "The first launch used a bank-specific codebase. Consolidation into the shared platform is still underway.",
  },
  "voice-ai-platform": {
    description: "I designed four tools that give engineers the evidence they need to check release verdicts, individual calls, recurring patterns and analytics answers.",
    role: "Product and systems engineering",
    status: "Rollout varies by tool",
    contributions: [
      "Designed the operator workflows across evaluation, call review, investigation and conversational analytics.",
      "Built the rules for comparing runs and linking results back to the calls or test attempts behind them.",
    ],
    challenge: "What each tool shows",
    decision: "A release verdict needs comparable test attempts. A call review needs the recording and tool events. An investigation needs source turns, while an analytics answer needs its query scope and supporting calls. I designed each workflow around the evidence its users need to check the result.",
    result: "Engineers use the evaluation console; shared call-review views merged to main; Scout is used internally. Platform Chat v2 still awaits live acceptance.",
    boundary: "Release status varies by tool. We haven’t measured adoption or time savings.",
  },
  "platform-chat": {
    description: "I designed an AI analyst to keep metrics and call evidence tied to the same scope as the conversation changes.",
    role: "Product and architecture lead",
    status: "Staff preview · v2 release pending",
    contributions: [
      "Designed how the service carries filters into queries and streams results back to the user.",
      "Built live-model evaluations around scope, access, citations and incomplete answers.",
    ],
    challenge: "Keep the answer tied to the data the user asked for",
    decision: "I designed the runtime so the server enforces customer access and carries the selected scope into the query. A catalog resolves which metric definition applies. When the definition is ambiguous or a source fails, the analyst can ask a question or show what it found so far.",
    result: "Evaluations caught a serving-schema mismatch and citation-contract defects before release. The interface also preserves partial results when a source or final response fails.",
    boundary: "v2 is merged to main but live acceptance is not passing yet. No customer adoption or time-saved outcome is established.",
  },
  "conversation-explorer": {
    description: "I designed a workspace for reconstructing what happened on a call when speech, audio and system events tell different parts of the story.",
    role: "Product design and frontend engineering",
    status: "Shared views merged · enterprise port in review",
    contributions: [
      "Designed the transcript-first layout and linked selection across audio, tools and runtime events.",
      "Built a call-flow graph and list with consistent navigation and explicit data coverage.",
    ],
    challenge: "Reconstruct a call from evidence with different clocks and gaps",
    decision: "I aligned the transcript, recording and timed tool events on the audio clock, with shared selection so a reviewer can jump to the relevant moment. Events without timestamps remain in a separate activity list. The call-flow map shows which stages we have data for across a group of calls.",
    result: "The shared call-flow map and call-details redesign merged to main. The views cover both individual calls and the paths calls take across agent stages.",
    boundary: "The enterprise re-port remains in review after a rollback. Usage and review-time improvements are unmeasured.",
  },
  "scout-evidence-engine": {
    description: "I built an investigator that finds candidate patterns across calls and checks the evidence behind each finding.",
    role: "Research, product and systems engineering",
    status: "Deployed for internal staff",
    contributions: [
      "Led the work from research harness through ingestion, search, agent tools, CLI and report viewer.",
      "Compared call representations and built checks that reject citations the investigator cannot substantiate.",
    ],
    challenge: "Turn thousands of calls into findings someone can verify",
    decision: "Scout searches by wording and meaning, groups related calls by what the agent did, and reads selected calls turn by turn. I built checks that reject citations to turns it never read, mismatched quotes and wrong speakers. The report keeps supporting examples separate from estimates of how common the behavior is.",
    result: "Scout is available internally and powers investigations in Platform Chat. Its report separates a candidate observation from a verified cause.",
    boundary: "Citation checks confirm the underlying evidence. Human-validated accuracy is unmeasured, and prevalence counts still have known gaps.",
  },
  "enterprise-voice-ai": {
    description: "I built tools to tell whether a voice-agent release changed behavior when test cases, retries and grades can all change between runs.",
    role: "Full-stack product engineering",
    status: "Console used by engineers; rollout varies by component",
    contributions: [
      "Designed the evaluation grid and comparison APIs across cases, runs and repeated attempts.",
      "Added tool-result capture and stable test-case identity for diagnosing failures across runs.",
    ],
    challenge: "Compare releases on the same tests",
    decision: "I designed the comparison to count only the same case version with equal numbers of completed, graded attempts. It explains exclusions and keeps scratch runs out of release history. Reviewers can open an attempt to see what the agent said alongside what its tools returned.",
    result: "Release comparisons now exclude incompatible cases by reason, including edited cases, errors and ungraded attempts. Engineers can inspect the transcript alongside completed tool results.",
    boundary: "Work spans feature and release branches; main coverage is not fully confirmed. Usage impact has not been measured.",
  },
  "agent-architecture": {
    description: "I built a local control room that can recover interrupted implementation and chat jobs and gates merges on the saved patch I approved.",
    role: "Sole designer and owner",
    status: "Personal project · one user",
    contributions: [
      "Designed durable job state and recovery so interrupted work stays visible and recoverable.",
      "Bound integration approval to a saved patch and checked the destination checkout separately.",
    ],
    challenge: "Keep work and approvals valid when workers come and go",
    decision: "Jobs and their state live outside the worker. An interrupted implementation can return to the queue, and a finished diff survives worktree deletion. Approval applies to the saved patch and expires when a newer run replaces it. The merge checks the destination checkout separately.",
    result: "The app recorded 534 jobs and 83 automatic recoveries of implementation or chat runs. Lost reviews must be rerun.",
    boundary: "Historical local use, mostly June 2026. The later plan-approval layer ran one real plan; productivity gains were not measured.",
  },
};
