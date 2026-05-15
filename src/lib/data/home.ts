import { site } from "./site";

export const homeStats = [
  { value: "4+", label: "Years Exp." },
  { value: "15+", label: "Projects" },
  { value: "10+", label: "Happy Clients" },
] as const;

export const homeTech = [
  { name: "Svelte", icon: "svelte" as const },
  { name: "RubyOnRails", icon: "typescript" as const },
  { name: "WordPress", icon: "wordpress" as const },
] as const;

export type PlanetId = "earthNight" | "earthBlue" | "mars" | "jupiter";

export const planetMeta: Record<
  PlanetId,
  { label: string; src: string; accent: string; accentSoft: string }
> = {
  earthNight: {
    label: "Dark Earth at night with glowing city lights",
    src: "/images/planets/terminal-earth-night.png",
    accent: "#f28a3c",
    accentSoft: "rgba(242, 138, 60, 0.34)",
  },
  earthBlue: {
    label: "Dark cratered planet with copper rim light",
    src: "/images/planets/terminal-moon.png",
    accent: "#c58a67",
    accentSoft: "rgba(197, 138, 103, 0.26)",
  },
  mars: {
    label: "Mars with cratered terrain and warm rim light",
    src: "/images/planets/terminal-mars.png",
    accent: "#e27841",
    accentSoft: "rgba(226, 120, 65, 0.32)",
  },
  jupiter: {
    label: "Dark gas giant with amber storm bands",
    src: "/images/planets/terminal-jupiter.png",
    accent: "#d38b52",
    accentSoft: "rgba(211, 139, 82, 0.28)",
  },
};

export const homeSections = [
  {
    id: "whoami",
    command: "whoami",
    planet: "earthNight" as PlanetId,
    title: site.name,
    lines: [],
    showBio: true,
    showTech: true,
  },
  {
    id: "work",
    command: "ls ./work",
    planet: "mars" as PlanetId,
    title: "Selected projects",
    lines: [
      { text: "Client sites, internal tools, fullstack apps.", accent: false },
      { text: "Full index: /portfolio", accent: false },
    ],
    showBio: false,
    showTech: false,
    linkCta: { label: "ls -la ./work →", href: "/portfolio" },
  },
  {
    id: "contact",
    command: "contact --open",
    planet: "jupiter" as PlanetId,
    title: "Open to collaborate",
    lines: [
      { text: "Freelance and full-time.", accent: false },
      { text: "Say hello when you are ready.", accent: false },
    ],
    showBio: false,
    showTech: false,
    primaryCta: { label: "View Projects", href: "/portfolio" },
    secondaryCta: { label: "Contact Me", href: "/contact" },
  },
] as const;
