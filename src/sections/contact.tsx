"use client";

import { Mail, Github, Linkedin, MessageCircle, Download, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

export function Contact() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;

  const cards = [
    { icon: MessageCircle, label: "WhatsApp", value: "Chat langsung", href: siteConfig.whatsapp },
    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Linkedin, label: "LinkedIn", value: "/in/ryanandiya", href: siteConfig.linkedin },
    { icon: Github, label: "GitHub", value: "ryanajaaa", href: siteConfig.github },
  ];

  return (
    <section id="contact" className="border-t border-border py-28">
      <Container>
        <SectionTitle
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
          align="center"
        />

        <Reveal>
          <div className="mx-auto mb-14 flex max-w-xl flex-col items-center gap-4 rounded-3xl border border-border bg-card p-10 text-center">
            <h3 className="text-xl font-semibold sm:text-2xl">{t.cardTitle}</h3>
            <p className="text-sm text-muted">{t.cardSubtitle}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
                <Button>
                  <MessageCircle className="h-4 w-4" />
                  {t.chatButton}
                </Button>
              </a>
              <a href={siteConfig.resumeUrl} download>
                <Button variant="secondary">
                  <Download className="h-4 w-4" />
                  {t.downloadButton}
                </Button>
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <a
                href={c.href}
                target={c.href?.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
              >
                <div className="flex items-center justify-between">
                  <c.icon className="h-5 w-5 text-primary" />
                  <ArrowUpRight className="h-4 w-4 text-muted/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted">{c.label}</p>
                  <p className="truncate text-sm font-medium">{c.value}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}