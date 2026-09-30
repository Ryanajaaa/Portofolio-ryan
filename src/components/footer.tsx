"use client";

import { Github, Linkedin, Instagram, Mail, ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

const socials = [
  { icon: Github, href: (s: typeof siteConfig) => s.github, label: "GitHub" },
  { icon: Linkedin, href: (s: typeof siteConfig) => s.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: (s: typeof siteConfig) => s.instagram, label: "Instagram" },
  { icon: Mail, href: (s: typeof siteConfig) => `mailto:${s.email}`, label: "Email" },
];

export function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. {t.rights}
        </p>

        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href(siteConfig)}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <a
          href="#home"
          aria-label="Back to top"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
        >
          <ArrowUp className="h-4 w-4" />
        </a>
      </Container>
    </footer>
  );
}