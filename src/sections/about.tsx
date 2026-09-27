"use client";

import { Brain, Cloud, Server, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Reveal } from "@/components/reveal";

const focusAreas = [
  {
    icon: Brain,
    title: "Artificial Intelligence",
    desc: "Designing practical LLM-powered features, from retrieval pipelines to conversational agents.",
  },
  {
    icon: Server,
    title: "Software Engineering",
    desc: "Writing maintainable, well-tested backend systems that scale from prototype to production.",
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
    desc: "Architecting reliable infrastructure on Google Cloud with containers and CI/CD pipelines.",
  },
  {
    icon: Server,
    title: "Backend Development",
    desc: "Building fast, secure APIs in Go and Python with a focus on clean architecture.",
  },
];

export function About() {
  return (
    <section id="about" className="py-28">
      <Container>
        <SectionTitle
          eyebrow="About me"
          title="Informatics Student | Aspiring Software Engineer"
        />

        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <div className="flex flex-col gap-6 text-sm leading-relaxed text-muted sm:text-base">
              <p>
                I'm Ryan, an Informatics Engineering student at UPN "Veteran" Jawa Timur, Indonesia, with a strong interest in software development and backend engineering. I enjoy learning how software works, building projects, and solving problems through code. I have experience learning and working with Python, C++, Java, JavaScript, PHP, and Go, along with web development and backend technologies.
              </p>
              <p>
               Currently, I'm focused on strengthening my programming fundamentals, improving my software engineering skills, and building real-world projects. I'm especially interested in Software Engineering, Backend Development, and AI, and I enjoy challenging myself to learn new technologies, turn ideas into working projects, and continuously improve as a developer.
              </p>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
                <GraduationCap className="h-5 w-5 shrink-0 text-primary" />
                <p className="text-xs text-muted sm:text-sm">
                  Informatics Engineering — UPN "Veteran" Jawa Timur
                  Currently pursuing a Bachelor's degree in Informatics Engineering.  
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {focusAreas.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_24px_-6px_rgba(124,58,237,0.35)]">
                  <f.icon className="mb-4 h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="mb-1.5 text-sm font-semibold">{f.title}</h3>
                  <p className="text-xs leading-relaxed text-muted">
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
