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
        "Lead engineering for a Fortune 100 bank deployment: contact-center integration, infrastructure, release coordination and model-review work. Live since September 2025, with a second line of business added in July 2026.",
        "Build the platform's call-review, evaluation and investigation tools, spanning React interfaces, Python services and AI-agent workflows.",
        "Work on voice-agent infrastructure, including conversational memory, interruption handling, speech timing and text normalization.",
        "Develop self-serve agent design and reporting tools; this is ongoing product work.",
      ],
    },
    {
      company: "Action Network",
      location: "Remote",
      role: "Software Engineer",
      period: "07/2022 - 10/2024",
      achievements: [
        "Built a shared UI component library adopted across multiple products",
        "Built internal tools for planning and managing promotional content",
        "Developed user-facing bet-tracking features",
      ],
    },
    {
      company: "CMDI",
      location: "Tysons Corner, VA",
      role: "Client Representative & Front End Developer",
      period: "04/2020 - 07/2022",
      achievements: [
        "Built a Next.js marketing site with a headless CMS and internal tools for tracking client reporting work.",
        "Supported more than 200 client accounts through product questions, training and reporting periods.",
      ],
    },
    {
      company: "Cherry Communications",
      location: "Tallahassee, FL",
      role: "Supervisor",
      period: "05/2019 - 04/2020",
      achievements: [
        "Promoted to supervisor within eight months; trained new hires and monitored call quality for a team of more than 30.",
      ],
    },
  ];

  const [open, setOpen] = useState<Record<string, boolean>>({
    [experiences[0].company]: true,
  });

  return (
    <section className="w-full mb-20">
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
