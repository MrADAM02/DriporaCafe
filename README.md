# DRIPORA CAFE

Website for **DRIPORA CAFE**, a specialty coffee shop in Al Maather, Riyadh, open daily from 5 AM to 3 AM.

**Live demo:** https://dripora.netlify.app

The site presents the café (menu, hours, location) and the six bean products, which are ordered through WhatsApp. It's a fully static site: no backend, no cart, no CMS.

- Arabic (default, right-to-left) at `/`, English at `/en/...`
- `/menu` doubles as the in-store QR menu
- Live open/closed status and a morning/night hero, both computed in Riyadh time

The full project spec is in [CLAUDE.md](CLAUDE.md).

## Stack

- [Nuxt 4](https://nuxt.com) with TypeScript and `<script setup>`, statically generated with `nuxt generate`
- [@nuxtjs/i18n](https://i18n.nuxtjs.org) (`prefix_except_default`: Arabic at `/`, English at `/en`)
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`, logical utilities only (`ms-*`, `ps-*`, `start-*`…) so layouts mirror in RTL
- [@nuxt/fonts](https://fonts.nuxt.com) self-hosting Alexandria (headings) and IBM Plex Sans Arabic (body)
- [Vitest](https://vitest.dev) for unit tests
- Hosted on [Netlify](https://netlify.com)

## Getting started

Requires Node 22 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run generate` | Static build of every page in both languages into `.output/public` (or `dist/` on Netlify) |
| `npm run preview` | Serve the last build locally |
| `npm test` | Run the unit tests (opening-hours logic) |

## Project structure

```
app/
  pages/            One file per route (index, menu, beans, visit, about, policies/*)
  components/       Header, footer, WhatsApp button, open/closed status, map…
    icon/           Inline SVG icons (<IconWhatsapp>, <IconPin>…)
    illo/           Line-art drink illustrations, the fallback when a drink has no photo
  composables/      useWhatsAppLink, useCafeClock, usePageSeo, useLocalized…
  utils/hours.ts    Opening-hours logic (Riyadh time, wraps past midnight)
  assets/css/       Tailwind entry point and brand colour tokens
  error.vue         Branded 404 page
data/               Site content: café details, menu, beans
i18n/locales/       All interface text: ar.json and en.json
public/images/      Logo, bean photos and other photos
server/routes/      sitemap.xml and robots.txt, generated at build time
test/               Vitest tests
```

## Editing content

Most changes don't need any component code.

| To change… | Edit |
|---|---|
| Phone, WhatsApp number, address, hours, map link | `data/cafe.ts` |
| Social links (Instagram, TikTok, X) | `cafe.socials` in `data/cafe.ts`. Empty values stay hidden. |
| Delivery apps | `cafe.deliveryApps` in `data/cafe.ts`. The section appears once the list has entries. |
| Menu items and prices | `data/menu.ts` |
| Bean products, weights, tasting notes | `data/beans.ts` |
| Any text on the site (headings, buttons, About text, policies) | `i18n/locales/ar.json` and `i18n/locales/en.json`. Always update both. |

**Adding photos:** put the file in `public/images/photos/` (WebP, about 800px wide), then reference it:

- A drink photo: set `image: '/images/photos/<file>.webp'` on the item in `data/menu.ts`. Without one, signature drinks show their illustration.
- The About-page photo: `cafe.photos.brewing` in `data/cafe.ts`.

**Hours:** change `cafe.hours` in `data/cafe.ts`. The open/closed status, the displayed hours and the structured data for search engines all follow it. If the hours logic itself changes, run `npm test`.

## Deployment

Netlify builds automatically on every push to `main`. The settings live in [netlify.toml](netlify.toml):

- Build command: `npm run generate`
- Publish directory: `dist`. On Netlify, Nuxt switches to its `netlify-static` preset, which writes to `dist/` and adds asset caching headers and the 404 redirect.

The site URL used for canonical links, the sitemap and social previews comes from Netlify automatically. When the real domain is connected, set `NUXT_PUBLIC_SITE_URL` (for example `https://dripora-sa.com`) in Netlify's environment variables.

## Before launch

These items are waiting on the client. Each one is also marked with a `TODO` comment in the code.

- [ ] Confirm the rights to the pistachio latte and cup photos, or replace them with the café's own (`data/menu.ts`, `public/images/photos/`)
- [ ] Vector logo (the current logo is cropped from the old site)
- [ ] Confirm menu prices, "Mikato" (assumed macchiato) and the frappuccino category
- [ ] Bean weights, roast levels and tasting notes
- [ ] Arabic brand-name spelling, full Arabic address and confirmed hours
- [ ] Social handles and delivery-app links
- [ ] Brand story for `/about`
- [ ] Final wording for the returns and privacy policies
- [ ] Domain registrar access, to move `dripora-sa.com` from LAK to Netlify
