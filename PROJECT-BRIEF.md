# Project Brief: Web Portfolio (Astro)

A ground-up rebuild of Joshua Anton Magbanua's portfolio in **Astro**. This is a
new site, not a port. The old React/Vite site (`Web-portfolio`, live at
https://ja-magbanua.vercel.app/) is the **content source only**. Design, layout,
animation and code structure are all new.

- **Owner:** Joshua Anton Magbanua (Aved), Full Stack Developer, CFO & co-founder of NightPatch Dev
- **Location:** Kabankalan City, Negros Occidental, Philippines
- **Contact:** jshant.magbanua@gmail.com
- **Goal:** land remote IT / web dev roles (UK-based companies in particular) and win freelance clients
- **Repo state:** fresh Astro starter in this folder (Astro 7, Node >= 22.12, no integrations yet)

---

## 1. Goals and non-goals

**Goals**
- Look clearly different from the current site (no neon cursor, no splash intro, no cyan/neon glow)
- Fast by default: static HTML, near-zero JS, 95+ Lighthouse on all four scores
- Animations that feel designed, not decorative, and respect `prefers-reduced-motion`
- Strong SEO and AI-crawler readability (meta, JSON-LD, `llms.txt`, sitemap)
- Easy to update: projects and experience live in content collections, not in components

**Non-goals**
- No backend, auth, or CMS. Static site only
- No heavy 3D (Spline was dropped before; do not bring it back)
- Do not copy old component code. Reuse content and assets only

---

## 2. Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Astro 7 | Static-first, islands for the few interactive bits |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` | Same as old site, so no relearning; add via `astro add tailwind` or the Vite plugin |
| Language | TypeScript (strict, already in `tsconfig.json`) | Typed content collections |
| Content | Astro content collections + Zod schemas | Projects, experience, stack as data files |
| Animation | CSS scroll-driven animations + View Transitions first; **GSAP + ScrollTrigger** only for what CSS cannot do | Keeps JS small |
| Smooth scroll | Lenis (optional, island, desktop only) | Only if it adds clear value |
| Interactive islands | Svelte or vanilla `<script>`. Avoid React unless a component truly needs it | Smaller bundles |
| Icons | `astro-icon` + Simple Icons set for tech logos | No runtime icon library |
| Images | `astro:assets` `<Image />` and `<Picture />` | Auto AVIF/WebP, correct sizes |
| Fonts | Self-hosted via Fontsource (no Google Fonts request) | Faster, privacy-friendly |
| Hosting | Vercel (static output) | Already used, `cleanUrls` |
| Lint/format | Prettier + `prettier-plugin-astro`, `astro check` | Type-check `.astro` files |

Scripts to have: `dev`, `build`, `preview`, `check` (`astro check`).

Dev server note: use `astro dev --background`, manage with `astro dev stop|status|logs` (see `AGENTS.md`).

---

## 3. Design direction (new)

**Concept: "Editorial Workshop."** A personal-magazine feel. Big confident type,
generous whitespace, one deep navy palette. It should read as calm, crafted and
human, not glowing cyber-tech.

### Palette
Brand colors (set by Joshua): **`#141E30`** (deep navy) and **`#35577D`** (steel blue).
Together they form the signature gradient: `linear-gradient(135deg, #141E30, #35577D)`.

**Dark is the default theme.** Light is an alternate built from the same two colors.
Tints marked * are derived suggestions, not from Joshua, so confirm or adjust them.

| Token | Dark (default) | Light |
|---|---|---|
| `--bg` | `#141E30` | `#EEF2F7`* |
| `--surface` | `#1B2A42`* (between the two) | `#DFE6EF`* |
| `--brand` | `#35577D` | `#35577D` |
| `--ink` | `#EAF0F8`* | `#141E30` |
| `--muted` | `#9FB1C8`* | `#4B5F78`* |
| `--accent` (text, links, focus) | `#8FB4E3`* | `#35577D` |
| `--line` | `#EAF0F8` at 14% | `#141E30` at 14% |

Usage rules:
- `#35577D` on `#141E30` is only about 2.2:1 contrast. Use it for fills, borders, gradients and large decorative shapes, **never for body text or small links on dark**. Use `--accent` `#8FB4E3` for those.
- On the light theme, `#35577D` text on `#EEF2F7` is about 6:1, so it is safe for links and buttons.
- Hero and footer can use the signature gradient as a full-bleed background; keep body sections on flat `--bg` so the gradient stays special.
- Define all tokens as CSS variables on `:root`, remap under `[data-theme="light"]` and `prefers-color-scheme`. Re-check contrast in both themes before shipping.

### Typography
- **Display:** a high-contrast serif or characterful grotesk at very large sizes (e.g. Fraunces, Instrument Serif, or Bricolage Grotesque)
- **Body:** a clean sans (e.g. Inter Tight or Geist)
- **Accent/labels:** a mono (e.g. JetBrains Mono, Geist Mono) for section numbers, tags, dates
- Fluid sizes with `clamp()`. Hero headline roughly `clamp(3.5rem, 12vw, 11rem)`

### Visual language
- Numbered sections (`01 / Work`, `02 / About` ...) in mono
- Thin 1px rules dividing sections instead of boxes and shadows
- Oversized text, tight leading, occasional outlined (stroke) text
- Subtle film-grain overlay (tiny SVG noise, under 5 KB) on the gradient areas for texture
- Square or lightly rounded corners (2 to 4 px), no glassmorphism, no neon glow

---

## 4. Layout (new)

Single scrolling home page plus real routes for case studies.

### Routes
```
/                      home (all sections below)
/work/[slug]           case study page per project (static, from content collection)
/about                 optional longer bio page
/uses                  optional: tools and stack, replaces the old force-graph
/404
```

### Home sections, in order
1. **Header (sticky, minimal):** wordmark left, 4 links + theme toggle right. Hides on scroll down, shows on scroll up.
2. **Hero:** huge name/role statement spanning full width, a short one-line pitch, availability badge ("Open to remote roles / freelance"), two CTAs (View work, Email me). Marquee strip of tech under it.
3. **Selected Work:** *not* a card grid. Use a **stacked list of wide rows** (index number, title, role, tech tags, year) that expands a preview image on hover (desktop) and shows the image inline on mobile. Click goes to `/work/[slug]`.
4. **About:** two-column split. Left column is **sticky** with portrait and quick facts; right column scrolls through bio paragraphs.
5. **Experience:** vertical timeline with a scroll-drawn line; each entry reveals as it enters.
6. **Toolkit:** replaces the force-graph. A **bento grid** grouped by Frontend / Backend / Mobile / Tools, with icon tiles. List view only; no graph.
7. **Approach:** short "how I work" section. Condense the 13-layer / 7-gate doctrine into 4 to 5 punchy principles with a link to the longer version. Do not rebuild the interactive terminal.
8. **Contact:** giant "Let's talk" email link, socials, resume download, location + local time (Manila).
9. **Footer:** small print, back-to-top, copyright.

### Responsive
Mobile-first. Breakpoints: 640 / 1024 / 1440. On mobile: no hover effects, the work list becomes stacked cards, the sticky About column becomes normal flow, nav becomes a full-screen menu.

---

## 5. Animations (new)

Rule: **CSS first, JS only when needed, and always honor `prefers-reduced-motion`.**
Wrap non-essential motion in `@media (prefers-reduced-motion: no-preference)`.

| Where | Effect | How |
|---|---|---|
| Page to page | Cross-fade / shared-element image morph from work row to case-study hero | Astro View Transitions (`<ClientRouter />`) with `transition:name` |
| Hero headline | Line-by-line mask reveal (text slides up from a clipped line) | CSS keyframes + staggered `animation-delay`, split lines at build time |
| Hero marquee | Infinite horizontal tech ticker, pauses on hover | Pure CSS `@keyframes` translate |
| Section entry | Fade + 24px rise | CSS `animation-timeline: view()` (scroll-driven), `IntersectionObserver` fallback |
| Work rows | Hover: row shifts, accent bar grows, preview image follows cursor with slight lag | Small vanilla script, `transform` only |
| Case-study hero | Image parallax and slow scale on scroll | CSS scroll-driven animation |
| About | Sticky column + paragraph highlight as each enters center | CSS scroll-driven / `position: sticky` |
| Experience line | Line draws down as you scroll | SVG `stroke-dashoffset` tied to scroll timeline |
| Buttons / CTA | Magnetic pull toward cursor (desktop only), small arrow slide | Tiny vanilla script, `pointer: fine` only |
| Theme toggle | Circular reveal wipe from the button | View Transitions API on `data-theme` change |
| Contact email | Letters shift on hover, copy-to-clipboard with toast | CSS + small script |
| Loading | **No splash screen.** Content is visible immediately; only a quick staggered hero reveal | n/a |

Performance guardrails: animate only `transform` and `opacity`; no layout-thrashing
properties; GSAP loaded only on pages that use it (dynamic `import()` inside a
client island); keep total JS under about 60 KB gzipped on home.

---

## 6. Proposed folder structure

```
src/
  assets/
    projects/            # thumbnails (reuse from old site, see §8)
    portrait.jpg
  components/
    Header.astro
    Hero.astro
    Marquee.astro
    WorkList.astro        # rows + hover preview
    WorkRow.astro
    About.astro
    Timeline.astro
    Toolkit.astro         # bento grid
    Approach.astro
    Contact.astro
    Footer.astro
    ThemeToggle.astro     # tiny script island
    Seo.astro             # meta, OG, canonical, JSON-LD
  content/
    projects/*.md         # one file per project (frontmatter + case study body)
    experience/*.md
    stack.json
  content.config.ts       # Zod schemas for the collections
  layouts/
    Base.astro            # html shell, fonts, theme init, ClientRouter
    CaseStudy.astro
  pages/
    index.astro
    about.astro
    uses.astro
    404.astro
    work/[slug].astro
    llms.txt.ts           # generated, so it can never drift from the data
  scripts/
    reveal.ts  magnetic.ts  cursor-preview.ts
  styles/
    global.css            # tokens, base, utilities
public/
  resume.pdf  favicon.svg  robots.txt
```

### Content collection schema (sketch)
```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    role: z.string().optional(),
    summary: z.string(),
    year: z.number(),
    url: z.string().url().optional(),
    nda: z.boolean().default(false),
    cover: image().optional(),
    alt: z.string().optional(),
    tech: z.array(z.string()),
    order: z.number(),
    featured: z.boolean().default(true),
  }),
});

export const collections = { projects };
```
Verify the loader/schema API against the installed Astro version's docs before
relying on this sketch (https://docs.astro.build/en/guides/content-collections/).

---

## 7. Content to carry over (source of truth)

Copy facts from the old site; do not invent. Re-verify live URLs before shipping.

### Bio
Full Stack Developer and CFO & co-founder of NightPatch Dev, based in Kabankalan
City, Philippines. BS Information Technology (Web and Mobile Application
Development), University of St. La Salle, graduated June 2025, Dean's List.
Skills span front end, back end, MySQL, REST APIs, Flutter, deployment and
technical support.

### Projects (order matters)
1. **Arches Dental Clinic**: client landing page. arches-dental-clinic.vercel.app
2. **Berna JSM**: author site rebuilt as a blog + admin CMS (Next.js, TypeScript, Prisma, Supabase, Tiptap, Tailwind). bernajsm-blog.vercel.app. (Formerly "Lessons That Matter"; the old URL is dead, do not use it.)
3. **Punta Roj 39**: client landing page. punta-roj-39-6111.vercel.app
4. **NightPatch Dev**: role CFO & co-founder. nightpatchdev.online
5. **Yowkly**: solo build shipped under NightPatch Dev. Dev/designer community platform (templates, UI kits, yowkbit voting, built-in chat with group calls and screen share). Alpha. Next.js, Supabase Postgres, Cloudflare R2, Upstash. yowkly.vercel.app
6. **Heyuan Ledger System**: **NDA**. No public URL or thumbnail. Billing/fleet management for an aggregates-hauling business (Next.js, TypeScript, Prisma, Supabase). Render as a text-only case study.

Do **not** add Archdag Laundry System or the hardware construction inventory
project until Joshua explicitly confirms.

### Experience
- **NightPatch Dev**: Full Stack Developer, CFO & Co-Founder (Jul 2026 to present)
- **Self-employed, Kabankalan City**: Freelance Web Developer (Jun 2025 to present). Clients include Kape Al Vista, Arches Dental Clinic, and the author behind Berna JSM
- **Internship**: Web Developer & Technical Support (Jan to May 2025)
- **GymSync**: Lead Full Stack Developer, capstone (Aug to Dec 2024). Flutter + Dart front end, PHP + MySQL REST API on HelioHost

### Stack
- **Frontend & UI:** React, Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Vite, JavaScript, HTML5, CSS3 (add Astro)
- **Backend & Database:** Node.js, PHP, Prisma, Supabase, PostgreSQL, MySQL, Redis, REST API
- **Mobile:** Flutter, Dart
- **Tools & Platforms:** Git, Vercel, Vercel Analytics, Cloudflare R2, Upstash, HelioHost (no Simple Icons entry, use a plain "H" badge)

---

## 8. Assets to reuse from the old repo

Old repo path: `C:\Users\ACER\Documents\My Projects\Web-portfolio`

- `public/projects/*.jpg|webp`: project thumbnails (1600x1000). Move into `src/assets/projects/` so `<Image />` can optimize them
- `public/resume.pdf`
- `public/developer_portrait*`
- `public/favicon*`
- `public/robots.txt`, `public/sitemap.xml` (replace the sitemap with `@astrojs/sitemap`)
- `index.html` JSON-LD block (ProfilePage + Person + Organization): port into `Seo.astro`

---

## 9. SEO, accessibility, quality bar

**SEO**
- Unique `<title>` and meta description per page, canonical URL, OG + Twitter cards (generate OG images per case study if time allows)
- JSON-LD `@graph` (ProfilePage, Person, Organization) on home
- `@astrojs/sitemap`, `robots.txt`
- `llms.txt` generated from the content collections so it never drifts

**Accessibility (target WCAG 2.1 AA)**
- Semantic landmarks, one `<h1>` per page, visible focus rings
- Skip-to-content link
- Full keyboard navigation, including the mobile menu
- Color contrast checked in both themes
- Hover-only information must also be available on focus and on touch
- Reduced-motion support everywhere

**Performance budget**
- LCP under 2.0 s on mobile, CLS 0, total home JS about 60 KB gzipped or less
- All images through `astro:assets`, hero image `loading="eager"` + `fetchpriority="high"`

---

## 10. Build plan

1. **Setup:** add Tailwind v4, sitemap, Prettier, `astro check`; install fonts; set up tokens in `global.css`; `Base.astro` with theme init and `<ClientRouter />`
2. **Content:** define collections; migrate the 6 projects, experience, and stack into content files; copy assets
3. **Static layout:** build every home section with no animation, mobile first
4. **Case-study route:** `/work/[slug]` with the NDA variant
5. **Animation pass:** CSS reveals, marquee, scroll-driven effects, then the small JS pieces (cursor preview, magnetic buttons, theme wipe)
6. **SEO + a11y pass:** meta, JSON-LD, `llms.txt`, contrast, keyboard, reduced motion
7. **QA:** `astro check` -> `astro build` -> real-browser check at 375 / 768 / 1280 / 1920 in both themes -> Lighthouse
8. **Deploy:** new Vercel project (keep the old site live until the new one is verified), then swap the domain/alias

---

## 11. Working conventions (carried over from the old project)

- **No em dashes or en dashes** in any copy or file. Grep every changed file for both characters and require zero matches
- Verify project facts against the live URL before writing copy about it. Do not guess from folder names
- Dead links and stale copy are bugs, fix them immediately
- Verify in a real browser before calling anything done, not only a passing build
- Before a push: build -> check -> browser check -> `git add` specific files (never `-A`) -> detailed commit body
- Scan any newly referenced repo (files and history) for secrets before mentioning it publicly
- Commit messages end with the attribution line the project uses

---

## 12. Open questions for Joshua

- Confirm the derived tints (`--surface`, `--ink`, `--muted`, `--accent`) or send your own
- Dark is the default theme: keep it that way, or default to light?
- Keep a visible "Approach / doctrine" section, or move it to a separate `/approach` page?
- Add `/about` and `/uses` pages now, or after launch?
- Domain: reuse `ja-magbanua.vercel.app` or move to a custom domain (e.g. under `nightpatchdev.online`)?
- Add the two unconfirmed projects (Archdag Laundry System, hardware construction inventory)?
