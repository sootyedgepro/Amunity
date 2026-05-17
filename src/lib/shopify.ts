/**
 * Shopify Storefront API client (headless mode).
 * Wire this in once products are synced from Spocket -> Shopify.
 */
const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!domain || !token) throw new Error('Shopify env vars missing');
  const res = await fetch(`https://${domain}/api/2024-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Shopify error: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

export async function createCheckout(
  lines: { variantId: string; quantity: number }[]
): Promise<{ checkoutUrl: string }> {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { checkoutUrl }
        userErrors { message }
      }
    }
  `;
  const data = await shopifyFetch<{ cartCreate: { cart: { checkoutUrl: string } } }>(query, {
    input: { lines: lines.map((l) => ({ merchandiseId: l.variantId, quantity: l.quantity })) },
  });
  return { checkoutUrl: data.cartCreate.cart.checkoutUrl };
}
