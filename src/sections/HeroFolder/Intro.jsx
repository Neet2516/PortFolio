import React from 'react'
import { SiComma } from "react-icons/si";
const Intro = () => {
    return (
        <div className="relative z-10 flex flex-col p-5  items-center justify-center md:w-1/2 h-50 md:min-h-svh drop-shadow-[0_0_10px_#8a48e6]
drop-shadow-[0_0_30px_#8a48e6]
drop-shadow-[0_0_60px_#8a48e6]">
            <h1 className='text-6xl  font-extrabold '>Hi, I’m <span className="text-teal-500">Navneet</span></h1>
            <div className="relative mt-8 mx-auto w-[90%] sm:w-[80%] lg:w-[70%] p-6 sm:p-6 rounded-3xl text-center hidden md:block bg-black/50">

                {/* Top Left Commas */}
                <span className="absolute -top-4 left-4 flex text-purple-500 text-2xl sm:text-3xl">
                    <SiComma className="rotate-180" />
                    <SiComma className="rotate-180" />
                </span>

                {/* Text */}
                <p className=" text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed">
                    A Frontend Developer who builds interactive, animated & 3D web experiences
                    using modern technologies. I love turning ideas into smooth, engaging and
                    performance-focused interfaces.
                </p>

                {/* Bottom Right Commas */}
                <span className="absolute -bottom-4 right-4 flex text-purple-500 text-2xl sm:text-3xl">
                    <SiComma />
                    <SiComma />
                </span>
            </div>

        </div>
    )
}

export default Intro
