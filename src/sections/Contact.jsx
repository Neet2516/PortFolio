import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactCard from "../components/ContactCard";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const footerRef = useRef(null);
  const links = {
    Github: "https://github.com/Neet2516",
    LinkedIn: "https://www.linkedin.com/in/navneet-sinha-ba0853375",
    Instagram: "https://www.instagram.com/its.navneet.25",
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current.children,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        footerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%", // Adjusted for better mobile trigger
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen bg-white text-black px-6 md:px-8 py-6 md:py-12 flex flex-col justify-between gap-12"
    >
      {/* MAIN CONTENT */}
      
      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-12 lg:gap-32 xl:gap-50">
        
        <div ref={textRef} className="max-w-5xl w-full text-center lg:text-left">
          <div className="w-full">
            <h2
              className="
                text-[clamp(2.5rem,8vw,8rem)]
                bebas-neue-regular
                bg-linear-to-br from-gray-900 to-gray-400
                bg-clip-text text-transparent
                leading-[1.05] underline
              "
            >
              <span className="block">Open to opportunities,</span>
              <span className="block">collaborations & ideas</span>
            </h2>
          </div>

          {/* CTA Area */}
          <div className="flex flex-col items-center lg:items-start justify-center gap-8">
            <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center gap-6 md:gap-8">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=getneet.25@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-8 py-4 text-sm font-medium transition bg-white text-black
                border border-black/20 hover:bg-black hover:text-white"
              >
                Get in Touch
              </a>

              <div className="flex items-center gap-3 text-sm text-black/70">
                <span className="h-2 w-2 rounded-full animate-pulse bg-green-500 border border-black/10" />
                Available For Work
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-8 text-sm">
              {Object.keys(links).map((item) => (
                <a
                  key={item}
                  href={links[item]}
                  target="_blank"
                  className="opacity-80 hover:opacity-100 transition text-sm tracking-widest uppercase font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* The Card Component */}
        <div className="w-full max-w-md lg:max-w-none flex justify-center">
          <ContactCard />
        </div>
      </div>

      {/* FOOTER */}
      <div
        ref={footerRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-black/80 border-t border-black/5 pt-12 pb-20 md:pb-0"
      >
        {/* LEFT */}
        <div className="text-center md:text-left">
          <p>getneet.25@gmail.com</p>
        </div>

        {/* CENTER */}
        <div className="text-center">
          Designed & Developed <br /> by Navneet Sinha
        </div>

        {/* RIGHT */}
        <div className="text-center md:text-right">
          <p>All rights reserved</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;