import React from "react";

export default function AboutMe() {
    return (
        <div className='dark:text-neutral-300 pb-40 sm:pb-40'>
            <h1 className='text-3xl mb-4'>Joseph Carothers</h1>
            <p>
                I am a <strong> web developer</strong> creating interactive
                applications, company websites, and company tools. {"I've "}
                focused primarily on front-ent applications, but am comfortable
                working with back-end technologies having created serveral
                backend applications using the ExpressjS framework connecting to
                both SQL and NOSQL databases.
            </p>
            <p className='mt-2'>
                Recently I{"'"}ve worked at Action Network on projects ranging
                from tools empowering SEO teams to deliver high value content to
                powering a distributed promotion rendering platform using Web
                Components which run on a range of clients from wordpress to
                react applications.
            </p>
            <p className='mt-2'>
                I find fulfillment in taking on topics that expand my skills and
                knowledge. Beyond web development, you can see the product of
                some of my other interests below.
            </p>
        </div>
    );
}
