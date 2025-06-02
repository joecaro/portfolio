import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { serialize } from 'next-mdx-remote-client/serialize';
import type { Project } from '@/types';
import remarkGfm from 'remark-gfm';

// Define the directory for project files
const ProjectsDirectory = join(process.cwd(), "src/content");

// Function to get all project slugs
export function getProjectslugs(): string[] {
    return fs
        .readdirSync(ProjectsDirectory)
        .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
        .map(file => file.replace(/\.mdx?$/, ""));
}

// Function to get a project by slug
export async function getProjectBySlug(slug: string): Promise<Project> {
    // Try .mdx first, then .md
    let fullPath = join(ProjectsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
        fullPath = join(ProjectsDirectory, `${slug}.md`);
    }
    
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Format the date if present
    if (data.date) {
        data.date = new Date(data.date).toDateString();
    }

    const isMDX = fullPath.endsWith('.mdx');
    let mdxSource = null;

    // Serialize MDX content if it's an MDX file
    if (isMDX) {
        try {
            mdxSource = await serialize({ 
                source: content,
                options: {
                    mdxOptions: {
                        remarkPlugins: [remarkGfm],
                        rehypePlugins: [],
                    }
                }
            });
        } catch (error) {
            console.error(`Error serializing MDX for ${slug}:`, error);
        }
    }

    const project = { 
        ...data, 
        content, 
        isMDX,
        mdxSource
    } as Project;

    return project;
}

// Function to get all projects
export async function getAllProjects(): Promise<Project[]> {
    const slugs = getProjectslugs();
    const projects = await Promise.all(slugs.map(slug => getProjectBySlug(slug)));

    return projects.sort((a, b) => {
        if (a.date && b.date) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
    });
}
