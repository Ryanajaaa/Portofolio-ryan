import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { TechStack } from "@/sections/tech-stack";
import { Projects } from "@/sections/projects";
import { Experience } from "@/sections/experience";
import { Certificates } from "@/sections/certificates";
import { Contact } from "@/sections/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
