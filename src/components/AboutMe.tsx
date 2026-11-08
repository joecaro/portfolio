import React from "react";
import { ButtonLink } from "@/components/Button";

export default function AboutMe() {
  return (
    <div className="z-10 flex flex-col gap-5 pb-40 text-slate-900 dark:text-neutral-200">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        Hi, I&apos;m Joe.
      </h1>
      <p className="max-w-[58ch] text-lg leading-relaxed">
        I started in customer support, answering questions and tracking work
        in spreadsheets. I began building tools for our team, then moved into
        software engineering. I still like working close to the people using
        what I build.
      </p>
      <p className="max-w-[58ch] text-base leading-relaxed">
        Today I&apos;m a founding engineer at Salient. My work spans the voice
        systems handling a call, the services behind them, and the interfaces
        people use to operate them. I also lead engineering for a Fortune 100
        bank deployment.
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
