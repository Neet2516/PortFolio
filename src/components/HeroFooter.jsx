import { useEffect, useRef, useState } from "react";
import LiveClock from "../assets/Hero/LiveClock";

const HeroFooter = () => {
  const textRef = useRef(null);
  const [hidden, setHidden] = useState(false);
  const [text, setText] = useState("Scroll");

  // Hide footer on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = window.innerHeight * 0.55;
      setHidden(scrollY > triggerPoint);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔁 Continuous text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setText((prev) =>
        prev === "Scroll" ? "Keep Scrolling" : "Scroll"
      );
    }, 1500); // change speed here

    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      className={`
        absolute bottom-50 md:bottom-0 left-0 w-full
        z-999
        transition-all duration-700 ease-out
        ${
          hidden
            ? "opacity-0 translate-y-16 pointer-events-none"
            : "opacity-100 translate-y-0"
        }
      `}
    >
      <div className="h-[18vh] w-full bg-transparent">
        <div className="h-full flex items-center justify-between px-8 text-white text-xs uppercase tracking-widest">

          <div className="max-w-xs leading-relaxed">
            <LiveClock />
            <p>New Delhi , India</p>
          </div>

          <div className="text-center opacity-70">
            <p ref={textRef} className="scroll-text">
              {text}
            </p>
          </div>

          <div className="text-right max-w-xs leading-relaxed">
            <p>FrontEnd Developer</p>
            <p>Eager to work</p>
            <a href="#" className="underline mt-2 inline-block">
              Ready to Visit →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HeroFooter;
