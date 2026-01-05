import { useRef, useEffect } from "react";
import gsap from "gsap";

const SkillRow = ({ title, items }) => {
  const rowRef = useRef(null);
  const marqueeRef = useRef(null);
  const titleRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    tweenRef.current = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 12,
      ease: "linear",
      repeat: -1,
      paused: true,
    });

    return () => tweenRef.current.kill();
  }, []);

  const onEnter = () => {
    gsap.to(rowRef.current, {
      backgroundColor: "#ffffff",
      color: "#000000",
      duration: 0.35,
    });

    gsap.to(titleRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.25,
    });

    gsap.to(marqueeRef.current, {
      opacity: 1,
      duration: 0.25,
    });

    tweenRef.current.play();
  };

  const onLeave = () => {
    tweenRef.current.pause();

    gsap.to(rowRef.current, {
      backgroundColor: "#000000",
      color: "#ffffff",
      duration: 0.35,
    });

    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.25,
    });

    gsap.to(marqueeRef.current, {
      opacity: 0,
      duration: 0.2,
    });
  };

  return (
    <div
      ref={rowRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="
        relative
        h-32
        bg-black text-white
        flex items-center
        overflow-hidden
        cursor-pointer
        text-9xl
      "
    >
      {/* TITLE */}
      <h3
        ref={titleRef}
        className="
          absolute inset-0
          uppercase tracking-widest
          text-[100%] w-full 
        "
      >
        {title}
      </h3>

      {/* MARQUEE */}
      <div
        ref={marqueeRef}
        className="
          absolute inset-0
          flex items-center
          opacity-0
          pointer-events-none
        "
      >
        <div className="flex gap-16 whitespace-nowrap px-8">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="text-[80%] w-full">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen bg-white text-black px-8 py-40"
    >
      {/* TITLE */}
      <h2 className="
        bebas-neue-regular
        uppercase
        text-9xl
        leading-none
        mb-20
      ">
        Skills
      </h2>

      <div className="flex flex-col gap-6 max-w-full">
        <SkillRow
          title="Programming Languages"
          items={["C++", "JavaScript", "Python"]}
        />

        <SkillRow
          title="Libraries"
          items={["React", "Tailwind CSS", "Redux Toolkit", "Shadcn UI"]}
        />

        <SkillRow
          title="Animations"
          items={["GSAP", "Framer Motion", "Three.js", "Spline"]}
        />

        <SkillRow
          title="Ecosystem"
          items={[
            "Git",
            "GitHub",
            "Postman",
            "REST APIs",
            "WebSockets",
            "Vercel",
            "Netlify",
            "AWS",
          ]}
        />
      </div>
    </section>
  );
};

export default Skills;
