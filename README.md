# Naaman Wellness — Mental Health Platform

Therapy and counselling in Nairobi and online across Kenya.

Built with Next.js 16.4.0 (App Router), React 19.3.0, TypeScript and plain CSS
with design tokens. Deployed on Vercel.

---

## Quick start

```bash
cp .env.example .env.local   # fill in secrets — never commit this file
npm install
npm run dev                  # http://localhost:3000
```

Requires **Node 24.21.0** (`.nvmrc`). `engines.node` is `>=24.0.0`.

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

---

## Design source

The design reference was `novena (1).zip` — a Themefisher Bootstrap 4 medical
template. **`DESIGN-INVENTORY.md` contains the complete audit** of what was in
that ZIP, what was missing, and what was built from the brief instead.

Short version:

| Required by the brief | Present in ZIP? |
|---|---|
| CSS custom properties | ✗ none — SCSS `$variables` only; all 12 ported verbatim as `--novena-*` |
| `@font-face` rules | ✓ 2 (IcoFont, slick) — reproduced verbatim |
| Loading screen | ✗ — built (EFFECT-08 + EFFECT-25) |
| Cookie consent | ✗ — built |
| CAPTCHA | ✗ — built (reCAPTCHA v3 + v2 fallback) |
| Legal pages | ✗ — built |
| 404 / 500 | ✗ — built |
| API routes | ✗ — 7 built |
| Env variables | ✗ — 28 declared in `.env.example` |
| Package versions | ✗ no manifest — pinned per brief |

The ZIP's palette is clinical (it is a *hospital* template), so it was **kept
intact but not applied**: all twelve values survive as `--novena-*` tokens in
`src/styles/tokens.css`, and a calm warm-sand / soft-sage layer (`--nw-*`) was
added on top. Nothing in Tier 1 was changed or removed.

---

## Structure

```
src/
├── app/
│   ├── layout.tsx              Root shell: crisis banner, nav, footer, JSON-LD
│   ├── page.tsx                Home
│   ├── not-found.tsx           404
│   ├── error.tsx               500
│   ├── global-error.tsx        Last-resort boundary (keeps crisis line visible)
│   ├── sitemap.ts  robots.ts   Dynamic sitemap from therapist/service/resource slugs
│   ├── about/  contact/  check-in/  corporate/  book/
│   ├── therapists/[slug]/      ISR, revalidate 3600
│   ├── services/[slug]/        ISR, revalidate 3600
│   ├── resources/[slug]/       ISR, revalidate 3600, MDX
│   ├── legal/{privacy-policy,terms,cookie-policy}/
│   └── api/
│       ├── booking/            Save + WhatsApp + email confirmation
│       ├── availability/       Live slots (SSR source for /book)
│       ├── corporate/          Enquiry save + notify
│       ├── resources/          MDX article index
│       ├── newsletter/         Vercel KV, reCAPTCHA verified
│       ├── contact/            Nodemailer general enquiry
│       └── captcha/            Standalone server-side verification
├── components/                 See "Effects" below
├── data/                       therapists, services, testimonials, site config
├── lib/                        recaptcha, kv, mailer, whatsapp, availability, resources
└── styles/
    ├── tokens.css              Tier 1 (verbatim ZIP) + Tier 2 (calm layer)
    ├── fonts.css               @font-face reproduced verbatim
    ├── base.css                Reset + typography floors
    ├── effects.css             All ten EFFECT-* implementations
    └── components.css          Component styles
content/resources/*.mdx         8 self-care articles
public/images/                  See image-credits.md
```

---

## Effects

| Effect | Where it lives | Reduced-motion behaviour |
|---|---|---|
| **EFFECT-06** Ambient background | `AmbientBackground.tsx` | Frozen at first frame |
| **EFFECT-08** Self-drawing wordmark | `Preloader.tsx` | Shown fully drawn |
| **EFFECT-12** Microinteractions | `styles/effects.css` | States change instantly |
| **EFFECT-18** Animated gradients | `.nw-gradient-surface` | Frozen at first keyframe |
| **EFFECT-22** Page transitions | `RouteAnnouncer.tsx` + `@view-transition` | Instant crossfade |
| **EFFECT-23** Hero entrance | `Hero.tsx` | All elements appear instantly |
| **EFFECT-24** Skeleton screens | `Skeletons.tsx` | Non-shimmering grey |
| **EFFECT-25** Loading animation | `Preloader.tsx` | Plain percentage text |
| **EFFECT-26** Hover animations | `TherapistCard.tsx` | Reveal shown statically on focus |
| **EFFECT-28** Glassmorphic nav | `Navbar.tsx` | Solid-colour navbar |

Every effect declares its reduced-motion behaviour inline, and there is a
global catch-all at the bottom of `src/styles/effects.css`.

---

## Accessibility

- Crisis banner is the first element on every page, at every breakpoint.
- Body copy 17px, line-height 1.75. Metadata ≥ 12px. Nav and buttons 13px.
- All touch targets ≥ 48×48 (the cookie switch uses an expanded invisible hit
  area so it can stay visually small).
- Focus rings stay visible over the blurred nav (outline + white halo).
- Skeletons carry `aria-busy`; route changes are announced in a live region and
  focus moves to the new `<h1>`.
- Testimonials use first names only and no photographs.

---

## Rendering strategy

| Route | Strategy |
|---|---|
| `/therapists/[slug]`, `/services/[slug]`, `/resources/[slug]` | ISR, `revalidate = 3600` |
| `/book` | SSR (`force-dynamic`) for live availability |
| `/api/*` | Dynamic, `no-store` |
| Everything else | Static |

## Structured data

- `MedicalClinic` + `LocalBusiness` on every page (root layout)
- `Person` per therapist profile
- `Article` per resource, `Service` per service
- Open Graph + Twitter card per resource article and service

## Security

- Security headers including HSTS in both `vercel.json` and `next.config.mjs`.
- All secrets in environment variables only. The reCAPTCHA secret is read
  server-side and never exposed.
- CAPTCHA fails **closed in production** if the secret is missing, and degrades
  to a pass-through outside production so local work is not blocked.
- **No public API route returns client data.** `/api/availability` returns
  times and counts only; `/api/booking` returns a reference only.
- `/api/` is disallowed in `robots.txt`.

---

## Configuration

All 28 environment variables are documented in `.env.example`. Groups:
Site · CAPTCHA · Vercel KV · Email (Nodemailer) · WhatsApp · Crisis line.

Without any configuration the site runs fully: KV, SMTP and WhatsApp all
degrade gracefully and log instead of failing.

---

## Content

- **Therapists** — `src/data/therapists.ts` (6 profiles)
- **Services** — `src/data/services.ts` (7 services)
- **Testimonials** — `src/data/testimonials.ts` (first name only, no photos)
- **Articles** — `content/resources/*.mdx` (8, MDX + frontmatter)

Adding an article is just dropping a new `.mdx` file into `content/resources/`.
Slugs, sitemap, reading time and the `/api/resources` index all pick it up
automatically.

---

## Known items before launch

1. **Replace the generated imagery with Pexels photography.** See
   `image-credits.md` — Pexels was unreachable from the build environment.
   Filenames are fixed, so swapping files needs no code changes.
2. **Brand name check.** The brief referred to "Miriam Wellness" in three
   places (cookie banner copy, the self-drawing wordmark, and the WhatsApp
   link) while naming the business *Naaman Wellness*. **Naaman Wellness** was
   used throughout, following the brief's own Business field and the repository
   name. Confirm before launch.
3. **`.nvmrc` pins Node 24.21.0**; the build environment here ran Node 22, so
   npm printed an `EBADENGINE` warning. Verify on Node 24 in CI.
4. **`@vercel/kv@3.0.0` is deprecated upstream** in favour of a Vercel/Upstash
   Redis integration. It is pinned because the brief names Vercel KV; the
   wrapper in `src/lib/kv.ts` isolates it to a single file if you migrate.
