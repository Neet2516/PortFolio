import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoArrowUpRight } from "react-icons/go";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const lastScroll = useRef(0);
  const links = {
    Home: "#home",
    About: "#about",
    Skills:"#skills",
    Projects: "#projects",
    Contact: "#contact",

  };

  useEffect(() => {
    const nav = navRef.current;

    // Initial hero state
    nav.classList.add("nav--hero");

    // Auto-hide ONLY while in hero
    const hideTrigger = ScrollTrigger.create({
      start: 0,
      end: () => document.querySelector("#about")?.offsetTop || 0,
      onUpdate: (self) => {
        const current = self.scroll();

        if (current > lastScroll.current && current > 120) {
          gsap.to(nav, { y: -100, opacity: 0, duration: 0.4 });
        } else {
          gsap.to(nav, { y: 0, opacity: 1, duration: 0.4 });
        }

        lastScroll.current = current;
      },
    });

    // 🔥 MAIN TRIGGER — ABOUT SECTION
    ScrollTrigger.create({
      trigger: "#about",
      start: "top top",

      onEnter: () => {
        // Fix navbar
        gsap.set(nav, {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          y: 0,
          opacity: 1,
        });

        // Switch colors
        nav.classList.remove("nav--hero");
        nav.classList.add("nav--scrolled");

        // Disable auto-hide
        hideTrigger.disable();
      },

      onLeaveBack: () => {
        // Back to hero behavior
        gsap.set(nav, { position: "relative" });

        nav.classList.remove("nav--scrolled");
        nav.classList.add("nav--hero");

        hideTrigger.enable();
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
        backdrop-blur-md
        border-b border-black/10
        uppercase
        transition-colors duration-500
      "
    >
      <ul className="flex gap-8 text-sm">
        {Object.keys(links).map((item) => (
          <li
            key={item}
            className="
              cursor-pointer relative
              after:absolute after:left-0 after:-bottom-1
              after:h-px after:w-0
              after:bg-current
              after:transition-all
              hover:after:w-full
              flex items-center gap-1
            "
          >
            <a href={links[item]}>{item}</a>
            <GoArrowUpRight />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
