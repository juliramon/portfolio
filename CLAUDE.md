# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # production build (also runs ESLint: next/core-web-vitals)
npm run start    # serve the production build
npm run lint     # ESLint only
npx prettier --write <files>   # formatting: tabs, tabWidth 4 (.prettierrc)
```

There is no test suite. Verify changes with `npm run build` and by looking at the rendered page.

When taking headless screenshots, pass `--force-prefers-reduced-motion`. Otherwise every `[data-reveal]` element stays at `opacity: 0`, because the GSAP reveal only runs on scroll. Chrome's headless window can't go narrower than about 500px, so check mobile widths by loading the page in a 390px `<iframe>`.

## Stack

Next.js 13.4 (App Router, JavaScript, no TypeScript) · React 18 · Tailwind CSS 3.3 written through Sass (`.sass` indented syntax) · GSAP + ScrollTrigger. Deployed on Vercel. Local Node is v16; production and previews build on Vercel.

## Architecture

The site is a single-page portfolio. `src/app/page.js` renders every section, and the nav links jump to anchors (`#about`, `#services`, `#ai`, `#stack`, `#experience`, `#projects`, `#contact`).

- **Content vs. presentation:** almost all copy lives in `src/data/content.js`: profile, socials, navLinks, services, aiTools, aiPrinciples, experience and projects. A few pieces are hard-coded in `page.js`: hero/about paragraphs, the `juli.json` card, the stack list, the connect topics and the service visuals. `Nav.jsx` builds its links from `navLinks` and highlights the active one with an `IntersectionObserver` on those section ids. A new section therefore needs a matching `id` in `page.js`.
- **Server/client split:** `layout.js` is a server component that exports `metadata`. `page.js`, `Nav.jsx`, `LifeCounter.jsx` and `ScrollOverlay.jsx` are client components.
- **Page building blocks in `page.js`:**
  - `Section` draws the full-bleed top rule and the framed content with "+" corner markers. Pass `dark` for the dark variant.
  - `SectionHeader` renders the eyebrow index, title, lead and an optional handwritten `note`.
  - `ServiceVisual` switches on the service `id`. It must stay in sync with the service ids in `content.js` and with `serviceIcons`.
- **Animation:** add `data-reveal` to any element you want to fade in on scroll. A single `ScrollTrigger.batch` in `page.js` handles all of them, and it is skipped entirely under `prefers-reduced-motion`.
- **Icons:** `src/utils/icons.js` exports JSX SVGs, most created with the `outline()` helper (Tabler-style paths drawn with `stroke="currentColor"`). Render them through `<Icon classList="h-5 w-5 ...">`, which sizes the child SVG. Use `currentColor`, never a hard-coded stroke color, or icons disappear on light backgrounds.
- **Handwritten accents:** use the `.handwritten-note` class together with `<Scribble variant="curve|loop|down">` (hand-drawn arrows that point right; flip or rotate them with classes).

## Styling system

- `src/styles/app.sass` imports Tailwind and `components/*.sass`. Custom classes live in `@layer base` or `@layer components` and are written with `@apply`.
- **Layout classes:** `.frame` (a max-w-6xl column with vertical border lines), `.frame-inner` (side padding), `.rule` (full-bleed top border), `.section` (vertical padding) and `.cross` (the corner markers).
- **Boxes:**
  - `.card` and `.card-hover` are plain bordered cards.
  - `.grid-cells` and `.grid-cells-dark` are grids whose cells share 1px borders. They use `gap-px` over a border-colored background.
  - `.gradient-border` is a 1px pastel border made from a wrapper with padding. The inner element needs `rounded-[15px] bg-white`.
- **Color accents:**
  - `.text-gradient` and `.bg-brand-gradient` apply the brand gradient.
  - `.tint-pink|violet|teal|yellow` are pastel tints, cycled through the `tints` array in `page.js`.
  - `.hero-glow` and `.dark-glow` are soft background washes.
  - Keep gradients subtle: the owner asked for this explicitly.
- **Dark section:** `.section-dark` restyles the headings, lead, eyebrow, crosses and notes inside it.
- **Dark theme:**
  - `darkMode: "class"`. The `zinc-*` scale and `surface` read CSS variables defined on `:root` in `app.sass`, and those variables are inverted under `:root.dark`. Most markup therefore needs no `dark:` variants.
  - Use `bg-surface` / `text-surface` instead of `bg-white` / `text-white`.
  - Hard-coded accent colors (emerald, violet, teal, quartiary text) need an explicit `dark:` variant.
  - The AI section is always dark and uses the fixed `night-*` palette, never `zinc-*`.
  - An inline script in `layout.js` applies the theme before paint (stored in `localStorage` "theme", falling back to the OS preference). `ThemeToggle.jsx` switches it.
  - Tailwind 3.3 has no `/15` or `/35` opacity steps: use `/10`, `/20` and so on, or arbitrary values.
- **Colors:** neutrals are Tailwind's `zinc`. `tailwind.config.js` adds brand scales `primary` (grays), `secondary` (yellow), `tertiary` (teal) and `quartiary` (pink, used for accents and the handwritten notes).
- **Fonts:** self-hosted in `/fonts` (Circular, plus Shadows Into Light for `font-handwritten`) and loaded with `@font-face` from `app.sass` via `../../fonts/...`. `font-mono` is the system monospace stack.

## SEO & metadata

- `siteUrl` in `content.js` (override with `NEXT_PUBLIC_SITE_URL`) feeds `metadataBase`, the canonical URL, `robots.js`, `sitemap.js` and the JSON-LD `Person` / `WebSite` graph in `layout.js`.
- Icons and social images use Next file conventions in `src/app/`: `favicon.ico`, `icon.png`, `apple-icon.png`, `opengraph-image.png` / `twitter-image.png` (with `.alt.txt`).
- The OG image and icons are static PNGs rendered from HTML with headless Chrome, not generated at runtime. Re-render them if the hero copy or branding changes.
- `public/llms.txt` is a hand-written summary for AI assistants. Keep it in sync with `content.js`. `robots.js` explicitly allows the main AI crawlers.

## Content positioning

Juli is a **front-end developer and team lead** in Barcelona who builds websites and e-commerce and manages a front-end team. The tone should be personal, not salesy. Juli works daily with AI tools (mainly Claude, plus Cursor); call them "AI tools", not "agents". Shopify, WordPress, PHP, MySQL, React, Next.js, Vite, Tailwind and Sass are tools on the list, not the headline message. The closing "Connect" block is about networking and following Juli on social networks, not about finding new client projects. Site copy is in English.

## Conventions

- Commit messages follow the semantic commit guidelines (Conventional Commits): `<type>(<optional scope>): <subject>`.
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
  - Write the subject in the imperative and lowercase, with no trailing period. Examples: `feat(ai): add team adoption principle`, `fix(nav): highlight active section on mobile`.
  - Older commits use the `add: front --> …` format; don't copy it.
- `src/utils/animations.js`, `src/utils/helpers.js` and the `locomotive-scroll` dependency are leftovers from the original version and are no longer used.
