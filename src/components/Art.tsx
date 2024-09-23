import React from "react";
import InstagramCard from "./InstagramCard";

const Art = () => {
    return (
        <section
            className={`max-w-screen-xl mx-auto bg-white dark:bg-gray-300 rounded-lg border-b-3 border-r-3 border-gray-700 p-16`}
        >
            <h3 className='text-2xl mb-4'>3D Art</h3>
            <p className='mb-4'>
                I use the program, Blender to 3d model, simulate, rig, and
                render 3d art. I started in 2017 and have helped with small
                projects providing 3d illustrations.
            </p>
            <ul className='list-none grid justify-items-center gap-8 lg:flex lg:justify-around'>
                <li>
                    <InstagramCard
                        pic={
                            "https://res.cloudinary.com/joecarothers/image/upload/v1637814520/misc/instacards/Screenshot_2021-11-24_232436_qgaygv.png"
                        }
                        url='https://www.instagram.com/p/BleYkf_Av5Z/'
                    />
                </li>
                <li>
                    <InstagramCard
                        pic={
                            "https://res.cloudinary.com/joecarothers/image/upload/v1637814523/misc/instacards/Screenshot_2021-11-24_232735_ciov7s.png"
                        }
                        url='https://www.instagram.com/p/ByLCd61na24/'
                    />
                </li>
                <li>
                    <InstagramCard
                        pic={
                            "https://res.cloudinary.com/joecarothers/image/upload/v1637814521/misc/instacards/Screenshot_2021-11-24_232552_onydr2.png"
                        }
                        url='https://www.instagram.com/p/BhqOg0ogpXW/'
                    />
                </li>
            </ul>
        </section>
    );
};

export default Art;
