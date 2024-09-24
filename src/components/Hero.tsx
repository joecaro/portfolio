"use client";

import React from "react";
import { ButtonLink } from "@/components/Button";
import Portrait from "./Portrait";
import MaxWidthContainer from "./styles/MaxWidthContainer";

const Hero = () => {
    return (
        <MaxWidthContainer>
            <div className='min-h-[80vh] flex flex-col items-center py-8 relative gap-12 lg:grid lg:grid-cols-2 lg:flex-row lg:justify-between'>
                <svg
                    className={`absolute text-blue-100 dark:text-neutral-600 left-1/2 pointer-events-none`}
                    width='508'
                    height='952'
                    viewBox='0 0 508 952'
                    fill='none'
                >
                    <line
                        x1='1.65817'
                        y1='345.882'
                        x2='409.658'
                        y2='950.882'
                        stroke='currentColor'
                        strokeWidth='4'
                    />
                    <line
                        x1='25.6582'
                        y1='259.882'
                        x2='433.658'
                        y2='864.882'
                        stroke='currentColor'
                        strokeWidth='4'
                    />
                    <line
                        x1='49.6582'
                        y1='173.882'
                        x2='457.658'
                        y2='778.882'
                        stroke='currentColor'
                        strokeWidth='4'
                    />
                    <line
                        x1='73.6582'
                        y1='87.8818'
                        x2='481.658'
                        y2='692.882'
                        stroke='currentColor'
                        strokeWidth='4'
                    />
                    <line
                        x1='97.6582'
                        y1='1.88176'
                        x2='505.658'
                        y2='606.882'
                        stroke='currentColor'
                        strokeWidth='4'
                    />
                </svg>

                <div className='z-10 grid gap-2'>
                    <div className='animate-slideIn duration-[2500ms]'>
                        <p className='text-xl font-semibold text-blue-600'>
                            Web Developer
                        </p>
                    </div>
                    <div className='animate-slideIn duration-[1000ms]'>
                        <h1 className='text-4xl font-bold dark:text-neutral-300'>
                            Hi, {"I'm"} Joe
                        </h1>
                    </div>
                    <div className='animate-slideIn duration-[2500ms]'>
                        <h2 className='text-xl font-normal dark:text-neutral-300'>
                            I am a Frontend React developer specializing in
                            NextJS and NodeJS Applications
                        </h2>
                    </div>
                    <ButtonLink
                        color='purple'
                        href='/files/Resume_Joseph_Carothers_2022.docx'
                    >
                        Resume
                    </ButtonLink>
                </div>

                <div className='flex flex-row-reverse md:flex-row items-start md:items-center gap-8 z-10 lg:flex-row lg:justify-between w-full lg:w-3/4'>
                    <Portrait page='home' />
                    <div className='flex flex-col justify-around items-end gap-8'>
                        <ButtonLink
                            inverted
                            animated
                            color='purple'
                            href='https://github.com/joecaro'
                        >
                            Github
                        </ButtonLink>
                        <ButtonLink
                            inverted
                            animated
                            color='blue'
                            href='https://www.linkedin.com/in/joseph-samuel-carothers-b36218132/'
                        >
                            LinkedIn
                        </ButtonLink>
                        <ButtonLink
                            inverted
                            animated
                            color='red'
                            href='mailto:joseph.samuel.carothers@gmail.com?subject=I Love Your Portfolio!&body=I really want you on my team.'
                        >
                            Email
                        </ButtonLink>
                    </div>
                </div>
            </div>
        </MaxWidthContainer>
    );
};

export default Hero;
