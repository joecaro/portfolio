import Image from "next/image";

type Hobby = {
    image: string;
    title: string;
    description: string;
    locations: string;
};

const hobbies: Hobby[] = [
    {
        image: "/img/scuba.jpg",
        title: "Scuba Diving",
        description:
            "I've dived in North Carolina, Florida and Mexico, and want to go to many more places.",
        locations: "NC, FL, Mexico",
    },
    {
        image: "/img/sailing.jpeg",
        title: "Sailing",
        description:
            "In 2022 I bought my first fixer-upper sailboat. After a summer fixing it up, I've been learning to sail it.",
        locations: "NC",
    },
    {
        image: "/img/hiking.jpg",
        title: "Hiking",
        description:
            "I hike wherever I travel. Nature is one of the best ways to learn about a place.",
        locations: "AZ, CO, UT, NM, CA, WA, HI, NC, FL, MX, KOR",
    },
    {
        image: "/img/3d-printing-1.jpeg",
        title: "3D Printing",
        description:
            "Tinkering and making things in my own home. The novelty never wears off.",
        locations: "FL, NC",
    },
    {
        image: "/img/surfing.jpg",
        title: "Surfing",
        description:
            "I love the beach and the ocean. Surfing is my favorite way to relax and enjoy the water.",
        locations: "NC, FL, Hawaii",
    },
    {
        image: "/img/rings.jpeg",
        title: "Ring Making",
        description:
            "Rings in silver and gold. Making something of value that others can enjoy is a great feeling.",
        locations: "NC",
    },
];

export default function HobbySection() {
    return (
        <section className='mx-auto flex max-w-6xl flex-col gap-7 px-4 pb-24 pt-16 md:px-8 dark:text-neutral-200'>
            <div className='flex flex-col gap-2'>
                <h2 className='text-3xl font-semibold'>Outside of code</h2>
                <p className='text-neutral-600 dark:text-neutral-400'>
                    Usually near the water, or making something with my hands.
                </p>
            </div>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {hobbies.map(hobby => (
                    <figure
                        key={hobby.title}
                        className='group flex flex-col overflow-hidden rounded-lg border-2 border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900'
                    >
                        <div className='relative aspect-[4/3] overflow-hidden'>
                            <Image
                                src={hobby.image}
                                alt={hobby.title}
                                fill
                                sizes='(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw'
                                className='object-cover transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none'
                            />
                        </div>
                        <figcaption className='flex flex-col gap-1.5 px-[18px] pb-[18px] pt-4'>
                            <span className='text-[17px] font-semibold'>
                                {hobby.title}
                            </span>
                            <span className='text-sm leading-relaxed text-neutral-700 dark:text-neutral-300'>
                                {hobby.description}
                            </span>
                            <span className='text-xs text-neutral-600 dark:text-neutral-400'>
                                Explored: {hobby.locations}
                            </span>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}
