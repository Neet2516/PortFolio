import {  useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";import { GoArrowUpRight, GoHome, GoPerson, GoBeaker, GoStack, GoMail } from "react-icons/go";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const lastScroll = useRef(0);
  const [nav,Setnav]= useState(false);
  const links = [
      { name: "Home", href: "#home", icon: <GoHome size={20} /> },
      { name: "About", href: "#about", icon: <GoPerson size={20} /> },
      { name: "Skills", href: "#skills", icon: <GoBeaker size={20} /> },
      { name: "Projects", href: "#projects", icon: <GoStack size={20} /> },
      { name: "Contact", href: "#contact", icon: <GoMail size={20} /> },
    ];

  useLayoutEffect(() => {
  const nav = navRef.current;

  nav.classList.add("nav--hero");

  const hideTrigger = ScrollTrigger.create({
    start: 0,
    endTrigger: "#about",
    end: "top top",
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

  ScrollTrigger.create({
    trigger: "#about",
    start: "top top",

    onEnter: () => {
      gsap.set(nav, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        y: 0,
        opacity: 1,
      });

      nav.classList.remove("nav--hero");
      nav.classList.add("nav--scrolled");

      hideTrigger.disable();
    },

    onLeaveBack: () => {
      gsap.set(nav, { position: "relative" });

      nav.classList.remove("nav--scrolled");
      nav.classList.add("nav--hero");

      hideTrigger.enable();
    },
  });

  ScrollTrigger.refresh();
}, []);


  return (
    <>
    <nav
      ref={navRef}
      className={`
         hidden md:flex
        relative z-50 w-screen
        px-8 py-5
        items-center justify-between
        ${nav ? "backdrop-blur-sm transition-colors " : "text-white"}
        border-b border-black/10
        uppercase
         duration-500
      `}
    >
      <ul className="flex gap-8 text-sm">
        {links.map((item) => (
          <li
            key={item.name}
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
            <a href={item.href}>{item.name}</a>
            <GoArrowUpRight />
          </li>
        ))}
      </ul>
    </nav>
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-100 w-[90%] max-w-100">
        <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 flex justify-between items-center text-white shadow-2xl">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity active:scale-90"
            >
              {link.icon}
              <span className="text-[10px] uppercase font-medium">{link.name}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
