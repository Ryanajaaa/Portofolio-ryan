"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Reveal } from "@/components/reveal";
import { experience } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { translations, experienceDescriptionsId } from "@/lib/i18n";

export function Experience() {
  const { lang } = useLanguage();
  const t = translations[lang].experience;

  return (
    <section id="experience" className="border-t border-border py-28">
      <Container>
        <SectionTitle eyebrow={t.eyebrow} title={t.title} />

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border sm:left-[15px]" />

          <div className="flex flex-col gap-10">
            {experience.map((exp, i) => {
              const description =
                lang === "id"
                  ? experienceDescriptionsId[exp.company] ?? exp.description
                  : exp.description;
              return (
                <Reveal key={exp.year + exp.role} delay={i * 0.1} y={16}>
                  <div className="relative flex gap-6 pl-6 sm:pl-12">
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                      className={
                        "absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 sm:h-4 sm:w-4 " +
                        (exp.current
                          ? "border-primary bg-primary shadow-[0_0_0_4px_rgba(124,58,237,0.2)]"
                          : "border-border bg-card")
                      }
                    />
                    <div className="flex-1 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs text-primary">{exp.year}</span>
                        {exp.current && (
                          <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-mono text-[10px] text-accent">
                            Current
                          </span>
                        )} 
                      </div>
                      <h3 className="text-base font-semibold sm:text-lg">{exp.role}</h3>
                      <p className="mb-3 text-sm text-secondary">{exp.company}</p>
                      <p className="text-sm leading-relaxed text-muted">{description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}