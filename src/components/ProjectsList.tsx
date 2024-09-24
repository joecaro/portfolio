"use client";

import Link from "next/link";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import ProjectCard from "./ProjectCard";
import MaxWidthContainer from "./styles/MaxWidthContainer";
import { Button } from "./Button";

export default function ProjectsList({ projects }: { projects: Project[] }) {
    const [filter, setFilter] = useState("featured");
    return (
        <MaxWidthContainer>
            <section className='pb-20 w-full z-10'>
                <h2 className='text-2xl'>Projects</h2>
                <select
                    className='text-xl border border-neutral-200 rounded-md p-2 my-4 dark:bg-neutral-600 dark:text-neutral-300  md:hidden cursor-pointer'
                    title='Project Category Selector'
                    onChange={e => setFilter(e.target.value)}
                >
                    <option value='featured'>Featured</option>
                    <option value='reactjs'>ReactJS</option>
                    <option value='nextjs'>NextJS</option>
                    <option value='solidjs'>SolidJS</option>
                    <option value='javascript'>Javascript</option>
                    <option value='c#'>C#</option>
                    <option value='game'>Game Dev</option>
                    <option value='blockchain'>Blockchain</option>
                    <option value='ml'>Machine Learning</option>
                </select>
                <div className='filter-select hidden md:flex flex-wrap justify-between gap-8'>
                    {[
                        "Featured",
                        "ReactJS",
                        "NextJS",
                        "Javascript",
                        "C#",
                        "Game",
                        "Blockchain",
                        "ML",
                        "SolidJS",
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
                    <Link href='/projects'>See All Projects...</Link>
                </div>
            </section>
        </MaxWidthContainer>
    );
}
