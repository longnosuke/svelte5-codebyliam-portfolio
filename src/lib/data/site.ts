/** Production origin — also in static/CNAME and sitemap.xml */
export const siteUrl = "https://portfolio.codebyliam.com";

export const brand = "CodebyLiam";

export const site = {
  name: "Liam Nguyen",
  legalName: "Thanh Long (Liam) Nguyen",
  alias: "Liam",
  title: "Fullstack Web Developer",
  bio: "I build elegant, performant web experiences with clean code and modern technologies.",
  email: "info.liamnguyen@gmail.com",
  location: "Vietnam",
  locale: "en_US",
  blogUrl: "https://blog.codebyliam.com",
  githubUrl: "https://github.com/imtbndev",
  linkedinUrl: "https://www.linkedin.com/in/liamnguyen-dev/",
} as const;

export const defaultDescription =
  "Thanh Long (Liam) Nguyen — fullstack web developer in Vietnam. Interactive portfolio with selected Svelte, TypeScript, and WordPress work.";

/** Default social preview (1200×630 recommended; replace with dedicated asset when available) */
export const defaultOgImagePath = "/images/space/planet-hero.png";

export const dockLinks = [
  { href: "/", label: "Home", icon: "home" as const },
  { href: "/portfolio", label: "Work", icon: "code" as const },
  {
    href: site.blogUrl,
    label: "Blog",
    icon: "rss" as const,
    external: true as const,
  },
  { href: "/contact", label: "Contact", icon: "mail" as const },
  { href: "/about", label: "About", icon: "user" as const },
] as const;

export type DockLink = (typeof dockLinks)[number];
