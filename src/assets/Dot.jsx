import { useEffect, useRef } from "react";
import gsap from "gsap";

const Dot = () => {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;

    // center transform origin
    gsap.set(dot, {
      xPercent: -50,
      yPercent: -50,
    });

    const moveDot = (e) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 1,
        ease: "power in",
      });
    };

    const scaleUp = () => {
      gsap.to(dot, { scale: 1.8, duration: 2 });
    };

    const scaleDown = () => {
      gsap.to(dot, { scale: 1, duration: 2 });
    };

    window.addEventListener("mousemove", moveDot);
    window.addEventListener("mousedown", scaleUp);
    window.addEventListener("mouseup", scaleDown);

    return () => {
      window.removeEventListener("mousemove", moveDot);
      window.removeEventListener("mousedown", scaleUp);
      window.removeEventListener("mouseup", scaleDown);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="
        fixed top-0 left-0 
        h-3 w-3 
        rounded-full 
        bg-white 
        pointer-events-none 
        z-9999
        mix-blend-difference
      "
    />
  );
};

export default Dot;
