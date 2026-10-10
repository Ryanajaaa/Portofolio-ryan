"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, ListChecks } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { translations, projectDescriptionsId } from "@/lib/i18n";

const SPEED_PX_PER_FRAME = 0.6;

function useAutoScroll(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let raf: number;
    let half = el.scrollWidth / 2;

    function measure() {
      if (el) half = el.scrollWidth / 2;
    }
    measure();
    window.addEventListener("resize", measure);

    function tick() {
      if (el && !pausedRef.current) {
        el.scrollLeft += SPEED_PX_PER_FRAME;
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const pauseNow = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setPaused(true);
  }, []);

  const resumeSoon = useCallback((delay = 1200) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), delay);
  }, []);

  return { pauseNow, resumeSoon };
}

export function Projects() {
  const { lang } = useLanguage();
  const t = translations[lang].projects;
  const scrollRef = useRef<HTMLDivElement>(null);
  const { pauseNow, resumeSoon } = useAutoScroll(scrollRef);

  return (
    <section id="projects" className="border-t border-border py-28">
      <Container>
        <SectionTitle eyebrow={t.eyebrow} title={t.title} description={t.description} />
      </Container>

      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div
          ref={scrollRef}
          onPointerEnter={pauseNow}
          onPointerLeave={() => resumeSoon(0)}
          onPointerDown={pauseNow}
          onPointerUp={() => resumeSoon()}
          onTouchStart={pauseNow}
          onTouchEnd={() => resumeSoon()}
          className="flex gap-6 overflow-x-auto px-6 py-1 [-ms-overflow-style:none] [scrollbar-width:none] md:px-10 [&::-webkit-scrollbar]:hidden"
          style={{ scrollBehavior: "auto" }}
        >
          {[...projects, ...projects].map((p, idx) => {
            const description =
              lang === "id" ? projectDescriptionsId[p.title] ?? p.description : p.description;
            return (
              <article
                key={`${p.title}-${idx}`}
                className="group flex h-[440px] w-[320px] shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-primary/50 hover:shadow-[0_0_32px_-10px_rgba(124,58,237,0.4)] sm:w-[380px]"
              >
                <Link
                  href={`/projects/${p.slug}`}
                  draggable={false}
                  className="relative aspect-video w-full shrink-0 overflow-hidden bg-surface"
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    draggable={false}
                    sizes="(max-width: 640px) 320px, 380px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {p.featured && (
                    <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-primary-foreground">
                      Featured
                    </span>
                  )}
                </Link>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div>
                    <Link href={`/projects/${p.slug}`}>
                      <h3 className="mb-2 line-clamp-1 text-lg font-semibold transition-colors hover:text-primary">
                        {p.title}
                      </h3>
                    </Link>
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted">
                      {description}
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
                        {t.github}
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
                        {t.liveDemo}
                      </a>
                    )}
                    {p.features && (
                      <a
                        href={p.features}
                        className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-foreground"
                      >
                        <ListChecks className="h-3.5 w-3.5" />
                        {t.features}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}