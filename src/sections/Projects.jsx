import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import portfolio from "../assets/Project/portfolio.png";
import nextstep from "../assets/Project/nextstep.png";
import healthsnap from "../assets/Project/healthsnap.png";
import hs2 from '../assets/Project/hs2.png'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoMdArrowDropright } from "react-icons/io"
gsap.registerPlugin(ScrollTrigger);


const projects = [
  {
    title: "Interactive Portfolio",
    description: "Modern animated Portfolio website ",
    tech: "React GSAP Lenis Motion Tailwind CSS",
    image: portfolio,
    live: "https://portfolio-1-tofl.onrender.com",
    github: "https://github.com/Neet2516/PortFolio",
  },
  {
    title: "NextStep – lets dive",
    description: "Designed and developed a feature-rich frontend job portal connecting job seekers and job givers with an intuitive user experience",
    tech: "React.js, Tailwind CSS, GSAP, REST APIs  ,Redux Toolkit , Framer Motion ",
    image: nextstep,
    live: "https://nextstep-csi.netlify.app/",
    github: "https://github.com/Neet2516/CSI-Task-5-",
  },
  {
    title: "healthsnap - your  true lifepartner",
    description: "Built a personalized health dashboard allowing users to track their health map and view detailed health status insight",
    tech: "React · GSAP · Tailwind ·  REST APIs  ",
    image: hs2,
    live: "https://healthsnap-psi.vercel.app/",
    github: "https://github.com/Neet2516/GDG-05",
  },
];

const Projects = () => {
  const bgRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const sectionRef = useRef(null);
  const contentRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
  if (!bgRef.current) return;

  gsap.to(bgRef.current, {
    opacity: activeIndex === null ? 0 : 1,
    duration: 0.5,
    ease: "power3.out",
  });

  if (imgRef.current) {
    gsap.fromTo(
      imgRef.current,
      { scale: 1.05 },
      { scale: 1, duration: 0.8, ease: "power3.out" }
    );
  }
}, [activeIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // PROJECT ITEMS animation (THIS FIXES IT)
      contentRef.current.forEach((el) => {
        if (!el) return;

        gsap.fromTo(
          el,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen bg-white text-black px-8 py-10 md:py-32 overflow-hidden "
    >
      {/* BACKGROUND IMAGE */}
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 opacity-0 transition"
      >
        {activeIndex !== null && (
          <img
            ref={imgRef}
            src={projects[activeIndex].image}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-md" />
      </div>

      {/* TITLE */}
      <h2 ref={titleRef} className="bebas-neue-regular text-6xl text-center  uppercase md:text-[clamp(3rem,8vw,10rem)] mb-24 relative z-10">
        <span  className="underline">Projects</span><br/>
        <span className="text-2xl  lowercase tinos-regular opacity-75 text-gray-600 block md:hidden mt-5">  Click to interact </span>
      </h2>

      {/* PROJECT LIST */}
      <div className="relative z-10 flex flex-col gap-16">
        {projects.map((project, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              ref={(el) => (contentRef.current[index] = el)}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => setActiveIndex(index)}
              className="cursor-pointer"
            >
              <h3
                className={`bebas-neue-regular uppercase text-[clamp(2.5rem,6vw,6rem)]
          transition-all duration-300 flex items-center 
          ${isActive ? "tracking-wider text-black" : "text-black/40"}`}
              >
                <IoMdArrowDropright/>{project.title}
              </h3>

              <div
                className={`mt-4 max-w-xl transition-all duration-300
          ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} font-extrabold`}
              >
                <p className="text-black/80">{project.description}</p>
                <p className="mt-2 uppercase tracking-widest text-xs text-black/60">
                  {project.tech}
                </p>

                <div className="mt-4 flex gap-6 text-xs uppercase tracking-widest">
                  <a href={project.live} target="_blank" className="hover:underline">
                    Live
                  </a>
                  <a href={project.github} target="_blank" className="hover:underline">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default Projects;
