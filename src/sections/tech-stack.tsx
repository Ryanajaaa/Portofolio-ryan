"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Reveal } from "@/components/reveal";
import { techStack } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

export function TechStack() {
  const { lang } = useLanguage();
  const t = translations[lang].techStack;

  return (
    <section id="tech-stack" className="border-t border-border py-28">
      <Container>
        <SectionTitle eyebrow={t.eyebrow} title={t.title} description={t.description} />
      </Container>

      <div className="flex flex-col gap-10">
        {techStack.map((cat, ci) => (
          <Reveal key={cat.category} delay={ci * 0.06}>
            <div>
              <Container>
                <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {cat.category}
                </h3>
              </Container>

            
              <div className="block md:hidden">
                <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                  <div
                    className={`flex w-max gap-5 py-1 pl-6 animate-marquee hover:[animation-play-state:paused] ${
                      ci % 2 !== 0 ? "[animation-direction:reverse]" : ""
                    }`}
                    style={{
                      animationDuration: `${Math.max(cat.items.length * 5, 18)}s`,
                    }}
                  >
                    {[...cat.items, ...cat.items].map((item, idx) => (
                      <div
                        key={`${item.name}-${idx}`}
                        className="flex min-w-[130px] shrink-0 items-center justify-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 transition-colors duration-300 hover:border-primary/50"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-base">
                          {item.icon}
                        </span>
                        <span className="whitespace-nowrap text-sm font-medium">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

      
              <Container className="hidden md:block">
                <div className="grid grid-cols-4 gap-3 lg:grid-cols-6">
                  {cat.items.map((item) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ y: -4, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-4 py-6 text-center transition-colors duration-300 hover:border-primary/50"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-lg">
                        {item.icon}
                      </span>
                      <span className="text-xs font-medium sm:text-sm">
                        {item.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </Container>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}