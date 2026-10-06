"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";
import type { Project } from "@/types";
import { useLanguage } from "@/lib/language-context";
import { translations, projectDescriptionsId, projectDetailsId } from "@/lib/i18n";

export function ProjectDetail({ project }: { project: Project }) {
  const { lang } = useLanguage();
  const t = translations[lang].projectDetail;

  const idContent = projectDetailsId[project.slug];
  const description =
    lang === "id" ? projectDescriptionsId[project.title] ?? project.description : project.description;
  const longDescription =
    lang === "id" && idContent ? idContent.longDescription : project.longDescription ?? [];
  const highlights = lang === "id" && idContent ? idContent.highlights : project.highlights ?? [];
  const role = lang === "id" && idContent ? idContent.role : project.role;

  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <main className="min-h-screen pb-28 pt-28">
      <Container className="max-w-4xl">
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.back}
        </Link>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
          {project.featured && (
            <span className="rounded-full bg-primary/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-primary-foreground">
              Featured
            </span>
          )}
        </div>

        <h1 className="mb-6 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          {project.title}
        </h1>

        <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer">
              <Button variant="secondary">
                <Github className="h-4 w-4" />
                {t.viewGithub}
              </Button>
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer">
              <Button>
                <ExternalLink className="h-4 w-4" />
                {t.liveDemo}
              </Button>
            </a>
          )}
        </div>

        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                {t.overview}
              </h2>
              <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted sm:text-base">
                {(longDescription.length > 0 ? longDescription : [description]).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {highlights.length > 0 && (
              <div>
                <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  {t.highlights}
                </h2>
                <ul className="flex flex-col gap-2">
                  {highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm leading-relaxed text-muted sm:text-base"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {role && (
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  {t.myRole}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{role}</p>
              </div>
            )}

            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                {t.techStack}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {otherProjects.length > 0 && (
          <div className="mt-20 border-t border-border pt-10">
            <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {t.moreProjects}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {otherProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/50"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-surface">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="300px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <p className="line-clamp-1 text-sm font-medium">{p.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}