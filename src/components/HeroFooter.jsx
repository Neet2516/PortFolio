import { useEffect, useState } from "react";
import LiveClock from "../assets/Hero/LiveClock";

const HeroFooter = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = window.innerHeight * 0.25; // 25vh

      setHidden(scrollY > triggerPoint);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`
        fixed bottom-0 left-0 w-full
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
           
            <LiveClock/>
            <p>New Delhi , India</p>
          </div>
          <div className="text-center opacity-70">
            <p>Scroll</p>
          </div>
          <div className="text-right max-w-xs leading-relaxed">
            <p>FrontEnd Devloper</p>
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
