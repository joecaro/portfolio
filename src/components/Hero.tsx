"use client";

import React from "react";
import { ButtonLink } from "@/components/Button";
import Portrait from "./Portrait";
import MaxWidthContainer from "./styles/MaxWidthContainer";

const Hero = () => {
  return (
    <MaxWidthContainer>
      <div className="min-h-[80vh] flex flex-col items-center overflow-hidden py-8 relative gap-12 lg:grid lg:grid-cols-2 lg:flex-row lg:justify-between">
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
          <div>
            <p className="text-xl font-semibold text-blue-600">
              Joe Carothers · Founding Engineer at Salient
            </p>
          </div>
          <div>
            <h1 className="text-4xl font-bold dark:text-neutral-300">
              I build voice-AI products, from the interface to the live call.
            </h1>
          </div>
          <div>
            <p className="text-xl font-normal dark:text-neutral-300">
              I led engineering for a Fortune 100 bank deployment and build
              tools for testing, reviewing, and investigating AI calls.
            </p>
          </div>
          <ul className="grid gap-2 text-sm text-neutral-700 dark:text-neutral-300 sm:grid-cols-3">
            <li className="rounded-md border border-blue-200 bg-white/80 p-3 dark:border-neutral-600 dark:bg-neutral-800/80">
              Enterprise voice systems and the tools to operate them
            </li>
            <li className="rounded-md border border-blue-200 bg-white/80 p-3 dark:border-neutral-600 dark:bg-neutral-800/80">
              Led a Fortune 100 bank rollout, live since Sept 2025
            </li>
            <li className="rounded-md border border-blue-200 bg-white/80 p-3 dark:border-neutral-600 dark:bg-neutral-800/80">
              Python services, TypeScript, and React interfaces
            </li>
          </ul>
          <div className="flex flex-wrap gap-4 pt-2">
            <ButtonLink href="#selected-work-title">See selected work</ButtonLink>
            <ButtonLink
              variant="line"
              href="/files/Resume_Joseph_Carothers_05_26.pdf"
            >
              Resume
            </ButtonLink>
          </div>
        </div>

        <div className="flex flex-row-reverse md:flex-row items-start md:items-center gap-8 z-10 lg:flex-row lg:justify-between w-full lg:w-3/4">
          <Portrait page="home" />
          <div className="flex flex-col justify-around items-end gap-8">
            <ButtonLink variant="line" href="https://github.com/joecaro">
              GitHub
            </ButtonLink>
            <ButtonLink
              variant="line"
              href="https://www.linkedin.com/in/joseph-carothers-b36218132/"
            >
              LinkedIn
            </ButtonLink>
            <ButtonLink
              variant="line"
              href="mailto:joseph.samuel.carothers@gmail.com"
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
