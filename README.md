# AmunitY — Production-Ready E-Commerce

> Defend From Within. Glow From Without.

A Shopify-compatible Next.js 14 storefront for a wellness dropshipping brand. Skincare + supplements, fulfilled via Spocket, headless via Shopify Storefront API (or run standalone with the included demo data).

## Quick start

```bash
cd amunity
npm install
cp .env.example .env.local
npm run dev   # http://localhost:3000
```

The site runs immediately with the demo product catalog (5 skincare + 5 gummies). Wire up the env vars in `.env.local` to enable:

- Shopify Storefront API (real checkout)
- Klaviyo (email capture)
- Spocket (dropshipping)
- GA4 / Meta Pixel / TikTok Pixel
- Stripe (alt checkout)

## Tech stack

- **Next.js 14** App Router, server components, static export–compatible
- **Tailwind CSS** with custom design tokens (`tailwind.config.ts`)
- **Zustand** persisted cart store
- **Lucide** icon system
- **Klaviyo** email API
- **Shopify Storefront API** for cart + checkout (when wired)
- **Spocket** for dropshipping (Shopify app + webhook)

## Pages

| Route | File | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | Hero, pillars, featured grid, founder, email capture, IG feed |
| `/shop` | `src/app/shop/page.tsx` | Filters (category) + sort |
| `/products/[slug]` | `src/app/products/[slug]/page.tsx` | PDP with subscribe & save, schema markup |
| `/about` | `src/app/about/page.tsx` | Founder letter |
| `/science` | `src/app/science/page.tsx` | Ingredient education hub |
| `/blog` `/blog/[slug]` | `src/app/blog/...` | SEO content |
| `/faq` | `src/app/faq/page.tsx` | Accordion |
| `/shipping` | `src/app/shipping/page.tsx` | Policies |
| `/contact` | `src/app/contact/page.tsx` | Form + channels |
| `/cart` | `src/app/cart/page.tsx` | Full bag page |
| `/api/newsletter` | Klaviyo subscribe |
| `/api/checkout` | Shopify cart create |
| `/api/spocket-webhook` | Order/inventory events |

## Documentation

- `docs/BRAND_STYLE_GUIDE.md` — colors, type, voice, asset rules
- `docs/SPOCKET_INTEGRATION.md` — step-by-step Spocket connection
- `docs/LAUNCH_CHECKLIST.md` — domain → payments → legal → launch

## Performance targets

- Lighthouse 90+ across performance / SEO / accessibility / best practices
- Images served as WebP/AVIF via `next/image`
- Fonts self-hosted via `next/font` (no FOUT)
- `optimizePackageImports` for `lucide-react`
- Schema markup on PDPs, OG tags everywhere via `lib/seo.ts`
