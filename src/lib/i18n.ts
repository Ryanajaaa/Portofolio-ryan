export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      experience: "Experience",
      certificates: "Certificates",
      contact: "Contact",
    },
    hero: {
      badge: "Available for new opportunities",
      viewProjects: "View Projects",
      downloadResume: "Download Resume",
      greeting: {
        morning: { emoji: "☀️", text: "Good morning" },
        afternoon: { emoji: "🌤️", text: "Good afternoon" },
        evening: { emoji: "🌇", text: "Good evening" },
        night: { emoji: "🌙", text: "Good evening" },
        suffix: "thanks for stopping by!",
      },
      tagline:
        "I build scalable web applications, backend systems, and AI-powered solutions using modern technologies.",
    },
    contact: {
      eyebrow: "Get in touch",
      title: "Let's build something together",
      description:
        "Open to full-time roles, freelance collaborations, and interesting AI projects.",
      cardTitle: "Have a project in mind?",
      cardSubtitle:
        "I usually reply within a day. Let's talk about how I can help.",
      chatButton: "Chat via WhatsApp",
      downloadButton: "Download CV",
    },
    footer: {
      rights: "All rights reserved.",
    },
    langToggle: {
      label: "Switch to Indonesian",
    },
  },
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      projects: "Proyek",
      experience: "Pengalaman",
      certificates: "Sertifikat",
      contact: "Kontak",
    },
    hero: {
      badge: "Terbuka untuk peluang baru",
      viewProjects: "Lihat Proyek",
      downloadResume: "Unduh CV",
      greeting: {
        morning: { emoji: "☀️", text: "Selamat pagi" },
        afternoon: { emoji: "🌤️", text: "Selamat siang" },
        evening: { emoji: "🌇", text: "Selamat sore" },
        night: { emoji: "🌙", text: "Selamat malam" },
        suffix: "terima kasih sudah mampir!",
      },
      tagline:
        "Saya membangun aplikasi web, sistem backend, dan solusi berbasis AI yang skalabel menggunakan teknologi modern.",
    },
    contact: {
      eyebrow: "Hubungi saya",
      title: "Yuk, kita bangun sesuatu bersama",
      description:
        "Terbuka untuk posisi full-time, kolaborasi freelance, dan proyek AI yang menarik.",
      cardTitle: "Ada proyek yang ingin didiskusikan?",
      cardSubtitle:
        "Biasanya saya balas dalam sehari. Yuk, ceritakan apa yang bisa saya bantu.",
      chatButton: "Chat via WhatsApp",
      downloadButton: "Unduh CV",
    },
    footer: {
      rights: "Hak cipta dilindungi.",
    },
    langToggle: {
      label: "Ganti ke Bahasa Inggris",
    },
  },
} as const;

export type Translations = typeof translations;