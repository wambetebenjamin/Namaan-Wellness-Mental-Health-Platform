# Image Credits — Naaman Wellness

## ⚠️ Important: read before publishing

The brief specified **Pexels free-tier imagery**, saved to `/public/images/`,
with attribution recorded in this file.

**Pexels was not reachable from the build environment.** Both
`api.pexels.com` and `images.pexels.com` returned connection failures, as did
Google Fonts and all other hosts outside a small allow-list (GitHub and the npm
registry). No Pexels image could be downloaded or verified.

Rather than ship a site with broken image paths or watermarked placeholders, the
photography in `/public/images/` was **generated to the brief's art direction**
— East African people in calm, dignified, non-clinical wellness settings.

**Before this site goes live, replace every image below with a licensed
Pexels equivalent** using the queries in the table. Swapping files in place
requires no code changes: filenames and dimensions are already fixed.

### How to swap

1. Search Pexels with the query given below.
2. Download the large JPEG (no watermark, Pexels license — free for commercial
   use, no attribution required, though credit is appreciated).
3. Overwrite the file at the path shown, keeping the same filename.
4. Update the "Source" column in this file to the Pexels URL and photographer.

---

## Current images

| Path | Used on | Intended Pexels search query | Source |
|---|---|---|---|
| `/images/hero.jpg` | Home hero | *"African woman meditation calm"* / *"Kenyan man peaceful nature outdoors"* | Generated — replace before launch |
| `/images/about.jpg` | Home about strip, `/about` | *"East African therapy session counselling"* | Generated — replace before launch |
| `/images/corporate.jpg` | `/corporate`, home teaser | *"African couple talking support"* (workplace variant) | Generated — replace before launch |
| `/images/og-default.jpg` | Open Graph fallback, JSON-LD | *"East African woman yoga wellness"* | Generated — replace before launch |
| `/images/therapists/amina-otieno.jpg` | Amina Otieno | *"African therapist counsellor office"* | Generated — replace before launch |
| `/images/therapists/brian-kamau.jpg` | Brian Kamau | *"African therapist counsellor office"* | Generated — replace before launch |
| `/images/therapists/grace-wanjiru.jpg` | Grace Wanjiru | *"African therapist counsellor office"* | Generated — replace before launch |
| `/images/therapists/david-mwangi.jpg` | David Mwangi | *"African therapist counsellor office"* | Generated — replace before launch |
| `/images/therapists/faith-nderitu.jpg` | Faith Nderitu | *"African therapist counsellor office"* | Generated — replace before launch |
| `/images/therapists/peter-ochieng.jpg` | Peter Ochieng | *"African therapist counsellor office"* | Generated — replace before launch |

### Still to be sourced

These are referenced by the code and will render a calm gradient + icon
placeholder until the file exists — no code change is needed to activate them.

| Path | Used on | Pexels search query |
|---|---|---|
| `/images/services/individual-therapy.jpg` | Service card + detail | *"African woman meditation calm"* |
| `/images/services/couples-therapy.jpg` | Service card + detail | *"African couple talking support"* |
| `/images/services/family-counselling.jpg` | Service card + detail | *"East African therapy session counselling"* |
| `/images/services/group-therapy.jpg` | Service card + detail | *"African couple talking support"* |
| `/images/services/grief-and-loss-support.jpg` | Service card + detail | *"Kenya peaceful garden calm"* |
| `/images/services/workplace-burnout-recovery.jpg` | Service card + detail | *"Black man stress relief nature"* |
| `/images/services/teen-and-young-adult-therapy.jpg` | Service card + detail | *"East African woman yoga wellness"* |
| `/images/resources/anxiety.jpg` | Article header | *"Kenya peaceful garden calm"* |
| `/images/resources/stress.jpg` | Article header | *"Kenyan man peaceful nature outdoors"* |
| `/images/resources/grief.jpg` | Article header | *"Kenya peaceful garden calm"* |
| `/images/resources/relationships.jpg` | Article header | *"African couple talking support"* |
| `/images/resources/parenting.jpg` | Article header | *"East African therapy session counselling"* |
| `/images/resources/burnout.jpg` | Article header | *"Black man stress relief nature"* |
| `/images/resources/sleep.jpg` | Article header | *"African woman meditation calm"* |
| `/images/resources/self-compassion.jpg` | Article header | *"East African woman yoga wellness"* |

To activate a service or article image, add the `image` field to the entry in
`src/data/services.ts` or to the MDX frontmatter in
`content/resources/*.mdx`. The component already handles it.

---

## Art direction applied

Every image in this project follows these rules, and any replacement should too:

- **East African subjects** in wellness settings.
- **Calm, dignified, hopeful.** No distress, no despair, no crying.
- **No clinical or hospital imagery** — no scrubs, no stethoscopes, no gurneys,
  no white corridors.
- **No watermarks**, no stock-photo stiffness, no text baked into the image.
- Warm, natural light. Earthy, muted tones that sit with the sand/sage palette.
- Subjects are **resting, talking, or quietly present** — not posing.

### Testimonials

Testimonials deliberately **use no photographs**. First name and service only.
Several clients asked for privacy; a stock portrait of a stranger next to a
quote about therapy would undermine the trust the site is built on.

---

## Fonts

| Font | Role | Source |
|---|---|---|
| **Exo** (500, 600, 700) | Headings, wordmark | Google Fonts — inherited from the design ZIP |
| **Roboto** (400, 500, 700) | Body copy | Google Fonts — inherited from the design ZIP |
| **Montserrat** (500, 800, 900) | Fallback / display | Google Fonts — inherited from the ZIP's `<head>` |
| **IcoFont** 1.0.1 | Icon font (`@font-face` reproduced verbatim) | IcoFont — https://icofont.com/license/ |
| **slick** | Icon font (`@font-face` reproduced verbatim) | kenwheeler/slick |

Icons in the interface itself are **Lucide** (`lucide-react`), which is
ISC-licensed. IcoFont and slick are retained because the brief required every
`@font-face` rule from the ZIP to be reproduced; they are not actively rendered.

See `DESIGN-INVENTORY.md` for the complete audit of the supplied design ZIP.
