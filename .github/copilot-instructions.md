## Purpose
Short, actionable notes to help AI agents be productive in this repo (Next.js + Tailwind site). Focus on discoverable, concrete patterns and commands — not generic advice.

## Quick commands
- Development: `npm run dev` (starts Next.js dev server)
- Build: `npm run build` (Next.js production build)
- Start (prod): `npm run start`
- Lint: `npm run lint` (package.json exposes `eslint`)

Files that demonstrate these workflows: `package.json`, `next.config.mjs`, `tailwind.config.js`.

## Big-picture architecture
- Framework: Next.js (app router). See `src/app/layout.js` and the `app/` directory — pages are colocated as `page.js` / `page.jsx` under folders (e.g. `app/about/page.jsx`).
- Code layout:
  - `src/components/` – UI and feature components (many named exports, e.g., `export function Header`)
  - `src/components/ui/` – design-system primitives/wrappers around Radix UI & Tailwind (e.g. `button.jsx`, `sheet.jsx`, `navigation-menu.jsx`)
  - `src/lib/` – small utilities and constants (`utils.js`, `constants.js`)

Why this matters: most changes are in `src/components` and `app/` — prefer updating shared primitives in `src/components/ui/` to affect site-wide behavior.

## Project-specific conventions & patterns
- Import alias: `@/*` → `src/*` (see `jsconfig.json`). Use absolute imports like `import { Button } from '@/components/ui/button'`.
- Components follow PascalCase and use named exports (e.g. `export function Header() {}`), so import with braces.
- Client components: components that use state or browser-only APIs include a top-line `"use client"` directive. Keep server vs client boundaries in mind when moving logic.
- Styling & utilities:
  - Tailwind v4 is used; theme custom fonts wired via `next/font` in `src/app/layout.js` and referenced as CSS variables in `tailwind.config.js`.
  - `src/lib/utils.js` exports `cn(...)` which combines `clsx` + `tailwind-merge`; use it to compose className strings.
  - `components/ui/button.jsx` uses class-variance-authority (`cva`) to define variant/size patterns — follow this pattern for new primitives.
- UI primitives: Radix primitives are wrapped under `src/components/ui/` — prefer using those wrappers (Sheet, NavigationMenu, Select, etc.) instead of raw Radix components so you get consistent styling and asChild patterns.
- Icons: `lucide-react` is used pervasively. Follow the pattern of passing the icon component (not an SVG string) where examples exist (e.g., `Header.jsx` navLinks array uses components).

## Image & asset rules discovered
- `next.config.mjs` already allows external images from `placehold.co` and enables `dangerouslyAllowSVG`. When adding other remote image domains update `remotePatterns`.
- Many components render images via `img` tag with remote URLs (Hero, PropertyCard). Prefer Next.js `<Image />` only if you also update `next.config.mjs` and handle layout/responsive props.

## Notable code examples (copyable patterns)
- Button primitive (variant + size with cva): `src/components/ui/button.jsx` — use `buttonVariants({ variant, size })` + `cn(...)` for classes.
- Navigation + mobile sheet: `src/components/Header.jsx` demonstrates Radix `NavigationMenu` + `Sheet` + `asChild` pattern with `next/link`.
- Site constants: `src/lib/constants.js` contains `SITE` object (title, contact info) used across Footer and other components.
- Carousel slicing: `src/components/TestimonialsSection.jsx` uses `itemsPerView = 3` and slices `testimonials.slice(currentIndex, currentIndex + itemsPerView)`; be aware this can lead to fewer items shown near the end — preserve its existing behavior unless intentionally changing UX.

## Build, lint, and debugging notes
- Dev server is standard: `npm run dev` -> localhost:3000.
- Linting: `npm run lint` calls `eslint` (no args in package.json). If you need to run against files, run `npx eslint .` or add args to the script.
- If you change `next.config.mjs` (image domains, reactCompiler), restart the dev server.

## What to watch for when editing
- Server vs Client: Removing or adding `"use client"` changes where code runs. Keep data fetching and heavy logic on the server unless you need interactivity.
- Exports: Many components use named exports. Adding a default export may be unexpected for other files that import by name.
- Tailwind classes are used heavily; avoid accidental class collisions — use `cn(...)` + `cva` for predictable merges.

## Where to look for more context
- App entry/layout: `src/app/layout.js`
- Global styles: `src/app/globals.css`
- UI primitives: `src/components/ui/` (button, sheet, navigation-menu, input, card, etc.)
- Example feature UIs: `src/components/Hero.jsx`, `PropertyCard.jsx`, `TestimonialsSection.jsx`, `Header.jsx`, `Footer.jsx`
- Site constants and utilities: `src/lib/constants.js`, `src/lib/utils.js`

## If something is missing
- This file documents only discoverable patterns. Tell me any missing workflows (CI, deploy secrets, custom scripts, or non-standard dev steps) and I will incorporate them.

---
Please review: tell me if you want more examples, stricter guardrails (tests/PR linting), or CI/deployment steps added.
