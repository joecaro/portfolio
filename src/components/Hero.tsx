"use client";

import React from "react";
import { ButtonLink } from "@/components/Button";
import Portrait from "./Portrait";
import MaxWidthContainer from "./styles/MaxWidthContainer";

const Hero = () => {
  return (
    <MaxWidthContainer>
      <div className="min-h-[80vh] flex flex-col items-center py-8 relative gap-12 lg:grid lg:grid-cols-2 lg:flex-row lg:justify-between">
        <svg
          className={`absolute text-blue-100 dark:text-neutral-600 left-1/2 pointer-events-none`}
          width="508"
          height="952"
          viewBox="0 0 508 952"
          fill="none"
        >
          <line
            x1="1.65817"
            y1="345.882"
            x2="409.658"
            y2="950.882"
            stroke="currentColor"
            strokeWidth="4"
          />
          <line
            x1="25.6582"
            y1="259.882"
            x2="433.658"
            y2="864.882"
            stroke="currentColor"
            strokeWidth="4"
          />
          <line
            x1="49.6582"
            y1="173.882"
            x2="457.658"
            y2="778.882"
            stroke="currentColor"
            strokeWidth="4"
          />
          <line
            x1="73.6582"
            y1="87.8818"
            x2="481.658"
            y2="692.882"
            stroke="currentColor"
            strokeWidth="4"
          />
          <line
            x1="97.6582"
            y1="1.88176"
            x2="505.658"
            y2="606.882"
            stroke="currentColor"
            strokeWidth="4"
          />
        </svg>

        <div className="z-10 grid gap-2 dark:text-neutral-300">
          <div className="animate-slideInLeftDelay">
            <p className="text-xl font-semibold text-blue-600">
              Founding Engineer - Enterprise AI Platforms
            </p>
          </div>
          <div className="animate-slideInLeft duration-1000">
            <h1 className="text-4xl font-bold dark:text-neutral-300">
              I build production AI systems for high-stakes teams
            </h1>
          </div>
          <div className="animate-slideInLeftDelay">
            <h2 className="text-xl font-normal dark:text-neutral-300">
              I&apos;m Joe Carothers, a full-stack engineer turning AI voice,
              analytics, and workflow automation into enterprise products that
              handle live customer interactions at scale.
            </h2>
          </div>
          <ul className="grid gap-2 text-sm text-neutral-700 dark:text-neutral-300 sm:grid-cols-3">
            <li className="rounded-md border border-blue-200 bg-white/80 p-3 dark:border-neutral-600 dark:bg-neutral-800/80">
              ~1M AI interactions monitored monthly
            </li>
            <li className="rounded-md border border-blue-200 bg-white/80 p-3 dark:border-neutral-600 dark:bg-neutral-800/80">
              Fortune 100 production deployments
            </li>
            <li className="rounded-md border border-blue-200 bg-white/80 p-3 dark:border-neutral-600 dark:bg-neutral-800/80">
              Full-stack product and platform ownership
            </li>
          </ul>
          <ButtonLink
            color="purple"
            href="/files/Resume_Joseph_Carothers_05_26.pdf"
          >
            Resume
          </ButtonLink>
        </div>

        <div className="flex flex-row-reverse md:flex-row items-start md:items-center gap-8 z-10 lg:flex-row lg:justify-between w-full lg:w-3/4">
          <Portrait page="home" />
          <div className="flex flex-col justify-around items-end gap-8">
            <ButtonLink
              inverted
              animated
              color="purple"
              href="https://github.com/joecaro"
            >
              Github
            </ButtonLink>
            <ButtonLink
              inverted
              animated
              color="blue"
              href="https://www.linkedin.com/in/joseph-carothers-b36218132/"
            >
              LinkedIn
            </ButtonLink>
            <ButtonLink
              inverted
              animated
              color="red"
              href="mailto:joseph.samuel.carothers@gmail.com?subject=I Love Your Portfolio!&body=I really want you on my team."
            >
              Email
            </ButtonLink>
          </div>
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default Hero;
