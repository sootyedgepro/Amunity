# AmunitY — Launch Checklist

Sequenced for a 1–2 week solo launch. Do them in order — most blockers are upstream.

## Phase 1 — Foundations (Day 1–2)

### Domain
- [ ] Buy `amunity.com` via Cloudflare Registrar or Namecheap
- [ ] Buy defensive variants: `.co`, `.shop`, `getamunity.com`
- [ ] Set Cloudflare DNS, enable proxy (orange cloud)

### Hosting
- [ ] Deploy Next.js storefront to **Vercel** (connect GitHub repo)
- [ ] Or: Shopify-hosted theme (skip Next.js, use Liquid)
- [ ] Verify HTTPS on `https://amunity.com` and `www`

### Email
- [ ] Set up Google Workspace at `hello@amunity.com`
- [ ] Add SPF, DKIM, DMARC records for deliverability
- [ ] Forwarding aliases: `press@`, `wholesale@`, `support@`

## Phase 2 — Store setup (Day 2–4)

### Shopify
- [ ] Create store, set address, currency, timezone
- [ ] Pick **Basic plan** ($39/mo)
- [ ] Connect custom domain `amunity.com` in Settings → Domains
- [ ] Set primary domain (redirects www → root or vice versa)
- [ ] Activate **Shopify Payments** + **Shop Pay** + **PayPal**
- [ ] Configure shipping zones:
  - US: Free over $50, $5.95 standard, $14.95 expedited
  - Canada: $9.95
  - UK / EU: $14.95
- [ ] Set tax rules (Shopify auto-handles US sales tax once registered states added)

### Spocket
- [ ] Install Spocket app from Shopify App Store
- [ ] Choose Pro plan ($39.99/mo) for branded invoicing
- [ ] Push 5 skincare + 5 gummy products to Shopify (use the catalog in `src/data/products.ts` as your spec)
- [ ] Edit each product description to match the AmunitY voice
- [ ] Replace product images with branded lifestyle shots if budget allows
- [ ] Enable auto-fulfill, auto-inventory, auto-tracking
- [ ] Fund Spocket wallet ($100+ buffer)

### Storefront wiring (if using Next.js)
- [ ] Create Shopify private app → grab Storefront API token
- [ ] Add to Vercel env vars (per `.env.example`)
- [ ] Update `src/data/products.ts` `shopifyVariantId` for each item
- [ ] Smoke test: add to cart → checkout flow lands on Shopify checkout

## Phase 3 — Marketing stack (Day 4–5)

### Email
- [ ] Klaviyo account, connect to Shopify
- [ ] Create lists: "Newsletter", "Welcome 15%", "Subscribers", "VIP"
- [ ] Build flows:
  - Welcome (3 emails over 7 days, deliver 15% code)
  - Browse abandonment (1 email)
  - Cart abandonment (3 emails over 48h)
  - Post-purchase (review request day 14)
  - Win-back (90 days inactive)
- [ ] Add Klaviyo `KLAVIYO_PRIVATE_KEY` + `KLAVIYO_LIST_ID` to env

### Pixels & analytics
- [ ] GA4 property → add `NEXT_PUBLIC_GA4_ID`
- [ ] Meta Business → Pixel → add `NEXT_PUBLIC_META_PIXEL_ID`
- [ ] TikTok Business → Pixel → add `NEXT_PUBLIC_TIKTOK_PIXEL_ID`
- [ ] Configure conversion events: ViewItem, AddToCart, BeginCheckout, Purchase
- [ ] Set up Conversions API (CAPI) for Meta to mitigate iOS 14+ data loss
- [ ] Google Search Console → submit `sitemap.xml`

### Reviews
- [ ] Install **Judge.me** or **Loox** in Shopify
- [ ] Configure auto-request emails (14 days post-fulfillment)
- [ ] Import seed reviews from `src/data/reviews.ts`

## Phase 4 — Legal & compliance (Day 5–6)

- [ ] Privacy policy at `/privacy` (use Termly or iubenda generator, $10/mo)
- [ ] Terms of service at `/terms`
- [ ] Cookie policy linked from CookieBanner (already wired)
- [ ] Refund policy at `/shipping`
- [ ] Add FDA supplement disclaimer to footer + supplement PDPs
- [ ] Register business entity (LLC most common)
- [ ] Get EIN
- [ ] Open business bank account
- [ ] Sales tax registration in nexus states (Avalara or TaxJar can automate)
- [ ] Trademark `AmunitY` name + logo (USPTO TEAS Plus, $250 / class)

## Phase 5 — Content & polish (Day 6–8)

- [ ] Hero photoshoot (or licensed stock that matches brand)
- [ ] Founder portrait + lifestyle shots
- [ ] Product photography (3–6 angles each)
- [ ] Write 3 blog posts (use stubs in `src/data/blog.ts` as outlines)
- [ ] Build About, Science, FAQ copy → final review
- [ ] Set OG images per page (1200×630)
- [ ] Verify Lighthouse 90+ across pages (mobile)
- [ ] Test all forms (newsletter, contact)
- [ ] Test cart → checkout → order email flow with **Bogus Gateway**

## Phase 6 — Pre-launch QA (Day 8–9)

- [ ] Run accessibility scan (axe DevTools)
- [ ] Test all CTAs on mobile + desktop
- [ ] Verify schema markup (Google Rich Results Test on PDPs)
- [ ] Verify sitemap at `/sitemap.xml`
- [ ] Verify robots at `/robots.txt`
- [ ] Test order flow end-to-end with real $1 purchase → refund
- [ ] Validate Klaviyo flows fire (welcome, abandoned cart)
- [ ] Test Spocket order routing with one real fulfillment

## Phase 7 — Launch (Day 9–10)

- [ ] Soft launch to friends/family (10–25 people, get feedback + first orders)
- [ ] Post on personal IG / TikTok / LinkedIn
- [ ] Send "we're live" email to existing list (if any)
- [ ] Submit to Product Hunt (optional)
- [ ] Begin Meta + TikTok ads on best-seller bundles ($30–50/day to start)
- [ ] Respond to every review and DM in first 30 days personally

## Phase 8 — First 30 days

- [ ] Monitor Klaviyo deliverability (don't get marked spam)
- [ ] Track CAC per channel — kill what's not converting
- [ ] Set up Google Ads search campaign for branded terms (`amunity` etc.) — cheap defensive
- [ ] Build influencer seeding list (50 micro-influencers in skincare/wellness)
- [ ] Launch UGC ad creative based on first reviews
- [ ] A/B test homepage hero headline + first product page

## Ongoing

- [ ] Weekly: review GA4 + Shopify analytics
- [ ] Weekly: review Spocket inventory, prune slow-movers
- [ ] Monthly: financial close — gross margin, CAC:LTV, contribution margin
- [ ] Quarterly: brand audit (voice consistency, photography quality, customer feedback themes)
