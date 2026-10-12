# Joshua Anton Magbanua, portfolio (Astro)

Static portfolio site, rebuilt from scratch in Astro. The previous React/Vite
site (`Web-portfolio`) was the content source only. The full brief lives in
[PROJECT-BRIEF.md](PROJECT-BRIEF.md).

## Commands

| Command          | What it does                                            |
| ---------------- | ------------------------------------------------------- |
| `npm install`    | Install dependencies (Node >= 22.12)                    |
| `npm run dev`    | Dev server at `localhost:4321` (or `astro dev --background`) |
| `npm run check`  | Type-check `.astro` and `.ts` files (`astro check`)     |
| `npm run build`  | Production build to `dist/`                             |
| `npm run preview`| Serve the production build locally                      |
| `npm run format` | Prettier with the Astro plugin                          |

Before shipping: `npm run check`, `npm run build`, then check the preview in a
real browser.

## Updating content

Content lives in data files, never in components.

- **Projects:** one Markdown file per project in `src/content/projects/`.
  Frontmatter is validated by the schema in `src/content.config.ts`; the body
  becomes the case study at `/work/<file-name>`. `order` sets the list order.
  Screenshots go in `src/assets/projects/` (1600x1000) and are referenced by a
  relative path in `cover`.
- **NDA projects:** set `nda: true` and leave out `url` and `cover`. The schema
  refuses an NDA project with a link or screenshot, and a public project
  without both.
- **Experience:** `src/content/experience/*.md`. Bullet points go in the body.
  `kind: education` marks the degree entry.
- **Toolkit:** `src/content/stack.json`. `icon` is a Simple Icons export name
  (for example `siReact`); leave it out and a letter badge is shown instead.
- **Contact details, socials, pitch:** `src/site.ts`. Used by the page, the
  meta tags, the JSON-LD and `llms.txt`.
- **Resume:** replace `public/resume.pdf`.

`/llms.txt` and the sitemap are generated at build time from the same data,
so they cannot drift from the page.

## Structure

```
src/
  content.config.ts     Zod schemas for projects, experience, stack
  site.ts               shared facts (name, email, socials, org)
  layouts/Base.astro    html shell, meta, theme init, fonts
  components/           one file per home section, plus Seo, Icon, Header
  pages/                /, /work/[slug], /approach, /404, /llms.txt
  scripts/              small vanilla scripts (about 2 KB gzipped in total)
  styles/global.css     tokens (both themes), base styles, motion
```

## Decisions that are not obvious from the code

- **Dark is the default theme.** Light is used when the visitor picks it or
  their system prefers light and they have not picked. The choice is stored in
  `localStorage` and applied by an inline script before first paint.
- **Text on the signature gradient uses its own tokens** (`.on-brand`), because
  `#35577D` sits at the light end of the gradient and the normal muted colour
  only reaches 3.4:1 there. Every text pair passes WCAG AA in both themes.
- **Page transitions are native CSS** (`@view-transition { navigation: auto }`),
  not Astro's `<ClientRouter />`. The router cost a 300 ms long task on a
  throttled phone and added a per-navigation script lifecycle. Native
  cross-document transitions need no JavaScript; browsers without support just
  navigate normally. The project title morphs between the list and the case
  study via a shared `view-transition-name`.
- **Scroll-driven animations use longhand properties.** The CSS minifier folds
  `animation` + `animation-timeline` into one shorthand that Chrome rejects,
  which silently disables the effect. Keep `animation-name`,
  `animation-fill-mode`, `animation-timing-function` and `animation-timeline`
  as separate declarations.
- **All motion is optional.** Everything is wrapped in
  `prefers-reduced-motion: no-preference`; content is never hidden unless the
  script that reveals it is running.
- **No GSAP and no Lenis.** Everything in the brief was achievable with CSS
  scroll timelines and a few small scripts, so neither was added.
- **CSS is inlined** into each page (`build.inlineStylesheets: 'always'`). It
  is about 10 KB, and inlining removed two render-blocking requests.
- **Project years are optional** and only filled where the year is a confirmed
  fact. The list shows status (Live, Alpha, NDA) instead.

## Hosting

Vercel, static output. `vercel.json` sets clean URLs, no trailing slash,
long-lived caching for hashed assets in `/_astro/`, and basic security
headers. The site URL is set in `astro.config.mjs` (`site`); change it there
if the domain changes, and the canonical URLs, sitemap, OG tags and
`llms.txt` follow.
