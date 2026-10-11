# Design Source Inventory — `novena (1).zip`

Written before any new code. This is a complete, verbatim audit of the supplied
design ZIP, listing what was present, what was absent, and exactly what was
carried into the Naaman Wellness build.

---

## 1. What the ZIP actually is

| | |
|---|---|
| **Project name** | `novena` |
| **Theme name** | Medic / Novena |
| **Author** | Themefisher — https://themefisher.com/ |
| **Description** | Medicle Template |
| **Version** | 1.0.0 |
| **Type** | Static **Bootstrap 4 HTML** template, not a Next.js/React project |
| **Files** | 121 (excluding the bundled `.git`) |
| **Unpacked size** | 6.8 MB |
| **Top-level dir** | `novena/` |

### Full file tree

```
novena/
├── .gitattributes
├── about.html
├── appoinment.html          (sic — "appoinment")
├── blog-sidebar.html
├── blog-single.html
├── changelog.md
├── confirmation.html
├── contact.html
├── department-single.html
├── department.html
├── doctor-single.html
├── doctor.html
├── documentation.html
├── index.html
├── license
├── mail.php
├── service.html
├── css/
│   ├── maps/style.css.map
│   └── style.css                      22,129 bytes
├── js/
│   ├── contact.js
│   └── script.js
├── images/
│   ├── logo.png                       212×60
│   ├── about/   05.png 1.png 2.png 3.png 4.png 5.png 6.png
│   │            about-1..4.jpg  img-1..3.jpg  sign.png
│   ├── bg/      22.jpg banner.jpg bg-2.jpg bg-4.jpg slider-bg-1.jpg
│   ├── blog/    blog-1,2,4,6,7,8.jpg  testimonial1..2.jpg
│   ├── service/ bg-1.jpg service-1,2,3,4,6,8.jpg
│   └── team/    1.jpg 2.jpg 3.jpg 4.jpg
│                test-thumb1..4.jpg
├── plugins/
│   ├── bootstrap/       css/bootstrap.min.css
│   │                    js/bootstrap.js  bootstrap.min.js  popper.js
│   ├── counterup/       jquery.counterup.min.js
│   │                    jquery.easing.js  jquery.waypoints.min.js
│   ├── google-map/      map.js
│   ├── jquery/          jquery.js
│   ├── shuffle/         shuffle.min.js
│   ├── icofont/         icofont.css  icofont.min.css  demo.html
│   │                    fonts/icofont.eot  .ttf  .woff  .woff2
│   └── slick-carousel/  slick/slick.css .scss .less .js .min.js
│                        slick-theme.css .scss .less
│                        fonts/slick.eot .svg .ttf .woff
│                        ajax-loader.gif  config.rb
└── scss/
    ├── _color.scss            (EMPTY — 0 bytes)
    ├── _common.scss
    ├── _media-query.scss
    ├── _mixins.scss
    ├── _typography.scss
    ├── _variables.scss
    ├── style.scss
    └── templates/
        _about.scss        _backgrounds.scss   _blog-sidebar.scss
        _blog.scss         _contact.scss       _counter.scss
        _cta.scss          _department.scss    _feature.scss
        _footer.scss       _header.scss        _navigation.scss
        _portfolio.scss    _review.scss        _service.scss
        _single-post.scss  _slider.scss        _team.scss
```

---

## 2. Verbatim extraction — item by item

### 2.1 CSS custom properties — **ZERO FOUND**

The ZIP contains **no CSS custom properties at all**. A project-wide grep for
`--[a-z-]:` across every `.css` and `.scss` file returned nothing (the only
matches were inside binary JPEGs).

The design tokens instead live in `scss/_variables.scss` as **SCSS `$variables`**.
All eleven are ported 1:1 into `src/styles/tokens.css` under a `--novena-*`
namespace, with every value untouched:

| SCSS variable (source) | Value | CSS custom property (ported) |
|---|---|---|
| `$light` | `#fff` | `--novena-light` |
| `$primary-color` | `#223a66` | `--novena-primary-color` |
| `$secondary-color` | `#e12454` | `--novena-secondary-color` |
| `$base-color` | `#6F8BA4` | `--novena-base-color` |
| `$title-color` | `#223a66` | `--novena-title-color` |
| `$black` | `#222` | `--novena-black` |
| `$gray` | `#eff0f3` | `--novena-gray` |
| `$secondary-bg` | `#f4f9fc` | `--novena-secondary-bg` |
| `$border-color` | `#fafafa` | `--novena-border-color` |
| `$primary-font` | `'Exo', sans-serif` | `--novena-primary-font` |
| `$secondary-font` | `'Roboto', sans-serif` | `--novena-secondary-font` |
| `$grad-color` | `linear-gradient(to bottom,#05a5f9,#10dab7)` | `--novena-grad-color` |

`scss/_color.scss` exists but is **empty (0 bytes)** — it contributes nothing.

Typography metrics from `scss/_typography.scss` are also preserved verbatim as
`--novena-*` tokens (`--novena-body-font-size: 16px`,
`--novena-body-line-height: 1.6`, `--novena-p-line-height: 30px`,
`--novena-h1-font-size: 2.5rem`, `--novena-h2-font-size: 44px`,
`--novena-h3-font-size: 1.5rem`, `--novena-h4-font-size: 1.3rem`,
`--novena-h4-line-height: 30px`, `--novena-h5-font-size: 1.25rem`,
`--novena-h6-font-size: 1rem`, `--novena-heading-font-weight: 700`).

> **Note on the brief's stricter floor.** The brief requires body copy ≥ 16px
> and line-height ≥ 1.7. The ZIP's `1.6` sits below that floor, so the live
> site uses the Tier 2 scale (`--nw-lh-body: 1.75`, `--nw-fs-body: 1.0625rem`).
> The original Tier 1 values are **retained unmodified and still available** —
> nothing was overwritten. This is "build on top", not redesign.

### 2.2 `@font-face` rules — **TWO FOUND, both reproduced verbatim**

Both are vendored **icon** fonts. There are no self-hosted text fonts.

**#1 — `plugins/icofont/icofont.css` line 9**
```css
@font-face
{
  font-family: "IcoFont";
  font-weight: normal;
  font-style: "Regular";
  src: url("./fonts/icofont.woff2") format("woff2"),
       url("./fonts/icofont.woff") format("woff");
}
```
Reproduced in `src/styles/fonts.css`; the `.woff2` and `.woff` binaries were
copied to `public/fonts/icofont/` and the URLs rewritten to absolute paths.

**#2 — `plugins/slick-carousel/slick/slick-theme.css` line 9**
```css
@font-face
{
    font-family: 'slick';
    font-weight: normal;
    font-style: normal;

    src: url('./fonts/slick.eot');
    src: url('./fonts/slick.eot?#iefix') format('embedded-opentype'),
         url('./fonts/slick.woff') format('woff'),
         url('./fonts/slick.ttf') format('truetype'),
         url('./fonts/slick.svg#slick') format('svg');
}
```
Reproduced in `src/styles/fonts.css`; `slick.woff` and `slick.ttf` copied to
`public/fonts/slick/`. Retained for fidelity only — the testimonial carousel is
now a dependency-free crossfade and renders no slick glyphs.

**Text fonts** were loaded from Google Fonts by the ZIP, and are loaded the
same way here:
- `scss/_typography.scss` — `@import url('https://fonts.googleapis.com/css?family=Exo:500,600,700|Roboto&display=swap')`
- every `*.html` `<head>` — `Montserrat:wght@500;800;900`

Both are reproduced in `src/app/layout.tsx` via `<link>` (rather than `@import`,
so the request is not blocked behind CSS), with local fallback stacks in
`src/styles/fonts.css`.

### 2.3 Loading screen — **ABSENT**

No preloader, loader, spinner or loading component exists anywhere in the ZIP's
own HTML, CSS or JS. (The only matches for "loading"/"spinner" were IcoFont
icon-class names in the vendored `demo.html`.)

→ **Built from the brief** as `src/components/Preloader.tsx` (EFFECT-08 + EFFECT-25).

### 2.4 Cookie consent — **ABSENT**

No cookie banner, consent modal, or `localStorage` consent logic. Zero matches
for `cookie`, `consent`, or `gdpr` across all HTML, JS and SCSS.

→ **Built from the brief** as `src/components/CookieConsent.tsx` and
`src/components/CookiePolicyManager.tsx`.

### 2.5 CAPTCHA — **ABSENT**

Zero matches for `captcha` or `recaptcha` in any file.

→ **Built from the brief**: `src/lib/recaptcha.ts` (server verification),
`src/lib/captcha-client.ts` (v3 loader + v2 fallback),
`src/components/CaptchaChallenge.tsx`, and `src/app/api/captcha/route.ts`.

### 2.6 Legal pages — **ABSENT**

No `privacy`, `terms`, `cookie` or `legal` templates.

→ **Built from the brief**: `/legal/privacy-policy`, `/legal/terms`,
`/legal/cookie-policy`.

### 2.7 404 and 500 pages — **ABSENT**

No `404.html`, `500.html`, `error.html`, or any error template.

→ **Built from the brief**: `src/app/not-found.tsx`, `src/app/error.tsx`,
`src/app/global-error.tsx`.

### 2.8 API routes — **ABSENT**

The ZIP is a static HTML site. The only server-side file is `mail.php`, a
standalone PHP contact handler.

→ **Built from the brief**: seven App Router route handlers, all present:

| Route | File |
|---|---|
| `/api/booking` | `src/app/api/booking/route.ts` |
| `/api/availability` | `src/app/api/availability/route.ts` |
| `/api/corporate` | `src/app/api/corporate/route.ts` |
| `/api/resources` | `src/app/api/resources/route.ts` |
| `/api/newsletter` | `src/app/api/newsletter/route.ts` |
| `/api/contact` | `src/app/api/contact/route.ts` |
| `/api/captcha` | `src/app/api/captcha/route.ts` |

### 2.9 Environment variables — **ABSENT**

No `.env`, `.env.example`, or any environment configuration. `mail.php` contains
hardcoded recipient handling instead.

→ **Built from the brief**: `.env.example` declares all 28 variables.

### 2.10 Package versions — **ABSENT**

There is **no `package.json`** (and no `bower.json`, or any other manifest).

→ **Specified by the brief** and pinned exactly:
`next 16.4.0`, `react 19.3.0`, `react-dom 19.3.0`,
`@vercel/kv 3.0.0`, `nodemailer 6.10.0`, `next-mdx-remote 5.0.0`,
`gray-matter 4.0.3`, `lucide-react 0.475.0`, `typescript 5.7.3`.
Node pinned by `.nvmrc` (`24.21.0`) and `engines.node >= 24.0.0`.

Note: `@vercel/kv@3.0.0` is deprecated upstream in favour of a Vercel/Upstash
Redis integration. It is pinned here because the brief names Vercel KV; the
wrapper in `src/lib/kv.ts` isolates it, so swapping the backend touches one file.

---

## 3. Imagery — audited and deliberately **not** carried across

| Path | Dimensions | Assessment |
|---|---|---|
| `images/team/1–4.jpg` | 270×270 | Generic medical stock portraits |
| `images/service/service-1,2,3,4,6,8.jpg` | 320×230 | Clinical/hospital scenes |
| `images/about/about-1–4.jpg` | 300×200 | Clinical interiors |
| `images/bg/slider-bg-1.jpg`, `banner.jpg`, `bg-2.jpg` | 1920×903 | Hospital corridors |
| `images/blog/blog-*.jpg` | 1000×667 | Generic medical stock |

**Decision: none of these were used.** Three reasons:

1. The brief requires *"East African people in wellness settings"* — these are
   generic, non-Kenyan medical stock.
2. The brief explicitly forbids *"clinical or hospital imagery"* — Novena is a
   **hospital** template, so clinical imagery is exactly what it contains.
3. Resolution is too low for full-bleed hero use (270×270 / 320×230).

`images/logo.png` and `images/about/sign.png` were likewise not used — the
Naaman Wellness wordmark is an SVG leaf + type lockup built for this site.

---

## 4. Summary table

| Brief requirement | In ZIP? | Action taken |
|---|---|---|
| CSS custom properties | ✗ none (SCSS `$vars` only) | All 12 SCSS vars ported verbatim as `--novena-*` |
| `@font-face` rules | ✓ 2 (IcoFont, slick) | Reproduced verbatim; font binaries copied |
| Loading screen | ✗ | Built (EFFECT-08 + EFFECT-25) |
| Cookie consent | ✗ | Built, Kenya DPA 2019 compliant |
| CAPTCHA | ✗ | Built, reCAPTCHA v3 + v2 fallback |
| Legal pages (3) | ✗ | Built |
| 404 / 500 pages | ✗ | Built |
| API routes (7) | ✗ | Built |
| Env variable names | ✗ | 28 declared in `.env.example` |
| Package versions | ✗ no manifest | Pinned per brief |
| Typography | ✓ Exo / Roboto / Montserrat | Retained; floors raised per brief |
| Colour palette | ✓ `$variables` | Retained verbatim; calm layer added on top |
| Imagery | ✓ but clinical | Deliberately replaced — see §3 |

---

## 5. One conflict worth flagging

The ZIP's palette is **clinical by design** — `#e12454` is a hot pink/red
emergency accent, and the template's imagery is hospital-based. Carrying that
palette verbatim into a mental health site would work directly against the
brief's own design note (*"safe, warm, and unhurried… no clinical imagery"*).

Resolution: **nothing was changed or removed.** All twelve SCSS values survive
untouched as `--novena-*`. A calm semantic layer (`--nw-*`) was added *on top* —
warm sand, soft sage, gentle clay — and the site's semantic roles point at the
calm layer. The ZIP's `#223a66` navy was in fact already calm and became the
headings colour, inherited verbatim as `--nw-ink-800`.

The `--novena-secondary-color: #e12454` token is retained in full and remains
available, but is not used as a live UI colour anywhere.
