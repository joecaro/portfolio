import Head from "next/head";
import ProjectCard from "../../components/ProjectCard";
import getAllProjects from "../../lib/getAllProjects";
import ContactForm from "@/components/ContactForm";

export default function Page() {
    const projects = getAllProjects([
        "slug",
        "title",
        "description",
        "stack",
        "github",
        "demo",
        "image",
        "position",
    ]);

    const sortedProjects = projects.sort((a, b) => a.position - b.position);

    return (
        <>
            <Head>
                <title>Joseph Carothers</title>
                <meta
                    name='description'
                    content='Web Development Portfolio for Joseph Carothers'
                />
            </Head>

            <div className="max-w-5xl m-auto py-32 px-4">
                <h1>Projects</h1>

                <div
                    style={{
                        display: "grid",
                        gap: "5rem",
                        height: "100%",
                    }}
                >
                    {sortedProjects.map((project) => {
                        return (
                            <ProjectCard
                                key={project.slug}
                                project={project}
                                filter=''
                            />
                        );
                    })}
                </div>
                <ContactForm />
            </div>
        </>
    );
}