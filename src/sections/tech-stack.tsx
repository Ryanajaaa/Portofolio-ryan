"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Reveal } from "@/components/reveal";
import { techStack } from "@/lib/data";

export function TechStack() {
  return (
    <section id="tech-stack" className="border-t border-border py-28">
      <Container>
        <SectionTitle
          eyebrow="Toolbox"
          title="Tech Stack"
          description="Technologies I reach for when building reliable, AI-powered products."
        />

        <div className="flex flex-col gap-10">
          {techStack.map((cat, ci) => (
            <Reveal key={cat.category} delay={ci * 0.06}>
              <div>
                <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {cat.category}
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {cat.items.map((item) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ y: -6, scale: 1.03 }}
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
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
