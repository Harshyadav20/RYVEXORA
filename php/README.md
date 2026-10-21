# RYVEXORA — PHP edition

A dependency-free, server-rendered mirror of the RYVEXORA website. No build step, no
database, no npm install: upload the folder and it runs on any standard PHP host.

The React edition at the repository root remains the primary build (Three.js hero,
scroll-driven objects, animated transitions). This edition delivers the same brand,
content, inner pages and conversion path in plain PHP for hosts where a Node build
pipeline is not available or not wanted.

---

## Requirements

| Requirement | Notes |
| --- | --- |
| PHP **8.1+** | Uses `never` return types, `str_contains`-era syntax, typed signatures |
| Apache with `mod_rewrite` *(optional)* | `.htaccess` files are included; Nginx works with the equivalent snippets below |
| Writable `storage/` directory | For JSON-lines inquiry logging |
| A mail transport *(optional)* | Only needed if `MAIL_ENABLED` is turned on |

No Composer packages, no database, no environment file required.

---

## Deploy

1. Upload the **contents of this `php/` folder** to your web root (or a subfolder such as
   `/site`). All links are relative, so a subfolder deployment works unchanged.
2. Create `storage/` and make it writable by the web user:

   ```bash
   mkdir -p storage
   chmod 775 storage
   ```

   The included `storage/.htaccess` blocks public access on Apache. On Nginx add:

   ```nginx
   location ^~ /storage/ { deny all; return 404; }
   ```

3. Open the site in a browser. That is the whole install.
4. Optional: enable the 404 handler in `.htaccess` (uncomment `ErrorDocument 404 /404.php`)
   once the site is served from the domain root. `project.php?slug=` and `service.php?slug=`
   already return a proper 404 status for unknown slugs.

### Nginx reference

Apache `.htaccess` files are ignored by Nginx. Minimum equivalent:

```nginx
index index.php;
location ~ \.php$ { include fastcgi_params; fastcgi_pass unix:/run/php/php8.2-fpm.sock; }
location ~* \.(jsonl|log|md)$ { deny all; }
```

---

## Local preview without PHP

If PHP is not installed, the edition can be reviewed through WebAssembly:

```bash
npm i --no-save @php-wasm/node   # repository root, one-off
npm run php:preview              # http://localhost:8080
```

This uses `tools/php-preview.mjs` and runs the real templates on PHP 8.3 (wasm). The
contact form validates, redirects and shows the confirmation exactly as it would in
production, and each successful inquiry is mirrored to `storage/inquiries.jsonl` on disk.
It is a convenience for review — production should use a normal PHP 8.1+ host.

## Structure

```
php/
├── index.php            Home — hero, services, studio, featured work, CTA
├── services.php         All services + engagement models
├── service.php          Service detail (?slug=web-development) with 404 fallback
├── work.php             Project archive
├── project.php          Project case study (?slug=atlas-revenue-os) with 404 fallback
├── formats.php          Format library + comparison table
├── format.php           Format detail (?slug=medical) with 404 fallback
├── process.php          Five-stage process + FAQ
├── about.php            Studio, principles, honest fit
├── contact.php          Inquiry form: CSRF, validation, JSONL storage, PRG success
├── privacy.php          Privacy notice
├── 404.php              Error page
├── robots.txt           Crawl rules (storage/ excluded)
├── sitemap.xml          PHP URLs incl. slug query strings
├── .htaccess            Security headers, directory listing off, data blocked
├── includes/
│   ├── config.php       Session, constants, escaping + helper functions, $DATA
│   ├── data.php         All site content (single source of truth)
│   ├── ui.php           render_mock / cards / breadcrumbs / faqs / cta / format demo frame
│   ├── formats/         One demo composition per format (medical, digital-product, luxury, creator)
│   ├── header.php       Document head + fixed navigation
│   ├── footer.php       Footer, wordmark, scripts
│   └── .htaccess        Denies direct access to included partials
├── assets/
│   ├── site.css         Complete standalone stylesheet
│   ├── site.js          Nav, reveals, back-to-top, submit guard
│   ├── favicon.svg
│   └── fonts/           Space Grotesk, Inter, JetBrains Mono (woff2, self-hosted)
└── storage/             Inquiry log (writable, never public)
```

---

## Content

Every headline, service, project, format and FAQ lives in **`includes/data.php`**, which is
**generated** — do not edit it by hand. The React app keeps the source content in
`src/data/*.js`; regenerate the PHP copy after any copy change:

```bash
npm run content:sync
```

That keeps service deliverables, project write-ups, process outputs and FAQs identical in
both editions instead of slowly drifting apart.

Projects are all labelled **“Concept build”** on purpose. Do not add client names, logos,
testimonials, awards or performance numbers unless they are real and verifiable — the
templates deliberately have no fields for fabricated social proof.

---

## Contact form

`contact.php` implements:

1. **CSRF token** — a per-session token compared with `hash_equals()`.
2. **Honeypot** — a visually hidden `trap` field; bot submissions are accepted silently and
   discarded (no data stored, no error shown).
3. **Server-side validation** — name, email (`FILTER_VALIDATE_EMAIL`), service and budget
   whitelists, minimum message length, optional website normalisation.
4. **Storage** — one JSON object per line appended to `storage/inquiries.jsonl` with
   `LOCK_EX`. Read it with any text editor, or convert it:

   ```bash
   php -r 'foreach (file("storage/inquiries.jsonl") as $l) { $r = json_decode($l, true); echo $r["received_at"], "  ", $r["email"], "  ", $r["service"], PHP_EOL; }'
   ```

5. **POST → redirect → GET** — a successful submit redirects to `contact.php?sent=1` so a
   refresh cannot resend the brief. The confirmation reads from a one-shot session flash.
6. **Optional email copy** — set `MAIL_ENABLED` to `true` in `includes/config.php` once the
   host has a working `mail()` transport. Test it before relying on it; many shared hosts
   suppress `mail()` silently. Keep the JSONL log enabled as the reliable record.

If both storage and mail fail, the visitor sees a clear error with the direct email address
instead of a false success.

### Spam hardening (optional)

- Add rate limiting at the host or CDN (e.g. 5 submissions per IP per hour).
- Add a DNS/IP reputation check or a lightweight proof-of-work challenge for heavy abuse.
- Rotate the honeypot field name occasionally.

---

## Security notes

- All output passes through `e()` (`htmlspecialchars`, `ENT_QUOTES`, UTF-8).
- `.htaccess` sets `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and a
  restrictive `Permissions-Policy`, and denies `.jsonl`, `.log` and `.md` files.
- `storage/` ships with its own deny-all `.htaccess` as defence in depth.
- Keep the site on HTTPS; the session cookie should be `Secure` in production. If PHP is
  not already configured that way, add to `includes/config.php` before `session_start()`:

  ```php
  session_set_cookie_params(['secure' => true, 'httponly' => true, 'samesite' => 'Lax']);
  ```

- Never commit `storage/inquiries.jsonl`; it is already ignored by the root `.gitignore`.

---

## Accessibility & behaviour

- Skip link, visible focus styles, `aria-current` on the active nav item.
- Mobile navigation traps nothing, closes on `Escape`, and returns focus to the toggle.
- FAQ sections use native `<details>`/`<summary>` — keyboard accessible with no JavaScript.
- All animation is opt-in via `IntersectionObserver` and disabled under
  `prefers-reduced-motion: reduce`.
- No third-party scripts, fonts or trackers. Everything is served from this folder.

---

## Relationship to the React edition

| | React (`/`) | PHP (`/php`) |
| --- | --- | --- |
| Hero | WebGL object, scroll-driven transformation | CSS orb + gradient field |
| Motion | GSAP ScrollTrigger, Lenis smooth scroll | IntersectionObserver reveals |
| Routing | React Router SPA | Server-rendered multi-page |
| Contact | `mailto:` handoff + local draft | Server validation + JSONL storage |
| Build | Vite | None |

Both share copy, tokens, type scale and page structure. If you only need one edition, the
React app offers the full cinematic experience; the PHP app is the zero-dependency fallback.

---

© RYVEXORA. Mumbai, India — <hello@ryvexora.com>
