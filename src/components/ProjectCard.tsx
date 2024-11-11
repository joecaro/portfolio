"use client";
import Link from "next/link";
import Image from "next/legacy/image";
import { Button } from "./Button";
import { Card } from "./ui/card";
import { cn } from "@/lib/tw";

type ProjectCardProps = {
  filter: string;
  setFilter?: (filter: string) => void;
  project: Project;
};

export default function ProjectCard({
  filter,
  setFilter,
  project,
}: ProjectCardProps) {
  return (
    <Card className={cn(`grid grid-areas gap-4 rounded-md p-8`)}>
      <div className="grid md:grid-rows-2 gap-4">
        <div className="relative hidden h-full w-full overflow-hidden md:block">
          <Image
            src={project.image}
            layout="fill"
            objectFit="contain"
            alt={`${project.name} - image`}
          />
        </div>
        <div className="grid p-2">
          <div className="header flex items-start gap-4">
            <Link href={`/projects/${project.slug}`} passHref>
              <div className="title text-2xl font-semibold underline cursor-pointer hover:opacity-50">
                {project.title}
              </div>
            </Link>
            <div className="links flex items-center gap-4">
              {project.demo && (
                <Link href={project.demo} passHref>
                  <svg
                    className={`demo`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                    <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                  </svg>
                </Link>
              )}
              {project.github && (
                <Link href={project.github} passHref>
                  <svg
                    className="github text-current hover:scale-110 hover:opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
          <p className="description my-4 text-neutral-700 dark:text-neutral-300 text-sm">
            {project.description}
          </p>
        </div>
      </div>
      <div className="stack flex flex-wrap">
        {project.stack.map((tech) => (
          <Button
            key={project.slug + tech}
            inverted={filter !== tech.toLowerCase()}
            onClick={() => setFilter && setFilter(tech.toLowerCase())}
            color="blue"
            className={`scale-75`}
          >
            {tech}
          </Button>
        ))}
      </div>
    </Card>
  );
}
