import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

// Define the directory for project files
const ProjectsDirectory = join(process.cwd(), "src/content");

// Function to get all project slugs
export function getProjectslugs(): string[] {
    return fs
        .readdirSync(ProjectsDirectory)
        .map(file => file.replace(/\.md$/, ""));
}

// Function to get a project by slug
export function getProjectBySlug(slug: string): Project {
    const fullPath = join(ProjectsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Format the date if present
    if (data.date) {
        data.date = new Date(data.date).toDateString();
    }

    const project = { ...data, content } as Project;

    return project;
}

// Function to get all projects
export default function getAllProjects(): Project[] {
    const slugs = getProjectslugs();
    const projects = slugs
        .map(slug => getProjectBySlug(slug))
        .sort((project1, project2) => {
            const date1 = new Date(project1.date);
            const date2 = new Date(project2.date);

            return date2.getTime() - date1.getTime(); // Sort in descending order
        });

    return projects;
}
