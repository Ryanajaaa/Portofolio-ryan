import type {
  TechCategory,
  Project,
  ExperienceItem,
  Certificate,
} from "@/types";

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Ryan Andiya Saputra",
  role: "Technical Support Engineer",
  roles: [
    "Technical Support Engineer",
    "Backend Developer",
    "Software Engineer",
  ],
  tagline:
    "I build scalable web applications, backend systems, and AI-powered solutions using modern technologies.",
  email: process.env.NEXT_PUBLIC_SITE_EMAIL ?? "ryan.andiya11@gmail.com",
  github:
    process.env.NEXT_PUBLIC_SITE_GITHUB ?? "https://github.com/ryanajaaa",
  linkedin:
    process.env.NEXT_PUBLIC_SITE_LINKEDIN ??
    "https://www.linkedin.com/in/ryan-andiya-saputra-301ab3372/",
  instagram:
    process.env.NEXT_PUBLIC_SITE_INSTAGRAM ??
    "https://www.instagram.com/ryanandiyaa_/",
  whatsapp:
    process.env.NEXT_PUBLIC_SITE_WHATSAPP ?? "https://wa.me/6281234567890",
  resumeUrl: process.env.NEXT_PUBLIC_SITE_RESUME_URL ?? "/resume.pdf",
  location: process.env.NEXT_PUBLIC_SITE_LOCATION ?? "Tangerang, Indonesia",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export const techStack: TechCategory[] = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js", icon: "▲" },
      { name: "React", icon: "⚛" },
      { name: "TypeScript", icon: "TS" },
      { name: "Tailwind CSS", icon: "〜" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Go", icon: "🐹" },
      { name: "Java", icon: "☕" },
      { name: "Python", icon: "🐍" },
      { name: "Laravel", icon: "🔺" },
      { name: "C++", icon: "C++" },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "PostgreSQL", icon: "🐘" },
      { name: "MySQL", icon: "🗄" },
    ],
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Docker", icon: "🐳" },
      { name: "VMware", icon: "VM" },
      { name: "Linux", icon: "🐧" },
    ],
  },
  {
    category: "AI",
    items: [
      { name: "OpenAI", icon: "✦" },
      { name: "Gemini", icon: "✧" },
      { name: "Claude", icon: "✳" },
      { name: "Cursor", icon: "▲" },
      { name: "AntiGravity", icon: "⚛" },
    ],
  },
];

export const projects: Project[] = [
  {
    title: "ProyekKantin CRUD",
    slug: "proyekkantin-crud",
    description:
      "A CRUD (Create, Read, Update, Delete) canteen management system built with native PHP, handling menu items, orders, and transaction records.",
    longDescription: [
      "ProyekKantin CRUD is a canteen management system built with native PHP, designed to help small canteen operators manage their daily operations without relying on paper records or spreadsheets.",
      "The system handles the full lifecycle of a canteen's data: adding and updating menu items, recording customer orders, and keeping a running log of transactions. It was built from scratch using core PHP and MySQL, without a framework, to practice fundamental backend concepts like routing, form handling, and database queries.",
    ],
    highlights: [
      "Full CRUD operations for menu items and transactions",
      "Built with native PHP and MySQL, no framework dependencies",
      "Simple, clear database schema designed for a small business use case",
    ],
    role: "Solo developer — designed the database schema, built the backend logic, and created the interface.",
    image: "/projects/kantin.png",
    tags: ["PHP", "MySQL", "CRUD"],
    github: "https://github.com/Ryanajaaa/ProjekKantin",
  },
  {
    title: "Perpustakaan MVC",
    slug: "perpustakaan-mvc",
    description:
      "A library management system built with Laravel following the MVC pattern, covering book catalog, member records, and borrowing transactions.",
    longDescription: [
      "Perpustakaan MVC is a library management system built with Laravel, following the Model-View-Controller architecture. The project was built to practice structuring a larger application using a proper framework, after working mostly with native PHP.",
      "It covers the core workflows a library needs: managing a book catalog, keeping track of members, and recording borrowing and return transactions.",
    ],
    highlights: [
      "Follows Laravel's MVC pattern for clean separation of concerns",
      "Covers book catalog, member management, and borrowing transactions",
      "Uses Eloquent ORM and Blade templates",
    ],
    role: "Solo developer — built the application structure, models, controllers, and views.",
    image: "/projects/perpustakaan.png",
    tags: ["Laravel", "PHP", "MVC"],
    github: "https://github.com/Ryanajaaa/Perpustakaan-MVC",
  },
  {
    title: "PC Hardware Assembly & Troubleshooting",
    slug: "pc-hardware-assembly-troubleshooting",
    description:
      "Hands-on desktop PC build and repair, covering motherboard and RAM installation, power supply diagnostics, and full component cleaning for reliable performance.",
    longDescription: [
      "This project is less about code and more about hands-on hardware experience — something I consider just as important for a Technical Support role. It involved disassembling, cleaning, and reassembling a desktop PC, including installing a motherboard and RAM, and diagnosing the power supply.",
      "Working directly with hardware helped me understand how the components I write software for actually function at a physical level — useful context when troubleshooting issues that could be hardware or software related.",
    ],
    highlights: [
      "Motherboard and RAM installation",
      "Power supply diagnostics and testing",
      "Full component cleaning for long-term reliability",
    ],
    role: "Hands-on technician — diagnosed, repaired, and reassembled the unit.",
    image: "/projects/pc-hardware.jpg",
    tags: ["Hardware", "Troubleshooting", "PC Assembly"],
    featured: true,
  },
  {
    title: "Jungle Runner — Scratch Game",
    slug: "jungle-runner-scratch-game",
    description:
      "A 2D block-based platformer built in Scratch, featuring sprite animation, collision detection, sound effects, and a game-over state triggered by broadcast events.",
    longDescription: [
      "Jungle Runner is a small 2D platformer built in Scratch, MIT's block-based visual programming environment. While simple compared to my other projects, it was a fun way to think through game logic — sprite animation, collision detection, and game states — without getting lost in syntax.",
      "The game includes a basic game-over condition triggered by broadcast events, and sound effects to make the experience more engaging.",
    ],
    highlights: [
      "Sprite animation and movement logic",
      "Collision detection between player and obstacles",
      "Game-over state triggered by broadcast events",
    ],
    role: "Solo developer — designed and built the full game logic in Scratch.",
    image: "/projects/scratch-game.png",
    tags: ["Scratch", "Game Development", "Block-based Programming"],
  },
  {
    title: "REST API Backend With Go",
    slug: "rest-api-backend",
    description:
      "A high-throughput REST API boilerplate with auth, rate limiting, and observability built in.",
    longDescription: [
      "A boilerplate REST API built with Go, designed as a reusable starting point for backend projects. Rather than building a specific product, the goal was to put together the pieces every production API needs: authentication, rate limiting, and observability.",
      "This project reflects my interest in backend engineering — focusing on the plumbing that makes an API reliable and production-ready, not just functional.",
    ],
    highlights: [
      "Authentication and rate limiting built in",
      "Structured for observability (logging/monitoring hooks)",
      "Built with Go for performance and simplicity",
    ],
    role: "Solo developer — architected the API structure and core middleware.",
    image: "/projects/rest-api.png",
    tags: ["Go", "PostgreSQL", "Postman"],
    github: "https://github.com/Ryanajaaa/api_wilayahs_indonesia",
  },
];

export const experience: ExperienceItem[] = [
  {
    year: "Jul 2025 - April 2026",
    role: "TECHNICAL SUPPORT",
    company: "PT EXEED INDO JAYA",
    description:
      "Provided technical support 24/7 for VMware vSphere environments by troubleshooting issues in customer infrastructures through a ticketing portal system. Assisted with installation support, case documentation management, and issue resolution related to virtualization platforms",
  },
  {
    year: "Feb 2025 - May 2025",
    role: "Backend Developer Intern",
    company: "PT LOKASOLUSI",
    description:
      "Assisted in developing and maintaining backend services using Go, collaborated with cross-functional teams to deliver high-quality software solutions.",
  },
];

export const certificates: Certificate[] = [
  {
    name: "AI Foundations",
    issuer: "OpenAI",
    year: "Jun 2026",
    icon: "✦",
    image: "/certificates/ai-foundations.png",
  },
  {
    name: "JavaScript Essentials 1",
    issuer: "Cisco",
    year: "Mei 2025",
    icon: "◆",
    image: "/certificates/javascript-essentials.png",
  },
  {
    name: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    year: "Des 2025",
    icon: "🧠",
    image: "/certificates/belajar-dasar-ai.png",
  },
  {
    name: "Belajar Dasar Web Pentesting",
    issuer: "ID-Networkers (IDN.ID)",
    year: "Nov 2025",
    icon: "🛡",
    image: "/certificates/web-pentesting.png",
  },
  {
    name: "Belajar Linux dari Nol",
    issuer: "ID-Networkers (IDN.ID)",
    year: "Nov 2025",
    icon: "🐧",
    image: "/certificates/linux-dari-nol.png",
  },
    {
    name: "Dari Server Fisik Ke Docker",
    issuer: "ID-Networkers (IDN.ID)",
    year: "Sep 2026",
    icon: "🐳",
    image: "/certificates/Docker.png",
  },
];