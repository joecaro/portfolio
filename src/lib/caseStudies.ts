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
    description: "Voice agents call customers about overdue payments and can transfer them to bank staff. The system runs inside the bank’s network, with approved access to external models.",
    role: "Engineering lead",
    status: "In production since September 2025",
    contributions: [
      "Initial owner of the bank deployment",
      "Contact center and telephony integration",
      "Application, APIs, database and releases",
      "Telephony debugging and monitoring",
      "Call review and evaluation with the bank’s model-risk team",
    ],
    challenge: "Getting the bank deployment running",
    decision: [
      "The bank needed our voice agents to place collections calls through its existing contact center, inside a network it controlled. I was the only engineer assigned to the project at first. I worked with the bank’s business team on what the agents needed to do, managed the infrastructure and database, ran releases, and set up monitoring so I could investigate failures after deployment.",
      "The bank controlled access to production, so I built a test environment on our side that reproduced several of its services, including the interfaces that carry call and agent events (UIP and CTI). I ran our application against those services to see whether it could transfer a caller and handle a late ready event without making the agent available too early. When the bank approved a release, I checked the container image digest to confirm it had approved the same build we produced.",
      "The bank’s model-risk reviewers needed to see how the agent behaved on individual calls and what would change if we switched models. I walked them through the review tools and turned their feedback into engineering work. Call exports let them inspect individual conversations. We ran both model versions against the same test cases so reviewers could compare what changed without changing the test. We also documented where those evaluations fit: they gave reviewers evidence after a call ended, while the live agent handled the call separately.",
    ],
    result: "Card collections went live in September 2025. Auto loans followed in July 2026.",
    boundary: "The first release used a separate codebase for the bank. We’re still moving that work into the shared platform.",
  },
  "voice-ai-platform": {
    description: "Four tools for testing voice agents before a change and understanding what happened on calls afterward.",
    role: "Product and systems engineering",
    status: "Rollout varies by tool",
    contributions: [
      "Designed the operator workflows across evaluation, call review, investigation and conversational analytics.",
      "Built the rules for comparing runs and linking results back to the calls or test attempts behind them.",
    ],
    challenge: "What teams need to see before and after a release",
    decision: [
      "Before changing an agent, engineers need to know whether it still handles the same scenarios. I worked on the console that compares test runs and shows which cases it had to leave out.",
      "After a call, a reviewer may need to hear what the agent said or check whether an action really happened. I designed the review views to put the recording beside the system events. For questions that span many calls, Scout and Platform Chat take users back to the source conversations.",
    ],
    result: "The voice platform is in production at a Fortune 100 bank. The bank’s business and governance teams use the evaluation console. Scout and Platform Chat run in our main production environment.",
    boundary: "The shared call-review redesign merged to main. We haven’t measured adoption or time savings for these tools.",
  },
  "platform-chat": {
    description: "Staff can ask questions about call metrics and open the calls behind an answer.",
    role: "Product and architecture lead",
    status: "In production in our main environment",
    contributions: [
      "Designed how the service carries filters into queries and streams results back to the user.",
      "Built live-model evaluations around scope, access, citations and incomplete answers.",
    ],
    challenge: "Keeping a follow-up on the right calls",
    decision: [
      "A user might ask about one campaign, then follow up without naming it again. I designed the service to carry that filter into the query and enforce which customer data the user can access. The service also looks up what a metric means for that customer and campaign.",
      "If a metric could mean two things, the assistant can ask which one the user wants. If a source fails after some results come back, the interface shows the results it has and marks the answer as partial. I built tests that exercise those behaviors using the live model.",
    ],
    result: "Evaluations caught a serving-schema mismatch and citation-contract defects before release. The interface also preserves partial results when a source or final response fails.",
    boundary: "The evaluation results describe specific test runs. We haven’t measured customer adoption or time savings.",
  },
  "conversation-explorer": {
    description: "A workspace for listening to a call and checking what the system recorded at the same time.",
    role: "Product design and frontend engineering",
    status: "Shared views merged · enterprise port in review",
    contributions: [
      "Designed the transcript-first layout and linked selection across audio, tools and runtime events.",
      "Built a call-flow graph and list with consistent navigation and explicit data coverage.",
    ],
    challenge: "Rebuilding the timeline of a call",
    decision: [
      "An agent can tell a caller an action succeeded even when the system recorded a failure. I put the recording, transcript and timed tool events on the same clock so a reviewer can select an event and jump to the relevant audio.",
      "Some events arrive without timestamps. I put those in a separate activity list so they’re still available to the reviewer. Across a group of calls, the call-flow map shows which steps callers reached and where the available data ends.",
    ],
    result: "The shared call-flow map and call-details redesign merged to main. The views cover both individual calls and the paths calls take across agent stages.",
    boundary: "The enterprise re-port remains in review after a rollback. Usage and review-time improvements are unmeasured.",
  },
  "scout-evidence-engine": {
    description: "Scout helps staff look for recurring problems across calls and read the exchanges behind a finding.",
    role: "Research, product and systems engineering",
    status: "In production for internal staff",
    contributions: [
      "Led the work from research harness through ingestion, search, agent tools, CLI and report viewer.",
      "Compared call representations and built checks that reject citations the investigator cannot substantiate.",
    ],
    challenge: "Checking a pattern against the calls",
    decision: [
      "A dashboard can show an increase in transfers. To investigate, staff need to see what happened in the conversations before the transfer. I built Scout to find related calls by wording and meaning, group them by agent behavior, and read selected calls turn by turn.",
      "A report can sound plausible while citing a turn the system never read. I built checks for that, as well as wrong speakers and mismatched quotes. The report separates examples it found from estimates of how often a pattern occurs.",
    ],
    result: "Scout runs in our main production environment and powers investigations in Platform Chat. Its report separates a candidate observation from a verified cause.",
    boundary: "Citation checks confirm the underlying evidence. Human-validated accuracy is unmeasured, and prevalence counts still have known gaps.",
  },
  "enterprise-voice-ai": {
    description: "A console used by bank teams to review voice-agent tests and compare releases.",
    role: "Full-stack product engineering",
    status: "Used by business and governance teams at a Fortune 100 bank",
    contributions: [
      "Designed the evaluation grid and comparison APIs across cases, runs and repeated attempts.",
      "Added tool-result capture and stable test-case identity for diagnosing failures across runs.",
    ],
    challenge: "Comparing results when the tests change",
    decision: [
      "The bank’s business and governance teams use the same console that engineers use to run test suites. Reviewers can open a test attempt and see what the agent said, what its tools returned and why the grader gave it that result.",
      "A case can go from fail to pass because someone edited the test. I designed the comparison to count cases only when both runs used the same version and had equal numbers of completed, graded attempts. It explains why cases were excluded. I also separated one-off debugging runs from the history used to compare releases.",
    ],
    result: "Release comparisons now exclude incompatible cases by reason, including edited cases, errors and ungraded attempts. Engineers can inspect the transcript alongside completed tool results.",
    boundary: "The console is in use at the bank. Release status varies for the individual changes described here.",
  },
  "agent-architecture": {
    description: "A local workspace I built to run coding agents in separate Git checkouts and review their changes before merging.",
    role: "Sole designer and owner",
    status: "Personal project · one user",
    contributions: [
      "Designed durable job state and recovery so interrupted work stays visible and recoverable.",
      "Bound integration approval to a saved patch and checked the destination checkout separately.",
    ],
    challenge: "Recovering a job and reviewing the right patch",
    decision: [
      "If a worker disappeared, I needed to know whether its job could continue. I stored the job and its progress outside the worker so an interrupted implementation or chat run could return to the queue. Finished runs save a patch that survives deletion of the temporary checkout.",
      "I tied merge approval to the saved patch I reviewed. A newer run invalidates that approval. Before applying the patch, the workspace checks the destination checkout for changes.",
    ],
    result: "The app recorded 534 jobs and 83 automatic recoveries of implementation or chat runs. Lost reviews must be rerun.",
    boundary: "Historical local use, mostly June 2026. The later plan-approval layer ran one real plan; productivity gains were not measured.",
  },
};
