"use client";

import { Brain, Cloud, Server, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

const icons = [Brain, Server, Cloud, Server];

export function About() {
  const { lang } = useLanguage();
  const t = translations[lang].about;

  return (
    <section id="about" className="py-28">
      <Container>
        <SectionTitle eyebrow={t.eyebrow} title={t.title} />

        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <div className="flex flex-col gap-6 text-sm leading-relaxed text-muted sm:text-base">
              {t.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
                <GraduationCap className="h-5 w-5 shrink-0 text-primary" />
                <p className="text-xs text-muted sm:text-sm">{t.degreeNote}</p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {t.focusAreas.map((f, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={f.title} delay={i * 0.08}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_24px_-6px_rgba(124,58,237,0.35)]">
                    <Icon className="mb-4 h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="mb-1.5 text-sm font-semibold">{f.title}</h3>
                    <p className="text-xs leading-relaxed text-muted">{f.desc}</p>
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