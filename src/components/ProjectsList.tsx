import Link from "next/link";
import ProjectCard from "./ProjectCard";
import MaxWidthContainer from "./styles/MaxWidthContainer";
import { Project } from "@/types";

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const featured = projects.filter((project) => project.tags.includes("featured"));
  if (!featured.length) return null;

  return (
    <MaxWidthContainer>
      <section className="pb-20 w-full z-10">
        <h2 className="text-4xl dark:text-neutral-300 pb-2">More projects</h2>
        <div className="list grid gap-20 py-8 overflow-hidden md:grid-cols-2 md:grid-rows-[repeat(auto-fit,minmax(200px,500px))]">
          {featured.map((project) => (
            <ProjectCard key={project.slug} filter="featured" project={project} />
          ))}
        </div>
        <div>
          <Link className="underline dark:text-neutral-300" href="/projects#archive">
            Older work and experiments are in the archive
          </Link>
        </div>
      </section>
    </MaxWidthContainer>
  );
}
