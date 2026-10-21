"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { CalendarIcon } from "@radix-ui/react-icons";

export function ExperienceSection() {
  const experiences = [
    {
      company: "Salient",
      location: "San Francisco, CA",
      role: "Founding Engineer",
      period: "01/2025 - Present",
      achievements: [
        "Build and own customer-facing platform surfaces — user management, reporting, analytics, and human-in-the-loop compliance review — for enterprise customers monitoring ~1M AI-driven phone interactions a month.",
        "Developed core AI voice-agent infrastructure — conversational memory, interruption handling, speech timing, and text normalization — powering tens of thousands of live calls daily with sub-second response times.",
        "Led engineering for a Fortune 100 financial institution, adapting the full platform (frontend, APIs, agent orchestration, SIP, databases) to run inside a highly restricted enterprise environment and taking it from pilot to production.",
        "Now leading self-serve product work: a visual conversation-flow builder for designing and managing AI agents, and an AI-powered reporting builder that generates custom reporting UIs on demand.",
        "Expanding the platform into new communication channels like SMS to broaden how AI agents reach customers",
      ],
    },
    {
      company: "Action Network",
      location: "Remote",
      role: "Software Engineer",
      period: "07/2022 - 10/2024",
      achievements: [
        "Achieved multi-million in revenue by creating a reusable UI component library for consistent promotion rendering across platforms & properties",
        "Built multiple internal tools for the operations team, streamlining promotional content planning & management",
        "Developed user-facing products focused on bet-tracking and user engagement enhancement",
        "Led cross-functional teams on projects from ideation to deployment, ensuring alignment with business goals",
        "Worked closely with stakeholders to optimize user experience and feature functionality across multiple products",
      ],
    },
    {
      company: "CMDI",
      location: "Tysons Corner, VA",
      role: "Client Representative & Front End Developer",
      period: "04/2020 - 07/2022",
      achievements: [
        "Created and Managed marketing/blog website using a headless CMS & NextJS",
        "Mock up designs for new features using Adobe XD and HTML/CSS",
        "Develop tools for the support team including web applications to manage 150+ clients",
        "Communicate bugs to development team through an agile project management tool",
        "Assist in development of new features through product meetings",
        "Provide support for three online products through emails, chats, calls, and scheduled trainings",
        "Manage 200+ client accounts to ensure satisfaction with products and services",
        "Created and curated helpdesk content on the Zendesk platform",
      ],
    },
    {
      company: "Cherry Communications",
      location: "Tallahassee, FL",
      role: "Supervisor",
      period: "05/2019 - 04/2020",
      achievements: [
        "Promoted within 8 months for exceeding employee standards",
        "Led training of new employees",
        "Monitored all 30+ employees to ensure quality of call performance",
      ],
    },
  ];

  const [open, setOpen] = useState<Record<string, boolean>>({
    [experiences[0].company]: true,
  });

  return (
    <section className="w-full mb-48">
      <div className="container px-4 md:px-6 m-auto">
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-4xl dark:text-neutral-300">
            Experience
          </h2>
          <div className="w-full space-y-6">
            {experiences.map((exp, index) => {
              const isOpen = !!open[exp.company];
              const shown = isOpen
                ? exp.achievements
                : exp.achievements.slice(0, 1);
              const hidden = exp.achievements.length - 1;

              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="relative overflow-hidden rounded-md border-2 p-4 shadow-none dark:bg-neutral-800">
                    <div className="p-2 sm:p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                          <h3 className="text-2xl font-semibold">
                            {exp.company}
                          </h3>
                          <p className="text-lg text-muted-foreground">
                            {exp.role}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 sm:items-end">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarIcon className="h-4 w-4" />
                            {exp.period}
                          </div>
                        </div>
                      </div>
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        {shown.map((achievement) => (
                          <li key={achievement}>{achievement}</li>
                        ))}
                      </ul>
                      {hidden > 0 && (
                        <Button
                          size="sm"
                          variant="line"
                          className="mt-4"
                          pressed={isOpen}
                          onClick={() =>
                            setOpen({ ...open, [exp.company]: !isOpen })
                          }
                        >
                          {isOpen ? "Show less" : `Show ${hidden} more`}
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
