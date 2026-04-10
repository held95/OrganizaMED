# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository contains **OrganizaMED**, a single-page landing page for a Brazilian medical services company. Built with React 19, TypeScript, Vite 8, and Tailwind CSS 4. All user-facing content is in **Brazilian Portuguese (pt-BR)**.

## Commands

All commands run from `OrganizaMED/`:

```bash
cd OrganizaMED
npm run dev        # Start Vite dev server
npm run build      # TypeScript check + Vite production build
npm run lint       # ESLint (flat config, TS + React rules)
npm run preview    # Preview production build locally
```

No test framework is configured.

## Architecture

**Single-page app** with a fixed header and scrollable sections. Entry point: `src/main.tsx` -> `src/App.tsx`.

### Source layout (`OrganizaMED/src/`)

- **components/layout/** - Header (sticky nav, theme toggle) and Footer
- **components/sections/** - Page sections rendered in order by App.tsx: Hero, Services, Stats, About, HowItWorks, Testimonials, Partners, HighlightBanner, FAQ, Contact
- **components/ui/** - Reusable UI primitives (Button, FormField, ScrollReveal, Toast, SpeedDial, etc.)
- **data/** - Static content arrays (services, testimonials, FAQ, partners, navigation links, stats, howItWorks)
- **hooks/** - `useScrollPosition` (RAF-debounced scroll tracking), `useReducedMotion` (respects prefers-reduced-motion)
- **lib/cn.ts** - `clsx` + `tailwind-merge` utility for classnames
- **lib/schemas.ts** - Zod validation schema for the contact form
- **types/index.ts** - Shared TypeScript interfaces

### Key patterns

- **Animations**: Framer Motion `whileInView` for scroll reveals; `react-intersection-observer` for triggering counters. The `useReducedMotion` hook disables animations when the OS preference is set.
- **Dark mode**: Toggled via `ColorModeToggle`, persisted to localStorage.
- **Form handling**: React Hook Form + Zod schema (`lib/schemas.ts`) + `@hookform/resolvers`. Contact form submission is currently simulated (2s delay, 95% success rate).
- **Carousel**: Embla Carousel with autoplay plugin for testimonials.
- **Content changes**: Update the corresponding file in `data/` — no hardcoded content in components.

### Tech stack specifics

- TypeScript strict mode (noUnusedLocals, noUnusedParameters, noFallthroughCasesInSwitch)
- Tailwind CSS v4 via `@tailwindcss/vite` plugin (not PostCSS)
- Custom CSS theme variables defined in `src/index.css` (navy primary, teal secondary)
- Fonts: Inter (body), Plus Jakarta Sans (headings) via @fontsource
