# RYVEXORA

**Build beyond limits.** Marketing site for RYVEXORA, a technology and digital growth
studio in Mumbai. One React application — a deep set of inner pages rather than a single
landing screen — plus three serverless functions that take deposits through Razorpay.

| Layer | Where | Stack |
| --- | --- | --- |
| Site | `/` | Vite · React 19 · React Three Fiber · GSAP · Lenis · React Router |
| Payments | `api/` + `server/` | Vercel Node functions · `node:crypto` · Razorpay Orders API · no dependencies |

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
- [Payments](#payments)
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

Requires Node 20.19+ (Vite 7). Nothing is required to browse the site. Two optional
groups of environment variables switch on real behaviour, described in `.env.example`:

| Variable | Effect when unset |
| --- | --- |
| `VITE_FORM_ENDPOINT` | Contact form validates, saves a draft and hands the brief to the mail client |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | `/pay` explains that the gateway is not connected and disables the pay button; nothing is faked |

Copy `.env.example` to `.env.local` and fill in what you need. `npm run dev` also mounts
the functions in `api/` (via `tools/dev-api.mjs`), so the payment flow is testable locally
without deploying.

---

## Pages

| Route | File | What it covers |
| --- | --- | --- |
| `/` | `src/pages/Home.jsx` | 3D hero, four-stage scroll story, capability marquee, six services, typography sequence, process rail, featured work, contact |
| `/services` | `src/pages/Services.jsx` | All six disciplines, engagement models |
| `/services/:slug` | `src/pages/ServiceDetail.jsx` | Context, deliverables, approach, outcomes, stack, FAQ |
| `/kit` | `src/pages/Kit.jsx` | Element library: 17 live UI elements, category filter, search, Preview/Code/Info panel |
| `/formats` | `src/pages/Formats.jsx` | Format library: four vertical compositions, comparison table, honesty note |
| `/formats/:slug` | `src/pages/FormatDetail.jsx` | One format: full illustrative composition, what we change, what we never do, SEO notes |
| `/work` | `src/pages/Work.jsx` | Project archive |
| `/work/:slug` | `src/pages/WorkDetail.jsx` | Challenge, approach, build, what it demonstrates |
| `/process` | `src/pages/Process.jsx` | Five stages with defined outputs |
| `/about` | `src/pages/About.jsx` | Studio, principles, honest fit |
| `/pay` | `src/pages/Pay.jsx` | Deposit checkout: three options, customer details, Razorpay Checkout, verified receipt |
| `/contact` | `src/pages/Contact.jsx` | Inquiry form, response expectations, FAQ |
| `/privacy` | `src/pages/Privacy.jsx` | Privacy notice |
| `*` | `src/pages/NotFound.jsx` | 404 |

Unknown service, format or project slugs render a real "not found" state rather than an
empty template.

### Element kit

`/kit` is a component registry: every element the site is built from, rendered live
rather than screenshotted, filterable by category, searchable with `/`, and openable into a
side panel with **Preview / Code / Info** tabs. The code shown is the JSX that produced the
preview you are looking at; the Info tab lists the rules the element follows.

17 elements across five categories — Actions (button, icon button, switch), Inputs (text
field, search, segmented control), Display (metric, tag set, avatar group, price tier,
meter), Navigation (tabs, breadcrumb, pagination) and Feedback (inline alert, empty state,
toast).

No install counts, save counts or star counts: those would be invented numbers. See
[`DESIGN.md` §7b](./DESIGN.md) for the architecture and the nested-button constraint.

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

Content for all four lives in `src/data/formats.js`. Every demo brand is fictional and labelled as such
inside the demo frame; no client logos, metrics or testimonials are invented. The demo
opens at a viewport-like height and "Open full page" releases it to its natural height.

---

## Design system

Tokens live in `src/styles/tokens.css`.

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

`src/styles/pay.css` follows the same discipline: it is loaded just before the atelier layer
and is the only sheet a checkout needs, so payment changes never ripple into the marketing
pages.

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
| CSS | 176 kB | 34 kB |
| App entry | 302 kB | 102 kB |
| Vendor | 50 kB | 17 kB |
| Three (lazy) | 1,201 kB | 338 kB |
| Hero scene (lazy) | 105 kB | 28 kB |
| Pay (lazy, only on `/pay`) | 17 kB | 6 kB |

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
- `/pay`: native radios with a visible focus ring, errors tied to their inputs with
  `aria-invalid`/`aria-describedby`, one live region for checkout status, success announced
  and focused.
- Verified in a jsdom harness: 13 routes mount with zero console errors, contact validation
  and success flow pass, the full checkout flow (order → checkout → verification → receipt)
  passes against a mocked gateway, keyboard navigation and mobile menu behave.

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

Validation here is a courtesy to the visitor, not a security boundary: whatever receives
the JSON should validate it again and rate-limit by IP.

---

## Payments

`/pay` takes a project deposit. It is **not** a price list: the three amounts in
`src/data/payments.js` are placeholders, labelled as such in the file and on the page, and
are meant to be replaced with the studio's real deposit policy before going live.

### The flow

1. `GET /api/payment-config` — is a gateway connected, which mode, and what can be paid for.
   No secret is ever returned.
2. `POST /api/create-order` — the browser sends `planId` **only**. `server/pricing.js`
   resolves the amount from the shared catalog; a client-supplied `amount` is ignored. The
   function creates the Razorpay order and returns just what Checkout needs.
3. Razorpay Checkout collects the payment. Card, UPI and netbanking details never touch this
   site — the checkout script is loaded on demand, only after the visitor presses pay.
4. `POST /api/verify-payment` — the HMAC signature over `${order_id}|${payment_id}` is checked
   with `crypto.timingSafeEqual`, then the payment is re-fetched from Razorpay and must be
   `captured` or `authorized` **and** belong to the same order. Only then is the receipt shown.

A signed handshake alone would not be enough — step 4 exists so a replayed or invented
signature cannot produce a success screen.

| File | Role |
| --- | --- |
| `src/data/payments.js` | Deposit catalog, INR formatting, payment copy (imported by both sides) |
| `src/lib/checkout.js` | Loads Checkout on demand, posts to the two endpoints, maps errors to human copy |
| `src/pages/Pay.jsx` | The page: options, details, status, receipt |
| `src/styles/pay.css` | Checkout styling, loaded before the atelier layer |
| `api/payment-config.js` | Reads configuration; never returns secrets |
| `api/create-order.js` | Rate-limited (10/min per IP), validates input, creates the order |
| `api/verify-payment.js` | Rate-limited (20/min per IP), verifies signature + payment state |
| `server/razorpay.js` | Orders API, HMAC verification, payment lookup |
| `server/pricing.js` | Server-side amount resolution |
| `server/http.js` | JSON helpers, body cap, in-memory rate limiter |
| `tools/dev-api.mjs` | Mounts the same handlers under `npm run dev` |

### Configuration

```
RAZORPAY_KEY_ID=rzp_test_…      # server only
RAZORPAY_KEY_SECRET=…           # server only — never VITE_
```

Mode is derived from the key prefix: no keys → `preview`, `rzp_test_*` → `test`, anything
else → `live`. Test mode is shown as a banner on `/pay` so nobody mistakes a test payment
for revenue. Because the variables are read at request time on the server, they never enter
the client bundle.

### What this deliberately does not do

There is no webhook, database, ledger, invoice or email delivery. A payment that succeeds
while the browser is closed (or after the tab dies mid-verification) is **not** recorded
here — reconcile in the Razorpay dashboard, and add a `payment.captured` webhook before
relying on this for accounting. Refunds are issued from the dashboard. Tax is added on the
studio's invoice, not at checkout. All of that is stated on the page rather than implied.

### Vercel (site + payments)

`vercel.json` is already wired: Vite build → `dist/`, `api/*.js` as Node functions, a
rewrite that sends every non-`/api` path to `index.html`, and `server/` bundled into each
function. Add the two Razorpay variables in **Project → Settings → Environment Variables**
(Production and Preview), then deploy.

### Static-only hosts

```bash
npm run build
# upload dist/ to Netlify, Cloudflare Pages, S3 + CloudFront, nginx …
```

The marketing pages work anywhere; `/pay` will show its "gateway not connected" state
because there is no `/api` beside it. SPA routing needs a rewrite to `index.html`:

- **Netlify** — `public/_redirects` with `/* /index.html 200`
- **nginx** — `try_files $uri $uri/ /index.html;`

`vite.config.js` binds `0.0.0.0:5173` and allows all hosts so the sandbox preview works;
tighten `server.allowedHosts` for your own environment.

---

## Editing content

| What | Where |
| --- | --- |
| Services | `src/data/services.js` |
| Projects | `src/data/projects.js` |
| Process stages | `src/data/process.js` |
| Formats | `src/data/formats.js` |
| Element kit | `src/data/kit.js` |
| Deposits (price + copy) | `src/data/payments.js` — the server reads the same file, so price and UI cannot drift |
| Site details, FAQs, capabilities | `src/data/site.js` |
| Colours, spacing, type | `src/styles/tokens.css` |

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
