export interface TechItem {
  name: string;
  icon: string;
}

export interface TechCategory {
  category: string;
  items: TechItem[];
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillGroup {
  group: string;
  icon: string;
  skills: SkillItem[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  features?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  description: string;
  current?: boolean;
}

export interface Certificate {
  name: string;
  issuer: string;
  year: string;
  icon: string;
}

export interface Repo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
}
