"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Reveal } from "@/components/reveal";
import { certificates } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

export function Certificates() {
  const { lang } = useLanguage();
  const t = translations[lang].certificates;

  return (
    <section id="certificates" className="border-t border-border py-28">
      <Container>
        <SectionTitle eyebrow={t.eyebrow} title={t.title} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <Reveal key={cert.name} delay={(i % 3) * 0.08}>
              <motion.div
                whileHover={{ y: -5 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-primary/50 hover:shadow-[0_0_28px_-8px_rgba(124,58,237,0.4)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 items-start gap-3 p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-base">
                    {cert.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold">{cert.name}</h3>
                    <p className="text-xs text-muted">
                      {cert.issuer} &middot; {cert.year}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted/50 transition-colors group-hover:text-primary" />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}