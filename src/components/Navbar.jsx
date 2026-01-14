import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  GoArrowUpRight,
  GoHome,
  GoPerson,
  GoBeaker,
  GoStack,
  GoMail,
} from "react-icons/go";

const links = [
  { name: "Home", href: "#home", icon: <GoHome size={20} /> },
  { name: "About", href: "#about", icon: <GoPerson size={20} /> },
  { name: "Skills", href: "#skills", icon: <GoBeaker size={20} /> },
  { name: "Projects", href: "#projects", icon: <GoStack size={20} /> },
  { name: "Contact", href: "#contact", icon: <GoMail size={20} /> },
];

const Navbar = () => {
  const navRef = useRef(null);
  const lastScroll = useRef(0);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { y: 0, opacity: 1 });

    const onScroll = () => {
      const current = window.scrollY;

      // Never hide at very top
      if (current < 80) {
        gsap.to(nav, { y: 0, opacity: 1, duration: 0.2 });
        nav.classList.add("bg-transparent", "text-white");
        nav.classList.remove("bg-white", "text-black", "backdrop-blur-md");
        lastScroll.current = current;
        return;
      }

      // Hide / show on direction
      if (current > lastScroll.current) {
        gsap.to(nav, { y: -100, opacity: 0, duration: 0.35 });
      } else {
        gsap.to(nav, { y: 0, opacity: 1, duration: 0.35 });
      }

      // Style change after hero
      if (current > window.innerHeight * 0.9) {
        nav.classList.add("bg-white", "text-black", "backdrop-blur-md");
        nav.classList.remove("bg-transparent", "text-white");
      } else {
        nav.classList.add("bg-transparent", "text-white");
        nav.classList.remove("bg-white", "text-black", "backdrop-blur-md");
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* DESKTOP NAV */}
      <nav
        ref={navRef}
        className="
          hidden md:flex
          fixed top-0 left-0 z-50 w-full
          px-8 py-5
          items-center justify-between
          uppercase
          bg-transparent backdrop-blur-md text-white
          transition-colors duration-500
        "
      >
        <ul className="flex gap-8 text-sm">
          {links.map((item) => (
            <li
              key={item.name}
              className="
                cursor-pointer relative
                after:absolute after:left-0 after:-bottom-1
                after:h-px after:w-0
                after:bg-current after:transition-all
                hover:after:w-full
                flex items-center gap-1
              "
            >
              <a href={item.href}>{item.name}</a>
              <GoArrowUpRight />
            </li>
          ))}
        </ul>
      </nav>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
        <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 flex justify-between items-center text-white shadow-2xl">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition active:scale-90"
            >
              {link.icon}
              <span className="text-[10px] uppercase font-medium">
                {link.name}
              </span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
