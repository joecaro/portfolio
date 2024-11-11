import ContactForm from "@/components/ContactForm";
import { ExperienceSection } from "@/components/experience-section";
import Hero from "@/components/Hero";
import ProjectsList from "@/components/ProjectsList";
import getAllProjects from "@/lib/getAllProjects";

export default function Page() {
    const projects = getAllProjects();

    return (
        <div className='p-1 sm:p-3' id='main-container'>
            <Hero />
            <ExperienceSection />
            <ProjectsList projects={projects} />
            <ContactForm />
        </div>
    );
}
