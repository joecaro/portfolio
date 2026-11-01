import ContactForm from "@/components/ContactForm";
import { ExperienceSection } from "@/components/experience-section";
import Hero from "@/components/Hero";
import HeadlinerProjects from "@/components/HeadlinerProjects";
import ProjectsList from "@/components/ProjectsList";
import { getAllProjects } from "@/lib/getAllProjects";

export default async function Page() {
  const projects = await getAllProjects();

  return (
    <div className="p-1 sm:p-3" id="main-container">
      <Hero />
      <ExperienceSection />
      <HeadlinerProjects projects={projects} />
      <ProjectsList projects={projects.filter(project => !project.headliner)} />
      <ContactForm />
    </div>
  );
}
