import { NextResponse } from 'next/server';
import { createCheckout } from '@/lib/shopify';
import type { CartLine } from '@/types';

/**
 * Creates a checkout session.
 *
 * - In production: routes to Shopify Storefront API cartCreate (Spocket
 *   handles fulfillment automatically once the Shopify order fires).
 * - In dev (no Shopify env): returns a placeholder /cart/success URL so
 *   the UI flow is testable without keys.
 */
export async function POST(req: Request) {
  try {
    const { lines } = (await req.json()) as { lines: CartLine[] };
    if (!Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json({ error: 'Empty cart' }, { status: 400 });
    }

    const hasShopify =
      !!process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN &&
      !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

    if (!hasShopify) {
      return NextResponse.json({ checkoutUrl: '/cart?status=demo' });
    }

    const variantLines = lines
      .filter((l) => !!l)
      .map((l) => ({ variantId: (l as CartLine & { shopifyVariantId?: string }).productId, quantity: l.quantity }));

    const { checkoutUrl } = await createCheckout(variantLines);
    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
