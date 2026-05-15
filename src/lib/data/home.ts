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

export type PlanetOrbitMoon = {
  duration: number;
  delay?: number;
  size: number;
  inset: string;
  reverse?: boolean;
  angle?: number;
};

export type PlanetOrbit = {
  ring: boolean;
  moons: PlanetOrbitMoon[];
};

export const planetMeta: Record<
  PlanetId,
  {
    label: string;
    src: string;
    accent: string;
    accentSoft: string;
    orbit: PlanetOrbit;
  }
> = {
  earthNight: {
    label: "Dark Earth at night with glowing city lights",
    src: "/images/planets/terminal-earth-night.png",
    accent: "#f28a3c",
    accentSoft: "rgba(242, 138, 60, 0.34)",
    orbit: {
      ring: true,
      moons: [
        { duration: 18, size: 9, inset: "-3%", angle: 24 },
        { duration: 26, size: 7, inset: "-11%", reverse: true, delay: -5, angle: 198 },
      ],
    },
  },
  earthBlue: {
    label: "Dark cratered planet with copper rim light",
    src: "/images/planets/terminal-moon.png",
    accent: "#c58a67",
    accentSoft: "rgba(197, 138, 103, 0.26)",
    orbit: {
      ring: true,
      moons: [{ duration: 20, size: 7, inset: "-5%", angle: 310 }],
    },
  },
  mars: {
    label: "Mars with cratered terrain and warm rim light",
    src: "/images/planets/terminal-mars.png",
    accent: "#e27841",
    accentSoft: "rgba(226, 120, 65, 0.32)",
    orbit: {
      ring: true,
      moons: [
        { duration: 16, size: 8, inset: "-4%", angle: 52 },
        { duration: 24, size: 6, inset: "-12%", reverse: true, angle: 236 },
      ],
    },
  },
  jupiter: {
    label: "Dark gas giant with amber storm bands",
    src: "/images/planets/terminal-jupiter.png",
    accent: "#d38b52",
    accentSoft: "rgba(211, 139, 82, 0.28)",
    orbit: {
      ring: true,
      moons: [
        { duration: 14, size: 8, inset: "-2%", angle: 12 },
        { duration: 22, size: 7, inset: "-9%", delay: -3, angle: 128 },
        { duration: 30, size: 6, inset: "-15%", reverse: true, delay: -8, angle: 264 },
      ],
    },
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
