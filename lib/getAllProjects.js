import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const ProjectsDirectory = join(process.cwd(), "content");

export function getProjectslugs() {
  return fs.readdirSync(ProjectsDirectory);
}

export function getProjectBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(ProjectsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  data.date = new Date(data.date).toDateString();

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export default function getAllProjects(fields = []) {
  const slugs = getProjectslugs();
  const Projects = slugs
    .map((slug) => getProjectBySlug(slug, fields))
    // sort Projects by date in descending order
    .sort((post1, post2) =>
      new Date(post1.date) > new Date(post2.date) ? -1 : 1
    );
  return Projects;
}
