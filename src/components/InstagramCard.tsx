import React from "react";
const cardHeight = 300;

export default function InstagramCard({
    pic,
    url,
}: {
    pic: string;
    url: string;
}) {
    return (
        <a
            target='_blank'
            rel='noreferrer'
            href={url}
            className={`relative block h-[${cardHeight}px] w-[${
                cardHeight * (7 / 8)
            }px] rounded-lg border-2 border-neutral-500 shadow-[3px_3px_0_#6b7280] grid grid-rows-[auto_1fr_auto] transition-transform duration-200 hover:scale-110`}
        >
            <div className='flex p-4'>
                <div
                    className='h-[27px] w-[27px] rounded-full bg-cover'
                    style={{
                        backgroundImage:
                            "url('https://res.cloudinary.com/joecarothers/image/upload/v1637851355/misc/profile_uxp39t.jpg')",
                    }}
                ></div>
                <h4 className='m-auto font-medium hover:underline'>
                    <p>threedeedesign</p>
                </h4>
                <p>...</p>
            </div>

            <div
                className='w-full aspect-[16/9] bg-cover'
                style={{ backgroundImage: `url(${pic})` }}
            ></div>

            <div className='h-[75px] w-full p-4 flex gap-4'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width={cardHeight / 15}
                    height={cardHeight / 15}
                    fill='currentColor'
                    viewBox='0 0 16 16'
                >
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                </svg>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width={cardHeight / 15}
                    height={cardHeight / 15}
                    fill='currentColor'
                    viewBox='0 0 16 16'
                >
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                </svg>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width={cardHeight / 15}
                    height={cardHeight / 15}
                    fill='currentColor'
                    viewBox='0 0 16 16'
                >
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                </svg>
            </div>

            {/* Hover effect */}
            <span className='absolute inset-0 flex items-center justify-center text-2xl hidden group-hover:flex'>
                📷
            </span>
        </a>
    );
}
