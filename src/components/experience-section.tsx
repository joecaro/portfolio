"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { CalendarIcon } from "@radix-ui/react-icons";

export function ExperienceSection() {
  const experiences = [
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
        "Monitored all {30+} employees to ensure quality of call performance",
      ],
    },
  ];

  return (
    <section className="w-full mb-48">
      <div className="container px-4 md:px-6 m-auto">
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-4xl dark:text-neutral-300">
            Experience
          </h2>
          <div className="w-full space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden rounded-md p-4 shadow-none">
                  <div className="p-6">
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
                    <div className="mt-4 pl-4 border-l">
                      <ul className="list-disc list-inside space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            key={i}
                            transition={{ delay: index * 0.1 + i * 0.05 }}
                            className="text-sm text-muted-foreground"
                          >
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
