import Hero from "@/components/Hero";
import ProjectsList from "@/components/ProjectsList";
import getAllProjects from "@/lib/getAllProjects";
import { Form } from "./contact/page";

export default function Page({ Component, pageProps }: any) {
    const projects = getAllProjects();

    return (
        <div className='p-1 sm:p-3' id='main-container'>
            <Hero />
            <ProjectsList projects={projects} />
            <Form />
        </div>
    );
}
