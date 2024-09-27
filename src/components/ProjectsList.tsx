"use client";

import Link from "next/link";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import ProjectCard from "./ProjectCard";
import MaxWidthContainer from "./styles/MaxWidthContainer";
import { Button } from "./Button";

export default function ProjectsList({ projects }: { projects: Project[] }) {
    const availableFilters = projects.reduce((acc, project) => {
        project.tags.forEach(tag => {
            if (!acc.includes(tag)) {
                acc.push(tag);
            }
        });
        return acc;
    }, [] as string[]).filter(Boolean);

    const [filter, setFilter] = useState("featured");

    return (
        <MaxWidthContainer>
            <section className='pb-20 w-full z-10'>
                <h2 className='text-2xl dark:text-neutral-200 mb-4'>
                    Projects
                </h2>
                <select
                    className='text-xl border border-neutral-200 rounded-md p-2 my-4 dark:bg-neutral-600 dark:text-neutral-300  md:hidden cursor-pointer'
                    title='Project Category Selector'
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                >
                    {availableFilters.map(category => (
                        <option key={category} value={category}>
                            {category.toUpperCase()}
                        </option>
                    ))}
                </select>
                <div className='hidden md:flex flex-wrap justify-between gap-8'>
                    {[
                        "Featured",
                        "ReactJS",
                        "NextJS",
                        "SolidJS",
                        "Javascript",
                        "C#",
                        "ML",
                    ].map(category => (
                        <Button
                            key={category}
                            inverted={filter !== category.toLowerCase()}
                            onClick={() => setFilter(category.toLowerCase())}
                            color='blue'
                        >
                            {category}
                        </Button>
                    ))}
                </div>
                <div className='list grid gap-20 py-8 overflow-hidden md:grid-cols-2 md:grid-rows-[repeat(auto-fit,minmax(200px,500px))]'>
                    {projects.map(project => {
                        return (
                            <CSSTransition
                                key={`${project.slug}-transition`}
                                in={project.tags.includes(filter)}
                                timeout={300}
                                classNames='project'
                                unmountOnExit
                                exit={false}
                            >
                                <ProjectCard
                                    filter={filter}
                                    setFilter={setFilter}
                                    project={project}
                                />
                            </CSSTransition>
                        );
                    })}
                </div>
                <div>
                    <Link className='dark:text-neutral-300' href='/projects'>
                        See All Projects...
                    </Link>
                </div>
            </section>
        </MaxWidthContainer>
    );
}
