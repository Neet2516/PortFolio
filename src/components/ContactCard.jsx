import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import postsvg from '../assets/Contact/card.svg'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);


export default function ContactCard() {
  const formRef = useRef(null);
  const coverRef = useRef(null);


  const handleMouseEnter = () => {
    gsap.to(coverRef.current, {
      y: "-100%",
      duration: 0.8,
      ease: "power3.inOut",
      boxShadow: "0 -20px 40px rgba(0,0,0,0.15)",
    });
  };


  const handleMouseLeave = () => {
    gsap.to(coverRef.current, {
      y: "0%",
      duration: 0.8,
      ease: "power3.inOut",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
    });
  };


  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      {
        y: 60,
        opacity: 0,
      },
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


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send email");
      });
  };

  return (
    <div
      className="relative w-full bg-white text-black overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* SVG COVER */}
      <div
        ref={coverRef}
        className="absolute inset-0 z-50 bg-white border-l-2 border-black flex items-center justify-center"
      >
        <img className="w-full h-full object-cover" src={postsvg} />
      </div>

      {/* FORM */}
      <form
        onSubmit={sendEmail}
        ref={formRef}
        className="relative w-full flex flex-col border-l border-black/30 p-8 space-y-4"
      >
        <h2 className="text-2xl font-semibold">Contact Me</h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-2/5 border border-black px-3 py-2 focus:outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-2/5 border border-black px-3 py-2 focus:outline-none"
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
          className="border border-black px-6 py-2 hover:tracking-wider transition duration-300"
        >
          Send Email
        </button>
      </form>
    </div>

  );
}
