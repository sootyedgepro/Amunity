import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const full = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items.data.price.product', 'customer_details'],
    });

    const order = {
      sessionId: full.id,
      paid: full.payment_status === 'paid',
      amountTotal: (full.amount_total ?? 0) / 100,
      currency: full.currency,
      customer: {
        email: full.customer_details?.email,
        name: full.customer_details?.name,
        phone: full.customer_details?.phone,
      },
      shipping: (full as unknown as { shipping_details?: unknown }).shipping_details ?? full.customer_details?.address,
      items: full.line_items?.data.map((li) => {
        const product = li.price?.product as Stripe.Product | null | undefined;
        return {
          name: li.description,
          quantity: li.quantity,
          amount: ((li.amount_total ?? 0) / 100),
          productId: product?.metadata?.productId,
          slug: product?.metadata?.slug,
          subscription: product?.metadata?.subscription === 'true',
        };
      }),
    };

    console.log('[NEW ORDER]', JSON.stringify(order, null, 2));
    // TODO Phase 2: forward `order` to Supliful (direct API or Shopify Admin API relay).
  }

  return NextResponse.json({ received: true });
}
