import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const SkillRow = ({ title, items }) => {
  const rowRef = useRef(null);
  const marqueeRef = useRef(null);
  const titleRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = marqueeRef.current.firstElementChild;
    const width = track.scrollWidth / 2;

    tweenRef.current = gsap.to(track, {
      x: -width,
      duration: 14,
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
      className=" skill-row
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
    flex items-center justify-center
    uppercase tracking-widest
    text-[80%]
    pointer-events-none
  "
      >
        {title}
      </h3>


      {/* MARQUEE */}
      <div
        ref={marqueeRef}
        className="absolute inset-0 flex items-center opacity-0 pointer-events-none"
      >
        <div className="flex gap-16 whitespace-nowrap px-8">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="text-[80%]">
              {item}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

const Skills = () => {
  const skillRef = useRef(null);
  const titleRef = useRef(null);
  const skillrowRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {

      // TITLE
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.1 },
        {
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: true,
          },
        }
      );

      // EACH SKILL ROW
      gsap.utils.toArray(".skill-row").forEach((row) => {
        gsap.fromTo(
          row, { y: 120, opacity: 0 },

          {
            y: 0,
            opacity: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              end: "top 70%",
              scrub: true,
            },
          }

        );
      });

    }, skillRef);

    return () => ctx.revert();
  }, []);



  return (
    <section
      ref={skillRef}
      id="skills"
      className="min-h-screen bg-white text-black px-8 my-10"
    >
      {/* TITLE */}
      <h2 className="
        bebas-neue-regular
        uppercase
        text-9xl
        leading-none
        mb-10
      " ref={titleRef}>
        Skills :- Love to play with
      </h2>

      <div ref={skillrowRef} className="flex flex-col gap-6 max-w-full">
        <SkillRow
          title="Languages"
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
