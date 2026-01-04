import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoArrowUpRight } from "react-icons/go";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const lastScroll = useRef(0);

  useEffect(() => {
    const nav = navRef.current;

    gsap.set(nav, { y: 0, opacity: 1 });

    // Auto-hide on scroll down, show on scroll up
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const current = self.scroll();

        if (current > lastScroll.current && current > 120) {
          gsap.to(nav, {
            y: -100,
            opacity: 0,
            duration: 0.4,
            ease: "power3.out",
          });
        } else {
          gsap.to(nav, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          });
        }

        lastScroll.current = current;
      },
    });

    // Sticky behavior
    ScrollTrigger.create({
      trigger: nav,
      start: "top top",
      onEnter: () => {
        gsap.set(nav, {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
        });
      },
      onLeaveBack: () => {
        gsap.set(nav, { position: "relative" });
      },
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="
        relative z-50 w-screen
        px-8 py-5
        flex items-center justify-between
        border-b border-black/10
       text-white bg-transparent
      "
    >
      

      {/* Links */}
      <ul className="flex gap-8 text-sm">
        {["Home","About", "Projects", "Contact"].map((item) => (
          <li
            key={item}
            className="
              cursor-pointer relative
              after:absolute after:left-0 after:-bottom-1
              after:h-px after:w-0
              after:bg-current
              after:transition-all
              hover:after:w-full
              text-[1rem] flex items-center justify-center
            "
          >
            {item}
            <GoArrowUpRight />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
