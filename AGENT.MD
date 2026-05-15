# Agent guide — CodebyLiam Portfolio

Initial codebase scan for AI agents and contributors. Prefer this file over scattered README boilerplate when changing the app.

## What this is

- **SvelteKit 2** + **Svelte 5** (runes) + **TypeScript** (strict), static export via `@sveltejs/adapter-static`.
- Terminal-themed personal portfolio: dock nav, custom cursor, galaxy backdrop, scroll-driven home, project case studies.
- Home: **GSAP ScrollTrigger**, **Threlte** / **Three.js**, reduced-motion fallbacks.
- Content: typed data in `src/lib/data/` (not CMS).
- **Supabase** (public anon key only): click-counter easter egg in `src/lib/ClickMe.svelte`.
- **Deploy**: GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`).

## Tooling

| Item | Value |
|------|--------|
| Package manager (CI + preferred local) | **Bun** (`bun.lock`) |
| Also present | `package-lock.json` — do not regenerate both lockfiles casually |
| Node | `.node-version` → `24.15.0` |
| Bundler | Vite via `npm:rolldown-vite@7.2.5` alias in `package.json` |

```bash
bun install
bun run dev      # vite dev
bun run build    # static build → build/
bun run check    # svelte-kit sync + svelte-check
```

Env (copy from `.env.example`): `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`. Never add service-role keys to client code.

## Routes (all `prerender = true`)

| Path | Role |
|------|------|
| `/` | Scroll home (`ScrollHome`, sections from `home.ts`) |
| `/portfolio` | Project grid |
| `/portfolio/[slug]` | Case study; `entries()` from `projects.ts` |
| `/about` | About page |
| `/contact` | Contact page |

Layout (`+layout.svelte`): global `GalaxyBackdrop`, `SiteCursor`, `SiteDock`, `app.css`.

## Directory map

```
src/
  app.css              # Design tokens + shared terminal styles
  app.html
  assets/              # Bundled assets (fonts, favicon, images)
  routes/              # Thin route shells
  lib/
    data/              # site.ts, projects.ts, home.ts, spaceBackdrop.ts
    components/        # Terminal UI, dock, cursor, case study shell
    scene/             # Threlte/Three: GalaxyScene, ScrollHome, objects/, materials/
    search/            # Flexsearch site search
    supabase.ts
    ClickMe.svelte
static/                # Public assets (projects/*.webp, models/, textures/, sitemap.xml)
scripts/               # e.g. generate-flying-models.mjs
```

## Architecture rules

- Keep **route components thin**; UI in `src/lib/components/`, 3D in `src/lib/scene/`, copy/data in `src/lib/data/`.
- Use Svelte 5 runes: `$state`, `$derived`, `$effect`, `$props`.
- **SSR/prerender safe**: guard `window`, `document`, `Audio`, `performance`, canvas with `browser`, `onMount`, or lifecycle checks. No browser-only work at module top level in prerendered routes.
- Dynamic projects: keep `entries()` and `prerender` aligned with `projects` in `src/lib/data/projects.ts`.
- External links: `target="_blank"` + `rel="noopener noreferrer"`.

## Styling

- Reuse CSS variables from `src/app.css` before new colors, spacing, z-index, shadows, radii.
- Terminal look: dark surfaces, mono labels, bracket/tag details, 4–10px radii.
- Shared styles → `app.css`; layout → component `<style>`.
- Primary frame: `TerminalWindow`; avoid nested “cards inside cards”.
- Responsive: `clamp()`, `min()`, `max()`, `aspect-ratio`; stable hit targets.
- Never remove focus visibility on interactive controls.

## Motion and 3D

- Honor `prefers-reduced-motion` with static or reduced fallbacks.
- Backdrop/canvas non-interactive unless required.
- Mobile: reduce particle/star counts (existing pattern under `768px`).
- Clean up RAF, GSAP ScrollTrigger, listeners, subscriptions on unmount.
- Heavy client code → lazy/visual components, not route files.

## Content

- New project: full `Project` in `projects.ts` (`slug`, `title`, `type`, `imageUrl`, `url`, `detail`).
- Screenshots: `static/projects/`, prefer WebP, meaningful `alt`.
- `comingSoon: true` for placeholders; live URLs only when real (`#` or `/` with `comingSoon`).
- Update `static/sitemap.xml` when public routes change.

## Assets

- Bundled: `src/assets/`
- Public URLs: `static/` (e.g. `/projects/name.webp`)
- Planet SVGs in `static/images/planets/` are original artwork (see README attribution).

## Common change paths

| Task | Where |
|------|--------|
| Dock link | `dockLinks` in `site.ts` → icon map in `SiteDock.svelte` → route if needed |
| Project | `static/projects/` image → `projects.ts` → verify `entries()` → sitemap |
| Home section | `homeSections` in `home.ts` + planet metadata → scroll progress still correct |
| Global token | `src/app.css` → consume in components |
| Scene object | `src/lib/scene/objects/`; wire via `GalaxyScene` / `SceneCanvas` props only |

## Quality checklist

- `bun run check` — TS/Svelte/data contract changes.
- `bun run build` — routes, prerender, static assets, dynamic entries.
- Manual smoke: `/`, `/portfolio`, `/portfolio/[slug]`, `/about`, `/contact`.
- After UI: mobile, reduced motion, dock, cursor; confirm new `/static` paths work post-build.

## Key dependencies

`@sveltejs/kit`, `@sveltejs/adapter-static`, `svelte`, `vite` (rolldown), `@threlte/core`, `@threlte/extras`, `three`, `gsap`, `@supabase/supabase-js`, `flexsearch`, `@lucide/svelte`, `class-variance-authority`.
