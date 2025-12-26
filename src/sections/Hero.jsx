import { useEffect, useRef } from "react";
import * as THREE from "three";
import RINGS from "vanta/dist/vanta.rings.min";
import Intro from "./HeroFolder/Intro";
import photo from '../assets/Hero/photo.jpg';
import { SiComma } from "react-icons/si";
export default function Hero() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = RINGS({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x8a48e6,
        backgroundColor: 0x000000,
      });
    }
    const canvas = vantaRef.current.querySelector("canvas");
    if (canvas) {
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.zIndex = "0";
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <section
      id="home"
      ref={vantaRef}
      className="relative w-full min-h-svh overflow-hidden"
    >
      {/* Content Overlay */}
      <div className="flex flex-col md:flex-row items-center justify-evenly w-full md:gap-50">
        <Intro />
        <div className="bg-linear-to-b from-teal-200 to-teal-700 p-5 w-1/2 md:w-auto rounded-full   flex items-center justify-center"><img src={photo} alt="Nothing" className=" rounded-[1000px] md:rounded-full h-2/3" /></div>
      </div>
      <div className="relative mt-8 mx-auto w-[90%] sm:w-[80%] lg:w-[70%] p-6 sm:p-6 rounded-3xl text-center block md:hidden bg-black/50">

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

    </section>
  );
}
