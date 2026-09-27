import type { Metadata, Viewport } from "next";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimatedBackground } from "@/components/animated-background";
import { Spotlight } from "@/components/spotlight";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteUrl = "https://ryanandiya.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ryan Andiya — Technical Support & Backend Developer",
    template: "%s | Ryan Andiya",
  },
  description:
    "Portfolio of Ryan Andiya, an Technical Support and Backend Developer building scalable web applications and AI-powered solutions with C++, Go, and Python.",
  keywords: [
    "Ryan Andiya",
    "Technical Support",
    "Backend Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Ryan Andiya Saputra", url: siteUrl }],
  creator: "Ryan Andiya Saputra",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Ryan Andiya Saputra — Technical Support & Backend Developer",
    description:
      "I build scalable web applications, backend systems, and AI-powered solutions using modern technologies.",
    siteName: "Ryan Andiya",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryan Andiya — Technical Support & Backend Developer",
    description:
      "I build scalable web applications, backend systems, and AI-powered solutions using modern technologies.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#7c3aed",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ryan Andiya",
  jobTitle: "AI Engineer",
  url: siteUrl,
  sameAs: [
    "https://github.com/ryanajaaa",
    "https://www.linkedin.com/in/ryan-andiya-saputra-301ab3372/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <div className="pointer-events-none fixed inset-0 -z-10">
            <AnimatedBackground />
            <Spotlight className="absolute inset-0" />
          </div>
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}