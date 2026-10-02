import type {
  TechCategory,
  SkillGroup,
  Project,
  ExperienceItem,
  Certificate,
  Repo,
} from "@/types";

export const siteConfig = {
  name: "Ryan Andiya Saputra",
  role: "Technical Support Engineer",
  roles: ["Backend Developer", "Technical Support", "Software Engineer"],
  tagline: "My Skill is Never Give Up",
  email: "ryan.andiya11@gmail.com",
  github: "https://github.com/ryanajaaa",
  linkedin: "https://www.linkedin.com/in/ryan-andiya-saputra-301ab3372/",
  instagram: "https://www.instagram.com/ryanandiyaa_/",
  whatsapp: "https://wa.me/6282124804548",   
  resumeUrl: "/resume.pdf",
  location: "Tangerang, Indonesia",
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
      { name: "Go", icon: "GO" },
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
    category: "Tools",
    items: [
        { name: "Docker", icon: "🐳" },
        { name: "VMware", icon: "VM" },
        { name: "Linux", icon: "🐧" },
        { name: "Git", icon: "🔀" },
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
    description:
      "A CRUD (Create, Read, Update, Delete) canteen management system built with native PHP, handling menu items, orders, and transaction records.",
    image: "/projects/kantin.png",
    tags: ["PHP", "MySQL", "CRUD"],
    github: "https://github.com/Ryanajaaa/ProjekKantin",
  },
  {
    title: "Perpustakaan MVC",
    description:
      "A library management system built with Laravel following the MVC pattern, covering book catalog, member records, and borrowing transactions.",
    image: "/projects/perpustakaan.png",
    tags: ["Laravel", "PHP", "MVC"],
    github: "https://github.com/Ryanajaaa/Perpustakaan-MVC",
  },
  {
    title: "PC Hardware Assembly & Troubleshooting",
    description:
      "Hands-on desktop PC build and repair, covering motherboard and RAM installation, power supply diagnostics, and full component cleaning for reliable performance.",
    image: "/projects/pc-hardware.jpg",
    tags: ["Hardware", "Troubleshooting", "PC Assembly"],
    featured: true,
  },
  {
    title: "Jungle Runner — Scratch Game",
    description:
      "A 2D block-based platformer built in Scratch, featuring sprite animation, collision detection, sound effects, and a game-over state triggered by broadcast events.",
    image: "/projects/scratch-game.png",
    tags: ["Scratch", "Game Development", "Block-based Programming"],
  },
  {
    title: "REST API Backend",
    description:
      "A high-throughput REST API boilerplate with auth, rate limiting, and observability built in.",
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