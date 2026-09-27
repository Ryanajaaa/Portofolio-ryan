"use client";

import Image from "next/image";
import { Github, ExternalLink, ListChecks } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="border-t border-border py-28">
      <Container>
        <SectionTitle
          eyebrow="Selected work"
          title="Featured Projects"
          description="A mix of AI products, backend systems, and full-stack platforms."
        />
      </Container>

      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex w-max animate-marquee gap-6 px-6 py-1 [animation-duration:48s] hover:[animation-play-state:paused] md:px-10">
          {[...projects, ...projects].map((p, idx) => (
            <article
              key={`${p.title}-${idx}`}
              className="group flex h-[440px] w-[320px] shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-primary/50 hover:shadow-[0_0_32px_-10px_rgba(124,58,237,0.4)] sm:w-[380px]"
            >
              <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-surface">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 320px, 380px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {p.featured && (
                  <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-primary-foreground">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <div>
                  <h3 className="mb-2 line-clamp-1 text-lg font-semibold">
                    {p.title}
                  </h3>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted">
                    {p.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-4 pt-2 text-xs">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-foreground"
                    >
                      <Github className="h-3.5 w-3.5" />
                      GitHub
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-primary"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Live Demo
                    </a>
                  )}
                  {p.features && (
                    <a
                      href={p.features}
                      className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-foreground"
                    >
                      <ListChecks className="h-3.5 w-3.5" />
                      Features
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}