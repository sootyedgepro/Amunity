# Spocket Integration Guide

Spocket is the dropshipping fulfillment layer. It plugs into your store as a Shopify (or WooCommerce) app and auto-syncs product data, inventory, pricing, and routes orders to suppliers for fulfillment.

This guide assumes the **recommended path: Shopify + Spocket app + Next.js storefront via Storefront API**. (A direct Next.js → Spocket API path is also possible but rare and is documented at the bottom.)

---

## Architecture

```
┌────────────────┐      Storefront API     ┌──────────────────┐
│  Next.js (this │  ─────────────────────► │   Shopify Store  │
│   storefront)  │  ◄─── product data ──── │  (admin + checkout)│
└────────────────┘                          └────────┬─────────┘
        │                                             │
        │  /api/spocket-webhook                       │ order.created event
        │ ◄────────── fulfillment events ──┐          │
        │                                  │          ▼
        │                          ┌───────────────────┐
        └────── checkout URL ────► │  Spocket app      │
                                   │  (in Shopify)     │
                                   └───────┬───────────┘
                                           │ pushes order
                                           ▼
                                   ┌───────────────────┐
                                   │  Spocket supplier │
                                   │     network        │
                                   └───────────────────┘
```

**Result:** customer adds to cart → checks out on Shopify → Shopify fires `order.created` → Spocket app routes to supplier → supplier ships → tracking flows back to Shopify → email goes out via Klaviyo.

---

## Step 1 — Create your Shopify store

1. Go to https://www.shopify.com → **Start free trial**.
2. Choose store name **`amunity`** (or your variant).
3. Select **"Online Store"** sales channel.
4. In **Settings → General**, set address, currency (USD), timezone.
5. In **Settings → Payments**, activate Shopify Payments + PayPal.

## Step 2 — Install Spocket

1. From your Shopify admin: **Apps → Visit Shopify App Store**.
2. Search **"Spocket"** → install the **Spocket - US/EU Dropshipping** app.
3. Approve permissions (Spocket needs read/write product + order access).
4. You'll be redirected to spocket.co — sign up with the same email as your Shopify store.

## Step 3 — Choose products

Spocket → **Search Products** → filter:
- Country: **United States** + **EU** (faster shipping vs. AliExpress)
- Category: **Beauty & Personal Care** + **Health**
- Shipping time: **≤ 5 days domestic**

Look for AmunitY-aligned items:
- Vitamin C serums
- Retinol creams
- Collagen / immune / sleep gummies
- Probiotic complexes
- Mineral SPF
- Clean cleansers

For each product:
1. Click → **Push to Store**
2. Edit title to match your brand (e.g. "Glow Collagen Gummies")
3. Markup: 2.0x–2.5x cost (Spocket suggests; tune for your margin)
4. Replace images with your branded shots if possible
5. Edit description to match the AmunitY voice (use `src/data/products.ts` as a template)
6. Click **Push** — product appears in your Shopify catalog

## Step 4 — Configure auto-sync

In Spocket → **Settings → My Shop**:
- ✅ Auto-update inventory
- ✅ Auto-update price (or off if you prefer fixed retail)
- ✅ Auto-fulfill orders
- ✅ Send tracking to customer

## Step 5 — Get your Storefront API token

In Shopify admin → **Settings → Apps and sales channels → Develop apps**:

1. Click **Create an app** → name it `amunity-storefront`
2. **Configure Storefront API scopes** → enable:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
3. Click **Install app**
4. Go to **API credentials** → copy the **Storefront API access token**

Add to `.env.local`:
```bash
NEXT_PUBLIC_SHOPIFY_DOMAIN=amunity.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=shpat_xxxxxxxxxxxxx
```

`/api/checkout` will now create real Shopify cart/checkout URLs. (When env vars are absent it falls back to a demo redirect.)

## Step 6 — Wire products to Shopify variants

Once products are pushed to Shopify by Spocket, you'll have Shopify variant IDs. Update `src/data/products.ts` to include them:

```ts
{
  id: 'sk-001',
  // ...
  shopifyVariantId: 'gid://shopify/ProductVariant/123456789',
}
```

`createCheckout()` in `src/lib/shopify.ts` uses `merchandiseId` (variant GID).

For full headless: replace `src/data/products.ts` with a Storefront API GraphQL query that fetches all products at build time (use `next: { revalidate: 600 }` for ISR).

## Step 7 — Configure the Spocket webhook (optional)

For real-time fulfillment notifications outside Shopify:

In Spocket → **Settings → Webhooks**:
- URL: `https://amunity.com/api/spocket-webhook`
- Events: `order.fulfilled`, `order.shipped`, `inventory.updated`
- Secret: copy the value into `SPOCKET_WEBHOOK_SECRET`

Add to `.env.local`:
```bash
SPOCKET_API_KEY=spk_xxxxxxxxxxxxx
SPOCKET_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

The handler is at `src/app/api/spocket-webhook/route.ts`.

## Step 8 — Test end-to-end

1. `npm run dev` → http://localhost:3000
2. Add a product → checkout → confirm Shopify checkout URL loads
3. Use Shopify's **Bogus Gateway** in dev: Settings → Payments → Test mode → "Bogus Gateway" → place order with card `1` (success) or `2` (fail)
4. Within ~2 min Spocket should show the order in **My Orders**
5. In Spocket, fund your wallet ($25 minimum) → click **Pay & Order** to fulfill
6. Tracking syncs back to Shopify → triggers Klaviyo "Shipped" email

## Step 9 — Go live

1. In Shopify → **Settings → Plan**: pick Basic ($39/mo) or higher
2. Connect your domain (`amunity.com`) via **Settings → Domains**
3. Add real payment gateway (Shopify Payments + Shop Pay)
4. Set tax (Shopify auto-calculates US sales tax in registered states)
5. Spocket: switch billing to Pro ($39.99/mo) for branded invoicing + premium products

---

## Alternative: direct Next.js → Spocket API

Only do this if you want to bypass Shopify. You'll need to build:
- Cart + checkout flow (Stripe Checkout in `src/app/api/checkout/route.ts`)
- Order persistence (Postgres / Supabase)
- Order push to Spocket (`pushSpocketOrder` in `src/lib/spocket.ts`)
- Tax calculation (TaxJar or Stripe Tax)
- Email transactional (Klaviyo or Resend)

Use `src/lib/spocket.ts` as the adapter. Pricing/inventory polled via `fetchSpocketProducts()` on a cron or webhook.

The Shopify route is recommended — Spocket is built for it, and you skip ~80% of e-commerce engineering.
