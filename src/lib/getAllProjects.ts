import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

// Define the directory for project files
const ProjectsDirectory = join(process.cwd(), "src/content");

// Function to get all project slugs
export function getProjectslugs(): string[] {
    return fs.readdirSync(ProjectsDirectory);
}

// Function to get a project by slug
export function getProjectBySlug(slug: string): Project {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(ProjectsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Format the date if present
    if (data.date) {
        data.date = new Date(data.date).toDateString();
    }

    const project = data as Project;

    return project;
}

// Function to get all projects
export default function getAllProjects(
    fields: string[] = []
): Project[] {
    const slugs = getProjectslugs();
    const projects = slugs
        .map(slug => getProjectBySlug(slug))
        .sort((project1, project2) =>
            new Date(project1.date || 0) > new Date(project2.date || 0) ? -1 : 1
        );

    return projects;
}
