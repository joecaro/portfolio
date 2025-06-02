import AboutMe from "@/components/AboutMe";
import { Circle, Diagonal } from "@/components/AboutMeAnimations";
import HobbySectionComponent from "@/components/hobby-section";
import Portrait from "@/components/Portrait";
import Link from "next/link";

const sections = [
    {
        title: "Developer",
        description:
            "I build intelligent systems that bridge cutting-edge AI with intuitive user experiences. My expertise spans full-stack development, real-time data processing, and creating scalable architectures that handle millions of interactions seamlessly.",
        subTitle: "Core Technologies",
        subDescription: "React, TypeScript, Node.js, Python, SQL, GraphQL",
        list: {
            title: "Specializations",
            items: [
                "Real-time Systems",
                "AI Integration",
                "Data Visualization", 
                "System Architecture",
                "Performance Optimization",
                "API Design",
            ],
        },
    },
    {
        title: "Designer",
        description:
            "I believe great software starts with thoughtful design. I create interfaces that make complex data understandable and powerful systems approachable, focusing on user experience that drives business results.",
        subTitle: "Design Philosophy",
        subDescription: "User-Centered Design, Data Storytelling, System Thinking",
        list: {
            title: "Design Focus",
            items: [
                "Interactive Dashboards",
                "Data Visualization",
                "User Experience",
                "System Interfaces",
                "Responsive Design",
                "Accessibility",
            ],
        },
    },
    {
        title: "Experience",
        description:
            "From AI-powered financial platforms to distributed rendering systems, I've led development on projects that scale to millions of users and process vast amounts of real-time data.",
        subTitle: "Impact Areas",
        subDescription: "Financial Services, AI Systems, Enterprise Platforms",
        list: {
            title: "Featured Projects",
            link: "/projects",
            items: [
                "AI Communication Platform",
                "Real-time Analytics Engine",
                "Enterprise User Management",
                "Data Pipeline Architecture",
                "Interactive Visualization",
                "Performance Optimization",
            ],
        },
    },
];

const About = () => {
    return (
        <div>
            <section
                className={`relative grid bg-blue-400 dark:bg-neutral-800 mt-16 pt-20 px-4 gap-16 grid-rows-[300px_1fr] place-items-center overflow-hidden md:grid-cols-[300px_1fr] md:grid-rows-1`}
            >
                <Portrait page='' />
                <AboutMe />
                <Circle />
                <Diagonal height='-550px' delayMultiplier={0.9} />
                <Diagonal height='-250px' delayMultiplier={1.2} />
                <Diagonal height='-400px' delayMultiplier={1.4} />
            </section>

            <section
                className={`relative max-w-[1250px] mt-[-5rem] mb-20 mx-auto bg-white dark:bg-neutral-700 rounded-lg border-b-3 border-r-3 border-neutral-700`}
            >
                <div className='px-16 py-16 grid gap-8 justify-center md:grid-cols-3'>
                    {sections.map(section => (
                        <div
                            key={section.title}
                            className='flex flex-col gap-5 dark:text-neutral-200'
                        >
                            <div className='flex-1 basis-20'>
                                <div className='flex gap-4 text-xl font-bold items-center mb-2'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='64'
                                        height='64'
                                        fill='currentColor'
                                        viewBox='0 0 16 16'
                                        className='p-4 rounded-md bg-blue-400 text-white border-b-3 border-r-3 border-neutral-500'
                                    >
                                        <path d='M1.5 0A1.5 1.5 0 0 0 0 1.5v7A1.5 1.5 0 0 0 1.5 10H6v1H1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5v-1h4.5A1.5 1.5 0 0 0 16 8.5v-7A1.5 1.5 0 0 0 14.5 0h-13Zm0 1h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5ZM12 12.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm2 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0ZM1.5 12h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1ZM1 14.25a.25.25 0 0 1 .25-.25h5.5a.25.25 0 1 1 0 .5h-5.5a.25.25 0 0 1-.25-.25Z' />
                                    </svg>
                                    <h3>{section.title}</h3>
                                </div>
                                <p>{section.description}</p>
                            </div>
                            <div className='flex-1'>
                                <h4 className='text-sm font-bold text-blue-500 mb-2'>
                                    {section.subTitle}
                                </h4>
                                <p>{section.subDescription}</p>
                            </div>
                            <div className='flex-1'>
                                <h4 className='text-sm font-bold text-blue-500 mb-2'>
                                    <Link
                                        href={
                                            section.list.link
                                                ? section.list.link
                                                : "#"
                                        }
                                    >
                                        {section.list.title}{" "}
                                        {section.list.link && "→"}
                                    </Link>
                                </h4>
                                <ul className='grid gap-2 list-none p-0 m-0'>
                                    {section.list.items.map(tool => (
                                        <li
                                            className={`p-4 bg-neutral-300 dark:bg-neutral-500 border-b-3 border-r-3 border-neutral-200 rounded-md`}
                                            style={{
                                                boxShadow: `2px 2px 0 #00000099`,
                                            }}
                                            key={tool}
                                        >
                                            {tool}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <HobbySectionComponent />
        </div>
    );
};

export default About;
