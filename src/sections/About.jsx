import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profile from "../assets/Hero/photo.jpg";

gsap.registerPlugin(ScrollTrigger);


const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {


      /* ===== TITLE ANIMATION ===== */
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.1 },
        {
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            scrub: true,
          },
        }
      );

      /* ===== IMAGE ANIMATION ===== */
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 95%",
            end: "top 40%",
            scrub: true,
          },
        }
      );

      /* ===== TEXT ANIMATION ===== */
      textRef.current.querySelectorAll('p').forEach((p) => {
        gsap.fromTo(
          p,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: p,
              start: "top 90%",
              end: "top 70%",
              scrub: true,
            },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-screen bg-white text-black px-8 py-40"
    >
      {/* NAME */}
      <h2
        ref={titleRef}
        className="
          bebas-neue-regular
          uppercase
          text-[clamp(3rem,10vw,12rem)]
          leading-none
          mb-15 underline
        "
      >
        NAVNEET SINHA
      </h2>

      <div className="grid md:grid-cols-2 gap-28 items-start">
        {/* STORY */}
        <div ref={textRef} className="text-[1.15rem] leading-[1.6] max-w-xl">
          <p className="mb-10">I’m a frontend developer focused on building modern, engaging web experiences that feel intentional, polished, and easy to use across devices and platforms.
          </p>

          <p className="mb-10">
            My work sits at the intersection of design and engineering, where layout, typography, motion, and interaction come together to form intuitive and consistent user experiences. I approach development with a strong appreciation for design systems and interaction patterns, using motion and transitions to guide users naturally without overwhelming them.
          </p>

          <p>
            Using React, GSAP, and modern web technologies, I develop performant and scalable applications with a strong focus on maintainability and responsiveness. I emphasize usabislity, visual consistency, and attention to detail, aiming to deliver digital products that feel reliable, refined, and built with care.
          </p>
        </div>


        {/* IMAGE */}
        <div className="relative">
          <img
            ref={imageRef}
            src={profile}
            alt="Navneet Sinha"
            className="w-full max-w-sm grayscale rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
