import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

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
            "I love to scuba! I've done diving in North Carolina, Florida, Mexico, and want to go to many more places.",
        locations: "NC, FL, Mexico",
    },
    {
        image: "/img/sailing.jpeg",
        title: "Sailing",
        description:
            "In 2022 I bought my first fixer upper sailboat. After spending the summer fixing it up, I've been learning to sail. I love the freedom and challenge of sailing.",
        locations: "NC",
    },
    {
      image: "/img/hiking.jpg",
      title: "Hiking",
      description: "I love hiking in any location I travel to. Nature is one of the best ways to learn about the world.",
      locations: "AZ, CO, UT, NM, CA, WA, HI, NC, FL, MX, KOR ...",
    },
    {
        image: "/img/3d-printing-1.jpeg",
        title: "3D Printing",
        description:
            "3d printing is a hobby I've been doing for a few years. The ability to tinker and create things in my own home is amazing and the novelty never wears off.",
        locations: "FL, NC",
    },
    {
        image: "/img/surfing.jpg",
        title: "Surfing",
        description:
            "I love the beach and the ocean. I've been surfing for a few years and it's a great way to relax and enjoy the water.",
        locations: "NC, FL, Hawaii",
    },
    {
        image: "/img/rings.jpeg",
        title: "Ring Making",
        description:
            "Another random hobby I've picked up is ring making. I've made rings out of silver and gold. The ability to make something of value that others can enjoy is a great feeling.",
        locations: "NC",
    },
];

export default function HobbySection() {
    return (
        <section className='py-12'>
            <div className='container mx-auto px-4 max-w-3xl'>
                <h2 className='text-3xl font-bold text-center mb-8 dark:text-neutral-50'>
                    Things I Enjoy Outside of Code
                </h2>
                <div className='space-y-6'>
                    {hobbies.map((hobby, index) => (
                        <Card key={index} className='overflow-hidden'>
                            <div className='flex flex-col md:flex-row'>
                                <div className='md:w-1/3 relative md:[clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]'>
                                    <Image
                                        src={hobby.image}
                                        alt={hobby.title}
                                        width={400}
                                        height={300}
                                        className='w-full h-48 md:h-64 object-cover'
                                    />
                                </div>
                                <div className='md:w-2/3 space-y-4 p-6 flex flex-col justify-around'>
                                    <h3 className='text-2xl md:text-xl font-bold tracking-tight'>
                                        {hobby.title}
                                    </h3>
                                    <p className='text-muted-foreground text-lg leading-relaxed'>
                                        {hobby.description}
                                    </p>
                                    <div className='flex items-center gap-1 text-muted-foreground'>
                                        <MapPin className='w-4 h-4' />
                                        <span className='text-sm'>
                                            Explored: NC, FL, Mexico
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
