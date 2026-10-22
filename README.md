# RYVEXORA

**Build beyond limits.** Marketing site for RYVEXORA, a technology and digital growth
studio in Mumbai. Two complete, self-contained editions share one design system:

| Edition | Folder | Stack | Best for |
| --- | --- | --- | --- |
| **React** (primary) | `/` | Vite · React 19 · React Three Fiber · GSAP · Lenis · React Router | The full cinematic experience |
| **PHP** (mirror) | `/php` | PHP 8.1+, no build step, no database | Hosts without Node or a build pipeline |

---

## Contents

- [Quick start](#quick-start)
- [Pages](#pages)
- [Design system](#design-system)
- [Design & UI guide (DESIGN.md)](./DESIGN.md) — the full art direction, component recipes and where to change things
- [The 3D and motion layer](#the-3d-and-motion-layer)
- [Performance budget](#performance-budget)
- [Accessibility](#accessibility)
- [Contact form](#contact-form)
- [Deployment](#deployment)
- [Editing content](#editing-content)
- [Project status and honesty policy](#project-status-and-honesty-policy)

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build
```

Requires Node 20.19+ (Vite 7). No environment variables, API keys or backend are needed.

The PHP edition needs nothing at all: copy `php/` to any PHP 8.1+ host and open it.
Full instructions are in [`php/README.md`](php/README.md).

---

## Pages

| Route | File | What it covers |
| --- | --- | --- |
| `/` | `src/pages/Home.jsx` | 3D hero, four-stage scroll story, capability marquee, six services, typography sequence, process rail, featured work, contact |
| `/services` | `src/pages/Services.jsx` | All six disciplines, engagement models |
| `/services/:slug` | `src/pages/ServiceDetail.jsx` | Context, deliverables, approach, outcomes, stack, FAQ |
| `/formats` | `src/pages/Formats.jsx` | Format library: four vertical compositions, comparison table, honesty note |
| `/formats/:slug` | `src/pages/FormatDetail.jsx` | One format: full illustrative composition, what we change, what we never do, SEO notes |
| `/work` | `src/pages/Work.jsx` | Project archive |
| `/work/:slug` | `src/pages/WorkDetail.jsx` | Challenge, approach, build, what it demonstrates |
| `/process` | `src/pages/Process.jsx` | Five stages with defined outputs |
| `/about` | `src/pages/About.jsx` | Studio, principles, honest fit |
| `/contact` | `src/pages/Contact.jsx` | Inquiry form, response expectations, FAQ |
| `/privacy` | `src/pages/Privacy.jsx` | Privacy notice |
| `*` | `src/pages/NotFound.jsx` | 404 |

Unknown service, format or project slugs render a real "not found" state rather than an
empty template.

### Format library

`/formats` answers a different question from `/services`: not *what we build*, but *what
the page is shaped like* when the visitor is a patient, a product buyer, a client of a
maison or a brand commissioning a studio. Four complete compositions share one design
system:

| Format | Demo brand | Primary ask |
| --- | --- | --- |
| 01 Medical & Clinics | NORTHBEAM DENTAL | Book an appointment |
| 02 Digital Products & SaaS | LEDGERLINE | Book a demo |
| 03 Luxury & Hospitality | MAISON AUREL | Request the lookbook |
| 04 Creators & Studios | STUDIO NOOR | Check availability |

Content for all four lives in `src/data/formats.js` (React) and `php/includes/data.php`
(mirrored by `npm run content:sync`). Every demo brand is fictional and labelled as such
inside the demo frame; no client logos, metrics or testimonials are invented. The demo
opens at a viewport-like height and "Open full page" releases it to its natural height.

---

## Design system

Tokens live in `src/styles/tokens.css`; the PHP edition mirrors them at the top of
`php/assets/site.css`.

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#05070B` | Page background |
| `--surface` | `#111722` | Cards, panels |
| `--blue` | `#246BFD` | Primary accent, CTA |
| `--violet` | `#8B5CF6` | Secondary accent |
| `--cyan` | `#36D9FF` | Highlights, links, focus |
| `--text` | `#F6F8FC` | Body copy |
| `--muted` | `#AAB6C8` | Secondary copy |
| `--faint` | `#7F8CA1` | Meta, labels |

Type: **Space Grotesk** (display), **Inter** (body), **JetBrains Mono** (labels, data).
All three are self-hosted through `@fontsource-variable` — no Google Fonts request, no
third-party tracking.

The layout uses a 1280px shell with fluid gutters (`clamp(20px, 4.6vw, 72px)`), a
`clamp()`-based type scale, hairline borders at 8.5% white, and one restrained gradient
language (blue → violet → cyan). There are no white sections.

### The atelier layer

> **Full write-up:** [`DESIGN.md`](./DESIGN.md) explains the direction, every token
> change, the component recipes, the format library's data model and where to change
> each thing. This section is the summary.

`src/styles/atelier.css` is loaded last and carries the art direction. It is deliberately
a separate layer from the component sheets, so the component CSS stays reusable and the
cinematic decisions sit in one readable file:

- **Atmosphere** — a single fixed colour grade (`body::before`, soft-light) lights the page
  from above and falls off at the edges. Section-level light is limited to heroes and
  closing bands: one source per screen.
- **Amplitude** — display type is larger and tighter (`--fs-hero` up to 9.4rem), body copy
  brighter (`--muted` at 7.4:1 on `--bg`), section rhythm wider (`--section-y`).
- **Surfaces** — panels share one recipe: a white-to-transparent gradient, a 1px top-edge
  catch, a soft ambient shadow, and a pointer-tracked light (`usePointerGlow`, one
  delegated listener, disabled for touch and reduced-motion users).
- **Restraint** — glow marks hierarchy rather than decorating every edge. The seam grids
  (`.principles-grid`, `.contact-next`) keep their shared hairlines and never get per-cell
  borders.

The PHP edition carries the equivalent block at the end of `php/assets/site.css`, written
against its own selectors (`.php-hero`, `.btn`-as-primary) so both editions read as one
studio.

---

## The 3D and motion layer

**Hero (`src/three/HeroScene.jsx`)** — a metallic, procedural object with:

- slow idle rotation plus pointer parallax (damped, never snappy);
- a particle field and atmospheric fog;
- blue/violet point lights and environment reflections;
- subtle depth of field through `@react-three/postprocessing`;
- scroll-driven transformation across four states — *Innovation sphere → Technology
  structure → Intelligence network → Growth system* — interpolated rather than swapped,
  so the object morphs instead of disappearing.

**Second object (`src/three/ContactScene.jsx`)** — 1,500 particles that fly in from a
sphere and assemble into a torus knot as the contact section enters view.

**Everything else is deliberately cheap**: CSS transforms, SVG, and a single
`IntersectionObserver`-based reveal system. GSAP + ScrollTrigger drive the story and the
process rail; Lenis provides smooth scrolling.

### Guards

| Condition | Behaviour |
| --- | --- |
| `prefers-reduced-motion: reduce` | No Lenis, no scroll animation, no WebGL canvas, static layout with all content visible |
| Viewport < 1000px | WebGL disabled; a CSS orb replaces the hero object |
| No WebGL support | Falls back to the CSS orb automatically |
| `ErrorBoundary` around the canvas | A failing GPU/scene never takes down the page or the copy |
| Low core/memory count | Scene quality is reduced automatically |

The Three.js chunk is lazy-loaded and split by Vite, so the initial route never blocks on it.

---

## Performance budget

Production build (`npm run build`):

| Asset | Size | Gzip |
| --- | --- | --- |
| CSS | 81 kB | 18 kB |
| App entry | 248 kB | 86 kB |
| Vendor | 50 kB | 17 kB |
| Three (lazy) | 1,201 kB | 338 kB |
| Hero scene (lazy) | 88 kB | 25 kB |

Fonts are subset to latin + latin-ext woff2 and preloaded. Images are SVG or a single
optimised OG card. There are **no** third-party scripts, analytics, chat widgets or CDN
requests, so the only render-blocking request is the CSS bundle.

---

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `<h1>` per route, logical heading order.
- Skip link, visible `:focus-visible` rings, `aria-current="page"` on the active nav item.
- Mobile menu: `aria-expanded`, Escape to close, focus returned to the toggle.
- Accordion/FAQ: `aria-expanded` + `aria-controls`, exclusive open state.
- Decorative 3D and SVG marked `aria-hidden`; meaningful imagery has text alternatives.
- Contrast: body copy `#A2ADBF` on `#07090D` (≈ 8.1:1), primary text ≈ 17:1.
- All interactive targets ≥ 44px on touch; no hover-only information.
- Verified in a jsdom harness: 11 routes mount with zero console errors, contact validation
  and success flow pass, keyboard navigation and mobile menu behave.

---

## Contact form

The React edition is a static site, so it validates fully in the browser and then hands the
brief to the visitor's mail client, with a saved draft in `localStorage`
(`ryvexora:inquiry-draft`) so nothing is lost.

Fields: name, email, company, service, budget range, project details. Validation is
shared (`src/lib/validation.js`): required name/email/service/budget/message, email format,
minimum message length, and inline `aria-invalid` + error text per field.

### Sending for real

Set `VITE_FORM_ENDPOINT` (see `.env.example`) to any backend that accepts JSON — Formspree,
Basin, Getform, a serverless function — and the same form submits over `fetch`, shows a
"Brief received." state, and clears the saved draft. If the request fails, the visitor gets
the mailto fallback and their copy of the brief is preserved.

The PHP edition ships its own zero-dependency backend (CSRF token, honeypot, server-side
validation, JSON-lines storage, POST-redirect-GET). It uses form encoding rather than JSON,
so if you want the React app to post to it, adapt the `fetch` call in
`src/components/ContactForm.jsx` — or just deploy the PHP edition.

---

## Deployment

### React (static)

```bash
npm run build
# upload dist/ to Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, nginx …
```

SPA routing needs a rewrite to `index.html`:

- **Netlify** — `public/_redirects` with `/* /index.html 200`
- **Vercel** — `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
- **nginx** — `try_files $uri $uri/ /index.html;`

`vite.config.js` binds `0.0.0.0:5173` and allows all hosts so the sandbox preview works;
tighten `server.allowedHosts` for your own environment.

### PHP

See [`php/README.md`](php/README.md) — upload, `chmod 775 storage`, done.

The PHP copy is generated: React data is the source of truth.

```bash
npm run content:sync   # rewrite php/includes/data.php from src/data/*.js
```

To review the PHP edition locally without installing PHP, run it inside WebAssembly:

```bash
npm i --no-save @php-wasm/node   # one-off, not a project dependency
npm run php:preview              # http://localhost:8080
```

`tools/php-preview.mjs` mirrors `php/` into a wasm filesystem, serves assets from disk,
blocks `/storage`, maps `/work` → `work.php`, and returns real 404s for unknown slugs.
The contact form works end to end; after a successful inquiry the JSON-lines log is
mirrored to `php/storage/inquiries.jsonl` (git-ignored) so you can inspect the record.
This is a review tool only — deploy against a real PHP 8.1+ host.

---

## Editing content

| What | Where |
| --- | --- |
| Services | `src/data/services.js` **and** `php/includes/data.php` |
| Projects | `src/data/projects.js` **and** `php/includes/data.php` |
| Process stages | `src/data/process.js` **and** `php/includes/data.php` |
| Site details, FAQs, capabilities | `src/data/site.js` **and** `php/includes/data.php` |
| Colours, spacing, type | `src/styles/tokens.css` |

The two editions intentionally duplicate content so each can be deployed standalone.
**When you change copy, change both.**

---

## Project status and honesty policy

All five portfolio entries are labelled **concept build**. They are self-initiated pieces
that demonstrate how we design and engineer — not client engagements. The site contains:

- no invented client logos;
- no testimonials or quotes attributed to people who do not exist;
- no awards, press mentions or certifications;
- no performance statistics or revenue claims.

When real client work, logos or measured results are available, add them with permission and
label them clearly. The templates have deliberate gaps where social proof would go so nothing
can be invented by accident.

---

© RYVEXORA · Mumbai, India · <hello@ryvexora.com>
