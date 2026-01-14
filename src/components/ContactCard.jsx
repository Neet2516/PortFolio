import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import postsvg from '../assets/Contact/card.svg'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCard() {
  const formRef = useRef(null);
  const coverRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // Desktop Hover (Unchanged)
  const handleMouseEnter = () => {
    if (window.innerWidth > 768) {
      gsap.to(coverRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "power3.inOut",
        boxShadow: "0 -20px 40px rgba(0,0,0,0.15)",
      });
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      gsap.to(coverRef.current, {
        y: "0%",
        duration: 0.8,
        ease: "power3.inOut",
        boxShadow: "0 0 0 rgba(0,0,0,0)",
      });
    }
  };

  // Mobile Toggle Logic
  const handleMobileToggle = () => {
    if (window.innerWidth <= 768) {
      const nextState = !isOpen;
      setIsOpen(nextState);
      gsap.to(coverRef.current, {
        y: nextState ? "-100%" : "0%",
        duration: 0.8,
        ease: "power3.inOut",
      });
    }
  };
  const handleMobileClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(!isOpen);
      gsap.to(coverRef.current, {
        y: isOpen ? "0%" : "-100%",
        duration: 0.8,
        ease: "power3.inOut",
      });
    }
  };

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.send(
      import.meta.env.VITE_EMAIL_SERVICE_ID,
      import.meta.env.VITE_EMAIL_TEMPLATE_ID,
      formData,
      import.meta.env.VITE_EMAIL_PUBLIC_KEY,
    )
      .then(() => {
        alert("Email sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        if (window.innerWidth <= 768) handleMobileClick(); // Close on success for mobile
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send email");
      });
  };

  return (
    <div
      className="relative w-full max-w-[500px] md:max-w-none bg-white text-black overflow-hidden cursor-pointer md:cursor-default"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMobileToggle} // Parent click for mobile
    >
      {/* SVG COVER */}
      <div
        ref={coverRef}
        className="absolute inset-0 z-50 bg-white border-l-2 border-black flex flex-col items-center justify-center pointer-events-none md:pointer-events-auto"
      >
        <img className="w-full h-full object-cover" src={postsvg} alt="Postcard Cover" />
        <div className="absolute bottom-4 text-[16px] text-black uppercase tracking-widest md:hidden ">
          Tap to message
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={sendEmail}
        ref={formRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full flex flex-col border-l border-black/30 p-6 md:p-8 space-y-4"
      >
        <h2 className="text-2xl font-semibold">Contact Me</h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full md:w-2/5 border border-black px-3 py-2 focus:outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full md:w-2/5 border border-black px-3 py-2 focus:outline-none"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full border border-black px-3 py-2 h-32 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full md:w-max border border-black px-6 py-2 hover:bg-black hover:text-white transition-all"
        >
          Send Email
        </button>

        {/* Optional: Add a "Close" link for mobile UX */}
        <button
          type="button"
          onClick={() => handleMobileToggle()}
          className="md:hidden text-[10px] uppercase underline opacity-50 pt-2"
        >
          Close Form
        </button>
      </form>
    </div>
  );

}