import React, { useEffect, useRef } from "react";
import backgroundimg from "../assets/Hero/gamerob.jpg";
import Dot from "../assets/Dot";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { SpotLight } from "@react-three/drei";
import Navbar from "../components/Navbar";
import { useApp } from "../context/useApp";
import HeroFooter from "../components/HeroFooter";

const Hero = () => {
  const spotlightRef = useRef(null);
  const textRef = useRef(null);
  const { isLoaded } = useApp();
  useEffect(() => {
    if (!isLoaded) return;
    if ("ontouchstart" in window) return;

    const spotlight = spotlightRef.current;

    gsap.set(spotlight, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
    });

    const moveX = gsap.quickTo(spotlight, "x", {
      duration: 0.35,
      ease: "power3.out",
    });

    const moveY = gsap.quickTo(spotlight, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const onMove = (e) => {
      moveX(e.clientX);
      moveY(e.clientY);
    };

    window.addEventListener("mousemove", onMove);

    gsap.to(spotlight, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    });
    const words = textRef.current.querySelectorAll("span");

    gsap.fromTo(
      words,
      { y: "120%" },
      {
        y: "0%",
        duration: 1.1,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.4,
      }
    );
    ScrollTrigger.create({ trigger: document.body, start: "top -80", onEnter: () => gsap.to(spotlight, { opacity: 0, duration: 0.5 }), onLeaveBack: () => gsap.to(spotlight, { opacity: 1, duration: 0.5 }), });


    return () => window.removeEventListener("mousemove", onMove);
  }, [isLoaded]);

  return (
    <section id="home" className="relative h-screen w-screen overflow-hidden">
      <Dot />

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundimg})` }}
      />

      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

      <div
        ref={spotlightRef}
        className="pointer-events-none fixed h-72 w-72 rounded-full bg-white/10 blur-3xl mix-blend-screen"
      />

      <div className="relative z-20 h-full  px-8">
        <h1
          ref={textRef}
          className="bebas-neue-regular text-white uppercase leading-none text-[clamp(3rem,12vw,20rem)]"
        >
          {["NAVNEET SINHA", "\u00A0\u00A0Frontend Devloper"].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <span className="block will-change-transform">
                {word}
              </span>
            </div>
          ))}
        </h1>
        <div className="mt-2">
          <Navbar />
        </div>
        <HeroFooter/>

      </div>
    </section>
  );
};

export default Hero;
