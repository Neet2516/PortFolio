import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import Contact from "../sections/Contact";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className=" bg-[#11071f] text-white md:pt-17 w-screen overflow-x-hidden h-full  pb-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer/>
    </>
  );
}
