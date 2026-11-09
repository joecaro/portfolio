import type { Metadata } from "next";
import AboutMe from "@/components/AboutMe";
import { Circle, Diagonal } from "@/components/AboutMeAnimations";
import HobbySectionComponent from "@/components/hobby-section";
import Portrait from "@/components/Portrait";

export const metadata: Metadata = {
    title: "About | Joseph Carothers",
    description:
        "Joseph Carothers is a founding engineer building production AI systems, voice agents and software for enterprise teams.",
};

const pillars = [
    {
        icon: "</>",
        title: "Developer",
        description:
            "Python services and TypeScript interfaces for running and investigating AI calls.",
        items: [
            "AI voice infrastructure",
            "Operator interfaces",
            "Real-time analytics",
            "API and data architecture",
        ],
    },
    {
        icon: "✎",
        title: "Designer",
        description:
            "Call timelines, flow maps and evaluation screens that put the information an operator needs together.",
        items: [
            "Conversation-flow builders",
            "Dashboards",
            "Human-in-the-loop review",
            "Reporting UX",
        ],
    },
    {
        icon: "↗",
        title: "Owner",
        description:
            "Integration, release planning and ongoing engineering for a bank deployment.",
        items: [
            "Fortune 100 rollout",
            "Contact-center integration",
            "Release validation",
            "Model-review collaboration",
        ],
    },
];

const teamwork = [
    {
        title: "Working across the system",
        points: [
            "At the bank, integration work means coordinating with the engineers who own telephony, infrastructure and model review. I turn those constraints into implementation and release plans for our team.",
            "I write down service boundaries and failure paths so a teammate can pick up an investigation without reconstructing the system from scratch.",
        ],
    },
    {
        title: "Designing around the work",
        points: [
            "For call review, I started with screenshots and real review workflows. The resulting layout keeps the transcript, recording and runtime actions together.",
            "I use coding agents extensively. I own the design decisions, review the result and check behavior against the system it has to work in.",
        ],
    },
];

const path = [
    {
        years: "2019 to 2020",
        role: "Supervisor",
        company: "Cherry Communications",
        note: "Promoted in 8 months. Trained new hires and monitored call quality for a 30+ person team.",
    },
    {
        years: "2020 to 2022",
        role: "Client rep and front-end developer",
        company: "CMDI",
        note: "Supported 200+ client accounts, then built the tools that support team needed.",
    },
    {
        years: "2022 to 2024",
        role: "Software engineer",
        company: "Action Network",
        note: "A shared UI component library, plus tools for promotional workflows.",
    },
    {
        years: "2025 to now",
        role: "Founding engineer",
        company: "Salient",
        note: "Voice AI agents and the platform around them; I led a Fortune 100 bank deployment.",
    },
];

const About = () => {
    return (
        <main>
            <section className='relative mt-6 grid grid-rows-[300px_1fr] place-items-center gap-16 overflow-hidden bg-blue-400 px-4 pt-20 md:grid-cols-[300px_1fr] md:grid-rows-1 md:px-8 dark:bg-neutral-800'>
                <Portrait page='' />
                <AboutMe />
                <Circle />
                <Diagonal height='-550px' delayMultiplier={0.9} />
                <Diagonal height='-250px' delayMultiplier={1.2} />
                <Diagonal height='-400px' delayMultiplier={1.4} />
            </section>

            <section
                aria-label='How I work'
                className='relative mx-auto -mt-20 max-w-[1180px] px-4'
            >
                <div className='grid gap-10 rounded-lg border-[3px] border-l-neutral-200 border-t-neutral-200 border-r-neutral-700 border-b-neutral-700 bg-white p-8 shadow-[2px_2px_0_rgba(0,0,0,0.2)] md:grid-cols-3 md:p-11 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200'>
                    {pillars.map(pillar => (
                        <div key={pillar.title} className='flex flex-col gap-3.5'>
                            <div className='flex items-center gap-3.5'>
                                <span
                                    aria-hidden='true'
                                    className='grid h-[52px] w-[52px] place-items-center rounded-md border-[3px] border-l-blue-300 border-t-blue-300 border-r-blue-900 border-b-blue-900 bg-blue-400 text-xl font-bold text-white shadow-[2px_2px_0_rgba(0,0,0,0.25)]'
                                >
                                    {pillar.icon}
                                </span>
                                <h2 className='text-2xl font-semibold'>
                                    {pillar.title}
                                </h2>
                            </div>
                            <p className='text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300'>
                                {pillar.description}
                            </p>
                            <ul className='flex flex-wrap gap-2'>
                                {pillar.items.map(item => (
                                    <li
                                        key={item}
                                        className='rounded border border-blue-200 bg-blue-50 px-2.5 py-1 text-[13px] text-blue-800 dark:border-neutral-500 dark:bg-neutral-800 dark:text-blue-300'
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby='teamwork-title' className='mx-auto flex max-w-6xl flex-col gap-7 px-4 pt-24 md:px-8 dark:text-neutral-200'>
                <div className='flex flex-col gap-2'>
                    <h2 id='teamwork-title' className='text-3xl font-semibold'>Working with a team</h2>
                    <p className='max-w-[60ch] text-neutral-600 dark:text-neutral-400'>
                        I work with product teams, engineers and customers.
                    </p>
                </div>
                <div className='grid gap-5 md:grid-cols-2'>
                    {teamwork.map(group => (
                        <div key={group.title} className='rounded-lg border-2 border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900'>
                            <h3 className='mb-3 text-lg font-semibold'>{group.title}</h3>
                            <ul className='flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300'>
                                {group.points.map(point => <li key={point}>{point}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className='mx-auto flex max-w-6xl flex-col gap-7 px-4 pb-6 pt-24 md:px-8 dark:text-neutral-200'>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-3xl font-semibold'>Work history</h2>
                    <p className='max-w-[60ch] text-neutral-600 dark:text-neutral-400'>
                        I started in customer support before moving into software engineering.
                    </p>
                </div>
                <ol className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
                    {path.map(step => (
                        <li
                            key={step.company}
                            className='flex flex-col gap-2 rounded-lg border-2 border-neutral-200 bg-white p-5 transition hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[6px_6px_0_#1e3a8a] motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0 dark:border-neutral-700 dark:bg-neutral-900'
                        >
                            <span className='text-[13px] font-bold text-blue-600 dark:text-blue-400'>
                                {step.years}
                            </span>
                            <span className='text-lg font-semibold'>
                                {step.role}
                            </span>
                            <span className='text-sm text-neutral-600 dark:text-neutral-400'>
                                {step.company}
                            </span>
                            <span className='text-sm leading-relaxed text-neutral-700 dark:text-neutral-300'>
                                {step.note}
                            </span>
                        </li>
                    ))}
                </ol>
            </section>

            <HobbySectionComponent />
        </main>
    );
};

export default About;
