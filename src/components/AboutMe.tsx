import React from "react";

export default function AboutMe() {
    return (
        <div className='dark:text-neutral-300 pb-40 sm:pb-40'>
            <h1 className='text-3xl mb-4'>Joseph Carothers</h1>
            <p>
                I’m a web developer specializing in creating interactive
                applications, company websites, and internal tools. While I
                primarily focus on front-end development, I’m equally
                comfortable working on the back-end, having built multiple
                server-side applications using the ExpressJS framework,
                integrating with both SQL and NoSQL databases.
            </p>
            <p className='mt-2'>
                Recently, I’ve worked at Action Network on a range of projects,
                from building tools that empower SEO teams to deliver high-value
                content, to developing a distributed promotion rendering
                platform powered by Web Components. This platform seamlessly
                runs across various clients, including WordPress and React
                applications.
            </p>
            <p className='mt-2'>
                I’m passionate about continually expanding my skills and
                knowledge, and I thrive on tackling challenging projects. Beyond
                web development, I explore a variety of other interests, which
                you can see reflected in my work below.
            </p>
        </div>
    );
}
