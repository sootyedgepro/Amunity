/**
 * Spocket dropshipping adapter.
 *
 * Spocket primarily integrates as a Shopify app — products, inventory,
 * and order routing flow through Shopify automatically. This module
 * exists for the (rarer) headless / Next.js direct path: pulling product
 * data via Spocket's API and pushing orders for fulfillment.
 *
 * If you're using the Shopify Storefront API path (recommended), most of
 * this logic lives inside Spocket's Shopify app and you only need:
 *  - The webhook handler (./src/app/api/spocket-webhook/route.ts)
 *  - shopify.ts for fetching products on the storefront
 */

const SPOCKET_API_BASE = 'https://api.spocket.co/v1';

interface SpocketProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  inventory_quantity: number;
  images: { src: string }[];
  variants: { id: string; price: number; sku: string }[];
}

interface SpocketOrderPayload {
  external_id: string;
  shipping_address: {
    name: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone?: string;
  };
  line_items: { spocket_product_id: string; variant_id?: string; quantity: number }[];
}

const headers = () => ({
  Authorization: `Bearer ${process.env.SPOCKET_API_KEY}`,
  'Content-Type': 'application/json',
});

export async function fetchSpocketProducts(): Promise<SpocketProduct[]> {
  const res = await fetch(`${SPOCKET_API_BASE}/products`, {
    headers: headers(),
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`Spocket fetch failed: ${res.status}`);
  const data = await res.json();
  return data.products ?? [];
}

export async function pushSpocketOrder(payload: SpocketOrderPayload) {
  const res = await fetch(`${SPOCKET_API_BASE}/orders`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Spocket order push failed: ${res.status}`);
  return res.json();
}

export function verifySpocketWebhook(rawBody: string, signature: string): boolean {
  const secret = process.env.SPOCKET_WEBHOOK_SECRET;
  if (!secret) return false;
  return signature === secret;
}
