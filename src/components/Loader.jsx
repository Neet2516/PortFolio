import { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete,
      });

      tl.from(textRef.current.children, {
        y: 120,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
      })
        .to(textRef.current.children, {
          y: -120,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          delay: 0.4,
        })
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 1.2,
        });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-9999 bg-black flex items-center justify-center"
    >
      <div
        ref={textRef}
        className="overflow-hidden text-white bebas-neue-regular text-[clamp(2.5rem,8vw,7rem)]"
      >
        <span className="block">CREATING</span>
        <span className="block">DIGITAL</span>
        <span className="block">EXPERIENCE</span>
      </div>
    </div>
  );
};

export default Loader;
