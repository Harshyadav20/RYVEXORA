# RYVEXORA — Design & UI guide

This document explains **what the interface is made of, why it looks the way it does, and where to change it**. It covers the site, the four-format library, the element kit and the deposit checkout.

If you only read one section, read [§3 The five rules](#3-the-five-rules) — everything else follows from those.

---

## 1. What this is

RYVEXORA is one React application with a deliberate shape: a cinematic home page and a
deep set of inner pages, all sharing one design system.

| Layer | Entry | Styling | Where |
| --- | --- | --- | --- |
| Site | `index.html` → `src/main.jsx` | `src/styles/*.css` | `/` |
| Payments | `api/*.js` → `server/*.js` | none (JSON only) | `/api/*` |

There is no second edition to keep in sync. Content is edited once, in `src/data/*.js`, and
the payment catalog in `src/data/payments.js` is imported by both the page and the server so
a price cannot drift from what is charged.

On top of the site sits the **format library** — four complete example compositions for different kinds of client (clinic, SaaS product, luxury house, creator studio). They are not templates you pick from a menu; they are worked examples of how the same design system answers four different decisions.

---

## 2. The visual direction

> **Cinematic restraint.** Deep, near-black ground. One light source per screen. Large, tightly-set display type. Glass surfaces that catch light at their top edge and follow the pointer. Motion that settles rather than bounces.

The brief was "not looking good — make it god mode", and that phrase usually means one of three things: it looks *generic*, it looks *flat*, or it looks *cheap*. The pass addresses all three:

- **Generic → specific.** A single art direction instead of eight component defaults. One gradient language (blue → violet → cyan), one corner radius language, one hairline weight, one shadow recipe.
- **Flat → lit.** Depth now comes from layered light: a fixed colour grade over the page, a 1px top-edge catch on every panel, soft ambient shadows, and a pointer-tracked highlight on cards.
- **Cheap → restrained.** Glow is used for hierarchy, not decoration. If everything glows, nothing reads as important, so light is limited to heroes, closing bands and hover states.

---

## 3. The five rules

These are written at the top of `src/styles/atelier.css` and are the tests any new rule should pass:

1. **One accent moment per viewport.** Glow marks hierarchy. Never texture.
2. **Depth comes from layering light**, never from heavy borders — inset hairlines, top-edge catches, soft ambient shadow.
3. **Type does the shouting. Space is the luxury good.** When a section feels weak, remove something before adding something.
4. **Every effect degrades to a static, legible layout.** Reduced motion, no JavaScript, no WebGL, print.
5. **No invented proof.** No client logos, metrics, awards or testimonials that do not exist. Example work is labelled as example work.

---

## 4. How the styles are organised

CSS is split by responsibility, and **load order is the mechanism** — later files override earlier ones at equal specificity. This is deliberate: it keeps the art direction in a single readable file instead of scattering `!important` through components.

```
src/main.jsx
├── tokens.css       ← raw values (colour, type scale, spacing, radii, easing)
├── base.css         ← reset, typography primitives, layout helpers, chips/badges
├── components.css   ← buttons, header, footer, cards, forms, previews, accordion
├── home.css         ← home page: hero, scroll story, marquee, words, process, work
├── pages.css        ← inner pages: services, work, about, process, contact, CTA, 404
├── formats.css      ← format hub, detail page, the four demo compositions
├── kit.css          ← element registry + the el-* preview primitives
├── pay.css          ← checkout only: plans, fields, summary, receipt
└── atelier.css      ← ART DIRECTION — supersedes the defaults above
```

**Rule of thumb:** component behaviour lives in the component sheet; *how it looks* lives in `atelier.css`. If you change a value in `atelier.css`, it wins. If you change behaviour (layout structure, a state class, an animation trigger), change the component sheet.

`pay.css` is deliberately narrow: it styles one page and nothing else, so checkout work can
never move an unrelated section. It is loaded *before* `atelier.css` so the art direction
still wins any shared property (`.btn`, `--panel-*`).

---

## 5. Tokens

Defined in `src/styles/tokens.css`, re-declared with the new values at the top of `atelier.css`.

### Colour

| Token | Was | Now | Use |
| --- | --- | --- | --- |
| `--bg` | `#07090d` | `#05070b` | Page ground. Deeper so lit surfaces have somewhere to fall from. |
| `--bg-2` | `#0b0f16` | `#080b12` | Alternating section ground. |
| `--surface` | `#111722` | `#0e1521` | Panels, cards. |
| `--text` | `#f4f7ff` | `#f6f8fc` | Primary copy. |
| `--muted` | `#a2adbf` | `#aab6c8` | Secondary copy. |
| `--faint` | `#7c8aa1` | `#7f8ca1` | Meta, labels, captions. |
| `--blue` | `#246bfd` | unchanged | Primary accent, CTA fill. |
| `--violet` | `#8b5cf6` | unchanged | Secondary accent. |
| `--cyan` | `#36d9ff` | unchanged | Focus, links, live states. |

### Measured contrast on `--bg` (#05070b)

| Foreground | Ratio | Verdict |
| --- | --- | --- |
| `--text` #f6f8fc | **18.96 : 1** | AAA |
| `--muted` #aab6c8 | **9.82 : 1** | AAA |
| `--faint` #7f8ca1 | **5.92 : 1** | AA |
| `--cyan` #36d9ff | **12.02 : 1** | AAA |
| White on `--blue` button | **4.57 : 1** | AA (normal text) |

### Type scale

| Token | Was | Now |
| --- | --- | --- |
| `--fs-hero` | `clamp(2.35rem, 8.4vw, 7.4rem)` | `clamp(2.6rem, 9.2vw, 9.4rem)` |
| `--fs-h1` | `clamp(2.2rem, 4.6vw, 4.2rem)` | `clamp(2.35rem, 5.2vw, 4.9rem)` |
| `--fs-h2` | `clamp(1.9rem, 3.6vw, 3.2rem)` | `clamp(1.95rem, 4vw, 3.75rem)` |
| `--fs-lead` | `clamp(1.02rem, 1.25vw, 1.24rem)` | `clamp(1.04rem, 1.32vw, 1.3rem)` |

Display headings move to `line-height: 0.92–0.96` and `letter-spacing: -0.045em`. Bigger type needs tighter leading and tighter tracking, or it reads as "large" rather than "designed".

Fonts: **Space Grotesk** (display), **Inter** (body), **JetBrains Mono** (labels/data), self-hosted through `@fontsource-variable`. No Google Fonts request, no third-party tracking.

### Rhythm and shape

| Token | Now | Effect |
| --- | --- | --- |
| `--section-y` | `clamp(84px, 9.6vw, 164px)` | Wider breathing room between sections. |
| `--gutter` | `clamp(20px, 4.6vw, 72px)` | Slightly wider page margins on large screens. |
| `--container` | `1280px` | Shell width. |
| `--r-sm/md/lg/xl` | `12 / 18 / 26 / 36 px` | Unchanged, but now applied consistently. |

---

## 6. The atelier layer, section by section

`src/styles/atelier.css` is organised in eleven numbered blocks.

### 01 — Tokens
The values in §5. Loaded here so the art direction is self-contained.

### 02 — Atmosphere
The single most important change to the *feel* of the site.

```css
body::before {
  position: fixed; inset: 0;
  mix-blend-mode: soft-light;
  background:
    radial-gradient(ellipse 130% 58% at 50% -16%, rgba(96,148,255,.42), transparent 60%),
    radial-gradient(ellipse 96% 96% at 50% 50%, transparent 52%, rgba(2,4,8,.58) 100%);
}
```

- Light falls from **above** (blue, 42% at the top edge) and shadow gathers at the **edges** (58%).
- `soft-light` is chosen over `overlay` or `screen` because it grades colour without lifting blacks — text contrast survives.
- It is `position: fixed` and `pointer-events: none`, so it never scrolls, never blocks a click, and costs one composited layer.
- **Section-level light is rationed.** Only `.page-hero`, `.cta-band` and `.section--surface` get a top glow, and the home hero is the only place with *moving* light (`atelier-drift`, 26s alternate, disabled under reduced motion).

The existing film grain (`body::after`, 3.2% opacity) sits above it at `z-index: 9990`, which keeps the grade feeling photographic rather than digital.

### 03 — Typography
Display headings, `.lead`, `.eyebrow`, `.section-head` all re-set. The eyebrow gains a 34px glowing rule (`::before`) and brighter colour, because it is the label that begins every section.

### 04 — Buttons
Three states, three jobs:

| Class | Job | Treatment |
| --- | --- | --- |
| `.btn--primary` (or bare `.btn`) | The one action on screen | Gradient fill + inner top highlight + blue glow; lifts 2px on hover. |
| `.btn--ghost` | The alternative | Glass, not an outline: gradient white 6.5% → 1.8%, hairline border, cyan border on hover. |
| `.arrow-link` | Inline "read more" | Text + arrow that travels 4px diagonal on hover. |

`FormatDetail` previously used a bare `.btn`, which had **no background at all** under the
old CSS. The rule `.btn:not(.btn--ghost):not(.btn--quiet)` gives it a skin. `/pay` reuses the
same bare `.btn` for its submit action, so the checkout inherits the site's one primary
button rather than inventing a second style.

### 05 — Chrome
- Header turns to glass (`rgba(5,7,11,.76)` + 22px blur) once you scroll, and reveals a 1px cyan→violet hairline.
- Nav links gain a pill hover/active fill and a 14px glowing active underline (the old 4px dot read as a smudge at small sizes).
- Scroll progress bar: 2px, cyan → blue → violet.
- Footer deepens, with a lit wordmark gradient fading into the page.

### 06 — Surfaces
Every panel — `.card`, `.panel`, `.service-card`, `.project-card`, `.work-card`, `.fmt-card`, `.ft-item` — shares one recipe:

1. **Fill:** `--panel-1` (white 5.8% → 0.8% gradient) over `--panel-2` (navy gradient).
2. **Top catch:** `::before`, 1px, white 28% fading to transparent at both ends.
3. **Shadow:** `0 30px 70px -46px rgba(0,0,0,.95)` at rest; a blue-tinted version on hover.
4. **Pointer light:** `::after` radial gradient at `var(--spot-x) var(--spot-y)`, `mix-blend-mode: screen`, 0 → 1 opacity on hover.

> **Gotcha — seam grids.** `.principles-grid` and `.contact-next` build their hairlines from a `1px` gap over a tinted background. Individual cells must **never** receive their own border or radius, or the seams double up. The atelier layer gives those cells a background and a pointer light only.

### 07 — Home
Hero type, `LIMITS.` gradient (white → ice → cyan → violet with a soft drop-shadow), the trust row, the right-hand studio aside, the scroll-story panels (kept as left-accented translucent cards that blend into the 3D scene rather than boxed cards), the intro strip, the capability marquee, and the word sequence.

### 08 — Inner pages
Page heroes get a masked 96px grid overlay plus a glow, so every inner page opens like a cover rather than a paragraph. Service/project cards, principles, process phases, detail asides, accordions, forms, the CTA band and the 404 all re-set to the same system.

### 09 — Formats
Hub cards, detail hero, comparison table and the demo frame. The demo frame is treated as a **lit object**: a deep shadow plus a coloured bloom using that format's accent (`--demo-accent`).

### 10 — Details
Selection colour, focus rings (`2px` cyan + `5px` 16% halo), a custom scrollbar, and reveal transitions that settle upward instead of sliding.

### 11 — Responsive & print
Type scale, section rhythm and button heights step down at 1100 / 900 / 640px. Print strips the atmosphere, grain, header, footer and interactive chrome.

---

## 7. The format library

### Routes

| Route | File | What it is |
| --- | --- | --- |
| `/formats` | `src/pages/Formats.jsx` | The library: principles, four cards, comparison table, honesty note |
| `/formats/:slug` | `src/pages/FormatDetail.jsx` | One format: facts, the full composition, what we change, what we never do, SEO note, next format |

### The four formats

| # | Name | Demo brand | Primary ask | What the composition does differently |
| --- | --- | --- | --- | --- |
| 01 | Medical & Clinics | NORTHBEAM DENTAL | Book an appointment | Slot-holding hero, treatments with durations, visit steps, verifiable credentials, fees before booking |
| 02 | Digital Products & SaaS | LEDGERLINE | Book a demo | A real interface above the fold (KPIs, reconciliation table, status states), adoption-ordered features, public pricing |
| 03 | Luxury & Hospitality | MAISON AUREL | Request the lookbook | Quiet two-sided nav, full-bleed plate, collection grid, making specs, atelier enquiry |
| 04 | Creators & Studios | STUDIO NOOR | Check availability | Split hero with availability, work mosaic, rate card, process chips, licensing FAQ |

### Data model

All content lives in **`src/data/formats.js`**:

```js
{
  slug, index, name, audience, kicker,
  accent, accentSoft,            // per-format colour, drives the frame bloom
  headline, summary,
  primaryAction,                 // the one decision the format is built around
  keyPages: [...],               // page architecture shown in the detail aside
  motion,                        // plain-English motion policy
  demo: { brand, brandNote, nav, hero, … },  // everything the composition renders
  changes: [...],                // four decisions the format makes for you
  avoid: [...],                  // four things it will never do
  seo                            // one line on structure/search
}
```

`formatComparison` (the six-row table) and `formatPrinciples` live in the same file so the hub
and the detail pages render identical copy.

### The demo frame

`src/components/formats/DemoFrame.jsx` wraps each composition in:

- a labelled browser-chrome bar: `Format NN · Name` + `Illustrative — not a client`;
- a viewport-height stage that scrolls **inside** the frame;
- an **Open full page** toggle that releases the frame to natural height (`aria-expanded`, label swaps to *Fit to frame*).

Each demo composition is its own component (`MedicalDemo`, `ProductDemo`, `LuxuryDemo`, `CreatorDemo`) but they share one stylesheet and use container queries (`container-type: inline-size` + `cqw`), so a composition scales with the frame rather than the viewport.

### Honesty policy, enforced

Every demo brand is fictional and labelled inside the frame. Where a template would normally put a client logo, a metric or a testimonial, the space is deliberately empty and the copy says so. The comparison table's last row is **Never** — for example *"Outcome guarantees"*, *"Invented logos"*, *"Stock passed off as own"*. If you replace a demo with a real client, you must also replace the label.

---

## 7b. The element kit

`/kit` is a component registry in the 21st.dev pattern: a filterable gallery of the
actual elements this site is built from, with a detail panel that shows the live element,
the JSX that produced it, and the rules it follows.

### Why it exists

A format library answers *"what shape is the page?"*. The kit answers the next question
down: *"what is this button, and why does it look like that?"* It also keeps the studio
honest — if an element is not good enough to show on its own, it is not good enough to
hide inside a page.

### Anatomy

| Part | File | What it does |
| --- | --- | --- |
| Catalog | `src/data/kit.js` | 17 elements: id, name, category, status, tags, `code`, `notes` |
| Previews | `src/components/kit/elements.jsx` | One live React preview per element, keyed by id |
| Tile | `src/pages/Kit.jsx` → `ElementTile` | Preview + name + category, one full-cover labelled button |
| Detail panel | `src/components/kit/ElementDrawer.jsx` | Preview / Code / Info tabs, focus trap, Escape, scroll lock |
| Code panel | `src/components/kit/CodeBlock.jsx` | Line numbers, copy button, single-pass highlighter |
| Styles | `src/styles/kit.css` | Registry layout plus the `el-*` element primitives |

### The nested-button problem (and the fix)

A tile shows a *live* element, and several elements are buttons. A `<button>` may not
contain a `<button>`, and React will warn about it. The tile is therefore:

```
<article class="kit-tile">
  <div class="kit-tile__stage" inert aria-hidden>   ← live preview, not reachable
  <div class="kit-tile__meta">                      ← name + category
  <button class="kit-tile__hit">Open {name}</button> ← one labelled target, covers the tile
</article>
```

`inert` removes the preview from the accessibility tree *and* from tab order, so the tile
is a single stop. Interaction happens in the drawer, where the element is rendered alone.
Do not "fix" this by making the tile a button again.

### The code panel

`highlight()` runs **one** regex pass over the escaped source. An earlier version ran four
sequential `replace` calls, and the attribute rule then matched `class=` inside the spans
it had just written — the markup was destroyed and no tokens appeared. If you add a token
type, add it as another alternative in `TOKEN`, not as a second pass.

Copy uses `navigator.clipboard` with a `document.execCommand` fallback for non-secure
contexts, and copies the raw string rather than the highlighted DOM.

### Adding an element

1. Add an entry to `kitElements` in `src/data/kit.js` (including its `code`).
2. Write the preview in `elements.jsx` and register it in `ELEMENT_PREVIEWS`.
3. Style it with `el-*` classes in `kit.css` — never reuse a page-specific class.

The category counts and the search index are derived from the catalog, so nothing else
needs touching.

### Deliberately absent

Install counts, save counts, star counts and "used by" logos. They would be invented
numbers. The only numbers on the page are computable: total elements, categories, and
dependencies (zero).

---

## 8. Pointer light (`usePointerGlow`)

`src/hooks/usePointerGlow.js` adds one document-level `pointermove` listener (rAF-throttled) that finds the nearest card and writes `--spot-x` / `--spot-y` onto it. The CSS does the rest.

Design constraints baked in:

- **One listener**, not one per card — a page can have thirty panels.
- **Skipped entirely** on `(hover: none)` and for `prefers-reduced-motion` users; the CSS fallback (light resting at the top edge) still reads correctly.
- Vars are removed on leave so the gradient returns to its resting position.
- Blend mode is `screen` at ~14% alpha, so it reads as light falling on a surface, not as a tint.

---

## 9. The checkout (`/pay`)

A deposit page, not a price list. It exists so a serious enquiry can become a booked slot
without a five-email thread, and it is built to be **believable**: every number is either
real or clearly labelled as a placeholder, and every state tells the truth about itself.

### Anatomy

| Block | Job |
| --- | --- |
| Hero | One promise ("reserve a start date") plus a three-row trust column: card details never touch the site, payments are server-verified, methods and currency |
| Gateway notice | The single most important line on the page — see the state table below |
| Steps 01–03 | Plan, then identity, then pay. The step markers follow the form's actual completion, not a fake progress bar |
| Plan cards | Native radios styled as rows: name, price, one-line scope, when the slot is held |
| Fields | Name, receipt email, optional company. Only the two that appear on a receipt are required |
| Sticky summary | Deposit, currency, processor, **due now**, what is included, refund policy, tax note. The only element that moves as you type |
| Receipt | Reference, payment ID, method, mode, and what happens next |

### States

| State | What the visitor sees |
| --- | --- |
| `loading` | "Checking the payment gateway…" |
| configured, live | "Payments are live — verified server-side." |
| configured, test | "Test mode — Razorpay test keys are configured. Nothing is charged to a real card." |
| not configured | **Gateway not connected** + the two environment variables to set. The pay button stays disabled and an email path carries the same details |
| API unreachable | Same notice, worded as "did not respond", so a broken deployment is not mistaken for a broken page |
| cancelled | "Checkout closed. Nothing was charged." |
| failure | The specific reason from the API (`signature_mismatch`, `payment_not_captured`, …) plus what to do next |
| paid | Receipt panel, focused for screen readers, with a reference to quote |

A disabled button that does not explain itself is the most common checkout bug. Here the
button is disabled *and* `aria-describedby` points at the sentence that says why.

### Rules the page keeps

- **The browser never names a price.** `planId` goes up; the amount comes back from
  `server/pricing.js`. `src/data/payments.js` is imported by both sides so the displayed
  number and the charged number cannot disagree.
- **No invented trust.** No "trusted by" logos, no countdown, no fake security seals. The
  only claims are ones the code enforces: Razorpay hosts the card form, the signature is
  verified, the payment is re-fetched before success is shown.
- **No dark patterns.** The deposit is described as refundable before work starts, the
  "send the brief first" link is as visible as the pay button, and the CTA below the form
  actively offers not to pay yet.
- **Checkout script on demand.** `checkout.js` is only requested after a valid submit, so the
  page costs nothing until someone intends to pay.
- **One primary action.** Plan selection, fields and summary are quiet surfaces; only the pay
  button is filled with the brand gradient.

### Adding or changing a deposit

1. Add an entry to `deposits` in `src/data/payments.js` (`id`, `name`, `amount` in paise,
   `summary`, `includes`, `turnaround`).
2. Nothing else. The server resolves it, the page renders it, the summary totals it.
3. Amounts are **paise**: ₹25,000 → `2500000`.

---

## 10. Accessibility & performance guardrails

**Accessibility**

- Contrast measured, not assumed (see §5). `--faint` is the floor at 5.92:1.
- Focus is always visible: 2px cyan outline + 5px halo, never `outline: none` without a replacement.
- Demo forms are clearly inert: disabled controls, "Demo form · not connected".
- The illustrative-brand label is **never hidden** at any breakpoint — mobile drops the decorative window dots instead.
- `prefers-reduced-motion` disables the drifting hero light, reveal transitions and pointer light.
- Every interaction is a real `<button>` / `<a>` with `aria-expanded`, `aria-current` or `aria-label` as appropriate.
- `/pay` uses native radios in a labelled group, `aria-invalid` + `aria-describedby` on each
  field with an error, one `role="status"` live region for checkout progress, and moves focus
  to the receipt on success.
- Checkout copy is written to be understood without colour: errors are words, not red borders.

**Performance**

- No new images, fonts or network requests were added by the art direction pass — it is all gradients, shadows and one hook.
- `three.js` stays in its own chunk (1.2 MB raw / **338 kB gzip**) and is lazy-loaded, only on wide screens with WebGL.
- The atmosphere is a single fixed composited layer.
- The demo compositions use container queries rather than JS measurement.

---

## 11. Where to change things

| I want to… | Edit |
| --- | --- |
| Recolour the site | `src/styles/atelier.css` §01 |
| Make headings bigger/smaller | `--fs-hero`, `--fs-h2` in §01 |
| Adjust light and depth | §02 (atmosphere) and §06 (surfaces) |
| Change a button's shape or glow | §04 |
| Restyle the header/footer | §05 |
| Style a page hero | §08 |
| Work on the format demos | `src/styles/formats.css` + `src/components/formats/*.jsx` |
| Add or change a UI element | `src/data/kit.js` + `src/components/kit/elements.jsx` + `kit.css` |
| Change format copy | `src/data/formats.js` |
| Change site copy | `src/data/*.js` |
| Change a deposit or its copy | `src/data/payments.js` |
| Restyle the checkout | `src/styles/pay.css` |
| Change the payment flow | `src/lib/checkout.js` (browser) + `api/*.js`, `server/*.js` (server) |
| Add a page | `src/pages/`, then a route in `src/App.jsx` and `src/data/site.js` for nav |

---

## 12. Running and verifying

```bash
npm install            # once
npm run dev            # site + /api functions → http://localhost:5173
npm run build          # production build     → dist/
npm run preview        # serve dist/
npm run lint           # eslint src/
```

`npm run dev` mounts the real handlers from `api/` through `tools/dev-api.mjs`, so
`/api/payment-config` answers locally. Without Razorpay keys it answers "not configured" —
which is exactly what the page must handle, so that state is the easiest one to test.

Verified in this environment:

- **API** — 29 assertions against the handlers with mocked request/response objects:
  validation, unknown plans, prototype keys, rate limiting, body caps, mode derivation,
  signature verification (valid, tampered, wrong order, short, empty), 503 when unconfigured.
- **Checkout UI** — 34 assertions in jsdom: degraded state, test-mode banner, plan switching
  and totals, disabled-to-enabled transition, `create-order` receiving a plan id and no
  amount, Checkout opened with the server's amount, receipt after verification, honest
  failure on a bad signature, offline API.
- **Routes** — 13 routes mount with exactly one `h1`, no duplicate ids, no nested buttons and
  zero console errors.

The CSS is validated with [css-tree](https://github.com/csstree/csstree): 0 parse errors and
0 invalid declarations across all nine stylesheets. Undefined custom properties reported by
that pass (`--spot-x`, `--gx`, `--fmt-accent`, …) are written at runtime by JS; every value
`pay.css` uses is defined in `tokens.css` or `atelier.css`.

---

## 13. Known limits

- **No rendered screenshots in this environment.** There is no headless browser in the build sandbox, so visual changes are verified structurally (markup, CSS validity, contrast maths, runtime errors) and then reviewed by eye on the preview. If a change looks wrong on your screen, name the page and element — do not assume the harness caught it.
- **Payments stop at verification.** There is no webhook, ledger, invoice or receipt email. A
  payment that completes while the tab is closed is not recorded here; reconcile in the
  Razorpay dashboard and add a `payment.captured` webhook before using this for accounting.
- **Deposit figures are placeholders.** They are labelled as such in `src/data/payments.js`
  and must be replaced with the studio's real policy before taking live money.
- **The format demos are illustrations**, not production templates. They demonstrate hierarchy and asks; they are not wired to booking, payments or CMS.
