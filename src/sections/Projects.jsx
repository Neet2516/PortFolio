import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import portfolio from '../assets/Project/portfolio.png';
import nextstep from '../assets/Project/nextstep.png';
import healthsnap from '../assets/Project/healthsnap.png';


const projects = [
  {
    title: "Interactive Portfolio",
    description: "Data-heavy dashboard with real-time UI updates.",
    tech: "React · Chart.js · Redux",
    image: portfolio,
    live: "https://your-portfolio-link.com",
    github: "https://github.com/yourname/portfolio",
  },
  {
    title: "NextStep - lets connect",
    description: "Conversion-focused SaaS website with smooth scroll effects.",
    tech: "Next.js · Tailwind · Framer Motion",
    image: nextstep,
    live: "https://nextstep-csi.netlify.app/",
    github: "https://github.com/Neet2516/CSI-Task-5-",
  },
  {
    title: "healthsnap",
    description: "A motion-driven developer portfolio built with GSAP & React.",
    tech: "React · GSAP · Tailwind",
    image: healthsnap,
    live: "https://healthsnap-psi.vercel.app/",
    github: "https://github.com/Neet2516/GDG-05",
  },
];


const Projects = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (activeIndex === null) {
      gsap.to(bgRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(bgRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen bg-white text-black px-8 py-32 overflow-hidden"
    >
      {/* BACKGROUND IMAGE */}
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 w-full h-full opacity-0 "

      >
        {activeIndex !== null && (
          <img
            src={projects[activeIndex].image}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0  backdrop-blur-sm" />

      </div>
      {/* TITLE */}
      <h2 className="
        bebas-neue-regular
        uppercase
        text-[clamp(3rem,8vw,10rem)]
        mb-24
        relative z-10
      ">
        Projects
      </h2>

      {/* PROJECT LIST */}
      <div className="relative z-10 flex flex-col gap-16">
        {projects.map((project, index) => (
          <div
            key={index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className="group cursor-pointer"
          >
            {/* TITLE */}
            <h3
              className="
                bebas-neue-regular
                uppercase
                text-[clamp(2.5rem,6vw,6rem)]
                leading-none
                transition-all
                duration-300
                hover:text-red-800
                group-hover:tracking-wider
              "
            >
              {project.title}
            </h3>

            {/* META */}
            <div
              className="
    mt-4
    max-w-xl
    text-sm
    text-black/70
    opacity-0
    translate-y-6
    transition-all
    duration-300
    group-hover:opacity-100
    group-hover:translate-y-0
  "
            >
              <p>{project.description}</p>

              <p className="mt-2 uppercase tracking-widest text-xs">
                {project.tech}
              </p>

              {/* LINKS */}
              <div className="mt-4 flex gap-6 text-xs uppercase tracking-widest">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-black after:transition-all hover:after:w-full"
                  >
                    Live
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-black after:transition-all hover:after:w-full"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>


    </section>
  );
};

export default Projects;
