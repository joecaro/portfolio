import React from "react";

export default function AboutMe() {
  return (
    <div className="dark:text-neutral-300 pb-40 sm:pb-40 z-10">
      <h1 className="text-3xl mb-4">Joseph Carothers</h1>
      <p>
        I&apos;m a full-stack product engineer focused on AI systems that have
        to work in production. At Salient, I build the platform surfaces and
        voice-agent infrastructure behind enterprise customer communication
        workflows, including reporting, analytics, compliance review, and agent
        orchestration for major financial institutions.
      </p>
      <p className="mt-2">
        My recent work spans the full stack: React product surfaces, APIs,
        databases, SIP and call infrastructure, conversational memory,
        interruption handling, speech timing, text normalization, and data
        pipelines that turn large volumes of customer interactions into useful
        operational insight.
      </p>
      <p className="mt-2">
        I care most about making complex systems usable. Whether I&apos;m shipping
        a self-serve conversation-flow builder, a custom reporting interface, or
        infrastructure for live AI calls, I try to keep the user workflow clear
        while preserving the technical depth needed for reliability and scale.
      </p>
      <p className="mt-2">
        Previously at Action Network, I built reusable promotion-rendering
        systems, internal operations tools, and user-facing sports products
        tied to measurable revenue and workflow outcomes. Before that, at CMDI,
        I combined client support, product feedback, and front-end development
        to build tools for teams managing hundreds of accounts.
      </p>
      <p className="mt-2">
        The common thread is pragmatic product engineering: understand the
        workflow, build the system, and make the result easy for real teams to
        trust.
      </p>
    </div>
  );
}
