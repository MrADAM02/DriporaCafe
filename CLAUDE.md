# DRIPORA Café Website: Project Spec

## Overview

New website for **DRIPORA CAFE**, a specialty coffee shop in Al Maather, Riyadh. It replaces the old `dripora-sa.com`, which is a LAK e-commerce template that was never customized and never presented the café itself.

**Primary goal: café presence.** People should find the café, see the menu, check the hours and get directions. The site also shows the 6 bean products, which are ordered through WhatsApp. There is no cart and no checkout.

**v1 milestone:** a polished demo deployed to a Netlify subdomain (for example `dripora.netlify.app`) to show the client. The DNS move from LAK to Netlify comes later and is **not** part of this work.

## Stack

- **Nuxt** (latest stable), TypeScript, Composition API, `<script setup>`
- **Static generation:** `nuxt generate`, with no server runtime and no backend
- **@nuxtjs/i18n:** Arabic is the default at `/` and English lives at `/en/...`, using the `prefix_except_default` strategy
- **Tailwind CSS v4** via `@tailwindcss/vite`, using **logical utilities only** (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`). Never use `ml`/`mr`/`pl`/`pr`/`left`/`right`.
- **Fonts:** self-hosted through `@nuxt/fonts`
- **Icons:** inline SVG components only, with no icon library
- **Content:** plain typed JSON or TS files in `/data`, with no CMS and no Nuxt Content
- Keep dependencies minimal and don't add a library when a few lines of code will do

## Deployment (Netlify)

`netlify.toml`:

```toml
[build]
  command = "npm run generate"
  publish = ".output/public"

[build.environment]
  NODE_VERSION = "22"
```

Every page, in both locales, must be prerendered. Check that `/`, `/en`, `/menu`, `/en/menu` and the other routes all exist as HTML in the output.

## RTL and i18n rules

- Set `<html lang dir>` per locale using `useLocaleHead`, so `ar` gets `rtl` and `en` gets `ltr`.
- Layouts must mirror correctly with no per-locale CSS. Directional icons (arrows, chevrons) flip in RTL using `rtl:-scale-x-100`.
- All UI strings live in `i18n/locales/ar.json` and `en.json`, and nothing is hardcoded in components. Data files carry `{ ar, en }` pairs for any user-facing text.
- Prices are shown as `35 ر.س` in Arabic and `SAR 35` in English. Use Western digits in both locales so prices and phone numbers stay consistent.
- Phone numbers and other mixed-direction runs are wrapped in `<bdi>` or `dir="ltr"` spans.
- Include a language switcher in the header that keeps the current page when switching.

## Pages

| Route | Purpose |
|---|---|
| `/` | Home: hero, signature drinks, beans teaser, a "visit us" block with live open/closed status, hours, directions and WhatsApp |
| `/menu` | The full drinks and food menu, grouped by category, mobile-first. **It also serves as the in-store QR menu**, so it has to load fast, scan quickly and use large tap targets. |
| `/beans` | The 6 bean products, each with an "order on WhatsApp" button |
| `/about` | The brand story, as placeholder copy until the client sends real text |
| `/visit` | Address, map, hours, phone, WhatsApp and social links |
| `/policies/returns`, `/policies/privacy` | Ported from the old site, as placeholders to be confirmed |
| 404 | A branded page that links back home and to the menu |

The header includes logo, nav, language switcher, and a WhatsApp button that is always visible on mobile. The footer includes hours, address, phone, socials and policy links.

## Data

### `/data/cafe.ts`

```ts
export const cafe = {
  name: { ar: 'دريبورا كافيه', en: 'DRIPORA CAFE' }, // TODO confirm the Arabic spelling with the client
  phone: '+966112226299',          // café landline (from the Google listing)
  whatsapp: '966594041557',        // wa.me format, no plus sign
  address: {
    ar: 'حي المعذر، الرياض 12721', // TODO confirm the full Arabic address
    en: '8654 At Tuyur, Al Maather, Riyadh 12721'
  },
  geo: { lat: 24.6732845, lng: 46.6626701 },
  mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ3epDZIYdLz4RtyMcaduiQyg',
  // Daily, closing after midnight. TODO confirm with client.
  hours: { open: '05:00', close: '03:00', timezone: 'Asia/Riyadh' },
  socials: { instagram: '', tiktok: '', x: '' }, // TODO real handles; hide icons whose value is empty
  deliveryApps: [] as { name: string; url: string }[] // TODO e.g. HungerStation, Jahez
}
```

### `/data/beans.ts`

These are the six products from the old site, all priced at 35 SAR. Weights and tasting notes are unknown, so add `// TODO` placeholders for them and don't invent specifics.

| id | ar | en | type |
|---|---|---|---|
| uganda | اوغندا | Uganda | filter (قهوة مقطرة) |
| ethiopia | إثيوبيا | Ethiopia | filter |
| elite-blend | مزيج نخبة | Elite Blend | filter |
| brazil | البرازيل | Brazil | espresso (اسبريسو) |
| colombia | كولومبيا | Colombia | espresso |
| special-blend | المزيج الخاص | Special Blend | espresso |

**Images:** these are the client's own product photos from the old site. Download them into `public/images/beans/{id}.webp`.

| Product | Image URL |
|---|---|
| Uganda | `https://dripora-sa.com/lak/tenants/27bc3b34-3e53-b3a0-e98a-3a2273c7bf33/productPictures/d6c39760-4c50-4e21-b6af-2fcea88d2f06.webp` |
| Brazil | `.../productPictures/55faafbb-2a8d-48b6-b7b0-08dbe3ddf7f5.webp` |
| Colombia | `.../productPictures/447e9b02-aaf4-41d6-bf0a-600a7e4f1314.webp` |
| Ethiopia | `.../productPictures/16f20f72-705c-4968-bfa1-cf8cb82151db.webp` |
| Special Blend | `.../productPictures/142eece8-2ce7-47c7-8f34-01f872ecc6ef.webp` |
| Elite Blend | `.../productPictures/278933b1-5532-41ee-94bd-382c986d452b.webp` |

Every `...` above is the same path as the Uganda URL, up to and including `productPictures/`.

Logo: `https://theme.lak.sa/lak/tenants/27bc3b34-3e53-b3a0-e98a-3a2273c7bf33/storeScreenshots/b3b7a677-5306-4aa2-ab4e-4ab097edc7d2.webp`. Use it for the demo only, and replace it with a vector logo once the client provides one.

### `/data/menu.ts`

The real menu is provided in `menu.ts`. Copy it into `/data/menu.ts` as-is. It was transcribed from the café's menu photo and has 25 items across three categories (hot drinks, cold drinks, drip coffee), with prices in SAR.

- **Price-list layout, not cards.** Prices are low (5 to 20 SAR) and there are no item photos, so `/menu` should read like a well-set price list: item names aligned to the start, prices aligned to the end, with clear category headings. This also scans fastest from a QR code at the table.
- **Category jump links:** add sticky jump links for the three categories at the top of `/menu`.
- **Signature items:** the pistachio latte (hot and iced) is tagged `signature`. Feature both on the home page and mark them subtly on `/menu`.
- **Bean drinks link:** show a small note under the drip coffee category linking to `/beans`, so people can buy the beans they just drank.
- Keep the `TODO` comments in `menu.ts` and don't change items or prices without the client's confirmation.

## Features

### WhatsApp ordering (beans)

Each bean card has a button labelled "اطلب عبر واتساب" (in English, "Order on WhatsApp"). It opens:

```
https://wa.me/966594041557?text=<encoded>
```

The prefilled message is built from the locale and the product name, for example: `السلام عليكم، أبغى أطلب قهوة {name} ({type}) 🌿`. Put the message in a composable called `useWhatsAppLink(product?)`, and reuse it for the generic WhatsApp button with no product name.

### Open/closed status

- Compute the status in `Asia/Riyadh` time, regardless of the visitor's timezone.
- Hours run past midnight (05:00 to 03:00 the next day), so the logic must handle that wrap correctly.
- Write unit tests with Vitest for these cases: 04:59 is closed, 05:00 is open, 23:00 is open, 02:59 is open, 03:00 is closed.
- **Render the status only on the client** with `<ClientOnly>` or `onMounted`, because the pages are static and rendering it at build time would bake in a wrong value. Use a neutral placeholder during SSR to avoid a hydration mismatch.

### Map

On `/visit`, show a lazy-loaded Google Maps iframe embed (`loading="lazy"`) behind a click-to-load poster, so the page doesn't load Google's scripts until the visitor asks. Next to it, add a "Get directions" button that opens `cafe.mapsUrl`.

### SEO

- Set per-page `title` and `description` in both languages with `useSeoMeta`. Use real descriptions; the old site used just "DRIPORA".
- Add `hreflang` alternates through i18n.
- Generate a sitemap, either with a small build script or `@nuxtjs/sitemap`. Use the module only if it stays lightweight.
- Add JSON-LD `CafeOrCoffeeShop` markup with name, address, geo, telephone, opening hours (`Mo-Su 05:00-03:00`), price range `$` and `hasMenu: /menu`.
- Add OG and Twitter images: a 1200×630 branded image per locale.
- Add a favicon set generated from the logo.

## Design direction

These tokens are a starting proposal. **If the client's logo or brand defines colors, those win.** In that case, update the tokens and keep the structure.

- **Concept:** "Fajr to Fajr". The café opens at 5 AM and closes at 3 AM, which is unusual, so the site leans into it. Use one memorable moment: the hero greeting and its imagery tone switch between a morning state and a night state, based on Riyadh time and computed on the client. Keep everything else quiet and disciplined.
- **Colors:**

  | Token | Value | Use |
  |---|---|---|
  | `--roast` | `#2A1B14` | Main text, dark surfaces |
  | `--foam` | `#FBFAF8` | Light background |
  | `--pistachio` | `#7E9A4E` | Primary accent and CTAs; a nod to the signature drink |
  | `--cherry` | `#9E3A2E` | Small accents; the coffee cherry |
  | `--night` | `#14100D` | Night-state hero |
  | `--stone` | `#8A8079` | Muted text |

  Set the tokens as CSS variables on `:root`. Check contrast against WCAG AA.
- **Type:** **Alexandria** for display and headings, which supports both Arabic and Latin, and **IBM Plex Sans Arabic** for body text. Arabic body text gets a line-height of about 1.8 and is never letter-spaced.
- **Avoid:**
  - All-caps eyebrow labels
  - Identical rounded cards with grey shadows everywhere
  - Fade-up animations on every section
  - `→` appended to buttons
  - Gradient washes
- **Photography placeholders:** use a neutral tone block with an aspect-ratio box and a small "photo coming" label. Don't use AI-generated or stock images of a café that isn't DRIPORA.

## Quality bar

- Mobile-first, since most traffic will come from QR scans and Maps.
- Test widths of 360, 768 and 1280.
- Lighthouse should score at least 90 on performance, accessibility, SEO and best practices, measured on mobile against the Netlify preview.
- Keyboard focus is visible, and `prefers-reduced-motion` is respected.
- No layout shift: every image has explicit dimensions or an aspect-ratio box.
- Every external link uses `rel="noopener"`.

## Build order

1. Scaffold Nuxt, set up Tailwind v4, i18n (ar/en with RTL), fonts, tokens and `netlify.toml`. **Done when:** the empty layout renders correctly in both directions and `npm run generate` succeeds.
2. Add the header, footer, language switcher, WhatsApp button and the `cafe` data.
3. Build the home page, including the open/closed status and its tests.
4. Build `/menu` from `/data/menu.ts`.
5. Build `/beans` with WhatsApp ordering, and download the product images.
6. Build `/visit` with the map and directions.
7. Build `/about`, the policies pages and the 404 page.
8. Add SEO: meta tags, JSON-LD, sitemap, OG images and favicons.
9. Do a Lighthouse pass and a manual RTL review, fix the issues found, then deploy to Netlify.

Commit after each step. **Ask before** adding any dependency not listed in this file.

## Out of scope for v1

- Cart, checkout, payment and accounts
- Any backend or CMS
- Moving the DNS for `dripora-sa.com` away from LAK
- Newsletter signup

## Open items (waiting on client)

- Vector logo and any brand guidelines
- Real photos of the space, drinks and bean bags
- Menu confirmation: current prices, "Mikato" (assumed macchiato), whether the frappuccino is hot or cold, and whether there are sweets or food to add
- The logo at the top of the menu photo doesn't read as DRIPORA; confirm it's the same café
- Bean weights, roast levels and tasting notes
- Arabic brand-name spelling, full address and confirmed hours
- Social handles and delivery-app links
- Brand story text for `/about`
- Final policy text
- Domain registrar access, needed for the later DNS move
