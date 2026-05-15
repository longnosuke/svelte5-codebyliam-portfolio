# Codebase Guidelines

This guide reflects the current state of the portfolio codebase.

## Current Status

- SvelteKit 2 + Svelte 5 app with TypeScript strict mode enabled.
- Static adapter build target. Routes should prerender cleanly.
- Main experience is a terminal-themed personal portfolio with a bottom dock, custom cursor, galaxy backdrop, scroll-driven home, and project case-study pages.
- Home page uses GSAP ScrollTrigger, Threlte, Three.js, and static fallback handling for reduced motion.
- Portfolio content is driven by typed data in `src/lib/data/projects.ts`.
- Site identity and dock links live in `src/lib/data/site.ts`.
- Global visual tokens and shared terminal styles live in `src/app.css`.
- Supabase is currently used by `src/lib/ClickMe.svelte` for the click counter easter egg.

## Commands

- Install dependencies with the package manager already used by the branch. Current lockfiles include `bun.lock` and `package-lock.json`; avoid regenerating both casually.
- Run local development with `npm run dev` or equivalent package-manager command.
- Run production build with `npm run build`.
- Run type and Svelte checks with `npm run check`.

## Architecture Rules

- Keep route components thin. Put reusable UI in `src/lib/components/`, scene work in `src/lib/scene/`, and content/data in `src/lib/data/`.
- Prefer typed data contracts over repeated page markup. Add project, home, or site content in existing data files first.
- Use Svelte 5 runes already present in the codebase: `$state`, `$derived`, `$effect`, and `$props`.
- Guard browser-only APIs with `browser`, `onMount`, or component lifecycle checks. Static prerender must not execute `window`, `document`, `Audio`, `performance`, or canvas code on the server.
- For dynamic project pages, keep `entries()` and `prerender = true` aligned with `projects`.
- Keep external links explicit with `target="_blank"` and `rel="noopener noreferrer"`.

## Styling Rules

- Use existing CSS variables from `src/app.css` before adding new colors, spacing, z-indexes, shadows, or radii.
- Preserve the terminal UI language: dark surface, mono labels, bracket/tag details, compact controls, and 4-10px radius surfaces.
- Keep global styles in `src/app.css` only when shared across pages/components. Component-specific layout should stay in the component `<style>`.
- Avoid page-level card nesting. Use `TerminalWindow` as the primary framed surface, then unframed sections or small repeated items inside it.
- Keep responsive sizing stable with `clamp()`, `min()`, `max()`, `aspect-ratio`, and fixed icon/button hit areas.
- Do not hide focus states. New interactive controls need keyboard-visible focus, usable labels, and stable hover/active states.

## Motion And 3D Rules

- Respect `prefers-reduced-motion`. Any new animation, scroll effect, or canvas feature needs a static or reduced fallback.
- Keep canvas/backdrop components non-interactive unless there is a specific interaction requirement.
- Tune 3D counts and texture usage for mobile separately. Existing pattern reduces star count under `768px`.
- Use `requestAnimationFrame` for visual readiness/animation loops and clean up timers, GSAP triggers, event listeners, and subscriptions on unmount.
- Do not add heavy client-only code to route files when it can stay inside lazy visual components.

## Content Rules

- Add new projects in `src/lib/data/projects.ts` with complete `Project` data: `slug`, `title`, `type`, `imageUrl`, `url`, and `detail`.
- Project screenshots should map to files under `static/projects/`; use WebP when possible and write useful alt text.
- Use `comingSoon: true` for placeholder work. Do not link fake live URLs except `#` or `/` with `comingSoon`.
- Keep project copy concrete: problem, solution, role, year, and stack. Avoid generic marketing text.
- Update `static/sitemap.xml` when adding or removing public routes that should be indexed.

## Assets

- Source-imported assets belong in `src/assets/` when bundled by Vite/SvelteKit.
- Public path assets belong in `static/` and should be referenced from root paths such as `/projects/name.webp`.
- Keep large visual assets compressed. Prefer WebP for screenshots and JPG/PNG only when needed.
- Existing planet SVGs in `static/images/planets/` are original project artwork; preserve attribution in `README.md` if moved or replaced.

## Supabase And Environment

- Public Supabase values should come from `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`.
- Do not add private Supabase keys or service-role keys to client code.
- If changing `ClickMe.svelte`, keep optimistic UI and failure recovery behavior intact unless replacing the counter flow entirely.

## Quality Checklist

- Run `npm run check` before handoff when TypeScript, Svelte, or data contracts change.
- Run `npm run build` when route structure, prerendering, static assets, or dynamic entries change.
- Test core pages after UI changes: `/`, `/portfolio`, `/portfolio/[slug]`, `/about`, and `/contact`.
- Verify mobile layout, reduced-motion behavior, dock navigation, and custom cursor interactions after visual changes.
- Check that new public assets resolve after build and do not break static adapter output.

## Common Change Paths

- Add site link: update `dockLinks` in `src/lib/data/site.ts`, add a matching Lucide icon import/map entry in `SiteDock.svelte`, then add route/page if needed.
- Add project: place image in `static/projects/`, add data in `projects.ts`, confirm detail page builds through `entries()`, then update sitemap.
- Add home section: update `homeSections` in `src/lib/data/home.ts`, ensure matching planet metadata exists, and check scroll progress math still selects sections correctly.
- Add global visual token: add variable in `src/app.css`, then consume it from component styles.
- Add scene object: place reusable object in `src/lib/scene/objects/`, keep materials/loaders in dedicated scene folders, and expose only the props needed by `GalaxyScene` or `SceneCanvas`.
