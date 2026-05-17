import { NextResponse } from 'next/server';
import { verifySpocketWebhook } from '@/lib/spocket';

/**
 * Receives Spocket fulfillment / inventory events.
 *
 * Configure inside Spocket dashboard → Settings → Webhooks:
 *   URL:    https://amunity.com/api/spocket-webhook
 *   Events: order.fulfilled, order.shipped, inventory.updated
 *   Secret: matches SPOCKET_WEBHOOK_SECRET in env
 */
export async function POST(req: Request) {
  const raw = await req.text();
  const sig = req.headers.get('x-spocket-signature') ?? '';

  if (!verifySpocketWebhook(raw, sig)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(raw) as { type: string; data: unknown };

  switch (event.type) {
    case 'order.fulfilled':
    case 'order.shipped':
      // TODO: forward to Klaviyo for shipping notification
      // TODO: update order status in your DB / Shopify
      console.log('[spocket]', event.type, event.data);
      break;
    case 'inventory.updated':
      // TODO: revalidate product cache when stock crosses thresholds
      console.log('[spocket] inventory', event.data);
      break;
    default:
      console.log('[spocket] unhandled', event.type);
  }

  return NextResponse.json({ ok: true });
}
