import AboutMe from "../components/AboutMe";
import { Form } from "./contact";
import Art from "../components/Art";
import { Circle, Diagonal } from "../components/AboutMeAnimations";
import Portrait from "../components/Portrait";

const About = () => {
    return (
        <div>
            <section
                className={`relative grid bg-blue-400 dark:bg-gray-200 mt-16 pt-20 pb-40 px-4 gap-16 grid-rows-[300px_1fr] place-items-center overflow-hidden md:grid-cols-[300px_1fr] md:grid-rows-1`}
            >
                <Portrait page='' />
                <AboutMe />
                <Circle />
                <Diagonal height='-550px' delayMultiplier={0.9} />
                <Diagonal height='-250px' delayMultiplier={1.2} />
                <Diagonal height='-400px' delayMultiplier={1.4} />
            </section>

            <section
                className={`relative max-w-[1250px] mt-[-5rem] mb-20 mx-auto bg-white dark:bg-gray-300 rounded-lg border-b-3 border-r-3 border-gray-700`}
            >
                <div className='color-header' />
                <div className='px-16 py-16 grid gap-8 grid-rows-[1fr_3px_1fr_3px_1fr] justify-center md:grid-cols-[1fr_3px_1fr_3px_1fr] md:grid-rows-1'>
                    <div className='column grid justify-center grid-rows-[90px_9rem_1rem_6em_3rem_1fr]'>
                        <div className='title flex gap-4 text-xl justify-start text-gray-200'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='64'
                                height='64'
                                fill='currentColor'
                                viewBox='0 0 16 16'
                                className='p-4 rounded-md bg-blue-400 text-white border-b-3 border-r-3 border-gray-500'
                            >
                                <path d='M1.5 0A1.5 1.5 0 0 0 0 1.5v7A1.5 1.5 0 0 0 1.5 10H6v1H1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5v-1h4.5A1.5 1.5 0 0 0 16 8.5v-7A1.5 1.5 0 0 0 14.5 0h-13Zm0 1h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5ZM12 12.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm2 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0ZM1.5 12h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1ZM1 14.25a.25.25 0 0 1 .25-.25h5.5a.25.25 0 1 1 0 .5h-5.5a.25.25 0 0 1-.25-.25Z' />
                            </svg>
                            <h3>Developer</h3>
                        </div>
                        <p className='body leading-6 text-gray-400'>
                            I have experience with technologies across the
                            stack. I focus on working with React and NodeJS.
                        </p>
                        <h4 className='text-lg text-blue-400'>
                            Languages I Speak
                        </h4>
                        <p className='body leading-6'>
                            Javascript, HTML, CSS, SQL, NOSQL
                        </p>

                        <h4 className='text-lg text-blue-400'>Dev Tools</h4>
                        <ul className='grid gap-2 list-none p-0 m-0'>
                            {[
                                "ReactJS",
                                "NextJS",
                                "Styled Components",
                                "NodeJS",
                                "ExpresJS",
                                "MongoDB",
                                "Planetscale",
                            ].map(tool => (
                                <li
                                    className={`p-4 text-white bg-gray-900 dark:bg-gray-400 border-b-3 border-r-3 border-gray-200 rounded-md`}
                                    key={tool}
                                >
                                    {tool}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <span className='bg-gray-900 w-full h-full' />

                    {/* Repeat similar structure for Designer and Experience sections */}
                </div>
            </section>

            <h2>What I Do For Fun</h2>

            <Art />
            <Form />
        </div>
    );
};

export default About;
