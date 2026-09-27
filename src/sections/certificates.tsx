"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Reveal } from "@/components/reveal";
import { certificates } from "@/lib/data";

export function Certificates() {
  return (
    <section id="certificates" className="border-t border-border py-28">
      <Container>
        <SectionTitle eyebrow="Credentials" title="Certificates" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <Reveal key={cert.name} delay={(i % 3) * 0.08}>
              <motion.div
                whileHover={{ y: -5 }}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors duration-300 hover:border-primary/50"
              >
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/10 blur-2xl transition-all duration-300 group-hover:bg-primary/20" />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface text-lg">
                  {cert.icon}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-muted">
                    {cert.issuer} &middot; {cert.year}
                  </p>
                </div>
                <Award className="ml-auto h-4 w-4 shrink-0 text-muted/50 transition-colors group-hover:text-primary" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
