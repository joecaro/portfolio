import React from "react";
import { ButtonLink } from "@/components/Button";

export default function AboutMe() {
  return (
    <div className="z-10 flex flex-col gap-5 pb-40 text-slate-900 dark:text-neutral-200">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        Hi, I&apos;m Joe.
      </h1>
      <p className="max-w-[58ch] text-lg leading-relaxed">
        I&apos;m a full-stack product engineer focused on AI systems that have
        to work in production. At Salient I build the platform surfaces and
        voice-agent infrastructure behind customer communication for major
        financial institutions.
      </p>
      <p className="max-w-[58ch] text-base leading-relaxed">
        I care most about making complex systems usable: understand the
        workflow, build the system, and make the result easy for real teams to
        trust.
      </p>
      <div className="flex flex-wrap gap-4 pt-1">
        <ButtonLink
          variant="line"
          href="/files/Resume_Joseph_Carothers_05_26.pdf"
        >
          Resume
        </ButtonLink>
        <ButtonLink variant="line" href="/projects">
          Projects
        </ButtonLink>
      </div>
    </div>
  );
}
