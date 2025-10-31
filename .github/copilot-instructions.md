## Purpose
Concise, actionable notes to help AI coding agents be productive in this Next.js + Tailwind repo. Focus on discoverable patterns, commands, and concrete file examples — not generic advice.

## Quick commands
- dev: `npm run dev` — Next.js dev server (http://localhost:3000)
- build: `npm run build` — production build
- start: `npm run start` — run built app
- lint: `npm run lint` (calls `eslint`)

Files: `package.json`, `next.config.mjs`, `tailwind.config.js` show important project configs.

## Big-picture architecture
- Next.js (App Router). Pages live under `src/app/` as `page.js`/`page.jsx` (see `src/app/layout.js`).
- UI is component-driven under `src/components/`. Design-system primitives live in `src/components/ui/` and are reused across pages.
- Small utilities and constants in `src/lib/` (`utils.js`, `constants.js`).

Why this matters: change UI primitives in `src/components/ui/` to affect site-wide behavior (e.g., button variants, sheet behavior).

## Project-specific conventions
- Import alias: `@/*` → `src/*` (see `jsconfig.json`). Example: `import { Button } from '@/components/ui/button'`.
- Exports: components use named exports (PascalCase). Avoid adding default exports unless necessary.
- Client vs Server: add `"use client"` at the top of files that use state or browser APIs (e.g., interactive components in `src/components/`).

Styling & utilities
- Tailwind v4 is used; fonts are wired via `next/font` in `src/app/layout.js`.
- Use `cn(...)` from `src/lib/utils.js` to compose classes (it wraps `clsx` + `tailwind-merge`).
- `cva` is used for component variants (see `src/components/ui/button.jsx`); follow existing `buttonVariants({ variant, size })` patterns.

UI primitives & patterns
- Radix primitives are wrapped in `src/components/ui/` (Sheet, NavigationMenu, Select, etc.). Prefer wrappers to keep consistent styling and `asChild` semantics.
- Icons: use `lucide-react` icon components (pass the component, not raw SVG). See `src/components/Header.jsx` for examples.

Images & remote assets
- `next.config.mjs` already allows `placehold.co` and `dangerouslyAllowSVG`. When adding new remote image hosts, update `remotePatterns` and restart dev server.
- Many components use plain `<img />`; migrate to `<Image />` only when you update `next.config.mjs` and provide layout props.

Notable files (quick reference)
- `src/app/layout.js` — app entry, font setup, global layout
- `src/components/ui/button.jsx` — cva + variants pattern
- `src/components/ui/sheet.jsx` — sheet wrapper around Radix
- `src/components/Header.jsx` — navigation + mobile sheet example
- `src/lib/utils.js` — `cn(...)` helper
- `src/lib/constants.js` — site-wide constants (SITE object)

Build & debugging notes
- Dev server: `npm run dev` (hot reload)
- Lint: `npm run lint` (adjust with `npx eslint .` for targeted checks)
- Changing `next.config.mjs` or Tailwind config requires restarting the dev server.

Where to look for more context
- UI primitives: `src/components/ui/`
- Pages: `src/app/` (each folder has a `page.js`/`page.jsx`)
- Shared components: `src/components/`

If something is missing
This file documents only discoverable patterns. If there are CI workflows, tests, or deploy secrets not present here, add them and I will merge updates.

Feedback
If any section is unclear or you want more examples (tests, CI, PR linting), tell me which area to expand.
